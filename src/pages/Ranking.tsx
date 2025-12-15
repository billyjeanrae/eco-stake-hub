import MainLayout from "@/components/layout/MainLayout";
import { Trophy, Medal, Crown, Star, TrendingUp, Sparkles } from "lucide-react";
import { useState } from "react";

const Ranking = () => {
  const [hoveredRank, setHoveredRank] = useState<number | null>(null);

  const rankings = [
    { rank: 1, name: "Alice Johnson", staked: "100,000 CLT", rewards: "5,000 CLT", level: "Diamond", avatar: "A" },
    { rank: 2, name: "Bob Smith", staked: "75,000 CLT", rewards: "3,750 CLT", level: "Platinum", avatar: "B" },
    { rank: 3, name: "Carol Williams", staked: "50,000 CLT", rewards: "2,500 CLT", level: "Gold", avatar: "C" },
    { rank: 4, name: "David Brown", staked: "35,000 CLT", rewards: "1,750 CLT", level: "Silver", avatar: "D" },
    { rank: 5, name: "Eva Martinez", staked: "25,000 CLT", rewards: "1,250 CLT", level: "Bronze", avatar: "E" },
  ];

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-8 h-8 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-8 h-8 text-gray-400" />;
    if (rank === 3) return <Medal className="w-8 h-8 text-orange-600" />;
    return <Star className="w-6 h-6 text-muted-foreground" />;
  };

  const getRankBg = (rank: number) => {
    if (rank === 1) return "from-yellow-500/30 via-yellow-500/10 to-transparent border-yellow-500/30";
    if (rank === 2) return "from-gray-400/30 via-gray-400/10 to-transparent border-gray-400/30";
    if (rank === 3) return "from-orange-600/30 via-orange-600/10 to-transparent border-orange-600/30";
    return "from-primary/10 to-transparent border-border/50";
  };

  const getLevelStyles = (level: string) => {
    switch (level) {
      case "Diamond": return "bg-gradient-to-r from-yellow-500/20 to-yellow-600/10 text-yellow-500 border-yellow-500/30";
      case "Platinum": return "bg-gradient-to-r from-gray-400/20 to-gray-500/10 text-gray-400 border-gray-400/30";
      case "Gold": return "bg-gradient-to-r from-orange-500/20 to-orange-600/10 text-orange-500 border-orange-500/30";
      case "Silver": return "bg-gradient-to-r from-slate-400/20 to-slate-500/10 text-slate-400 border-slate-400/30";
      default: return "bg-gradient-to-r from-amber-600/20 to-amber-700/10 text-amber-600 border-amber-600/30";
    }
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground flex items-center gap-3">
            Global Rankings
            <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              Live
            </span>
          </h1>
          <p className="text-muted-foreground mt-1">Top stakers in the CelerFi ecosystem</p>
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {rankings.slice(0, 3).map((user, index) => (
            <div 
              key={index} 
              className={`glass-card p-6 relative overflow-hidden bg-gradient-to-br ${getRankBg(user.rank)} animate-fade-up opacity-0 group cursor-pointer transition-all duration-500 ${hoveredRank === index ? 'scale-[1.02]' : ''}`}
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
              onMouseEnter={() => setHoveredRank(index)}
              onMouseLeave={() => setHoveredRank(null)}
            >
              {/* Sparkle Effect */}
              {user.rank === 1 && (
                <div className="absolute top-4 left-4">
                  <Sparkles className="w-5 h-5 text-yellow-500 animate-pulse" />
                </div>
              )}
              
              <div className="absolute top-4 right-4 transform group-hover:scale-110 transition-transform">
                {getRankIcon(user.rank)}
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${user.rank === 1 ? 'from-yellow-500 to-yellow-600' : user.rank === 2 ? 'from-gray-400 to-gray-500' : 'from-orange-500 to-orange-600'} flex items-center justify-center text-white font-display font-bold text-2xl shadow-lg`}>
                    {user.avatar}
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Rank #{user.rank}</p>
                    <h3 className="text-xl font-display font-bold text-foreground group-hover:text-primary transition-colors">{user.name}</h3>
                  </div>
                </div>
                
                <div className="space-y-3 mt-6">
                  <div className="flex justify-between items-center p-3 rounded-lg bg-background/50">
                    <span className="text-sm text-muted-foreground">Staked</span>
                    <span className="font-display font-bold text-foreground">{user.staked}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-background/50">
                    <span className="text-sm text-muted-foreground">Rewards</span>
                    <span className="font-display font-bold text-primary">{user.rewards}</span>
                  </div>
                  <div className="flex justify-between items-center pt-3">
                    <span className="text-sm text-muted-foreground">Level</span>
                    <span className={`inline-flex px-3 py-1.5 rounded-full text-xs font-bold border ${getLevelStyles(user.level)}`}>
                      {user.level}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Full Rankings Table */}
        <div className="glass-card overflow-hidden relative">
          <div className="absolute inset-0 cyber-grid opacity-5" />
          
          <div className="p-6 border-b border-border/50 flex items-center gap-3 relative z-10">
            <div className="p-2 rounded-lg bg-primary/10">
              <Trophy className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl font-display font-bold text-foreground">Leaderboard</h2>
          </div>
          
          <div className="overflow-x-auto relative z-10">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50 bg-secondary/30">
                  <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Rank</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Staker</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Staked</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Rewards</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Level</th>
                </tr>
              </thead>
              <tbody>
                {rankings.map((user, index) => (
                  <tr
                    key={index}
                    className={`border-b border-border/30 transition-all duration-300 animate-fade-up opacity-0 ${hoveredRank === index + 10 ? 'bg-primary/5' : 'hover:bg-secondary/30'}`}
                    style={{ animationDelay: `${(index + 3) * 100}ms`, animationFillMode: 'forwards' }}
                    onMouseEnter={() => setHoveredRank(index + 10)}
                    onMouseLeave={() => setHoveredRank(null)}
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        {user.rank <= 3 ? getRankIcon(user.rank) : (
                          <span className="w-8 h-8 rounded-lg bg-secondary/50 flex items-center justify-center font-display font-bold text-muted-foreground">
                            {user.rank}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg ${user.rank === 1 ? 'bg-gradient-to-br from-yellow-500 to-yellow-600' : user.rank === 2 ? 'bg-gradient-to-br from-gray-400 to-gray-500' : user.rank === 3 ? 'bg-gradient-to-br from-orange-500 to-orange-600' : 'bg-gradient-to-br from-primary to-primary/50'} flex items-center justify-center text-white font-display font-bold`}>
                          {user.avatar}
                        </div>
                        <span className="font-medium text-foreground">{user.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-display font-bold text-foreground">{user.staked}</td>
                    <td className="py-4 px-6 font-display font-bold text-primary">{user.rewards}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex px-3 py-1.5 rounded-full text-xs font-bold border ${getLevelStyles(user.level)}`}>
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