import MainLayout from "@/components/layout/MainLayout";
import { ArrowUpRight, ArrowDownLeft, Clock, Filter, Search, Activity } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const History = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const transactions = [
    { date: "2024-02-20", type: "Stake", amount: "1000 CLT", status: "Completed" },
    { date: "2024-02-19", type: "Reward", amount: "50 CLT", status: "Completed" },
    { date: "2024-02-18", type: "Unstake", amount: "500 CLT", status: "Pending" },
  ];

  const getStatusStyles = (status: string) => {
    if (status === "Completed") return "bg-green-500/10 text-green-500 border border-green-500/20";
    return "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20";
  };

  const getTypeIcon = (type: string) => {
    if (type === "Stake" || type === "Reward") {
      return (
        <div className="p-2 rounded-lg bg-green-500/10">
          <ArrowDownLeft className="w-4 h-4 text-green-500" />
        </div>
      );
    }
    return (
      <div className="p-2 rounded-lg bg-orange-500/10">
        <ArrowUpRight className="w-4 h-4 text-orange-500" />
      </div>
    );
  };

  const stats = [
    { label: "Total Transactions", value: transactions.length.toString() },
    { label: "Completed", value: transactions.filter(t => t.status === "Completed").length.toString() },
    { label: "Pending", value: transactions.filter(t => t.status === "Pending").length.toString() },
  ];

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground flex items-center gap-3">
              Transaction History
              <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full flex items-center gap-1">
                <Activity className="w-3 h-3" />
                {transactions.length} records
              </span>
            </h1>
            <p className="text-muted-foreground mt-1">View all your past transactions</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <div 
              key={stat.label}
              className="glass-card p-4 animate-fade-up opacity-0 text-center"
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
            >
              <p className="text-2xl font-display font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-secondary/50 border-border/50 h-11"
            />
          </div>
          <Button variant="outline" className="h-11 gap-2 border-border/50 hover:bg-secondary/50">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
        </div>
        
        <div className="glass-card overflow-hidden relative">
          <div className="absolute inset-0 cyber-grid opacity-5" />
          
          <div className="overflow-x-auto relative z-10">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50 bg-secondary/30">
                  <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Date</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Type</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Amount</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx, index) => (
                  <tr
                    key={index}
                    className={`border-b border-border/30 transition-all duration-300 animate-fade-up opacity-0 ${hoveredRow === index ? 'bg-primary/5' : 'hover:bg-secondary/30'}`}
                    style={{ animationDelay: `${(index + 3) * 100}ms`, animationFillMode: 'forwards' }}
                    onMouseEnter={() => setHoveredRow(index)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-secondary/50">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <span className="text-foreground font-medium">{tx.date}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        {getTypeIcon(tx.type)}
                        <span className="text-foreground font-medium">{tx.type}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`font-display font-bold ${tx.type === "Unstake" ? "text-orange-500" : "text-primary"}`}>
                        {tx.type === "Unstake" ? "-" : "+"}{tx.amount}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex px-3 py-1.5 rounded-full text-xs font-medium ${getStatusStyles(tx.status)}`}>
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {transactions.length === 0 && (
            <div className="text-center py-16 relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-display font-semibold text-foreground mb-2">No transactions yet</h3>
              <p className="text-muted-foreground">Your transaction history will appear here</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default History;