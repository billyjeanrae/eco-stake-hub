import MainLayout from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Wallet, QrCode, Plus, Copy, ArrowUpRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { QRCodeSVG } from "qrcode.react"; // Changed from default import to named import
import { useState } from "react";

const WalletPage = () => {
  const { toast } = useToast();
  const [showNewWallet, setShowNewWallet] = useState(false);
  const [walletName, setWalletName] = useState("");
  
  const wallets = [
    { name: "Main Wallet", address: "0x1234...5678", balance: "1,000 CLT" },
    { name: "Staking Wallet", address: "0x8765...4321", balance: "500 CLT" },
  ];

  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    toast({
      title: "Address copied!",
      description: "Wallet address copied to clipboard",
    });
  };

  const handleCreateWallet = () => {
    if (!walletName) return;
    toast({
      title: "Wallet created!",
      description: `New wallet "${walletName}" has been created`,
    });
    setShowNewWallet(false);
    setWalletName("");
  };

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">My Wallets</h1>
          <Button
            onClick={() => setShowNewWallet(true)}
            className="bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create New Wallet
          </Button>
        </div>

        {showNewWallet && (
          <Card className="p-6 glass-card animate-scale-in">
            <h2 className="text-lg font-bold mb-4">Create New Wallet</h2>
            <div className="space-y-4">
              <Input
                placeholder="Wallet Name"
                value={walletName}
                onChange={(e) => setWalletName(e.target.value)}
                className="bg-background/50"
              />
              <div className="flex space-x-2">
                <Button
                  onClick={handleCreateWallet}
                  className="bg-primary hover:bg-primary/90"
                >
                  Create Wallet
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowNewWallet(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {wallets.map((wallet, index) => (
            <Card
              key={index}
              className="p-6 glass-card hover:scale-105 transition-transform duration-300"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-full bg-primary/20">
                    <Wallet className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold">{wallet.name}</h3>
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
                <p className="text-2xl font-bold">{wallet.balance}</p>
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-6 glass-card">
          <h2 className="text-lg font-bold mb-4">Deposit CLT</h2>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <p className="text-sm text-gray-400 mb-2">Scan QR Code</p>
              <div className="bg-white p-4 rounded-lg inline-block">
                <QRCodeSVG
                  value="0x1234567890abcdef"
                  size={200}
                  level="H"
                  includeMargin={true}
                />
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-400 mb-2">Deposit Address</p>
              <div className="flex items-center space-x-2">
                <Input
                  value="0x1234567890abcdef"
                  readOnly
                  className="bg-background/50"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleCopyAddress("0x1234567890abcdef")}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-sm text-gray-400 mt-4">
                Send only CLT to this address. Other tokens may be lost forever.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default WalletPage;