import MainLayout from "@/components/layout/MainLayout";
import { Users, Coins, Gift, TrendingUp, Crown, Medal, Star, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Team = () => {
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);

  const teamMembers = [
    { name: "Alice Johnson", role: "Team Leader", staked: "25,000 CLT", referrals: 12, avatar: "A" },
    { name: "Bob Smith", role: "Member", staked: "15,000 CLT", referrals: 8, avatar: "B" },
    { name: "Carol Williams", role: "Member", staked: "10,000 CLT", referrals: 5, avatar: "C" },
  ];

  const stats = [
    { label: "Total Team Stake", value: "50,000 CLT", icon: Coins, color: "from-green-500/20 to-green-600/5" },
    { label: "Team Rewards", value: "2,500 CLT", icon: Gift, color: "from-purple-500/20 to-purple-600/5" },
    { label: "Total Referrals", value: "25", icon: TrendingUp, color: "from-blue-500/20 to-blue-600/5" },
  ];

  const getRoleIcon = (role: string) => {
    if (role === "Team Leader") return <Crown className="w-4 h-4 text-yellow-500" />;
    return <Star className="w-4 h-4 text-muted-foreground" />;
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground flex items-center gap-3">
              Team Overview
              <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full flex items-center gap-1">
                <Users className="w-3 h-3" />
                {teamMembers.length} members
              </span>
            </h1>
            <p className="text-muted-foreground mt-1">Manage your referral network</p>
          </div>
          <Button className="btn-primary gap-2">
            <UserPlus className="w-4 h-4" />
            Invite Member
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={stat.label}
                className={`glass-card p-6 animate-fade-up opacity-0 group relative overflow-hidden`}
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative z-10 flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-display font-bold text-foreground group-hover:text-primary transition-colors">{stat.value}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className={`glass-card p-6 animate-fade-up opacity-0 group cursor-pointer relative overflow-hidden transition-all duration-500 ${hoveredMember === index ? 'scale-[1.02]' : ''}`}
              style={{ animationDelay: `${(index + 3) * 100}ms`, animationFillMode: 'forwards' }}
              onMouseEnter={() => setHoveredMember(index)}
              onMouseLeave={() => setHoveredMember(null)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center text-primary-foreground font-display font-bold text-xl">
                    {member.avatar}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-foreground group-hover:text-primary transition-colors">{member.name}</h3>
                    <div className="flex items-center gap-2">
                      {getRoleIcon(member.role)}
                      <span className={`text-sm ${member.role === "Team Leader" ? "text-yellow-500" : "text-muted-foreground"}`}>
                        {member.role}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 rounded-lg bg-secondary/30">
                    <span className="text-sm text-muted-foreground">Staked</span>
                    <span className="font-display font-bold text-foreground">{member.staked}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-secondary/30">
                    <span className="text-sm text-muted-foreground">Referrals</span>
                    <span className="font-display font-bold text-primary">{member.referrals}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Team Table */}
        <div className="glass-card overflow-hidden relative">
          <div className="absolute inset-0 cyber-grid opacity-5" />
          
          <div className="p-6 border-b border-border/50 flex items-center justify-between relative z-10">
            <h2 className="text-xl font-display font-bold text-foreground flex items-center gap-2">
              <Medal className="w-5 h-5 text-primary" />
              Team Members
            </h2>
          </div>
          <div className="overflow-x-auto relative z-10">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50 bg-secondary/30">
                  <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Member</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Role</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Staked</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Referrals</th>
                </tr>
              </thead>
              <tbody>
                {teamMembers.map((member, index) => (
                  <tr
                    key={index}
                    className="border-b border-border/30 hover:bg-primary/5 transition-colors animate-fade-up opacity-0"
                    style={{ animationDelay: `${(index + 6) * 100}ms`, animationFillMode: 'forwards' }}
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center text-primary-foreground font-display font-bold">
                          {member.avatar}
                        </div>
                        <span className="font-medium text-foreground">{member.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${
                        member.role === "Team Leader" 
                          ? "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20" 
                          : "bg-secondary text-muted-foreground border border-border/50"
                      }`}>
                        {getRoleIcon(member.role)}
                        {member.role}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-display font-bold text-foreground">{member.staked}</td>
                    <td className="py-4 px-6 font-display font-bold text-primary">{member.referrals}</td>
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

export default Team;