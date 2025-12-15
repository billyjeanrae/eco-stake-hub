import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Wallet, Copy, ExternalLink, ArrowUpRight, ArrowDownLeft, Shield, Sparkles } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { QRCodeSVG } from "qrcode.react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const WalletPage = () => {
  const { toast } = useToast();
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);

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
    setCopiedAddress(address);
    toast({
      title: "Address copied!",
      description: "Wallet address copied to clipboard",
    });
    setTimeout(() => setCopiedAddress(null), 2000);
  };

  const quickActions = [
    { label: "Send", icon: ArrowUpRight, color: "text-orange-500" },
    { label: "Receive", icon: ArrowDownLeft, color: "text-green-500" },
  ];

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground flex items-center gap-3">
              My Wallets
              <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full flex items-center gap-1">
                <Shield className="w-3 h-3" />
                Secured
              </span>
            </h1>
            <p className="text-muted-foreground mt-1">Manage your connected wallets</p>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="relative">
              <div className="w-16 h-16 border-2 border-primary/20 rounded-full" />
              <div className="absolute inset-0 w-16 h-16 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {wallets?.map((wallet, index) => (
              <div
                key={wallet.id}
                className="glass-card p-6 animate-fade-up opacity-0 group relative overflow-hidden"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
              >
                {/* Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Animated Border */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 rounded-2xl border border-primary/20" />
                </div>

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 group-hover:from-primary/30 group-hover:to-primary/10 transition-colors">
                        <Wallet className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-foreground flex items-center gap-2">
                          EVM Wallet
                          <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                        </h3>
                        <p className="text-sm text-muted-foreground truncate max-w-[200px] font-mono">{wallet.address}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleCopyAddress(wallet.address)}
                      className={`text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-xl transition-all ${copiedAddress === wallet.address ? 'text-primary bg-primary/10' : ''}`}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="mb-6 p-4 rounded-xl bg-secondary/30 border border-border/50">
                    <p className="text-sm text-muted-foreground mb-1">Total Balance</p>
                    <p className="text-4xl font-display font-bold text-foreground">
                      {wallet.balance} <span className="text-primary text-2xl">CLT</span>
                    </p>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex gap-2 mb-6">
                    {quickActions.map((action) => {
                      const Icon = action.icon;
                      return (
                        <Button 
                          key={action.label}
                          variant="outline" 
                          className="flex-1 h-11 border-border/50 hover:bg-secondary/50 gap-2"
                        >
                          <Icon className={`w-4 h-4 ${action.color}`} />
                          {action.label}
                        </Button>
                      );
                    })}
                  </div>

                  {/* QR Code */}
                  <div className="flex flex-col items-center p-6 bg-white rounded-xl relative group/qr">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover/qr:opacity-100 transition-opacity rounded-xl" />
                    <QRCodeSVG
                      value={wallet.address}
                      size={180}
                      level="H"
                      includeMargin={false}
                    />
                    <p className="text-xs text-gray-500 mt-4 flex items-center gap-1">
                      <ExternalLink className="w-3 h-3" />
                      Scan to receive funds
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {(!wallets || wallets.length === 0) && (
              <div className="glass-card p-12 col-span-full text-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <Wallet className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-display font-semibold text-foreground mb-2">No Wallets Found</h3>
                  <p className="text-muted-foreground max-w-sm mx-auto">Your wallet will be created automatically when you sign up. Please log out and sign up again to create your wallet.</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Security Info */}
        <div className="glass-card p-6 flex items-center gap-4 animate-fade-up opacity-0" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
          <div className="p-3 rounded-xl bg-primary/10">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-foreground">Enterprise Security</h3>
            <p className="text-sm text-muted-foreground">Your wallet is protected by military-grade encryption and secured by blockchain technology.</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default WalletPage;