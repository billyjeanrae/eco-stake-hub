import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen pt-32 pb-20 px-6 overflow-hidden flex items-center">
      {/* Ambient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/95" />
      
      {/* Animated Orbs */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[150px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 left-1/6 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[180px] animate-pulse-slow stagger-2" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[200px]" />
      
      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Badge */}
          <div className="animate-fade-up opacity-0 stagger-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              <span>Pioneering Sustainable Blockchain</span>
            </div>
          </div>

          {/* Main Heading */}
          <div className="space-y-6 max-w-5xl animate-fade-up opacity-0 stagger-2">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold leading-[1.1] tracking-tight">
              <span className="text-foreground">The Future of</span>
              <br />
              <span className="gradient-text">Eco-Friendly Staking</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto text-balance">
              CelerFi reimagines blockchain by seamlessly blending advanced AI technology 
              with a commitment to sustainable, carbon-neutral innovation.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 animate-fade-up opacity-0 stagger-3">
            <Link to="/signup">
              <Button size="lg" className="btn-primary text-lg h-14 px-8 gap-2">
                Start Staking
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="#features">
              <Button size="lg" variant="ghost" className="btn-outline text-lg h-14 px-8">
                Explore Features
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl mt-20 animate-fade-up opacity-0 stagger-4">
            <div className="stat-card animate-float">
              <p className="stat-value">$50M+</p>
              <p className="stat-label">Total Value Locked</p>
            </div>
            <div className="stat-card animate-float stagger-2">
              <p className="stat-value">15K+</p>
              <p className="stat-label">Active Validators</p>
            </div>
            <div className="stat-card animate-float stagger-4">
              <p className="stat-value">99.9%</p>
              <p className="stat-label">Carbon Neutral</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;