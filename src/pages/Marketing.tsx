import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Copy } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Marketing = () => {
  const { toast } = useToast();
  const referralLink = "https://celerfi.com/ref/user123";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    toast({
      title: "Copied!",
      description: "Referral link copied to clipboard",
    });
  };

  const marketingMaterials = [
    {
      title: "Social Media Kit",
      description: "Download ready-to-use social media posts and images",
      link: "#",
    },
    {
      title: "Presentation Deck",
      description: "Access our investor presentation and pitch materials",
      link: "#",
    },
    {
      title: "Brand Guidelines",
      description: "Learn how to properly represent the CelerFi brand",
      link: "#",
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        <h1 className="text-2xl font-bold">Marketing Tools</h1>

        {/* Referral Section */}
        <Card className="p-6 glass-card">
          <h2 className="text-xl font-bold mb-4">Your Referral Link</h2>
          <div className="flex gap-2">
            <Input
              value={referralLink}
              readOnly
              className="bg-background/50"
            />
            <Button
              onClick={copyToClipboard}
              className="bg-primary hover:bg-primary/90"
            >
              <Copy className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-sm text-gray-400 mt-2">
            Share this link to earn rewards when new users join
          </p>
        </Card>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 glass-card">
            <h3 className="text-sm text-gray-400 mb-2">Total Referrals</h3>
            <p className="text-2xl font-bold">24</p>
          </Card>
          <Card className="p-6 glass-card">
            <h3 className="text-sm text-gray-400 mb-2">Earned Rewards</h3>
            <p className="text-2xl font-bold">1,200 T369</p>
          </Card>
          <Card className="p-6 glass-card">
            <h3 className="text-sm text-gray-400 mb-2">Active Referrals</h3>
            <p className="text-2xl font-bold">18</p>
          </Card>
        </div>

        {/* Marketing Materials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {marketingMaterials.map((material, index) => (
            <Card key={index} className="p-6 glass-card">
              <h3 className="text-lg font-bold mb-2">{material.title}</h3>
              <p className="text-sm text-gray-400 mb-4">
                {material.description}
              </p>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => window.open(material.link, "_blank")}
              >
                Download
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Marketing;