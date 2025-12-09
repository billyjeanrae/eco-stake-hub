import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Wallet, Copy } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { QRCodeSVG } from "qrcode.react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

const WalletPage = () => {
  const { toast } = useToast();

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
      <div className="space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">My Wallets</h1>
          <p className="text-muted-foreground mt-1">Manage your connected wallets</p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {wallets?.map((wallet, index) => (
              <div
                key={wallet.id}
                className="glass-card p-6 animate-fade-up opacity-0"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-primary/10">
                      <Wallet className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-foreground">EVM Wallet</h3>
                      <p className="text-sm text-muted-foreground truncate max-w-[200px]">{wallet.address}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleCopyAddress(wallet.address)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>

                <div className="mb-6">
                  <p className="text-sm text-muted-foreground mb-1">Balance</p>
                  <p className="text-3xl font-display font-bold text-foreground">
                    {wallet.balance} <span className="text-primary">CLT</span>
                  </p>
                </div>

                <div className="flex justify-center p-4 bg-white rounded-xl">
                  <QRCodeSVG
                    value={wallet.address}
                    size={180}
                    level="H"
                    includeMargin={false}
                  />
                </div>

                <div className="mt-4">
                  <p className="text-xs text-muted-foreground text-center">
                    Scan to receive funds
                  </p>
                </div>
              </div>
            ))}

            {(!wallets || wallets.length === 0) && (
              <div className="glass-card p-12 col-span-full text-center">
                <Wallet className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-display font-semibold text-foreground mb-2">No Wallets Found</h3>
                <p className="text-muted-foreground">Your wallet will be created automatically when you sign up.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default WalletPage;