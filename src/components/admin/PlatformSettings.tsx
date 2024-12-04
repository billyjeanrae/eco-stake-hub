import AdminLayout from "@/components/layout/AdminLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Copy } from "lucide-react";

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

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="grid gap-6">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-platform-green"></div>
            </div>
          ) : (
            settings?.map((setting) => (
              <Card key={setting.key} className="p-6 glass-card hover:border-platform-green/20 transition-colors duration-300">
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
                      className="flex-1 bg-platform-card/50 border-white/10"
                    />
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        navigator.clipboard.writeText(JSON.stringify(setting.value, null, 2));
                        toast({
                          title: "Copied",
                          description: "Setting value copied to clipboard",
                        });
                      }}
                      className="border-white/10 hover:border-platform-green/50"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
};