import MainLayout from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { Users, Shield, History, Settings } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { AdminStats } from "@/components/admin/AdminStats";
import { UserManagement } from "@/components/admin/UserManagement";
import { ValidatorManagement } from "@/components/admin/ValidatorManagement";
import { useEffect } from "react";

const AdminDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  // First, check authentication status
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

        // Check if user is admin
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
        toast({
          title: "Error",
          description: "An error occurred while checking authentication.",
          variant: "destructive",
        });
        navigate('/login');
      }
    };

    checkAuth();
  }, [navigate, toast]);

  // Fetch platform stats
  const { data: stats, isLoading: isLoadingStats } = useQuery({
    queryKey: ['platform-stats'],
    queryFn: async () => {
      const [usersCount, totalStaked, activeValidators] = await Promise.all([
        supabase.from('profiles').select('id', { count: 'exact' }),
        supabase.from('stakes').select('amount').eq('status', 'active'),
        supabase.from('validators').select('id', { count: 'exact' }).eq('status', 'active')
      ]);

      return {
        totalUsers: usersCount.count || 0,
        totalStaked: totalStaked.data?.reduce((sum, stake) => sum + Number(stake.amount), 0) || 0,
        activeValidators: activeValidators.count || 0,
      };
    },
    refetchInterval: 30000,
  });

  if (isLoadingStats) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-screen">
          <p>Loading...</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        </div>

        <AdminStats stats={stats} />

        <Card className="p-6">
          <Tabs defaultValue="users" className="space-y-6">
            <TabsList>
              <TabsTrigger value="users" className="flex items-center gap-2">
                <Users className="w-4 h-4" /> Users
              </TabsTrigger>
              <TabsTrigger value="validators" className="flex items-center gap-2">
                <Shield className="w-4 h-4" /> Validators
              </TabsTrigger>
              <TabsTrigger value="transactions" className="flex items-center gap-2">
                <History className="w-4 h-4" /> Transactions
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="w-4 h-4" /> Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="users">
              <UserManagement />
            </TabsContent>

            <TabsContent value="validators">
              <ValidatorManagement />
            </TabsContent>

            <TabsContent value="transactions">
              <div className="space-y-4">
                <h2 className="text-xl font-bold">Transaction History</h2>
                {/* Transaction history implementation */}
              </div>
            </TabsContent>

            <TabsContent value="settings">
              <div className="space-y-4">
                <h2 className="text-xl font-bold">Platform Settings</h2>
                {/* Platform settings implementation */}
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </MainLayout>
  );
};

export default AdminDashboard;