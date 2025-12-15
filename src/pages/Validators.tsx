import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Server, Clock, DollarSign, ArrowRight, Zap, Shield, TrendingUp, Sparkles } from "lucide-react";
import { useState } from "react";

const Validators = () => {
  const [hoveredTier, setHoveredTier] = useState<number | null>(null);

  const validatorTiers = [
    { tier: 1, minInvestment: 50, apy: "252%", color: "from-green-500/20 to-green-600/5", popular: false },
    { tier: 2, minInvestment: 1000, apy: "288%", color: "from-blue-500/20 to-blue-600/5", popular: false },
    { tier: 3, minInvestment: 5000, apy: "324%", color: "from-purple-500/20 to-purple-600/5", popular: true },
    { tier: 4, minInvestment: 10000, apy: "360%", color: "from-yellow-500/20 to-yellow-600/5", popular: false },
    { tier: 5, minInvestment: 25000, apy: "396%", color: "from-orange-500/20 to-orange-600/5", popular: false },
    { tier: 6, minInvestment: 100000, apy: "432%", color: "from-red-500/20 to-red-600/5", popular: false },
  ];

  const stats = [
    { label: "Your Validators", value: "0", icon: Server, trend: null },
    { label: "Total Staked", value: "0 CLT", icon: DollarSign, trend: null },
    { label: "Next Cycle", value: "16h 12m 10s", icon: Clock, trend: "counting" },
  ];

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground flex items-center gap-3">
              Validators
              <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full flex items-center gap-1">
                <Zap className="w-3 h-3" />
                High APY
              </span>
            </h1>
            <p className="text-muted-foreground mt-1">Stake validators and earn high APY rewards</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={stat.label} 
                className="glass-card p-6 animate-fade-up opacity-0 group relative overflow-hidden"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-display font-bold text-foreground group-hover:text-primary transition-colors">
                      {stat.trend === "counting" ? (
                        <span className="tabular-nums">{stat.value}</span>
                      ) : stat.value}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Validator Tiers */}
        <div className="glass-card p-6 relative overflow-hidden">
          <div className="absolute inset-0 cyber-grid opacity-10" />
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-display font-bold text-foreground flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Purchase Validator
              </h2>
              <span className="text-sm text-muted-foreground">{validatorTiers.length} tiers available</span>
            </div>
            
            <div className="space-y-4">
              {validatorTiers.map((tier, index) => (
                <div
                  key={tier.tier}
                  className={`p-5 rounded-xl bg-secondary/30 border border-border/50 hover:border-primary/50 transition-all duration-500 animate-fade-up opacity-0 group relative overflow-hidden cursor-pointer ${hoveredTier === index ? 'scale-[1.02]' : ''}`}
                  style={{ animationDelay: `${(index + 3) * 100}ms`, animationFillMode: 'forwards' }}
                  onMouseEnter={() => setHoveredTier(index)}
                  onMouseLeave={() => setHoveredTier(null)}
                >
                  {/* Background Gradient on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${tier.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  {/* Popular Badge */}
                  {tier.popular && (
                    <div className="absolute top-0 right-0 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-bl-xl rounded-tr-xl flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Popular
                    </div>
                  )}

                  <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
                        <Server className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                          Tier {tier.tier} Validator
                          {tier.tier >= 5 && <span className="text-xs px-2 py-0.5 bg-yellow-500/10 text-yellow-500 rounded-full">Elite</span>}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Minimum Investment: <span className="text-foreground font-medium">{tier.minInvestment.toLocaleString()} CLT</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 sm:gap-6">
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Annual Returns</p>
                        <p className="text-2xl font-display font-bold text-primary flex items-center gap-1">
                          <TrendingUp className="w-5 h-5" />
                          {tier.apy}
                        </p>
                      </div>
                      <Button className="btn-primary h-11 px-6 gap-2 group/btn relative overflow-hidden">
                        <span className="relative z-10">Purchase</span>
                        <ArrowRight className="w-4 h-4 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="glass-card p-6 group hover:border-primary/30 transition-colors">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-primary/10">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-foreground mb-2">Secure Staking</h3>
                <p className="text-sm text-muted-foreground">Your validators are protected by enterprise-grade security. All transactions are encrypted and verified on-chain.</p>
              </div>
            </div>
          </div>
          <div className="glass-card p-6 group hover:border-primary/30 transition-colors">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-primary/10">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-foreground mb-2">Instant Rewards</h3>
                <p className="text-sm text-muted-foreground">Earn rewards automatically every cycle. Higher tier validators unlock better APY rates and exclusive bonuses.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Validators;