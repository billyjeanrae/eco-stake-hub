import { ArrowRight, Sparkles, Zap, Shield, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    };

    const container = containerRef.current;
    container?.addEventListener('mousemove', handleMouseMove);
    return () => container?.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen pt-32 pb-20 px-6 overflow-hidden flex items-center"
    >
      {/* Dynamic Background */}
      <div 
        className="absolute inset-0 transition-all duration-1000"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, hsl(157 100% 50% / 0.08), transparent 50%)`
        }}
      />
      
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/95" />
      
      {/* Animated Orbs */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[150px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 left-1/6 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[180px] animate-pulse-slow stagger-2" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[200px]" />
      
      {/* Orbiting elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] orbit opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] orbit opacity-20" style={{ animationDuration: '30s', animationDirection: 'reverse' }} />
      
      {/* Pulse rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="pulse-ring w-[300px] h-[300px]" />
        <div className="pulse-ring w-[300px] h-[300px]" style={{ animationDelay: '1s' }} />
        <div className="pulse-ring w-[300px] h-[300px]" style={{ animationDelay: '2s' }} />
      </div>
      
      {/* Cyber Grid */}
      <div className="cyber-grid" />
      
      {/* Hex pattern overlay */}
      <div className="absolute inset-0 hex-pattern" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle animate-float"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 5}s`,
              opacity: Math.random() * 0.5 + 0.2,
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Badge */}
          <div className="animate-fade-up opacity-0 stagger-1">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium backdrop-blur-sm hover:bg-primary/15 hover:border-primary/50 transition-all duration-300 cursor-default group">
              <Sparkles className="w-4 h-4 animate-pulse-glow" />
              <span>Pioneering Sustainable Blockchain</span>
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            </div>
          </div>

          {/* Main Heading */}
          <div className="space-y-6 max-w-5xl animate-fade-up opacity-0 stagger-2">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold leading-[1.1] tracking-tight">
              <span className="text-foreground block">The Future of</span>
              <span className="gradient-text-animated block mt-2">Eco-Friendly Staking</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto text-balance">
              CelerFi reimagines blockchain by seamlessly blending advanced AI technology 
              with a commitment to sustainable, carbon-neutral innovation.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 animate-fade-up opacity-0 stagger-3">
            <Link to="/signup">
              <Button size="lg" className="btn-primary text-lg h-14 px-8 gap-2 group">
                Start Staking
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="#features">
              <Button size="lg" variant="ghost" className="btn-outline text-lg h-14 px-8 group">
                <span>Explore Features</span>
              </Button>
            </Link>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-3 pt-8 animate-fade-up opacity-0 stagger-4">
            {[
              { icon: Zap, label: "Instant Rewards" },
              { icon: Shield, label: "Secure Protocol" },
              { icon: Cpu, label: "AI-Powered" },
            ].map((item, index) => (
              <div 
                key={index}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-border/50 text-sm text-muted-foreground hover:border-primary/30 hover:text-foreground transition-all duration-300 backdrop-blur-sm"
              >
                <item.icon className="w-4 h-4 text-primary" />
                <span>{item.label}</span>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl mt-16 animate-fade-up opacity-0 stagger-5">
            {[
              { value: "$50M+", label: "Total Value Locked", delay: "0s" },
              { value: "15K+", label: "Active Validators", delay: "0.1s" },
              { value: "99.9%", label: "Carbon Neutral", delay: "0.2s" },
            ].map((stat, index) => (
              <div 
                key={index}
                className="stat-card group animate-float"
                style={{ animationDelay: stat.delay }}
              >
                <div className="relative">
                  <p className="stat-value group-hover:animate-pulse-glow">{stat.value}</p>
                  <div className="absolute -inset-4 bg-primary/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <p className="stat-label">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      
      {/* Scanlines overlay */}
      <div className="scanlines" />
    </section>
  );
};

export default HeroSection;