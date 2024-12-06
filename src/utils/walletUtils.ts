import { Wallet } from "ethers";
import { supabase } from "@/integrations/supabase/client";

export const generateWalletFromMasterKey = async (userId: string) => {
  try {
    // Fetch master private key from platform settings
    const { data: settingsData, error: settingsError } = await supabase
      .from('platform_settings')
      .select('value')
      .eq('key', 'master_private_key')
      .single();
    
    if (settingsError) throw settingsError;
    
    const masterKey = settingsData.value as string;
    if (!masterKey) throw new Error('Master private key not set');

    // Create master wallet
    const masterWallet = new Wallet(masterKey);
    
    // Generate a deterministic child wallet using the user's ID as entropy
    const childWallet = Wallet.createRandom();
    
    // Store the wallet in the database
    const { error: walletError } = await supabase
      .from('wallets')
      .insert({
        user_id: userId,
        address: childWallet.address,
        private_key: childWallet.privateKey,
        balance: 0
      });

    if (walletError) throw walletError;

    return {
      address: childWallet.address,
      privateKey: childWallet.privateKey
    };
  } catch (error: any) {
    console.error('Error generating wallet:', error);
    throw error;
  }
};