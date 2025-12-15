import MainLayout from "@/components/layout/MainLayout";
import { ArrowRight, ArrowUpRight, TrendingUp, Coins, Clock, Lock, Zap, Target, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";

const Dashboard = () => {
  const [hoveredPool, setHoveredPool] = useState<number | null>(null);

  const stats = [
    { label: "Total Staked", value: "510 CLT", icon: Coins, change: "+12.5%", color: "from-green-500/20 to-green-600/5" },
    { label: "Your Rewards", value: "0.00 CLT", icon: TrendingUp, change: "+0%", color: "from-blue-500/20 to-blue-600/5" },
    { label: "APY", value: "12.5%", icon: Zap, change: null, color: "from-yellow-500/20 to-yellow-600/5" },
    { label: "Lock Period", value: "30 days", icon: Lock, change: null, color: "from-purple-500/20 to-purple-600/5" },
  ];

  const pools = [
    { name: "Pool 1", amount: "510", qualified: "0/25", requirement: "250,000", progress: 0.2 },
    { name: "Pool 2", amount: "510", qualified: "0/10", requirement: "500,000", progress: 0.1 },
    { name: "Pool 3", amount: "510", qualified: "0/5", requirement: "750,000", progress: 0.07 },
    { name: "Pool 4", amount: "510", qualified: "0/5", requirement: "1,000,000", progress: 0.05 },
    { name: "Pool 5", amount: "510", qualified: "0/5", requirement: "1,250,000", progress: 0.04 },
    { name: "Pool 6", amount: "510", qualified: "0/5", requirement: "1,500,000", progress: 0.03 },
    { name: "Pool 7", amount: "510", qualified: "0/5", requirement: "1,750,000", progress: 0.03 },
    { name: "Pool 8", amount: "510", qualified: "0/5", requirement: "2,000,000", progress: 0.02 },
    { name: "Pool 9", amount: "510", qualified: "0/5", requirement: "2,250,000", progress: 0.02 },
    { name: "Pool 10", amount: "510", qualified: "0/5", requirement: "2,500,000", progress: 0.02 },
  ];

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground flex items-center gap-3">
              Dashboard
              <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">Live</span>
            </h1>
            <p className="text-muted-foreground mt-1">Overview of your staking portfolio</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary/50 border border-border/50">
              <Activity className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-sm text-muted-foreground">Network Active</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={stat.label} 
                className={`glass-card p-6 animate-fade-up opacity-0 group relative overflow-hidden`}
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Animated Border */}
                <div className="absolute inset-0 rounded-2xl border border-primary/0 group-hover:border-primary/20 transition-colors duration-500" />
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between">
                    <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    {stat.change && (
                      <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        {stat.change}
                      </span>
                    )}
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-display font-bold text-foreground mt-1 group-hover:text-primary transition-colors">{stat.value}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pools Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-display font-bold text-foreground flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Staking Pools
            </h2>
            <span className="text-sm text-muted-foreground">{pools.length} pools available</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {pools.map((pool, index) => (
              <div 
                key={pool.name} 
                className="glass-card p-6 animate-fade-up opacity-0 group cursor-pointer relative overflow-hidden"
                style={{ animationDelay: `${(index + 4) * 50}ms`, animationFillMode: 'forwards' }}
                onMouseEnter={() => setHoveredPool(index)}
                onMouseLeave={() => setHoveredPool(null)}
              >
                {/* Hover Glow */}
                <div className={`absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent transition-opacity duration-300 ${hoveredPool === index ? 'opacity-100' : 'opacity-0'}`} />
                
                {/* Progress Bar Background */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-secondary/50">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-primary/50 transition-all duration-500"
                    style={{ width: `${pool.progress * 100}%` }}
                  />
                </div>

                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-display font-bold text-foreground group-hover:text-primary transition-colors">{pool.name}</h3>
                    <ArrowUpRight className={`w-5 h-5 text-primary transition-transform duration-300 ${hoveredPool === index ? 'translate-x-1 -translate-y-1' : ''}`} />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Current</p>
                      <p className="text-sm font-semibold text-foreground">{pool.amount} CLT</p>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Qualified</p>
                      <p className="text-sm font-semibold text-foreground">{pool.qualified}</p>
                    </div>
                    
                    <div className="flex justify-between items-center pt-2 border-t border-border/50">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Target</p>
                      <p className="text-sm font-bold text-primary">{pool.requirement} CLT</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="glass-card p-8 relative overflow-hidden group">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 animate-gradient-x" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] group-hover:bg-primary/20 transition-colors duration-500" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px]" />
          
          {/* Content */}
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-display font-bold text-foreground mb-2 flex items-center gap-2">
                <Zap className="w-6 h-6 text-primary" />
                Ready to start staking?
              </h2>
              <p className="text-muted-foreground max-w-md">Join our staking pools and earn CLT rewards. Higher tiers unlock better APY rates.</p>
            </div>
            <Link to="/validators">
              <Button className="btn-primary gap-2 group/btn relative overflow-hidden px-8 h-12">
                <span className="relative z-10">Start Now</span>
                <ArrowRight className="w-4 h-4 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;