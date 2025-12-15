import MainLayout from "@/components/layout/MainLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { User, Lock, Bell, Shield, Eye, EyeOff, Check, Settings as SettingsIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const Settings = () => {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john@example.com",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [notifications, setNotifications] = useState({
    email: true,
    platform: true,
    marketing: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Settings Updated",
      description: "Your profile has been updated successfully.",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground flex items-center gap-3">
            Account Settings
            <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full flex items-center gap-1">
              <Shield className="w-3 h-3" />
              Secured
            </span>
          </h1>
          <p className="text-muted-foreground mt-1">Manage your account preferences and security</p>
        </div>

        {/* Profile Section */}
        <div className="glass-card p-6 animate-fade-up opacity-0 relative overflow-hidden group" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-primary/10">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-display font-bold text-foreground">Profile Information</h2>
                <p className="text-sm text-muted-foreground">Update your personal details</p>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-secondary/50 border-border/50 h-12 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-secondary/50 border-border/50 h-12 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <Button type="submit" className="btn-primary gap-2 group/btn relative overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  Update Profile
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
              </Button>
            </form>
          </div>
        </div>

        {/* Password Section */}
        <div className="glass-card p-6 animate-fade-up opacity-0 relative overflow-hidden group" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-primary/10">
                <Lock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-display font-bold text-foreground">Security</h2>
                <p className="text-sm text-muted-foreground">Update your password</p>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Current Password</label>
                <div className="relative">
                  <Input
                    name="currentPassword"
                    type={showPassword ? "text" : "password"}
                    value={formData.currentPassword}
                    onChange={handleChange}
                    className="bg-secondary/50 border-border/50 h-12 pr-12 focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">New Password</label>
                  <div className="relative">
                    <Input
                      name="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      value={formData.newPassword}
                      onChange={handleChange}
                      className="bg-secondary/50 border-border/50 h-12 pr-12 focus:border-primary focus:ring-2 focus:ring-primary/20"
                      placeholder="New password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Confirm Password</label>
                  <Input
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="bg-secondary/50 border-border/50 h-12 focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="Confirm password"
                  />
                </div>
              </div>

              <Button type="submit" className="btn-primary gap-2 group/btn relative overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Change Password
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
              </Button>
            </form>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="glass-card p-6 animate-fade-up opacity-0 relative overflow-hidden group" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-primary/10">
                <Bell className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-display font-bold text-foreground">Notifications</h2>
                <p className="text-sm text-muted-foreground">Manage your notification preferences</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 border border-border/50 hover:border-primary/30 transition-colors group/item">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-500/10">
                    <Bell className="w-4 h-4 text-green-500" />
                  </div>
                  <div>
                    <span className="text-foreground font-medium">Email Notifications</span>
                    <p className="text-sm text-muted-foreground">Receive updates via email</p>
                  </div>
                </div>
                <Switch 
                  checked={notifications.email}
                  onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 border border-border/50 hover:border-primary/30 transition-colors group/item">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    <SettingsIcon className="w-4 h-4 text-blue-500" />
                  </div>
                  <div>
                    <span className="text-foreground font-medium">Platform Notifications</span>
                    <p className="text-sm text-muted-foreground">In-app alerts and updates</p>
                  </div>
                </div>
                <Switch 
                  checked={notifications.platform}
                  onCheckedChange={(checked) => setNotifications({...notifications, platform: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 border border-border/50 hover:border-primary/30 transition-colors group/item">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/10">
                    <Bell className="w-4 h-4 text-purple-500" />
                  </div>
                  <div>
                    <span className="text-foreground font-medium">Marketing</span>
                    <p className="text-sm text-muted-foreground">News and promotional content</p>
                  </div>
                </div>
                <Switch 
                  checked={notifications.marketing}
                  onCheckedChange={(checked) => setNotifications({...notifications, marketing: checked})}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Settings;