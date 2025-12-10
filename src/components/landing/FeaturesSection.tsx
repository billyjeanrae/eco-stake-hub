import { Shield, Leaf, Cpu, Users, Zap, Globe, ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const FeaturesSection = () => {
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      icon: Shield,
      title: "AI-Driven Validation",
      description: "Secure transactions, earn rewards, and reduce energy consumption with intelligent automation.",
      color: "from-emerald-500 to-teal-500"
    },
    {
      icon: Leaf,
      title: "Sustainable DeFi",
      description: "Invest in green decentralized finance initiatives with our developer-friendly stack.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Zap,
      title: "Eco-Task Rewards",
      description: "Participate in AI-curated green initiatives and earn CLT for your contributions.",
      color: "from-yellow-500 to-green-500"
    },
    {
      icon: Cpu,
      title: "Scavenger X Tech",
      description: "Unlock seamless blockchain migration and achieve peak performance.",
      color: "from-cyan-500 to-emerald-500"
    },
    {
      icon: Users,
      title: "Community Growth",
      description: "Stake, validate, and earn while supporting clean energy innovations.",
      color: "from-teal-500 to-cyan-500"
    },
    {
      icon: Globe,
      title: "Global Impact",
      description: "Join a worldwide network committed to sustainable blockchain solutions.",
      color: "from-emerald-500 to-green-500"
    }
  ];

  // Interactive card mouse tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mouse-x', `${x}%`);
    card.style.setProperty('--mouse-y', `${y}%`);
  };

  return (
    <section id="features" ref={sectionRef} className="relative py-32 px-6 overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-[200px]" />
      
      {/* Animated background shapes */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-[100px] animate-pulse-slow" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-[120px] animate-pulse-slow stagger-3" />
      
      {/* Hex pattern */}
      <div className="absolute inset-0 hex-pattern opacity-50" />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6 animate-slide-up">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Core Features
          </div>
          <h2 className="section-heading animate-slide-up" style={{ animationDelay: '0.1s' }}>
            What Sets CelerFi Apart?
          </h2>
          <p className="section-subheading animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Experience the next generation of sustainable blockchain technology 
            with our innovative features and solutions.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index} 
                className="glass-card-interactive p-8 animate-fade-up opacity-0 group"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseEnter={() => setActiveFeature(index)}
                onMouseLeave={() => setActiveFeature(null)}
              >
                {/* Icon with glow */}
                <div className="relative mb-6">
                  <div className={`feature-icon bg-gradient-to-br ${feature.color} bg-opacity-10`}>
                    <Icon className="w-full h-full" />
                  </div>
                  <div className="absolute inset-0 bg-primary/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-display font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {feature.description}
                </p>
                
                {/* Learn more link */}
                <div className="flex items-center gap-1 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <span>Learn more</span>
                  <ChevronRight className="w-4 h-4" />
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-2xl">
                  <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-primary/0 via-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-32">
          <div className="glass-card p-8 md:p-12 relative overflow-hidden">
            <div className="absolute inset-0 cyber-grid opacity-30" />
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
              {[
                { value: "500K+", label: "Transactions" },
                { value: "120+", label: "Countries" },
                { value: "50M+", label: "CLT Staked" },
                { value: "99.9%", label: "Uptime" },
              ].map((stat, index) => (
                <div 
                  key={index} 
                  className="text-center group cursor-default"
                >
                  <p className="text-3xl md:text-4xl font-display font-bold gradient-text-animated group-hover:animate-pulse-glow transition-all duration-300">
                    {stat.value}
                  </p>
                  <p className="text-muted-foreground mt-2">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-32 text-center">
          <div className="gradient-border-animated inline-block">
            <div className="glass-card p-12 md:p-16 max-w-4xl mx-auto relative overflow-hidden bg-background">
              {/* Background Glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-primary/20 rounded-full blur-[100px] animate-pulse-slow" />
              
              {/* Floating orbs */}
              <div className="absolute top-10 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-float" />
              <div className="absolute bottom-10 right-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl animate-float stagger-2" />
              
              <div className="relative z-10 space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
                  <Zap className="w-4 h-4" />
                  Start earning today
                </div>
                
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold gradient-text">
                  Ready to Join the Future?
                </h3>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                  Join thousands of validators and stakers contributing to a greener 
                  blockchain future while earning CLT rewards.
                </p>
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link to="/signup">
                    <Button size="lg" className="btn-primary text-lg h-14 px-10 gap-2 group">
                      Start Staking Now
                      <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Link to="/validators">
                    <Button size="lg" variant="ghost" className="btn-outline text-lg h-14 px-8">
                      View Validators
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;