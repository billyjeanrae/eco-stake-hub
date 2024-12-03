import { Link, useLocation } from "react-router-dom";
import { Menu, Users, Server, History, Settings, ChevronDown } from "lucide-react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-platform-dark">
      <header className="border-b border-white/10 bg-platform-card/50 backdrop-blur-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/admin" className="flex items-center space-x-2">
              <img src="/placeholder.svg" alt="Logo" className="w-8 h-8" />
              <span className="text-xl font-bold bg-gradient-to-r from-platform-green to-platform-green-dark bg-clip-text text-transparent">
                Admin Panel
              </span>
            </Link>

            <Menubar className="border-none bg-transparent">
              <MenubarMenu>
                <MenubarTrigger className={`${isActiveRoute('/admin') ? 'text-platform-green' : 'text-gray-400'}`}>
                  <Menu className="w-4 h-4 mr-2" />
                  Dashboard
                </MenubarTrigger>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger className={`${isActiveRoute('/admin/users') ? 'text-platform-green' : 'text-gray-400'}`}>
                  <Users className="w-4 h-4 mr-2" />
                  Users
                </MenubarTrigger>
                <MenubarContent className="bg-platform-card border-white/10">
                  <MenubarItem>
                    <Link to="/admin/users" className="flex items-center w-full">
                      User Management
                    </Link>
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>
                    <Link to="/admin/sessions" className="flex items-center w-full">
                      User Sessions
                    </Link>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger className={`${isActiveRoute('/admin/validators') ? 'text-platform-green' : 'text-gray-400'}`}>
                  <Server className="w-4 h-4 mr-2" />
                  Validators
                </MenubarTrigger>
                <MenubarContent className="bg-platform-card border-white/10">
                  <MenubarItem>
                    <Link to="/admin/validators" className="flex items-center w-full">
                      Validator Management
                    </Link>
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>
                    <Link to="/admin/validator-tiers" className="flex items-center w-full">
                      Validator Tiers
                    </Link>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger className={`${isActiveRoute('/admin/settings') ? 'text-platform-green' : 'text-gray-400'}`}>
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </MenubarTrigger>
                <MenubarContent className="bg-platform-card border-white/10">
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
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;