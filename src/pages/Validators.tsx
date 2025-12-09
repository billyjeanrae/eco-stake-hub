import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Server, Clock, DollarSign, ArrowRight } from "lucide-react";

const Validators = () => {
  const validatorTiers = [
    { tier: 1, minInvestment: 50, apy: "252%" },
    { tier: 2, minInvestment: 1000, apy: "288%" },
    { tier: 3, minInvestment: 5000, apy: "324%" },
    { tier: 4, minInvestment: 10000, apy: "360%" },
    { tier: 5, minInvestment: 25000, apy: "396%" },
    { tier: 6, minInvestment: 100000, apy: "432%" },
  ];

  const stats = [
    { label: "Your Validators", value: "0", icon: Server },
    { label: "Total Staked", value: "0 CLT", icon: DollarSign },
    { label: "Next Cycle", value: "16h 12m 10s", icon: Clock },
  ];

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Validators</h1>
          <p className="text-muted-foreground mt-1">Stake validators and earn high APY rewards</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={stat.label} 
                className="glass-card p-6 animate-fade-up opacity-0"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
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

        {/* Validator Tiers */}
        <div className="glass-card p-6">
          <h2 className="text-xl font-display font-bold text-foreground mb-6">Purchase Validator</h2>
          <div className="space-y-3">
            {validatorTiers.map((tier, index) => (
              <div
                key={tier.tier}
                className="p-5 rounded-xl bg-secondary/30 border border-border/50 hover:border-primary/30 transition-all duration-300 animate-fade-up opacity-0"
                style={{ animationDelay: `${(index + 3) * 100}ms`, animationFillMode: 'forwards' }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-primary/10">
                      <Server className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-foreground">Tier {tier.tier} Validator</h3>
                      <p className="text-sm text-muted-foreground">
                        Minimum Investment: {tier.minInvestment.toLocaleString()} CLT
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 sm:gap-6">
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">APY</p>
                      <p className="text-xl font-display font-bold text-primary">{tier.apy}</p>
                    </div>
                    <Button className="btn-primary h-10 px-6 gap-2">
                      Purchase
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Validators;