import MainLayout from "@/components/layout/MainLayout";
import { ArrowUpRight, ArrowDownLeft, Clock } from "lucide-react";

const History = () => {
  const transactions = [
    { date: "2024-02-20", type: "Stake", amount: "1000 CLT", status: "Completed" },
    { date: "2024-02-19", type: "Reward", amount: "50 CLT", status: "Completed" },
    { date: "2024-02-18", type: "Unstake", amount: "500 CLT", status: "Pending" },
  ];

  const getStatusStyles = (status: string) => {
    if (status === "Completed") return "bg-primary/10 text-primary";
    return "bg-yellow-500/10 text-yellow-500";
  };

  const getTypeIcon = (type: string) => {
    if (type === "Stake" || type === "Reward") return <ArrowDownLeft className="w-4 h-4 text-primary" />;
    return <ArrowUpRight className="w-4 h-4 text-orange-500" />;
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Transaction History</h1>
          <p className="text-muted-foreground mt-1">View all your past transactions</p>
        </div>
        
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
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
                    className="border-b border-border/30 hover:bg-secondary/30 transition-colors animate-fade-up opacity-0"
                    style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-foreground">{tx.date}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(tx.type)}
                        <span className="text-foreground font-medium">{tx.type}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-semibold text-foreground">{tx.amount}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusStyles(tx.status)}`}>
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {transactions.length === 0 && (
            <div className="text-center py-12">
              <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No transactions yet</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default History;