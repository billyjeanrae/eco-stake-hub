-- 1. Create an enum for roles
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- 2. Create the user_roles table
CREATE TABLE public.user_roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
    UNIQUE (user_id, role)
);

-- 3. Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 4. Create security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- 5. Migrate existing roles from profiles to user_roles
INSERT INTO public.user_roles (user_id, role)
SELECT id, 
  CASE 
    WHEN role = 'admin' THEN 'admin'::app_role
    WHEN role = 'moderator' THEN 'moderator'::app_role
    ELSE 'user'::app_role
  END
FROM public.profiles
WHERE role IS NOT NULL
ON CONFLICT (user_id, role) DO NOTHING;

-- 6. Create RLS policies for user_roles table
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Only admins can manage roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- 7. Drop old profile RLS policies and create new restricted ones
DROP POLICY IF EXISTS "Enable read access for users" ON public.profiles;
DROP POLICY IF EXISTS "Users can see referral codes" ON public.profiles;
DROP POLICY IF EXISTS "Enable full access for admin users" ON public.profiles;

-- Users can only view their own profile
CREATE POLICY "Users can view own profile"
ON public.profiles
FOR SELECT
TO authenticated
USING (auth.uid() = id);

-- Admins can view all profiles
CREATE POLICY "Admins can view all profiles"
ON public.profiles
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Admins have full access
CREATE POLICY "Admins have full access to profiles"
ON public.profiles
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- 8. Create a function to lookup referral codes without exposing profile data
CREATE OR REPLACE FUNCTION public.get_referrer_id_by_code(referral_code_input text)
RETURNS uuid
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT id FROM public.profiles WHERE referral_code = referral_code_input LIMIT 1
$$;

-- 9. Update platform_settings RLS to properly restrict master key access
DROP POLICY IF EXISTS "Users can view platform settings" ON public.platform_settings;
DROP POLICY IF EXISTS "Only admins can view master key" ON public.platform_settings;

-- Only allow viewing non-sensitive settings
CREATE POLICY "Users can view public platform settings"
ON public.platform_settings
FOR SELECT
TO authenticated
USING (key NOT IN ('master_private_key', 'admin_secret'));

-- Only admins can view sensitive settings
CREATE POLICY "Admins can view all platform settings"
ON public.platform_settings
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- 10. Fix search_path on existing functions
CREATE OR REPLACE FUNCTION public.generate_referral_code()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    chars TEXT := 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    result TEXT := '';
    i INTEGER := 0;
    success BOOLEAN := false;
BEGIN
    WHILE NOT success AND i < 10 LOOP
        result := '';
        FOR __ IN 1..8 LOOP
            result := result || substr(chars, floor(random() * length(chars) + 1)::integer, 1);
        END LOOP;
        
        BEGIN
            IF NOT EXISTS (SELECT 1 FROM profiles WHERE referral_code = result) THEN
                success := true;
            END IF;
        END;
        
        i := i + 1;
    END LOOP;
    
    IF NOT success THEN
        RAISE EXCEPTION 'Could not generate unique referral code after 10 attempts';
    END IF;
    
    RETURN result;
END;
$$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, referral_code)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', generate_referral_code());
  
  -- Also create default user role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (new.id, 'user'::app_role);
  
  RETURN new;
END;
$$;