import MainLayout from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Users, Wallet, Settings, Bell, Database, Shield } from "lucide-react";
import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";

const AdminDashboard = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");

  const handleUserAction = (action: string, userId: string) => {
    toast({
      title: "Action Performed",
      description: `${action} performed on user ${userId}`,
    });
  };

  const mockUsers = [
    { id: "1", name: "John Doe", email: "john@example.com", walletBalance: "1000 CLT" },
    { id: "2", name: "Jane Smith", email: "jane@example.com", walletBalance: "2000 CLT" },
  ];

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-xs"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="p-6 glass-card hover:scale-105 transition-transform duration-300">
            <div className="flex items-center space-x-4">
              <Users className="w-8 h-8 text-primary" />
              <div>
                <h3 className="font-bold">Total Users</h3>
                <p className="text-2xl">1,234</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 glass-card hover:scale-105 transition-transform duration-300">
            <div className="flex items-center space-x-4">
              <Wallet className="w-8 h-8 text-primary" />
              <div>
                <h3 className="font-bold">Total CLT Staked</h3>
                <p className="text-2xl">500,000</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 glass-card hover:scale-105 transition-transform duration-300">
            <div className="flex items-center space-x-4">
              <Shield className="w-8 h-8 text-primary" />
              <div>
                <h3 className="font-bold">Active Validators</h3>
                <p className="text-2xl">50</p>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-6 glass-card">
          <h2 className="text-xl font-bold mb-4">User Management</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-4">User</th>
                  <th className="text-left p-4">Email</th>
                  <th className="text-left p-4">Balance</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockUsers.map((user) => (
                  <tr key={user.id} className="border-b border-white/10">
                    <td className="p-4">{user.name}</td>
                    <td className="p-4">{user.email}</td>
                    <td className="p-4">{user.walletBalance}</td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          onClick={() => handleUserAction("edit", user.id)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleUserAction("suspend", user.id)}
                        >
                          Suspend
                        </Button>
                      </div>
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

export default AdminDashboard;