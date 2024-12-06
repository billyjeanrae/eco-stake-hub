import AdminLayout from "@/components/layout/AdminLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { LogIn, User, Shield, Calendar } from "lucide-react";
import { useState, useEffect } from "react";

export const UserSessions = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  // Check user role before allowing admin actions
  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single();
          
          setIsAdmin(profile?.role === 'admin');
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to verify admin status",
          variant: "destructive",
        });
      }
    };

    checkAdminStatus();
  }, []);

  const { data: users, isLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: isAdmin,
  });

  const handleImpersonateUser = async (userId: string) => {
    if (!isAdmin) {
      toast({
        title: "Unauthorized",
        description: "Only administrators can impersonate users",
        variant: "destructive",
      });
      return;
    }

    try {
      // Store current admin session
      const currentSession = await supabase.auth.getSession();
      const adminToken = currentSession.data.session?.access_token;
      if (adminToken) {
        localStorage.setItem('admin_token', adminToken);
      }

      // Sign out current session
      await supabase.auth.signOut();

      // Get user email from profiles
      const { data: userData } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', userId)
        .single();

      if (userData) {
        toast({
          title: "Success",
          description: "Switching to user account",
        });
        
        // Redirect to dashboard - the app will handle authentication state
        navigate('/dashboard');
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (!isAdmin) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <p className="text-red-500">Access Denied: Administrator privileges required</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fade-in">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-platform-green"></div>
          </div>
        ) : (
          <div className="grid gap-4">
            {users?.map((user) => (
              <Card key={user.id} className="p-6 glass-card hover:border-platform-green/20 transition-colors duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-full bg-platform-card/50">
                      <User className="w-5 h-5 text-platform-green" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{user.full_name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <div className="flex items-center">
                          <Shield className="w-4 h-4 mr-1" />
                          {user.role}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(user.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    variant="outline"
                    onClick={() => handleImpersonateUser(user.id)}
                    className="border-white/10 hover:border-platform-green/50"
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Login as User
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};