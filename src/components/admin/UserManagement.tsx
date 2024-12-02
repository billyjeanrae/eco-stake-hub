import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

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
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">User Management</h2>
        <Input
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-xs"
        />
      </div>
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
  );
};