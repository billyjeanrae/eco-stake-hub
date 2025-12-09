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
import { ArrowDownUp, Wallet, Server, Users } from "lucide-react";

const Swap = () => {
  const balances = [
    { label: "Active Wallet Balance", value: "0 CLT", icon: Wallet },
    { label: "Validator Balance", value: "0 CLT", icon: Server },
    { label: "Affiliate Balance", value: "0 CLT", icon: Users },
  ];

  return (
    <MainLayout>
      <div className="max-w-xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="text-center">
          <h1 className="text-2xl font-display font-bold text-foreground">Token Swap</h1>
          <p className="text-muted-foreground mt-1">Exchange tokens instantly</p>
        </div>

        {/* Balance Cards */}
        <div className="space-y-3">
          {balances.map((balance, index) => {
            const Icon = balance.icon;
            return (
              <div 
                key={balance.label} 
                className="glass-card p-4 animate-fade-up opacity-0"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-muted-foreground">{balance.label}</p>
                  </div>
                  <p className="font-display font-bold text-foreground">{balance.value}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Swap Card */}
        <div 
          className="glass-card p-6 animate-fade-up opacity-0"
          style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}
        >
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">
                How many tokens do you want to get?
              </label>
              <Input
                type="number"
                placeholder="0"
                className="bg-secondary/50 border-border/50 h-12 text-lg font-medium"
              />
            </div>

            <div className="flex justify-center">
              <div className="p-3 rounded-full bg-primary/10">
                <ArrowDownUp className="w-5 h-5 text-primary" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">You pay</label>
              <div className="flex gap-3">
                <Input
                  type="number"
                  placeholder="0"
                  className="bg-secondary/50 border-border/50 h-12 text-lg font-medium"
                />
                <Select>
                  <SelectTrigger className="w-32 bg-secondary/50 border-border/50 h-12">
                    <SelectValue placeholder="Token" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border/50">
                    <SelectItem value="clt">CLT</SelectItem>
                    <SelectItem value="usdt">USDT</SelectItem>
                    <SelectItem value="eth">ETH</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button className="w-full btn-primary h-12 text-base">
              Swap Now
            </Button>
          </div>
        </div>

        {/* Last Deposits */}
        <div 
          className="glass-card p-6 animate-fade-up opacity-0"
          style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}
        >
          <h3 className="font-display font-semibold text-foreground mb-4">Last Deposits</h3>
          <div className="text-center py-8">
            <p className="text-muted-foreground">No data at the moment</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Swap;