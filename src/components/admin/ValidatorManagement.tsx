import AdminLayout from "@/components/layout/AdminLayout";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export const ValidatorManagement = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

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

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fade-in">
        <Card className="p-6 glass-card">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-platform-green to-platform-green-dark bg-clip-text text-transparent">
              Validator Tiers & Rewards
            </h2>
            
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-platform-green"></div>
              </div>
            ) : (
              <DataTable
                columns={[
                  {
                    key: "tier",
                    header: "Tier",
                    cell: (row: any) => (
                      <div className="font-medium">Tier {row.tier}</div>
                    ),
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
                        className="w-32 bg-platform-card/50 border-white/10"
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
                        className="w-32 bg-platform-card/50 border-white/10"
                      />
                    ),
                  },
                  {
                    key: "daily_rewards",
                    header: "Daily Rewards (CLT)",
                    cell: (row: any) => (
                      <div className="font-mono">
                        {((row.min_investment * (row.apy / 100)) / 365).toFixed(2)}
                      </div>
                    ),
                  },
                ]}
                data={validatorTiers || []}
              />
            )}
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
};