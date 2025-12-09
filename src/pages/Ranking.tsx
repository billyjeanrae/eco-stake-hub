import MainLayout from "@/components/layout/MainLayout";
import { Trophy, Medal, Crown } from "lucide-react";

const Ranking = () => {
  const rankings = [
    { rank: 1, name: "Alice Johnson", staked: "100,000 CLT", rewards: "5,000 CLT", level: "Diamond" },
    { rank: 2, name: "Bob Smith", staked: "75,000 CLT", rewards: "3,750 CLT", level: "Platinum" },
    { rank: 3, name: "Carol Williams", staked: "50,000 CLT", rewards: "2,500 CLT", level: "Gold" },
  ];

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-6 h-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />;
    return <Medal className="w-6 h-6 text-orange-600" />;
  };

  const getRankBg = (rank: number) => {
    if (rank === 1) return "from-yellow-500/20 to-yellow-600/5 border-yellow-500/30";
    if (rank === 2) return "from-gray-400/20 to-gray-500/5 border-gray-400/30";
    return "from-orange-600/20 to-orange-700/5 border-orange-600/30";
  };

  const getLevelStyles = (level: string) => {
    if (level === "Diamond") return "bg-yellow-500/10 text-yellow-500";
    if (level === "Platinum") return "bg-gray-400/10 text-gray-400";
    return "bg-orange-600/10 text-orange-600";
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Global Rankings</h1>
          <p className="text-muted-foreground mt-1">Top stakers in the CelerFi ecosystem</p>
        </div>

        {/* Top 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {rankings.slice(0, 3).map((user, index) => (
            <div 
              key={index} 
              className={`glass-card p-6 relative overflow-hidden bg-gradient-to-br ${getRankBg(user.rank)} animate-fade-up opacity-0`}
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
            >
              <div className="absolute top-4 right-4">
                {getRankIcon(user.rank)}
              </div>
              <div className="relative">
                <p className="text-sm text-muted-foreground mb-1">Rank #{user.rank}</p>
                <h3 className="text-xl font-display font-bold text-foreground mb-4">{user.name}</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Staked</span>
                    <span className="text-sm font-medium text-foreground">{user.staked}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Rewards</span>
                    <span className="text-sm font-medium text-primary">{user.rewards}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-sm text-muted-foreground">Level</span>
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getLevelStyles(user.level)}`}>
                      {user.level}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Full Rankings Table */}
        <div className="glass-card overflow-hidden">
          <div className="p-6 border-b border-border/50 flex items-center gap-3">
            <Trophy className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-display font-bold text-foreground">Leaderboard</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Rank</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Name</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Staked</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Rewards</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Level</th>
                </tr>
              </thead>
              <tbody>
                {rankings.map((user, index) => (
                  <tr
                    key={index}
                    className="border-b border-border/30 hover:bg-secondary/30 transition-colors animate-fade-up opacity-0"
                    style={{ animationDelay: `${(index + 3) * 100}ms`, animationFillMode: 'forwards' }}
                  >
                    <td className="py-4 px-6 font-medium text-foreground">#{user.rank}</td>
                    <td className="py-4 px-6 font-medium text-foreground">{user.name}</td>
                    <td className="py-4 px-6 text-foreground">{user.staked}</td>
                    <td className="py-4 px-6 text-primary font-medium">{user.rewards}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getLevelStyles(user.level)}`}>
                        {user.level}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Ranking;