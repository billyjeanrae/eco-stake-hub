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
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full ${isMinimized ? 'w-20' : 'w-64'} bg-card border-r border-border/50 transition-all duration-300 z-40`}>
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-border/50">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
              <span className="text-primary font-display font-bold text-lg">C</span>
            </div>
            {!isMinimized && (
              <span className="text-lg font-display font-bold text-foreground">
                {isAdmin ? 'Admin' : 'CelerFi'}
              </span>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }`}
                >
                  <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-primary' : ''}`} />
                  {!isMinimized && <span>{item.name}</span>}
                </Link>
              );
            })}
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className={`${isMinimized ? 'pl-20' : 'pl-64'} transition-all duration-300`}>
        {/* Header */}
        <header className="h-16 border-b border-border/50 flex items-center justify-between px-6 bg-card/80 backdrop-blur-xl sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button 
              className="p-2 hover:bg-secondary/50 rounded-lg transition-colors text-muted-foreground hover:text-foreground"
              onClick={() => setIsMinimized(!isMinimized)}
            >
              {isMinimized ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            </button>
          </div>

          <div className="flex items-center gap-2">
            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
                  <Bell className="w-5 h-5" />
                  {notifications.length > 0 && (
                    <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 bg-card border-border/50">
                <DropdownMenuLabel className="text-foreground">Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-border/50" />
                {notifications.map((notification) => (
                  <DropdownMenuItem 
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification.id)}
                    className="cursor-pointer"
                  >
                    <div className="flex flex-col">
                      <span className="font-medium text-foreground">{notification.title}</span>
                      <span className="text-sm text-muted-foreground">{notification.message}</span>
                    </div>
                  </DropdownMenuItem>
                ))}
                {notifications.length === 0 && (
                  <DropdownMenuItem disabled className="text-muted-foreground">No new notifications</DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                  <User className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-card border-border/50">
                <DropdownMenuLabel className="text-foreground">My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-border/50" />
                {isAdmin && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link to="/admin/sessions" className="flex items-center cursor-pointer">
                        <Key className="w-4 h-4 mr-2" />
                        User Sessions
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/admin/settings" className="flex items-center cursor-pointer">
                        <Settings className="w-4 h-4 mr-2" />
                        Platform Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-border/50" />
                  </>
                )}
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center cursor-pointer">
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="flex items-center cursor-pointer">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-border/50" />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive cursor-pointer">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;