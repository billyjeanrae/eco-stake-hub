import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import MainLayout from "@/components/layout/MainLayout";
import { Server, Clock, DollarSign } from "lucide-react";

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
    { label: "Total Staked", value: "0 T369", icon: DollarSign },
    { label: "Next Earning Cycle", value: "16h 12m 10s", icon: Clock },
  ];

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="p-6 glass-card">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-platform-green/10">
                  <stat.icon className="w-6 h-6 text-platform-green" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-6 glass-card">
          <h2 className="text-xl font-bold mb-6">Purchase Validator</h2>
          <div className="space-y-4">
            {validatorTiers.map((tier) => (
              <div
                key={tier.tier}
                className="p-4 rounded-lg bg-platform-card border border-white/5 hover:border-platform-green/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 rounded-lg bg-platform-green/10">
                      <Server className="w-5 h-5 text-platform-green" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Tier {tier.tier} Validator</h3>
                      <p className="text-sm text-gray-400">
                        Minimum Investment: {tier.minInvestment} T369
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-platform-green font-bold">APY: {tier.apy}</p>
                    <Button variant="outline" className="mt-2 border-platform-green text-platform-green hover:bg-platform-green hover:text-black">
                      Purchase
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Validators;