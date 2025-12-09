import AdminLayout from "@/components/layout/AdminLayout";
import { AdminStats } from "@/components/admin/AdminStats";
import { QuickActions } from "@/components/admin/dashboard/QuickActions";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUserRole } from "@/hooks/useUserRole";

const AdminDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isAdmin, isLoading: roleLoading } = useUserRole();
  const [stats, setStats] = useState<{
    totalUsers: number;
    totalStaked: number;
    activeValidators: number;
  }>();

  useEffect(() => {
    if (!roleLoading && !isAdmin) {
      toast({
        title: "Access Denied",
        description: "You need admin privileges to access this page.",
        variant: "destructive",
      });
      navigate('/dashboard');
    }
  }, [isAdmin, roleLoading, navigate, toast]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { supabase } = await import("@/integrations/supabase/client");
        
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

    if (isAdmin) {
      fetchStats();
    }
  }, [isAdmin, toast]);

  if (roleLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-platform-green"></div>
        </div>
      </AdminLayout>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fade-in">
        <AdminStats stats={stats} />
        <QuickActions />
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
