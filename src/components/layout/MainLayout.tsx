import { Bell, Menu, User, LayoutDashboard, History, Users, Trophy, Megaphone, Server, ArrowLeftRight, Settings, ChevronRight, ChevronLeft, Wallet, LogOut, UserCheck, Key } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMinimized, setIsMinimized] = useState(false);
  const { toast } = useToast();
  const [notifications, setNotifications] = useState([
    { id: 1, title: "New Reward", message: "You earned 50 CLT" },
    { id: 2, title: "Staking Complete", message: "Your stake is now active" },
  ]);

  // Check if user is admin
  const { data: userRole } = useQuery({
    queryKey: ['user-role'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;
      
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();
      
      return profile?.role;
    },
  });

  const isAdmin = userRole === 'admin';

  // Navigation items based on role
  const adminNavigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Validators", href: "/admin/validators", icon: Server },
    { name: "User Sessions", href: "/admin/sessions", icon: UserCheck },
    { name: "Platform Settings", href: "/admin/settings", icon: Settings },
  ];

  const userNavigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Validators", href: "/validators", icon: Server },
    { name: "Swap", href: "/swap", icon: ArrowLeftRight },
    { name: "History", href: "/history", icon: History },
    { name: "Team", href: "/team", icon: Users },
    { name: "Ranking", href: "/ranking", icon: Trophy },
    { name: "Marketing", href: "/marketing", icon: Megaphone },
    { name: "Wallet", href: "/wallet", icon: Wallet },
  ];

  const navigation = isAdmin ? adminNavigation : userNavigation;

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user && location.pathname !== '/login' && location.pathname !== '/signup' && location.pathname !== '/') {
        navigate('/login');
      }
    };
    
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        navigate('/');
      } else if (!session && location.pathname !== '/login' && location.pathname !== '/signup' && location.pathname !== '/') {
        navigate('/login');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [location.pathname, navigate]);

  const handleNotificationClick = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
    toast({
      title: "Notification marked as read",
    });
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "You have been logged out successfully.",
      });
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-platform-dark">
      <aside className={`fixed top-0 left-0 h-full ${isMinimized ? 'w-20' : 'w-64'} bg-platform-card border-r border-white/10 transition-all duration-300`}>
        <div className="p-6 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/placeholder.svg" alt="Logo" className="w-8 h-8" />
            {!isMinimized && (
              <span className="text-xl font-bold bg-gradient-to-r from-platform-green to-platform-green-dark bg-clip-text text-transparent">
                {isAdmin ? 'Admin Panel' : 'Scavenger X'}
              </span>
            )}
          </Link>
        </div>

        <nav className="mt-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center px-6 py-3 text-sm space-x-3 ${
                location.pathname === item.href
                  ? "text-platform-green border-l-2 border-platform-green bg-platform-green/10"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {!isMinimized && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>
      </aside>

      <div className={`${isMinimized ? 'pl-20' : 'pl-64'} transition-all duration-300`}>
        <header className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-platform-card/50 backdrop-blur-lg">
          <div className="flex items-center space-x-4">
            <button 
              className="p-2 hover:bg-white/5 rounded-lg"
              onClick={() => setIsMinimized(!isMinimized)}
            >
              {isMinimized ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Bell className="w-5 h-5" />
                  {notifications.length > 0 && (
                    <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.map((notification) => (
                  <DropdownMenuItem 
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification.id)}
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">{notification.title}</span>
                      <span className="text-sm text-gray-400">{notification.message}</span>
                    </div>
                  </DropdownMenuItem>
                ))}
                {notifications.length === 0 && (
                  <DropdownMenuItem disabled>No new notifications</DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {isAdmin && (
                  <>
                    <DropdownMenuItem>
                      <Link to="/admin/sessions" className="flex items-center">
                        <Key className="w-4 h-4 mr-2" />
                        User Sessions
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to="/admin/settings" className="flex items-center">
                        <Settings className="w-4 h-4 mr-2" />
                        Platform Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </>
                )}
                <DropdownMenuItem>
                  <Link to="/profile" className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/settings" className="flex items-center">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                  <div className="flex items-center">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;