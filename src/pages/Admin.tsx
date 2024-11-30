import MainLayout from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Users, Wallet, Shield, Percent } from "lucide-react";
import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const AdminDashboard = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const queryClient = useQueryClient();

  // Fetch platform statistics
  const { data: stats } = useQuery({
    queryKey: ['platform-stats'],
    queryFn: async () => {
      const [usersCount, totalStaked, activeValidators] = await Promise.all([
        supabase.from('profiles').select('id', { count: 'exact' }),
        supabase.from('stakes').select('amount').eq('status', 'active'),
        supabase.from('validators').select('id', { count: 'exact' }).eq('status', 'active')
      ]);

      const totalStakedAmount = totalStaked.data?.reduce((sum, stake) => sum + Number(stake.amount), 0) || 0;

      return {
        totalUsers: usersCount.count || 0,
        totalStaked: totalStakedAmount,
        activeValidators: activeValidators.count || 0,
      };
    },
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  // Fetch validator tiers
  const { data: validatorTiers, isLoading } = useQuery({
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
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  const handleUpdateTier = (tier: number, apy: number, minInvestment: number) => {
    updateTierMutation.mutate({ tier, apy, min_investment: minInvestment });
  };

  const validatorColumns = [
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
          onBlur={(e) => handleUpdateTier(row.tier, row.apy, parseFloat(e.target.value))}
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
          onBlur={(e) => handleUpdateTier(row.tier, parseFloat(e.target.value), row.min_investment)}
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
    }
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

        <Card className="p-6 glass-card">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Percent className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold">Validator Tiers & Rewards</h2>
            </div>
          </div>
          
          {isLoading ? (
            <div className="text-center py-4">Loading...</div>
          ) : (
            <DataTable
              columns={validatorColumns}
              data={validatorTiers || []}
            />
          )}
        </Card>
      </div>
    </MainLayout>
  );
};

export default AdminDashboard;