import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Server, Settings } from "lucide-react";
import { Link } from "react-router-dom";

export const QuickActions = () => {
  const actions = [
    {
      title: "Manage Users",
      description: "View and manage user accounts",
      icon: Users,
      href: "/admin/users",
    },
    {
      title: "Validator Settings",
      description: "Configure validator tiers and rewards",
      icon: Server,
      href: "/admin/validators",
    },
    {
      title: "Platform Settings",
      description: "Adjust platform configurations",
      icon: Settings,
      href: "/admin/settings",
    },
  ];

  return (
    <Card className="p-6 bg-platform-card/50 backdrop-blur-lg border-white/10">
      <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-platform-green to-platform-green-dark bg-clip-text text-transparent">
        Quick Actions
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {actions.map((action) => (
          <Link key={action.title} to={action.href}>
            <Button
              variant="outline"
              className="w-full h-full p-6 flex flex-col items-center justify-center space-y-2 border-white/10 hover:border-platform-green/50 transition-all duration-300"
            >
              <action.icon className="w-8 h-8 text-platform-green" />
              <div className="text-center">
                <h3 className="font-semibold">{action.title}</h3>
                <p className="text-sm text-gray-400">{action.description}</p>
              </div>
            </Button>
          </Link>
        ))}
      </div>
    </Card>
  );
};