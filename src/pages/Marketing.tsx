import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Share2, Users, Gift, TrendingUp, Download, FileText, Palette, Check, Sparkles, ExternalLink } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

const Marketing = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const referralLink = "https://celerfi.com/ref/user123";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast({
      title: "Copied!",
      description: "Referral link copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const stats = [
    { label: "Total Referrals", value: "24", icon: Users, color: "from-blue-500/20 to-blue-600/5", trend: "+12%" },
    { label: "Earned Rewards", value: "1,200 CLT", icon: Gift, color: "from-purple-500/20 to-purple-600/5", trend: "+8%" },
    { label: "Active Referrals", value: "18", icon: TrendingUp, color: "from-green-500/20 to-green-600/5", trend: "+5%" },
  ];

  const marketingMaterials = [
    {
      title: "Social Media Kit",
      description: "Ready-to-use social media posts and images for all platforms",
      icon: Share2,
      color: "bg-blue-500/10 text-blue-500",
    },
    {
      title: "Presentation Deck",
      description: "Professional investor presentation and pitch materials",
      icon: FileText,
      color: "bg-purple-500/10 text-purple-500",
    },
    {
      title: "Brand Guidelines",
      description: "Official brand assets and usage guidelines",
      icon: Palette,
      color: "bg-orange-500/10 text-orange-500",
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground flex items-center gap-3">
              Marketing Tools
              <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Earn More
              </span>
            </h1>
            <p className="text-muted-foreground mt-1">Grow your network and maximize your rewards</p>
          </div>
        </div>

        {/* Referral Link Card */}
        <div className="glass-card p-6 animate-fade-up opacity-0 relative overflow-hidden group" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute inset-0 cyber-grid opacity-5" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-primary/10">
                <Share2 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-display font-bold text-foreground">Your Referral Link</h2>
                <p className="text-sm text-muted-foreground">Share and earn 10% of your referrals' rewards</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Input
                  value={referralLink}
                  readOnly
                  className="bg-secondary/50 border-border/50 h-12 font-mono text-sm pr-4 focus:border-primary"
                />
                <ExternalLink className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              </div>
              <Button 
                onClick={copyToClipboard} 
                className={`h-12 px-6 gap-2 transition-all duration-300 ${copied ? 'bg-green-500 hover:bg-green-600' : 'btn-primary'}`}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={stat.label}
                className={`glass-card p-6 animate-fade-up opacity-0 group relative overflow-hidden`}
                style={{ animationDelay: `${(index + 1) * 100 + 100}ms`, animationFillMode: 'forwards' }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-display font-bold text-foreground group-hover:text-primary transition-colors">{stat.value}</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 text-xs font-medium bg-green-500/10 text-green-500 rounded-full">
                    {stat.trend}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Marketing Materials */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-display font-bold text-foreground flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Marketing Materials
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {marketingMaterials.map((material, index) => {
              const Icon = material.icon;
              return (
                <div 
                  key={index} 
                  className="glass-card p-6 animate-fade-up opacity-0 group cursor-pointer hover:border-primary/30 transition-all duration-500 relative overflow-hidden"
                  style={{ animationDelay: `${(index + 4) * 100 + 100}ms`, animationFillMode: 'forwards' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <div className={`p-3 rounded-xl ${material.color} inline-block mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-display font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{material.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{material.description}</p>
                    <Button variant="outline" className="w-full border-border/50 hover:bg-secondary/50 gap-2 group/btn relative overflow-hidden">
                      <Download className="w-4 h-4" />
                      Download
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tips Section */}
        <div className="glass-card p-6 animate-fade-up opacity-0 relative overflow-hidden" style={{ animationDelay: '700ms', animationFillMode: 'forwards' }}>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
          <div className="relative z-10">
            <h3 className="text-lg font-display font-bold text-foreground mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Pro Tips for Maximum Earnings
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-secondary/30 border border-border/50">
                <p className="text-sm text-foreground font-medium mb-1">Share on Social Media</p>
                <p className="text-xs text-muted-foreground">Post your referral link on Twitter, Facebook, and LinkedIn to reach more people.</p>
              </div>
              <div className="p-4 rounded-xl bg-secondary/30 border border-border/50">
                <p className="text-sm text-foreground font-medium mb-1">Engage Your Network</p>
                <p className="text-xs text-muted-foreground">Personally invite friends and family who might be interested in staking.</p>
              </div>
              <div className="p-4 rounded-xl bg-secondary/30 border border-border/50">
                <p className="text-sm text-foreground font-medium mb-1">Create Content</p>
                <p className="text-xs text-muted-foreground">Make videos or blog posts explaining the benefits of CelerFi staking.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Marketing;