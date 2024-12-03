import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { LogIn, User, Shield, Calendar } from "lucide-react";

export const UserSessions = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

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
  });

  const handleImpersonateUser = async (userId: string) => {
    try {
      // Store admin token for later
      const adminToken = (await supabase.auth.getSession()).data.session?.access_token;
      localStorage.setItem('admin_token', adminToken || '');
      
      // Sign in as the selected user
      const { data: { user }, error } = await supabase.auth.admin.getUserById(userId);
      if (error) throw error;

      toast({
        title: "Success",
        description: `Now viewing as ${user.email}`,
      });
      
      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-platform-green"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-platform-green to-platform-green-dark bg-clip-text text-transparent">
        User Sessions
      </h2>
      
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
    </div>
  );
};