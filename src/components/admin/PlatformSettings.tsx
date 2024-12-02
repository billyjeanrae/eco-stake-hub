import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const PlatformSettings = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: settings, isLoading } = useQuery({
    queryKey: ['platform-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('platform_settings')
        .select('*')
        .order('key');
      if (error) throw error;
      return data;
    },
  });

  const updateSettingMutation = useMutation({
    mutationFn: async ({ key, value }: { key: string, value: any }) => {
      const { data, error } = await supabase
        .from('platform_settings')
        .update({ value })
        .eq('key', key);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['platform-settings'] });
      toast({
        title: "Success",
        description: "Setting updated successfully",
      });
    },
  });

  if (isLoading) {
    return <div>Loading settings...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Platform Settings</h2>
      
      <div className="grid gap-6">
        {settings?.map((setting) => (
          <Card key={setting.key} className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">{setting.key}</h3>
                {setting.description && (
                  <p className="text-sm text-gray-400">{setting.description}</p>
                )}
              </div>
              
              <div className="flex gap-4">
                <Input
                  defaultValue={JSON.stringify(setting.value)}
                  onBlur={(e) => {
                    try {
                      const value = JSON.parse(e.target.value);
                      updateSettingMutation.mutate({ key: setting.key, value });
                    } catch (error) {
                      toast({
                        title: "Invalid JSON",
                        description: "Please enter valid JSON value",
                        variant: "destructive",
                      });
                    }
                  }}
                  className="flex-1"
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};