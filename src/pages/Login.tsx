import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Mail, Lock, Zap, Shield, Sparkles } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  const handleResendConfirmation = async () => {
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
      });
      
      if (error) throw error;
      
      toast({
        title: "Confirmation email sent",
        description: "Please check your email for the confirmation link.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message.includes("Email not confirmed")) {
          toast({
            title: "Email not confirmed",
            description: (
              <div className="space-y-2">
                <p>Please confirm your email address to continue.</p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleResendConfirmation}
                >
                  Resend confirmation email
                </Button>
              </div>
            ),
            duration: 10000,
          });
          return;
        }
        throw error;
      }

      toast({
        title: "Success",
        description: "You have been logged in successfully.",
      });
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

  const features = [
    { icon: Zap, text: "Instant Access" },
    { icon: Shield, text: "Secure Login" },
    { icon: Sparkles, text: "High Rewards" },
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
        {[...Array(20)].map((_, i) => (
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

      {/* Orbiting Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none">
        <div className="absolute inset-0 animate-orbit-slow">
          <div className="absolute top-0 left-1/2 w-2 h-2 bg-primary/60 rounded-full blur-sm" />
        </div>
        <div className="absolute inset-0 animate-orbit-reverse" style={{ animationDuration: '25s' }}>
          <div className="absolute bottom-0 right-1/4 w-3 h-3 bg-primary/40 rounded-full blur-sm" />
        </div>
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
            Welcome Back to
            <span className="block bg-gradient-to-r from-primary via-primary to-primary/50 bg-clip-text text-transparent">
              The Future of Staking
            </span>
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-md">
            Access your dashboard, monitor your stakes, and continue earning rewards with our cutting-edge platform.
          </p>

          <div className="flex flex-wrap gap-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 animate-fade-up opacity-0"
                  style={{ animationDelay: `${(index + 2) * 150}ms`, animationFillMode: 'forwards' }}
                >
                  <Icon className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">{feature.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-md animate-fade-up opacity-0 stagger-1" style={{ animationFillMode: 'forwards', animationDelay: '200ms' }}>
          {/* Mobile Logo */}
          <div className="text-center mb-8 lg:hidden">
            <Link to="/" className="inline-flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-2xl">C</span>
              </div>
            </Link>
            <h1 className="text-3xl font-display font-bold text-foreground mb-2">
              Welcome Back
            </h1>
            <p className="text-muted-foreground">
              Sign in to access your account
            </p>
          </div>

          {/* Form Card */}
          <div className="glass-card p-8 relative group">
            {/* Hover Glow Effect */}
            <div className="absolute -inset-px bg-gradient-to-r from-primary/50 via-transparent to-primary/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
            
            <div className="relative">
              <div className="hidden lg:block mb-6">
                <h2 className="text-2xl font-display font-bold text-foreground mb-2">Sign In</h2>
                <p className="text-muted-foreground">Enter your credentials to continue</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
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
                      placeholder="Enter your password"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full btn-primary h-12 text-base group/btn relative overflow-hidden"
                  disabled={isLoading}
                >
                  <span className="relative z-10">{isLoading ? "Signing in..." : "Sign In"}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                </Button>
              </form>

              <div className="mt-6 text-center">
                <span className="text-muted-foreground">Don't have an account?</span>{" "}
                <Link to="/signup" className="text-primary hover:underline font-medium hover:text-primary/80 transition-colors">
                  Sign up
                </Link>
              </div>
            </div>
          </div>

          {/* Security Badge */}
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground animate-fade-up opacity-0" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
            <Shield className="w-4 h-4 text-primary" />
            <span>Protected by enterprise-grade security</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;