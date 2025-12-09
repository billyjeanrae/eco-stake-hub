import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Simple HD wallet derivation using Web Crypto API
async function deriveWalletFromSeed(seedPhrase: string, index: number): Promise<{ address: string; privateKey: string }> {
  // Convert seed to bytes
  const encoder = new TextEncoder();
  const seedData = encoder.encode(seedPhrase + index.toString());
  
  // Use SHA-256 to derive a deterministic private key
  const hashBuffer = await crypto.subtle.digest('SHA-256', seedData);
  const privateKeyBytes = new Uint8Array(hashBuffer);
  
  // Convert to hex string for private key
  const privateKey = '0x' + Array.from(privateKeyBytes).map(b => b.toString(16).padStart(2, '0')).join('');
  
  // Derive a simple address (hash of private key) - in production use proper EC derivation
  const addressData = encoder.encode(privateKey);
  const addressHash = await crypto.subtle.digest('SHA-256', addressData);
  const addressBytes = new Uint8Array(addressHash).slice(0, 20);
  const address = '0x' + Array.from(addressBytes).map(b => b.toString(16).padStart(2, '0')).join('');
  
  return { address, privateKey };
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('Missing authorization header');
    }

    // Create Supabase client with user's auth token
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    // User client - to verify the user
    const supabaseUser = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } }
    });
    
    // Service client - to access secrets and insert wallet
    const supabaseService = createClient(supabaseUrl, supabaseServiceKey);

    // Verify user is authenticated
    const { data: { user }, error: authError } = await supabaseUser.auth.getUser();
    if (authError || !user) {
      console.error('Auth error:', authError);
      throw new Error('Unauthorized');
    }

    console.log('Generating wallet for user:', user.id);

    // Check if user already has a wallet
    const { data: existingWallet } = await supabaseService
      .from('wallets')
      .select('address')
      .eq('user_id', user.id)
      .maybeSingle();

    if (existingWallet) {
      console.log('User already has wallet:', existingWallet.address);
      return new Response(JSON.stringify({ 
        address: existingWallet.address,
        message: 'Wallet already exists'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Get master seed from secrets (stored as env var in edge function)
    const masterSeed = Deno.env.get('MASTER_WALLET_SEED');
    if (!masterSeed) {
      console.error('Master seed not configured');
      throw new Error('Wallet generation not configured. Please contact support.');
    }

    // Get a unique index for this user based on count of wallets
    const { count } = await supabaseService
      .from('wallets')
      .select('*', { count: 'exact', head: true });
    
    const walletIndex = (count || 0) + 1;

    // Derive wallet from master seed
    const { address, privateKey } = await deriveWalletFromSeed(masterSeed, walletIndex);

    console.log('Generated wallet address:', address);

    // Store wallet in database (private key is encrypted at rest by Supabase)
    // Note: In a production system, you'd want additional encryption
    const { error: insertError } = await supabaseService
      .from('wallets')
      .insert({
        user_id: user.id,
        address: address,
        private_key: privateKey, // Consider additional encryption layer
        balance: 0
      });

    if (insertError) {
      console.error('Insert error:', insertError);
      throw new Error('Failed to create wallet');
    }

    console.log('Wallet created successfully');

    return new Response(JSON.stringify({ 
      address,
      message: 'Wallet created successfully'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-wallet function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: error.message === 'Unauthorized' ? 401 : 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
