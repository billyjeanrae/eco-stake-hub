import AdminLayout from "@/components/layout/AdminLayout";
import { AdminStats } from "@/components/admin/AdminStats";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

const AdminDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [stats, setStats] = useState<{
    totalUsers: number;
    totalStaked: number;
    activeValidators: number;
  }>();

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

    checkAuth();
    fetchStats();
  }, [navigate, toast]);

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fade-in">
        <AdminStats stats={stats} />

        <Card className="p-6 bg-platform-card/50 backdrop-blur-lg border-white/10">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Add quick action buttons here */}
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;