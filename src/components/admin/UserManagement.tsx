import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const UserManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const queryClient = useQueryClient();

  const { data: users, isLoading: loadingUsers } = useQuery({
    queryKey: ['admin-users', searchTerm],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*, wallets(*), stakes(*), validators(*)')
        .ilike('full_name', `%${searchTerm}%`);
      
      if (error) throw error;
      return data;
    },
  });

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
    <Card className="p-6 glass-card">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-platform-green to-platform-green-dark bg-clip-text text-transparent">
            User Management
          </h2>
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-xs bg-platform-card/50 border-white/10"
          />
        </div>

        {loadingUsers ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-platform-green"></div>
          </div>
        ) : (
          <DataTable
            columns={[
              {
                key: "full_name",
                header: "Name",
                cell: (row: any) => (
                  <div className="font-medium">{row.full_name}</div>
                ),
              },
              {
                key: "role",
                header: "Role",
                cell: (row: any) => (
                  <Select
                    value={row.role}
                    onValueChange={(value) => 
                      updateUserRoleMutation.mutate({
                        userId: row.id,
                        role: value,
                      })
                    }
                  >
                    <SelectTrigger className="w-32 bg-platform-card/50 border-white/10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                ),
              },
              {
                key: "wallets",
                header: "Wallet Balance",
                cell: (row: any) => (
                  <div className="font-mono">
                    {row.wallets?.[0]?.balance?.toLocaleString() || "0"} CLT
                  </div>
                ),
              },
              {
                key: "stakes",
                header: "Total Staked",
                cell: (row: any) => (
                  <div className="font-mono">
                    {row.stakes?.reduce(
                      (sum: number, stake: any) => sum + Number(stake.amount),
                      0
                    ).toLocaleString() || "0"} CLT
                  </div>
                ),
              },
            ]}
            data={users || []}
          />
        )}
      </div>
    </Card>
  );
};