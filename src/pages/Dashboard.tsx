import MainLayout from "@/components/layout/MainLayout";
import { ArrowRight, ArrowUpRight, TrendingUp, Coins, Clock, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const stats = [
    { label: "Total Staked", value: "510 CLT", icon: Coins, change: "+12.5%" },
    { label: "Your Rewards", value: "0.00 CLT", icon: TrendingUp, change: "+0%" },
    { label: "APY", value: "12.5%", icon: TrendingUp, change: null },
    { label: "Lock Period", value: "30 days", icon: Lock, change: null },
  ];

  const pools = [
    { name: "Pool 1", amount: "510", qualified: "0/25", requirement: "250,000" },
    { name: "Pool 2", amount: "510", qualified: "0/10", requirement: "500,000" },
    { name: "Pool 3", amount: "510", qualified: "0/5", requirement: "750,000" },
    { name: "Pool 4", amount: "510", qualified: "0/5", requirement: "1,000,000" },
    { name: "Pool 5", amount: "510", qualified: "0/5", requirement: "1,250,000" },
    { name: "Pool 6", amount: "510", qualified: "0/5", requirement: "1,500,000" },
    { name: "Pool 7", amount: "510", qualified: "0/5", requirement: "1,750,000" },
    { name: "Pool 8", amount: "510", qualified: "0/5", requirement: "2,000,000" },
    { name: "Pool 9", amount: "510", qualified: "0/5", requirement: "2,250,000" },
    { name: "Pool 10", amount: "510", qualified: "0/5", requirement: "2,500,000" },
  ];

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Overview of your staking portfolio</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={stat.label} 
                className="glass-card p-6 animate-fade-up opacity-0"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
              >
                <div className="flex items-start justify-between">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  {stat.change && (
                    <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                      {stat.change}
                    </span>
                  )}
                </div>
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-display font-bold text-foreground mt-1">{stat.value}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pools Grid */}
        <div>
          <h2 className="text-xl font-display font-bold text-foreground mb-4">Staking Pools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {pools.map((pool, index) => (
              <div 
                key={pool.name} 
                className="glass-card-hover p-6 animate-fade-up opacity-0"
                style={{ animationDelay: `${(index + 4) * 50}ms`, animationFillMode: 'forwards' }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-display font-bold text-foreground">{pool.name}</h3>
                  <ArrowUpRight className="w-5 h-5 text-primary" />
                </div>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Current Amount</p>
                    <p className="text-lg font-semibold text-foreground">{pool.amount} CLT</p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Qualified</p>
                    <p className="text-lg font-semibold text-foreground">{pool.qualified}</p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Requirement</p>
                    <p className="text-lg font-semibold text-primary">{pool.requirement} CLT</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="glass-card p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px]" />
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-display font-bold text-foreground mb-1">Ready to start staking?</h2>
              <p className="text-muted-foreground">Join our staking pools and earn CLT rewards</p>
            </div>
            <Link to="/validators">
              <Button className="btn-primary gap-2">
                Start Now
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;