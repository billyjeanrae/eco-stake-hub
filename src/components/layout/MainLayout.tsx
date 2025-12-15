import { Bell, Menu, User, LayoutDashboard, History, Users, Trophy, Megaphone, Server, ArrowLeftRight, Settings, ChevronRight, ChevronLeft, Wallet, LogOut, UserCheck, Key, Sparkles } from "lucide-react";
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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { toast } = useToast();
  const [notifications, setNotifications] = useState([
    { id: 1, title: "New Reward", message: "You earned 50 CLT" },
    { id: 2, title: "Staking Complete", message: "Your stake is now active" },
  ]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Dynamic Background */}
      <div 
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, hsl(var(--primary) / 0.05), transparent 40%)`,
        }}
      />

      {/* Animated Grid */}
      <div className="fixed inset-0 cyber-grid opacity-20 pointer-events-none" />

      {/* Floating Particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full ${isMinimized ? 'w-20' : 'w-64'} bg-card/80 backdrop-blur-xl border-r border-border/50 transition-all duration-300 z-40`}>
        {/* Sidebar Glow */}
        <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent" />
        
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-border/50">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-shadow">
              <span className="text-primary-foreground font-display font-bold text-lg">C</span>
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
            {navigation.map((item, index) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 group relative overflow-hidden ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent" />
                  )}
                  <item.icon className={`w-5 h-5 flex-shrink-0 relative z-10 transition-transform group-hover:scale-110 ${isActive ? 'text-primary' : ''}`} />
                  {!isMinimized && <span className="relative z-10">{item.name}</span>}
                  {isActive && !isMinimized && (
                    <Sparkles className="w-3 h-3 text-primary ml-auto animate-pulse" />
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Sidebar Toggle */}
        <button 
          className="absolute bottom-6 left-1/2 -translate-x-1/2 p-2 rounded-lg bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground transition-all duration-300"
          onClick={() => setIsMinimized(!isMinimized)}
        >
          {isMinimized ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </aside>

      {/* Main Content */}
      <div className={`${isMinimized ? 'pl-20' : 'pl-64'} transition-all duration-300 relative z-10`}>
        {/* Header */}
        <header className="h-16 border-b border-border/50 flex items-center justify-between px-6 bg-card/60 backdrop-blur-xl sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-medium text-primary">Live</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-xl">
                  <Bell className="w-5 h-5" />
                  {notifications.length > 0 && (
                    <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full animate-pulse" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 bg-card/95 backdrop-blur-xl border-border/50">
                <DropdownMenuLabel className="text-foreground flex items-center justify-between">
                  Notifications
                  {notifications.length > 0 && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">{notifications.length}</span>
                  )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-border/50" />
                {notifications.map((notification) => (
                  <DropdownMenuItem 
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification.id)}
                    className="cursor-pointer hover:bg-secondary/50 p-3"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                      <div className="flex flex-col">
                        <span className="font-medium text-foreground">{notification.title}</span>
                        <span className="text-sm text-muted-foreground">{notification.message}</span>
                      </div>
                    </div>
                  </DropdownMenuItem>
                ))}
                {notifications.length === 0 && (
                  <div className="py-8 text-center text-muted-foreground">
                    <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>No new notifications</p>
                  </div>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-xl">
                  <User className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-card/95 backdrop-blur-xl border-border/50">
                <DropdownMenuLabel className="text-foreground">My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-border/50" />
                {isAdmin && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link to="/admin/sessions" className="flex items-center cursor-pointer hover:bg-secondary/50">
                        <Key className="w-4 h-4 mr-2" />
                        User Sessions
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/admin/settings" className="flex items-center cursor-pointer hover:bg-secondary/50">
                        <Settings className="w-4 h-4 mr-2" />
                        Platform Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-border/50" />
                  </>
                )}
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center cursor-pointer hover:bg-secondary/50">
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="flex items-center cursor-pointer hover:bg-secondary/50">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-border/50" />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive cursor-pointer hover:bg-destructive/10">
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