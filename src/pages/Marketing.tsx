import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Share2, Users, Gift, TrendingUp, Download, FileText, Palette } from "lucide-react";
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

  const stats = [
    { label: "Total Referrals", value: "24", icon: Users },
    { label: "Earned Rewards", value: "1,200 CLT", icon: Gift },
    { label: "Active Referrals", value: "18", icon: TrendingUp },
  ];

  const marketingMaterials = [
    {
      title: "Social Media Kit",
      description: "Download ready-to-use social media posts and images",
      icon: Share2,
    },
    {
      title: "Presentation Deck",
      description: "Access our investor presentation and pitch materials",
      icon: FileText,
    },
    {
      title: "Brand Guidelines",
      description: "Learn how to properly represent the CelerFi brand",
      icon: Palette,
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Marketing Tools</h1>
          <p className="text-muted-foreground mt-1">Grow your network and earn rewards</p>
        </div>

        {/* Referral Link */}
        <div className="glass-card p-6 animate-fade-up opacity-0" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <Share2 className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl font-display font-bold text-foreground">Your Referral Link</h2>
          </div>
          <div className="flex gap-3">
            <Input
              value={referralLink}
              readOnly
              className="bg-secondary/50 border-border/50 h-12 font-mono text-sm"
            />
            <Button onClick={copyToClipboard} className="btn-primary h-12 px-6">
              <Copy className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-3">
            Share this link to earn rewards when new users join
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={stat.label}
                className="glass-card p-6 animate-fade-up opacity-0"
                style={{ animationDelay: `${(index + 1) * 100 + 100}ms`, animationFillMode: 'forwards' }}
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-display font-bold text-foreground">{stat.value}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Marketing Materials */}
        <div>
          <h2 className="text-xl font-display font-bold text-foreground mb-4">Marketing Materials</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {marketingMaterials.map((material, index) => {
              const Icon = material.icon;
              return (
                <div 
                  key={index} 
                  className="glass-card-hover p-6 animate-fade-up opacity-0"
                  style={{ animationDelay: `${(index + 4) * 100 + 100}ms`, animationFillMode: 'forwards' }}
                >
                  <div className="p-3 rounded-xl bg-primary/10 inline-block mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-display font-bold text-foreground mb-2">{material.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{material.description}</p>
                  <Button variant="outline" className="w-full border-border/50 hover:bg-secondary/50 gap-2">
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Marketing;