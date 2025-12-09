import MainLayout from "@/components/layout/MainLayout";
import { Users, Coins, Gift, TrendingUp } from "lucide-react";

const Team = () => {
  const teamMembers = [
    { name: "Alice Johnson", role: "Team Leader", staked: "25,000 CLT", referrals: 12 },
    { name: "Bob Smith", role: "Member", staked: "15,000 CLT", referrals: 8 },
    { name: "Carol Williams", role: "Member", staked: "10,000 CLT", referrals: 5 },
  ];

  const stats = [
    { label: "Total Team Stake", value: "50,000 CLT", icon: Coins },
    { label: "Team Rewards", value: "2,500 CLT", icon: Gift },
    { label: "Total Referrals", value: "25", icon: TrendingUp },
  ];

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">Team Overview</h1>
            <p className="text-muted-foreground mt-1">Manage your referral network</p>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="w-5 h-5" />
            <span>Total Members: {teamMembers.length}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={stat.label}
                className="glass-card p-6 animate-fade-up opacity-0"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-display font-bold text-foreground">{stat.value}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Team Table */}
        <div className="glass-card overflow-hidden">
          <div className="p-6 border-b border-border/50">
            <h2 className="text-xl font-display font-bold text-foreground">Team Members</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Name</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Role</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Staked</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Referrals</th>
                </tr>
              </thead>
              <tbody>
                {teamMembers.map((member, index) => (
                  <tr
                    key={index}
                    className="border-b border-border/30 hover:bg-secondary/30 transition-colors animate-fade-up opacity-0"
                    style={{ animationDelay: `${(index + 3) * 100}ms`, animationFillMode: 'forwards' }}
                  >
                    <td className="py-4 px-6 font-medium text-foreground">{member.name}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                        member.role === "Team Leader" 
                          ? "bg-primary/10 text-primary" 
                          : "bg-secondary text-muted-foreground"
                      }`}>
                        {member.role}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-foreground">{member.staked}</td>
                    <td className="py-4 px-6 text-foreground">{member.referrals}</td>
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