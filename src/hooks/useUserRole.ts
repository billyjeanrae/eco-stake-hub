import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export type AppRole = 'admin' | 'moderator' | 'user';

export const useUserRole = () => {
  const [role, setRole] = useState<AppRole | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkRole = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          setRole(null);
          setIsAdmin(false);
          setIsLoading(false);
          return;
        }

        // Query the user_roles table directly
        const { data: userRole, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .maybeSingle();

        if (error) {
          console.error('Error fetching user role:', error);
          setRole('user');
          setIsAdmin(false);
        } else if (userRole) {
          const roleValue = userRole.role as AppRole;
          setRole(roleValue);
          setIsAdmin(roleValue === 'admin');
        } else {
          // No role found, default to user
          setRole('user');
          setIsAdmin(false);
        }
      } catch (error) {
        console.error('Error checking user role:', error);
        setRole('user');
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkRole();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      checkRole();
    });

    return () => subscription.unsubscribe();
  }, []);

  return { role, isAdmin, isLoading };
};
