import { Shield, Leaf, Cpu, Users, Zap, Globe, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const FeaturesSection = () => {
  const features = [
    {
      icon: Shield,
      title: "AI-Driven Validation",
      description: "Secure transactions, earn rewards, and reduce energy consumption with intelligent automation."
    },
    {
      icon: Leaf,
      title: "Sustainable DeFi",
      description: "Invest in green decentralized finance initiatives with our developer-friendly stack."
    },
    {
      icon: Zap,
      title: "Eco-Task Rewards",
      description: "Participate in AI-curated green initiatives and earn CLT for your contributions."
    },
    {
      icon: Cpu,
      title: "Scavenger X Tech",
      description: "Unlock seamless blockchain migration and achieve peak performance."
    },
    {
      icon: Users,
      title: "Community Growth",
      description: "Stake, validate, and earn while supporting clean energy innovations."
    },
    {
      icon: Globe,
      title: "Global Impact",
      description: "Join a worldwide network committed to sustainable blockchain solutions."
    }
  ];

  return (
    <section id="features" className="relative py-32 px-6">
      {/* Ambient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-[200px]" />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 space-y-4">
          <h2 className="section-heading">
            What Sets CelerFi Apart?
          </h2>
          <p className="section-subheading">
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
                className="glass-card-hover p-8 animate-fade-up opacity-0"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
              >
                <div className="feature-icon mb-6">
                  <Icon className="w-full h-full" />
                </div>
                <h3 className="text-2xl font-display font-bold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-32 text-center">
          <div className="glass-card p-12 md:p-16 max-w-4xl mx-auto relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-primary/20 rounded-full blur-[100px]" />
            
            <div className="relative z-10 space-y-6">
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold gradient-text">
                Ready to Join the Future?
              </h3>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Join thousands of validators and stakers contributing to a greener 
                blockchain future while earning CLT rewards.
              </p>
              <div className="pt-4">
                <Link to="/signup">
                  <Button size="lg" className="btn-primary text-lg h-14 px-10 gap-2">
                    Start Staking Now
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;