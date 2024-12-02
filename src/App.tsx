import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Validators from "./pages/Validators";
import Swap from "./pages/Swap";
import History from "./pages/History";
import Team from "./pages/Team";
import Ranking from "./pages/Ranking";
import Marketing from "./pages/Marketing";
import Wallet from "./pages/Wallet";
import Settings from "./pages/Settings";
import Admin from "./pages/Admin";
import { PlatformSettings } from "./components/admin/PlatformSettings";
import { UserSessions } from "./components/admin/UserSessions";
import { UserManagement } from "./components/admin/UserManagement";
import { ValidatorManagement } from "./components/admin/ValidatorManagement";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/validators" element={<Validators />} />
          <Route path="/swap" element={<Swap />} />
          <Route path="/history" element={<History />} />
          <Route path="/team" element={<Team />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/marketing" element={<Marketing />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/settings" element={<Settings />} />
          
          {/* Admin routes */}
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/validators" element={<ValidatorManagement />} />
          <Route path="/admin/sessions" element={<UserSessions />} />
          <Route path="/admin/settings" element={<PlatformSettings />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;