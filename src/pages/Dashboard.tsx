import { Card } from "@/components/ui/card";
import MainLayout from "@/components/layout/MainLayout";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const Index = () => {
  const stats = [
    { label: "Total Staked", value: "510 T369" },
    { label: "Your Rewards", value: "0.00 T369" },
    { label: "APY", value: "12.5%" },
    { label: "Lock Period", value: "30 days" },
  ];

  const pools = [
    { name: "Pool 3", amount: "510", qualified: "0/25", requirement: "250,000" },
    { name: "Pool 6", amount: "510", qualified: "0/10", requirement: "500,000" },
    { name: "Pool 9", amount: "510", qualified: "0/5", requirement: "500,000" },
  ];

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="p-6 glass-card">
              <p className="text-sm text-gray-400">{stat.label}</p>
              <p className="text-2xl font-bold mt-2">{stat.value}</p>
            </Card>
          ))}
        </div>

        {/* Pools */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pools.map((pool) => (
            <div key={pool.name} className="gradient-border">
              <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold">{pool.name}</h3>
                  <ArrowUpRight className="w-5 h-5 text-primary" />
                </div>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-400">Current Amount T369</p>
                    <p className="text-xl font-bold">{pool.amount}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-400">Qualified People</p>
                    <p className="text-xl font-bold">{pool.qualified}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-400">New RV Requirement T369</p>
                    <p className="text-xl font-bold">{pool.requirement}</p>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Card className="p-8 glass-card">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Ready to start staking?</h2>
              <p className="text-gray-400">Join our staking pools and earn rewards</p>
            </div>
            <button className="flex items-center space-x-2 bg-primary px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors">
              <span>Start Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Index;