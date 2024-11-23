import { Bell, Menu, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  
  const navigation = [
    { name: "Dashboard", href: "/" },
    { name: "Staking", href: "/staking" },
    { name: "History", href: "/history" },
    { name: "Team", href: "/team" },
    { name: "Ranking", href: "/ranking" },
    { name: "Marketing", href: "/marketing" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 h-full w-64 bg-titan-dark border-r border-white/10">
        <div className="p-6">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/placeholder.svg" alt="Logo" className="w-8 h-8" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
              Scavenger X
            </span>
          </Link>
        </div>

        <nav className="mt-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center px-6 py-3 text-sm ${
                location.pathname === item.href
                  ? "text-primary border-l-2 border-primary bg-primary/10"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className="pl-64">
        {/* Header */}
        <header className="h-16 border-b border-white/10 flex items-center justify-between px-6">
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

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;