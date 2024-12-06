import AdminLayout from "@/components/layout/AdminLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Shield, Mail, Calendar, Download } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

export const UserManagement = () => {
  const { toast } = useToast();
  const { data: users, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      // Fetch users with their wallet addresses
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select(`
          *,
          wallets (
            address
          )
        `)
        .order('created_at', { ascending: false });
      
      if (profilesError) throw profilesError;
      return profiles;
    },
  });

  const exportData = async (format: 'csv' | 'json' | 'txt') => {
    if (!users) return;

    const exportData = users.map(user => ({
      full_name: user.full_name,
      role: user.role,
      created_at: new Date(user.created_at).toLocaleDateString(),
      wallet_address: user.wallets?.[0]?.address || 'No wallet',
    }));

    let content = '';
    let filename = `users-export-${new Date().toISOString()}`;
    let type = '';

    switch (format) {
      case 'csv':
        const headers = Object.keys(exportData[0]).join(',');
        const rows = exportData.map(user => Object.values(user).join(','));
        content = [headers, ...rows].join('\n');
        filename += '.csv';
        type = 'text/csv';
        break;
      case 'json':
        content = JSON.stringify(exportData, null, 2);
        filename += '.json';
        type = 'application/json';
        break;
      case 'txt':
        content = exportData.map(user => 
          Object.entries(user)
            .map(([key, value]) => `${key}: ${value}`)
            .join('\n')
        ).join('\n\n');
        filename += '.txt';
        type = 'text/plain';
        break;
    }

    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Export Successful",
      description: `Users data has been exported as ${format.toUpperCase()}`,
    });
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-platform-green"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">User Management</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="border-white/10 hover:border-platform-green/50"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Users
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => exportData('csv')}>
                Export as CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => exportData('json')}>
                Export as JSON
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => exportData('txt')}>
                Export as TXT
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Card className="p-6 bg-platform-card/50 backdrop-blur-lg border-white/10">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-4">User</th>
                  <th className="text-left p-4">Role</th>
                  <th className="text-left p-4">Created At</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users?.map((user) => (
                  <tr key={user.id} className="border-b border-white/10 hover:bg-white/5">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-full bg-platform-card">
                          <Mail className="w-4 h-4 text-platform-green" />
                        </div>
                        <div>
                          <p className="font-medium">{user.full_name}</p>
                          <p className="text-sm text-gray-400">{user.wallets?.[0]?.address || 'No wallet'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <Shield className="w-4 h-4 text-platform-green" />
                        <span>{user.role}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-platform-green" />
                        <span>{new Date(user.created_at).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-white/10 hover:border-platform-green/50"
                      >
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
};