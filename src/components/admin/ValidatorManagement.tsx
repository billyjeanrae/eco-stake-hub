import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export const ValidatorManagement = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

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
  );
};