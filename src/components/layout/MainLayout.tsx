import { Bell, Menu, User, LayoutDashboard, History, Users, Trophy, Gift, Megaphone, Server, ArrowLeftRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  
  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Validators", href: "/validators", icon: Server },
    { name: "Swap", href: "/swap", icon: ArrowLeftRight },
    { name: "History", href: "/history", icon: History },
    { name: "Team", href: "/team", icon: Users },
    { name: "Ranking", href: "/ranking", icon: Trophy },
    { name: "Bonus Pools", href: "/bonus-pools", icon: Gift },
    { name: "Marketing", href: "/marketing", icon: Megaphone },
  ];

  return (
    <div className="min-h-screen bg-platform-dark">
      <aside className="fixed top-0 left-0 h-full w-64 bg-platform-card border-r border-white/10">
        <div className="p-6">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/placeholder.svg" alt="Logo" className="w-8 h-8" />
            <span className="text-xl font-bold bg-gradient-to-r from-platform-green to-platform-green-dark bg-clip-text text-transparent">
              Scavenger X
            </span>
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
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </aside>

      <div className="pl-64">
        <header className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-platform-card/50 backdrop-blur-lg">
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-white/5 rounded-lg">
              <Menu className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-white/5 rounded-lg">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-white/5 rounded-lg">
              <User className="w-5 h-5" />
            </button>
          </div>
        </header>

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;