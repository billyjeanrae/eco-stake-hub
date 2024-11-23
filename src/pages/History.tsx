import MainLayout from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";

const History = () => {
  const transactions = [
    {
      date: "2024-02-20",
      type: "Stake",
      amount: "1000 T369",
      status: "Completed",
    },
    {
      date: "2024-02-19",
      type: "Reward",
      amount: "50 T369",
      status: "Completed",
    },
    {
      date: "2024-02-18",
      type: "Unstake",
      amount: "500 T369",
      status: "Pending",
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        <h1 className="text-2xl font-bold">Transaction History</h1>
        
        <Card className="p-6 glass-card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4">Date</th>
                  <th className="text-left py-3 px-4">Type</th>
                  <th className="text-left py-3 px-4">Amount</th>
                  <th className="text-left py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx, index) => (
                  <tr
                    key={index}
                    className="border-b border-white/10 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-3 px-4">{tx.date}</td>
                    <td className="py-3 px-4">{tx.type}</td>
                    <td className="py-3 px-4">{tx.amount}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs ${
                          tx.status === "Completed"
                            ? "bg-green-500/20 text-green-500"
                            : "bg-yellow-500/20 text-yellow-500"
                        }`}
                      >
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default History;