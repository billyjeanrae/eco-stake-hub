import MainLayout from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { Users, Shield, History, Settings } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { AdminStats } from "@/components/admin/AdminStats";
import { UserManagement } from "@/components/admin/UserManagement";
import { ValidatorManagement } from "@/components/admin/ValidatorManagement";

const AdminDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check if user is admin
  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate('/login');
        return null;
      }

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) {
        console.error("Error fetching profile:", error);
        return null;
      }
      
      if (profile?.role !== 'admin') {
        toast({
          title: "Access Denied",
          description: "You need admin privileges to access this page.",
          variant: "destructive",
        });
        navigate('/dashboard');
        return null;
      }
      return profile;
    },
  });

  const { data: stats } = useQuery({
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
    enabled: !!profile,
    refetchInterval: 30000,
  });

  // Show loading state
  if (isLoadingProfile) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-screen">
          <p>Loading...</p>
        </div>
      </MainLayout>
    );
  }

  // If no profile or not admin, the navigate in useQuery will handle redirect
  if (!profile) {
    return null;
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
