import AdminLayout from "@/components/layout/AdminLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Copy, Edit2, Save, X } from "lucide-react";
import { useState } from "react";

export const PlatformSettings = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editingKeys, setEditingKeys] = useState<string[]>([]);
  const [editValues, setEditValues] = useState<Record<string, string>>({});

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
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['platform-settings'] });
      toast({
        title: "Success",
        description: "Setting updated successfully",
      });
      setEditingKeys(editingKeys.filter(key => key !== variables.key));
      setEditValues(prev => {
        const newValues = { ...prev };
        delete newValues[variables.key];
        return newValues;
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update setting",
        variant: "destructive",
      });
      console.error("Update error:", error);
    },
  });

  const startEditing = (key: string, currentValue: any) => {
    setEditingKeys([...editingKeys, key]);
    setEditValues({
      ...editValues,
      [key]: JSON.stringify(currentValue, null, 2),
    });
  };

  const cancelEditing = (key: string) => {
    setEditingKeys(editingKeys.filter(k => k !== key));
    setEditValues(prev => {
      const newValues = { ...prev };
      delete newValues[key];
      return newValues;
    });
  };

  const handleSave = (key: string) => {
    try {
      const value = JSON.parse(editValues[key]);
      updateSettingMutation.mutate({ key, value });
    } catch (error) {
      toast({
        title: "Invalid JSON",
        description: "Please enter valid JSON value",
        variant: "destructive",
      });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-platform-green to-platform-green-dark bg-clip-text text-transparent">
            Platform Settings
          </h1>
        </div>

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
                    {editingKeys.includes(setting.key) ? (
                      <>
                        <Input
                          value={editValues[setting.key]}
                          onChange={(e) => setEditValues({
                            ...editValues,
                            [setting.key]: e.target.value,
                          })}
                          className="flex-1 bg-platform-card/50 border-white/10 font-mono"
                        />
                        <Button 
                          variant="outline"
                          onClick={() => handleSave(setting.key)}
                          className="border-white/10 hover:border-platform-green/50"
                        >
                          <Save className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={() => cancelEditing(setting.key)}
                          className="border-white/10 hover:border-red-500/50"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Input
                          value={JSON.stringify(setting.value)}
                          readOnly
                          className="flex-1 bg-platform-card/50 border-white/10"
                        />
                        <Button 
                          variant="outline" 
                          onClick={() => startEditing(setting.key, setting.value)}
                          className="border-white/10 hover:border-platform-green/50"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
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
                      </>
                    )}
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