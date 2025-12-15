import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MainLayout from "@/components/layout/MainLayout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowDownUp, Wallet, Server, Users, Zap, RefreshCw, TrendingUp } from "lucide-react";
import { useState } from "react";

const Swap = () => {
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [isSwapping, setIsSwapping] = useState(false);

  const balances = [
    { label: "Active Wallet Balance", value: "0 CLT", icon: Wallet, color: "from-green-500/20 to-green-600/5" },
    { label: "Validator Balance", value: "0 CLT", icon: Server, color: "from-blue-500/20 to-blue-600/5" },
    { label: "Affiliate Balance", value: "0 CLT", icon: Users, color: "from-purple-500/20 to-purple-600/5" },
  ];

  const handleSwap = () => {
    setIsSwapping(true);
    setTimeout(() => setIsSwapping(false), 2000);
  };

  return (
    <MainLayout>
      <div className="max-w-xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="text-center">
          <h1 className="text-3xl font-display font-bold text-foreground flex items-center justify-center gap-3">
            Token Swap
            <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full flex items-center gap-1">
              <Zap className="w-3 h-3" />
              Instant
            </span>
          </h1>
          <p className="text-muted-foreground mt-2">Exchange tokens instantly with zero fees</p>
        </div>

        {/* Balance Cards */}
        <div className="space-y-3">
          {balances.map((balance, index) => {
            const Icon = balance.icon;
            return (
              <div 
                key={balance.label} 
                className={`glass-card p-4 animate-fade-up opacity-0 group relative overflow-hidden`}
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${balance.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-muted-foreground">{balance.label}</p>
                  </div>
                  <p className="font-display font-bold text-foreground group-hover:text-primary transition-colors">{balance.value}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Swap Card */}
        <div 
          className="glass-card p-6 relative overflow-hidden group animate-fade-up opacity-0"
          style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}
        >
          {/* Background Animation */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute inset-0 cyber-grid opacity-5" />
          
          <div className="relative z-10 space-y-6">
            {/* You Receive */}
            <div className="space-y-3">
              <label className="text-sm text-muted-foreground flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                You Receive
              </label>
              <div className="relative">
                <Input
                  type="number"
                  placeholder="0.00"
                  value={toAmount}
                  onChange={(e) => setToAmount(e.target.value)}
                  className="bg-secondary/50 border-border/50 h-14 text-2xl font-display font-bold pr-20 focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-primary/10 text-primary font-bold text-sm">
                  CLT
                </div>
              </div>
            </div>

            {/* Swap Icon */}
            <div className="flex justify-center">
              <button 
                className="p-4 rounded-2xl bg-primary/10 hover:bg-primary/20 transition-all duration-300 group/icon hover:scale-110 active:scale-95"
                onClick={() => {
                  const temp = fromAmount;
                  setFromAmount(toAmount);
                  setToAmount(temp);
                }}
              >
                <ArrowDownUp className="w-6 h-6 text-primary group-hover/icon:rotate-180 transition-transform duration-500" />
              </button>
            </div>

            {/* You Pay */}
            <div className="space-y-3">
              <label className="text-sm text-muted-foreground">You Pay</label>
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={fromAmount}
                    onChange={(e) => setFromAmount(e.target.value)}
                    className="bg-secondary/50 border-border/50 h-14 text-2xl font-display font-bold focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <Select defaultValue="usdt">
                  <SelectTrigger className="w-32 bg-secondary/50 border-border/50 h-14 font-bold">
                    <SelectValue placeholder="Token" />
                  </SelectTrigger>
                  <SelectContent className="bg-card/95 backdrop-blur-xl border-border/50">
                    <SelectItem value="clt" className="font-medium">CLT</SelectItem>
                    <SelectItem value="usdt" className="font-medium">USDT</SelectItem>
                    <SelectItem value="eth" className="font-medium">ETH</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Rate Info */}
            <div className="p-4 rounded-xl bg-secondary/30 border border-border/50 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Exchange Rate</span>
              <span className="text-sm font-medium text-foreground flex items-center gap-2">
                1 USDT = 1 CLT
                <RefreshCw className="w-4 h-4 text-primary cursor-pointer hover:rotate-180 transition-transform duration-500" />
              </span>
            </div>

            <Button 
              className="w-full btn-primary h-14 text-lg font-bold group/btn relative overflow-hidden"
              onClick={handleSwap}
              disabled={isSwapping}
            >
              <span className="relative z-10 flex items-center gap-2">
                {isSwapping ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Swapping...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    Swap Now
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
            </Button>
          </div>
        </div>

        {/* Last Deposits */}
        <div 
          className="glass-card p-6 animate-fade-up opacity-0 relative overflow-hidden"
          style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}
        >
          <div className="absolute inset-0 cyber-grid opacity-5" />
          <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2 relative z-10">
            <RefreshCw className="w-4 h-4 text-primary" />
            Recent Swaps
          </h3>
          <div className="text-center py-8 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-secondary/50 flex items-center justify-center mx-auto mb-4">
              <ArrowDownUp className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">No swaps yet</p>
            <p className="text-sm text-muted-foreground/70">Your swap history will appear here</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Swap;