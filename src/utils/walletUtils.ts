import { ethers } from "ethers";
import { supabase } from "@/integrations/supabase/client";

export const generateWalletFromMasterKey = async (userId: string) => {
  try {
    // Fetch master private key from platform settings
    const { data: settings } = await supabase
      .from('platform_settings')
      .select('value')
      .eq('key', 'master_private_key')
      .single();

    if (!settings?.value) {
      throw new Error('Master private key not found');
    }

    // Create HD wallet from master key
    const masterWallet = new ethers.Wallet(settings.value.toString());
    const path = `m/44'/60'/0'/0/${userId}`; // Using userId as index
    const derivedWallet = ethers.HDNodeWallet.fromMnemonic(
      ethers.Mnemonic.fromPhrase(masterWallet.mnemonic?.phrase || ''),
      path
    );

    // Store the wallet in the database
    const { error } = await supabase
      .from('wallets')
      .insert({
        user_id: userId,
        address: derivedWallet.address,
        private_key: derivedWallet.privateKey, // Note: In production, this should be encrypted
        balance: 0
      });

    if (error) throw error;

    return derivedWallet.address;
  } catch (error) {
    console.error('Error generating wallet:', error);
    throw error;
  }
};

export const getWalletForUser = async (userId: string) => {
  try {
    const { data: wallet, error } = await supabase
      .from('wallets')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) throw error;
    return wallet;
  } catch (error) {
    console.error('Error fetching wallet:', error);
    throw error;
  }
};