import MainLayout from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

const Settings = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john@example.com",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
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
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
        <h1 className="text-2xl font-bold">Account Settings</h1>

        <Card className="p-6 glass-card">
          <h2 className="text-xl font-bold mb-4">Profile Information</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="bg-background/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="bg-background/50"
              />
            </div>

            <Button type="submit" className="bg-primary hover:bg-primary/90">
              Update Profile
            </Button>
          </form>
        </Card>

        <Card className="p-6 glass-card">
          <h2 className="text-xl font-bold mb-4">Change Password</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Current Password</label>
              <Input
                name="currentPassword"
                type="password"
                value={formData.currentPassword}
                onChange={handleChange}
                className="bg-background/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">New Password</label>
              <Input
                name="newPassword"
                type="password"
                value={formData.newPassword}
                onChange={handleChange}
                className="bg-background/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Confirm New Password</label>
              <Input
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="bg-background/50"
              />
            </div>

            <Button type="submit" className="bg-primary hover:bg-primary/90">
              Change Password
            </Button>
          </form>
        </Card>

        <Card className="p-6 glass-card">
          <h2 className="text-xl font-bold mb-4">Notification Preferences</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Email Notifications</span>
              <Button variant="outline">Configure</Button>
            </div>
            <div className="flex items-center justify-between">
              <span>Platform Notifications</span>
              <Button variant="outline">Configure</Button>
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Settings;