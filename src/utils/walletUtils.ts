import { supabase } from "@/integrations/supabase/client";

export const generateWalletFromMasterKey = async (userId: string) => {
  try {
    // Call the secure edge function to generate wallet
    const { data, error } = await supabase.functions.invoke('generate-wallet', {
      body: { userId }
    });

    if (error) {
      console.error('Error calling generate-wallet function:', error);
      throw new Error(error.message || 'Failed to generate wallet');
    }

    if (data.error) {
      throw new Error(data.error);
    }

    return data.address;
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
      .maybeSingle();

    if (error) throw error;
    return wallet;
  } catch (error) {
    console.error('Error fetching wallet:', error);
    throw error;
  }
};
