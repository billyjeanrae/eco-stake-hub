import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

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
    return <div>Loading users...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">User Sessions</h2>
      
      <div className="grid gap-4">
        {users?.map((user) => (
          <Card key={user.id} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{user.full_name}</h3>
                <p className="text-sm text-gray-400">Role: {user.role}</p>
              </div>
              
              <Button
                variant="outline"
                onClick={() => handleImpersonateUser(user.id)}
              >
                Login as User
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};