import MainLayout from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useState, useEffect } from "react";
import { DataTable } from "@/components/ui/data-table";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { Users, Wallet, Shield, History, Settings } from "lucide-react";

const AdminDashboard = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Check if user is admin
  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      console.log("Checking admin status...");
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.log("No user found, redirecting to login");
        navigate('/login');
        return null;
      }

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) {
        console.error("Error fetching profile:", error);
        return null;
      }

      console.log("User profile:", profile);
      
      if (profile?.role !== 'admin') {
        console.log("User is not admin, redirecting to dashboard");
        toast({
          title: "Access Denied",
          description: "You need admin privileges to access this page.",
          variant: "destructive",
        });
        navigate('/dashboard');
        return null;
      }
      return profile;
    },
  });

  // Show loading state
  if (isLoadingProfile) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-screen">
          <p>Loading...</p>
        </div>
      </MainLayout>
    );
  }

  // If no profile or not admin, the navigate in useQuery will handle redirect
  if (!profile) {
    return null;
  }

  const { data: stats } = useQuery({
    queryKey: ['platform-stats'],
    queryFn: async () => {
      const [usersCount, totalStaked, activeValidators] = await Promise.all([
        supabase.from('profiles').select('id', { count: 'exact' }),
        supabase.from('stakes').select('amount').eq('status', 'active'),
        supabase.from('validators').select('id', { count: 'exact' }).eq('status', 'active')
      ]);

      return {
        totalUsers: usersCount.count || 0,
        totalStaked: totalStaked.data?.reduce((sum, stake) => sum + Number(stake.amount), 0) || 0,
        activeValidators: activeValidators.count || 0,
      };
    },
    refetchInterval: 30000,
  });

  // Fetch users for management
  const { data: users, isLoading: loadingUsers } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*, wallets(*), stakes(*), validators(*)')
        .ilike('full_name', `%${searchTerm}%`);
      
      if (error) throw error;
      return data;
    },
  });

  // Fetch validator tiers
  const { data: validatorTiers, isLoading: loadingTiers } = useQuery({
    queryKey: ['validator-tiers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('validator_tiers')
        .select('*')
        .order('tier');
      if (error) throw error;
      return data;
    }
  });

  // Update validator tier mutation
  const updateTierMutation = useMutation({
    mutationFn: async ({ tier, apy, min_investment }: { tier: number, apy: number, min_investment: number }) => {
      const { data, error } = await supabase
        .from('validator_tiers')
        .update({ apy, min_investment })
        .eq('tier', tier);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['validator-tiers'] });
      toast({
        title: "Success",
        description: "Validator tier updated successfully",
      });
    },
  });

  // Update user role mutation
  const updateUserRoleMutation = useMutation({
    mutationFn: async ({ userId, role }: { userId: string, role: string }) => {
      const { data, error } = await supabase
        .from('profiles')
        .update({ role })
        .eq('id', userId);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      toast({
        title: "Success",
        description: "User role updated successfully",
      });
    },
  });

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

        <Card className="p-6">
          <Tabs defaultValue="users" className="space-y-6">
            <TabsList>
              <TabsTrigger value="users" className="flex items-center gap-2">
                <Users className="w-4 h-4" /> Users
              </TabsTrigger>
              <TabsTrigger value="validators" className="flex items-center gap-2">
                <Shield className="w-4 h-4" /> Validators
              </TabsTrigger>
              <TabsTrigger value="transactions" className="flex items-center gap-2">
                <History className="w-4 h-4" /> Transactions
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="w-4 h-4" /> Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="users">
              <div className="space-y-4">
                <h2 className="text-xl font-bold">User Management</h2>
                {loadingUsers ? (
                  <div>Loading users...</div>
                ) : (
                  <DataTable
                    columns={[
                      {
                        key: "full_name",
                        header: "Name",
                        cell: (row: any) => row.full_name,
                      },
                      {
                        key: "role",
                        header: "Role",
                        cell: (row: any) => (
                          <select
                            value={row.role}
                            onChange={(e) => 
                              updateUserRoleMutation.mutate({
                                userId: row.id,
                                role: e.target.value,
                              })
                            }
                            className="bg-background border rounded px-2 py-1"
                          >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                          </select>
                        ),
                      },
                      {
                        key: "wallets",
                        header: "Wallet Balance",
                        cell: (row: any) => 
                          row.wallets?.[0]?.balance?.toLocaleString() || "0",
                      },
                      {
                        key: "stakes",
                        header: "Total Staked",
                        cell: (row: any) =>
                          row.stakes?.reduce(
                            (sum: number, stake: any) => sum + Number(stake.amount),
                            0
                          ).toLocaleString() || "0",
                      },
                    ]}
                    data={users || []}
                  />
                )}
              </div>
            </TabsContent>

            <TabsContent value="validators">
              <div className="space-y-4">
                <h2 className="text-xl font-bold">Validator Tiers & Rewards</h2>
                {loadingTiers ? (
                  <div>Loading validator tiers...</div>
                ) : (
                  <DataTable
                    columns={[
                      {
                        key: "tier",
                        header: "Tier",
                        cell: (row: any) => row.tier,
                      },
                      {
                        key: "min_investment",
                        header: "Min Investment (CLT)",
                        cell: (row: any) => (
                          <Input
                            type="number"
                            defaultValue={row.min_investment}
                            onBlur={(e) =>
                              updateTierMutation.mutate({
                                tier: row.tier,
                                apy: row.apy,
                                min_investment: parseFloat(e.target.value),
                              })
                            }
                            className="w-32"
                          />
                        ),
                      },
                      {
                        key: "apy",
                        header: "APY (%)",
                        cell: (row: any) => (
                          <Input
                            type="number"
                            defaultValue={row.apy}
                            onBlur={(e) =>
                              updateTierMutation.mutate({
                                tier: row.tier,
                                apy: parseFloat(e.target.value),
                                min_investment: row.min_investment,
                              })
                            }
                            className="w-32"
                          />
                        ),
                      },
                      {
                        key: "daily_rewards",
                        header: "Daily Rewards (CLT)",
                        cell: (row: any) => (
                          <div className="text-sm">
                            {((row.min_investment * (row.apy / 100)) / 365).toFixed(2)}
                          </div>
                        ),
                      },
                    ]}
                    data={validatorTiers || []}
                  />
                )}
              </div>
            </TabsContent>

            <TabsContent value="transactions">
              <div className="space-y-4">
                <h2 className="text-xl font-bold">Transaction History</h2>
                {/* Transaction history implementation */}
              </div>
            </TabsContent>

            <TabsContent value="settings">
              <div className="space-y-4">
                <h2 className="text-xl font-bold">Platform Settings</h2>
                {/* Platform settings implementation */}
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </MainLayout>
  );

};

export default AdminDashboard;
