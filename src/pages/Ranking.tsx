import MainLayout from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";

const Ranking = () => {
  const rankings = [
    {
      rank: 1,
      name: "Alice Johnson",
      staked: "100,000 T369",
      rewards: "5,000 T369",
      level: "Diamond",
    },
    {
      rank: 2,
      name: "Bob Smith",
      staked: "75,000 T369",
      rewards: "3,750 T369",
      level: "Platinum",
    },
    {
      rank: 3,
      name: "Carol Williams",
      staked: "50,000 T369",
      rewards: "2,500 T369",
      level: "Gold",
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        <h1 className="text-2xl font-bold">Global Rankings</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {rankings.slice(0, 3).map((user, index) => (
            <Card key={index} className="p-6 glass-card relative overflow-hidden">
              <div
                className={`absolute top-0 right-0 w-16 h-16 ${
                  index === 0
                    ? "bg-yellow-500"
                    : index === 1
                    ? "bg-gray-400"
                    : "bg-orange-700"
                } transform rotate-45 translate-x-8 -translate-y-8`}
              />
              <div className="relative">
                <h3 className="text-xl font-bold mb-2">{user.name}</h3>
                <p className="text-gray-400">Rank #{user.rank}</p>
                <div className="mt-4 space-y-2">
                  <p className="text-sm">
                    <span className="text-gray-400">Staked:</span>{" "}
                    {user.staked}
                  </p>
                  <p className="text-sm">
                    <span className="text-gray-400">Rewards:</span>{" "}
                    {user.rewards}
                  </p>
                  <p className="text-sm">
                    <span className="text-gray-400">Level:</span>{" "}
                    <span
                      className={`${
                        index === 0
                          ? "text-yellow-500"
                          : index === 1
                          ? "text-gray-400"
                          : "text-orange-700"
                      }`}
                    >
                      {user.level}
                    </span>
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-6 glass-card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4">Rank</th>
                  <th className="text-left py-3 px-4">Name</th>
                  <th className="text-left py-3 px-4">Staked Amount</th>
                  <th className="text-left py-3 px-4">Rewards</th>
                  <th className="text-left py-3 px-4">Level</th>
                </tr>
              </thead>
              <tbody>
                {rankings.map((user, index) => (
                  <tr
                    key={index}
                    className="border-b border-white/10 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-3 px-4">#{user.rank}</td>
                    <td className="py-3 px-4">{user.name}</td>
                    <td className="py-3 px-4">{user.staked}</td>
                    <td className="py-3 px-4">{user.rewards}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs ${
                          user.level === "Diamond"
                            ? "bg-yellow-500/20 text-yellow-500"
                            : user.level === "Platinum"
                            ? "bg-gray-400/20 text-gray-400"
                            : "bg-orange-700/20 text-orange-700"
                        }`}
                      >
                        {user.level}
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

export default Ranking;