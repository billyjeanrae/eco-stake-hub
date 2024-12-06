import MainLayout from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Wallet, QrCode, Plus, Copy, ArrowUpRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

const WalletPage = () => {
  const { toast } = useToast();
  const [showNewWallet, setShowNewWallet] = useState(false);
  const [walletName, setWalletName] = useState("");

  const { data: wallets, isLoading } = useQuery({
    queryKey: ['user-wallets'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('wallets')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;
      return data;
    },
  });

  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    toast({
      title: "Address copied!",
      description: "Wallet address copied to clipboard",
    });
  };

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">My Wallets</h1>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-platform-green"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {wallets?.map((wallet) => (
              <Card
                key={wallet.id}
                className="p-6 glass-card hover:scale-105 transition-transform duration-300"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-full bg-primary/20">
                      <Wallet className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold">EVM Wallet</h3>
                      <p className="text-sm text-gray-400">{wallet.address}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleCopyAddress(wallet.address)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <div className="mt-4">
                  <p className="text-2xl font-bold">{wallet.balance} CLT</p>
                </div>
                <div className="mt-4 flex justify-center">
                  <div className="bg-white p-4 rounded-lg">
                    <QRCodeSVG
                      value={wallet.address}
                      size={200}
                      level="H"
                      includeMargin={true}
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default WalletPage;