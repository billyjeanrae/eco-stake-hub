import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { generateWalletFromMasterKey } from "@/utils/walletUtils";
import { ArrowLeft, Mail, Lock, User, Wallet, TrendingUp, Gift, Shield } from "lucide-react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) throw error;

      if (data.user) {
        try {
          await generateWalletFromMasterKey(data.user.id);
          toast({
            title: "Success",
            description: "Your account and wallet have been created successfully. Please check your email for verification.",
          });
        } catch (walletError: any) {
          console.error('Error creating wallet:', walletError);
          toast({
            title: "Warning",
            description: "Account created but wallet creation failed. Please contact support.",
            variant: "destructive",
          });
        }
      }

      navigate("/dashboard");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const benefits = [
    { icon: Wallet, title: "Auto Wallet", desc: "Get your secure wallet instantly" },
    { icon: TrendingUp, title: "High APY", desc: "Earn up to 432% annual returns" },
    { icon: Gift, title: "Referral Rewards", desc: "Earn from your network" },
  ];

  return (
    <div className="min-h-screen bg-background flex relative overflow-hidden">
      {/* Dynamic Background */}
      <div 
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, hsl(var(--primary) / 0.1), transparent 40%)`,
        }}
      />

      {/* Animated Grid */}
      <div className="absolute inset-0 cyber-grid opacity-30" />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/40 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Back Button */}
      <Link 
        to="/" 
        className="absolute top-6 left-6 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-all duration-300 z-20 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span>Back</span>
      </Link>

      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-12 xl:px-20 relative z-10">
        <div className="animate-fade-up opacity-0" style={{ animationFillMode: 'forwards' }}>
          <Link to="/" className="inline-flex items-center gap-3 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center shadow-lg shadow-primary/25">
              <span className="text-primary-foreground font-display font-bold text-2xl">C</span>
            </div>
            <span className="text-2xl font-display font-bold text-foreground">CelerFi</span>
          </Link>
          
          <h1 className="text-4xl xl:text-5xl font-display font-bold text-foreground mb-4">
            Start Your Journey to
            <span className="block bg-gradient-to-r from-primary via-primary to-primary/50 bg-clip-text text-transparent">
              Financial Freedom
            </span>
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-md">
            Join thousands of investors earning passive income through our revolutionary staking platform.
          </p>

          <div className="space-y-4">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div 
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm animate-fade-up opacity-0 hover:border-primary/30 transition-colors group"
                  style={{ animationDelay: `${(index + 2) * 150}ms`, animationFillMode: 'forwards' }}
                >
                  <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-md animate-fade-up opacity-0" style={{ animationFillMode: 'forwards', animationDelay: '200ms' }}>
          {/* Mobile Logo */}
          <div className="text-center mb-6 lg:hidden">
            <Link to="/" className="inline-flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-2xl">C</span>
              </div>
            </Link>
            <h1 className="text-2xl font-display font-bold text-foreground mb-2">
              Create Account
            </h1>
            <p className="text-muted-foreground text-sm">
              Join CelerFi and start earning
            </p>
          </div>

          {/* Form Card */}
          <div className="glass-card p-6 lg:p-8 relative group">
            {/* Hover Glow Effect */}
            <div className="absolute -inset-px bg-gradient-to-r from-primary/50 via-transparent to-primary/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
            
            <div className="relative">
              <div className="hidden lg:block mb-6">
                <h2 className="text-2xl font-display font-bold text-foreground mb-2">Create Account</h2>
                <p className="text-muted-foreground">Start your staking journey today</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-foreground">Full Name</Label>
                  <div className="relative group/input">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within/input:text-primary transition-colors" />
                    <Input
                      id="fullName"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="pl-10 bg-secondary/50 border-border/50 h-12 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="Enter your full name"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">Email</Label>
                  <div className="relative group/input">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within/input:text-primary transition-colors" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-10 bg-secondary/50 border-border/50 h-12 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="Enter your email"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-foreground">Password</Label>
                    <div className="relative group/input">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within/input:text-primary transition-colors" />
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="pl-10 bg-secondary/50 border-border/50 h-12 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        placeholder="Password"
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-foreground">Confirm</Label>
                    <div className="relative group/input">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within/input:text-primary transition-colors" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="pl-10 bg-secondary/50 border-border/50 h-12 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        placeholder="Confirm"
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full btn-primary h-12 text-base group/btn relative overflow-hidden mt-2"
                  disabled={isLoading}
                >
                  <span className="relative z-10">{isLoading ? "Creating Account..." : "Create Account"}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                </Button>
              </form>

              <div className="mt-6 text-center">
                <span className="text-muted-foreground">Already have an account?</span>{" "}
                <Link to="/login" className="text-primary hover:underline font-medium hover:text-primary/80 transition-colors">
                  Sign in
                </Link>
              </div>
            </div>
          </div>

          {/* Security Badge */}
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground animate-fade-up opacity-0" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
            <Shield className="w-4 h-4 text-primary" />
            <span>Your data is protected with bank-level encryption</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;