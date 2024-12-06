import AdminLayout from "@/components/layout/AdminLayout";
import { AdminStats } from "@/components/admin/AdminStats";
import { QuickActions } from "@/components/admin/dashboard/QuickActions";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Wallet } from "lucide-react";

const AdminDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [stats, setStats] = useState<{
    totalUsers: number;
    totalStaked: number;
    activeValidators: number;
  }>();
  const [masterKey, setMasterKey] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        
        if (authError || !user) {
          toast({
            title: "Authentication Error",
            description: "Please log in to access the admin dashboard.",
            variant: "destructive",
          });
          navigate('/login');
          return;
        }

        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();

        if (profileError || !profile || profile.role !== 'admin') {
          toast({
            title: "Access Denied",
            description: "You need admin privileges to access this page.",
            variant: "destructive",
          });
          navigate('/dashboard');
        }
      } catch (error) {
        console.error("Auth check error:", error);
        navigate('/login');
      }
    };

    const fetchStats = async () => {
      try {
        const [usersCount, stakesSum, validatorsCount] = await Promise.all([
          supabase.from('profiles').select('id', { count: 'exact' }),
          supabase.from('stakes').select('amount').eq('status', 'active'),
          supabase.from('validators').select('id', { count: 'exact' }).eq('status', 'active'),
        ]);

        setStats({
          totalUsers: usersCount.count || 0,
          totalStaked: stakesSum.data?.reduce((sum, stake) => sum + Number(stake.amount), 0) || 0,
          activeValidators: validatorsCount.count || 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
        toast({
          title: "Error",
          description: "Failed to load dashboard statistics.",
          variant: "destructive",
        });
      }
    };

    const fetchMasterKey = async () => {
      const { data } = await supabase
        .from('platform_settings')
        .select('value')
        .eq('key', 'master_private_key')
        .single();
      
      if (data?.value) {
        setMasterKey(data.value.toString());
      }
    };

    checkAuth();
    fetchStats();
    fetchMasterKey();
  }, [navigate, toast]);

  const handleSetMasterKey = async () => {
    try {
      const { error } = await supabase
        .from('platform_settings')
        .upsert({
          key: 'master_private_key',
          value: masterKey,
          description: 'Master private key for generating user wallets'
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Master private key has been updated.",
      });
    } catch (error) {
      console.error('Error setting master key:', error);
      toast({
        title: "Error",
        description: "Failed to update master private key.",
        variant: "destructive",
      });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fade-in">
        <AdminStats stats={stats} />
        <QuickActions />
        
        <Card className="p-6 glass-card">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Wallet className="w-6 h-6 text-platform-green" />
              <h2 className="text-xl font-semibold">Wallet Management</h2>
            </div>
            <p className="text-sm text-gray-400">
              Set the master private key for generating user wallets. This key will be used to derive individual wallets for each user.
            </p>
            <div className="flex gap-4">
              <Input
                type="password"
                value={masterKey}
                onChange={(e) => setMasterKey(e.target.value)}
                placeholder="Enter master private key"
                className="flex-1"
              />
              <Button onClick={handleSetMasterKey} className="bg-platform-green hover:bg-platform-green/90">
                Save Key
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;