import { Card } from "@/components/ui/card";
import { Users, Wallet, Shield } from "lucide-react";

interface AdminStatsProps {
  stats: {
    totalUsers: number;
    totalStaked: number;
    activeValidators: number;
  } | undefined;
}

export const AdminStats = ({ stats }: AdminStatsProps) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <Card className="p-6 glass-card hover:scale-105 transition-transform duration-300">
      <div className="flex items-center space-x-4">
        <Users className="w-8 h-8 text-primary" />
        <div>
          <h3 className="font-bold">Total Users</h3>
          <p className="text-2xl">{stats?.totalUsers || 0}</p>
        </div>
      </div>
    </Card>

    <Card className="p-6 glass-card hover:scale-105 transition-transform duration-300">
      <div className="flex items-center space-x-4">
        <Wallet className="w-8 h-8 text-primary" />
        <div>
          <h3 className="font-bold">Total CLT Staked</h3>
          <p className="text-2xl">{stats?.totalStaked?.toLocaleString() || 0}</p>
        </div>
      </div>
    </Card>

    <Card className="p-6 glass-card hover:scale-105 transition-transform duration-300">
      <div className="flex items-center space-x-4">
        <Shield className="w-8 h-8 text-primary" />
        <div>
          <h3 className="font-bold">Active Validators</h3>
          <p className="text-2xl">{stats?.activeValidators || 0}</p>
        </div>
      </div>
    </Card>
  </div>
);