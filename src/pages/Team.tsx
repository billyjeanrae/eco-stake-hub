import MainLayout from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";

const Team = () => {
  const teamMembers = [
    {
      name: "Alice Johnson",
      role: "Team Leader",
      staked: "25,000 T369",
      referrals: 12,
    },
    {
      name: "Bob Smith",
      role: "Member",
      staked: "15,000 T369",
      referrals: 8,
    },
    {
      name: "Carol Williams",
      role: "Member",
      staked: "10,000 T369",
      referrals: 5,
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Team Overview</h1>
          <div className="text-sm text-gray-400">
            Total Team Members: {teamMembers.length}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 glass-card">
            <h3 className="text-sm text-gray-400 mb-2">Total Team Stake</h3>
            <p className="text-2xl font-bold">50,000 T369</p>
          </Card>
          <Card className="p-6 glass-card">
            <h3 className="text-sm text-gray-400 mb-2">Team Rewards</h3>
            <p className="text-2xl font-bold">2,500 T369</p>
          </Card>
          <Card className="p-6 glass-card">
            <h3 className="text-sm text-gray-400 mb-2">Total Referrals</h3>
            <p className="text-2xl font-bold">25</p>
          </Card>
        </div>

        <Card className="p-6 glass-card">
          <h2 className="text-xl font-bold mb-4">Team Members</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4">Name</th>
                  <th className="text-left py-3 px-4">Role</th>
                  <th className="text-left py-3 px-4">Staked Amount</th>
                  <th className="text-left py-3 px-4">Referrals</th>
                </tr>
              </thead>
              <tbody>
                {teamMembers.map((member, index) => (
                  <tr
                    key={index}
                    className="border-b border-white/10 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-3 px-4">{member.name}</td>
                    <td className="py-3 px-4">{member.role}</td>
                    <td className="py-3 px-4">{member.staked}</td>
                    <td className="py-3 px-4">{member.referrals}</td>
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

export default Team;