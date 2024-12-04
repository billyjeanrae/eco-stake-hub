import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, Users, Server, History, Settings, ChevronLeft } from "lucide-react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Button } from "@/components/ui/button";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/admin':
        return 'Dashboard';
      case '/admin/users':
        return 'User Management';
      case '/admin/sessions':
        return 'User Sessions';
      case '/admin/validators':
        return 'Validator Management';
      case '/admin/settings':
        return 'Platform Settings';
      default:
        return 'Admin Panel';
    }
  };

  return (
    <div className="min-h-screen bg-platform-dark">
      <header className="border-b border-white/10 bg-platform-card/50 backdrop-blur-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate(-1)}
                className="hover:bg-white/5"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Link to="/admin" className="flex items-center space-x-2">
                <img src="/placeholder.svg" alt="Logo" className="w-8 h-8" />
                <span className="text-xl font-bold bg-gradient-to-r from-platform-green to-platform-green-dark bg-clip-text text-transparent">
                  {getPageTitle()}
                </span>
              </Link>
            </div>

            <Menubar className="border-none bg-transparent">
              <MenubarMenu>
                <MenubarTrigger className={`${isActiveRoute('/admin') ? 'text-platform-green' : 'text-gray-400'} hover:bg-white/5`}>
                  <Menu className="w-4 h-4 mr-2" />
                  Dashboard
                </MenubarTrigger>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger className={`${isActiveRoute('/admin/users') || isActiveRoute('/admin/sessions') ? 'text-platform-green' : 'text-gray-400'} hover:bg-white/5`}>
                  <Users className="w-4 h-4 mr-2" />
                  Users
                </MenubarTrigger>
                <MenubarContent className="bg-platform-card/95 backdrop-blur-lg border-white/10">
                  <MenubarItem>
                    <Link to="/admin/users" className="flex items-center w-full">
                      User Management
                    </Link>
                  </MenubarItem>
                  <MenubarSeparator className="bg-white/10" />
                  <MenubarItem>
                    <Link to="/admin/sessions" className="flex items-center w-full">
                      User Sessions
                    </Link>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger className={`${isActiveRoute('/admin/validators') ? 'text-platform-green' : 'text-gray-400'} hover:bg-white/5`}>
                  <Server className="w-4 h-4 mr-2" />
                  Validators
                </MenubarTrigger>
                <MenubarContent className="bg-platform-card/95 backdrop-blur-lg border-white/10">
                  <MenubarItem>
                    <Link to="/admin/validators" className="flex items-center w-full">
                      Validator Management
                    </Link>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger className={`${isActiveRoute('/admin/settings') ? 'text-platform-green' : 'text-gray-400'} hover:bg-white/5`}>
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </MenubarTrigger>
                <MenubarContent className="bg-platform-card/95 backdrop-blur-lg border-white/10">
                  <MenubarItem>
                    <Link to="/admin/settings" className="flex items-center w-full">
                      Platform Settings
                    </Link>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;