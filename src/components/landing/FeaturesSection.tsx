import { Shield, Leaf, Cpu, Users, Zap, Globe, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const FeaturesSection = () => {
  const features = [
    {
      icon: <Shield className="w-8 h-8 text-platform-green" />,
      title: "AI-Driven Validation",
      description: "Secure transactions, earn rewards, and reduce energy consumption with intelligent, automated efficiency."
    },
    {
      icon: <Leaf className="w-8 h-8 text-platform-green" />,
      title: "Sustainable DeFi Solutions",
      description: "Invest in green decentralized finance initiatives with our developer-friendly stack."
    },
    {
      icon: <Zap className="w-8 h-8 text-platform-green" />,
      title: "Eco-Task Rewards",
      description: "Participate in AI-curated tasks supporting green initiatives and earn CLT for your efforts."
    },
    {
      icon: <Cpu className="w-8 h-8 text-platform-green" />,
      title: "Scavenger X Technology",
      description: "Unlock new possibilities with seamless blockchain migration and peak performance."
    },
    {
      icon: <Users className="w-8 h-8 text-platform-green" />,
      title: "Community-Powered Growth",
      description: "Stake, validate, and earn while supporting clean energy innovations."
    },
    {
      icon: <Globe className="w-8 h-8 text-platform-green" />,
      title: "Global Impact",
      description: "Join forces with a worldwide network committed to sustainable blockchain solutions."
    }
  ];

  return (
    <section id="features" className="relative py-32 px-6">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-purple-500/20 via-platform-dark to-platform-dark z-0"></div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-platform-green to-platform-green-dark bg-clip-text text-transparent">
              What Sets CelerFi Apart?
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Experience the next generation of sustainable blockchain technology with our innovative features and solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="glass-card p-8 hover:border-platform-green/50 transition-all duration-300 animate-fade-in rounded-3xl backdrop-blur-xl"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="mb-6 p-3 bg-platform-green/10 rounded-2xl inline-block">{feature.icon}</div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-platform-green to-platform-green-dark bg-clip-text text-transparent">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <Button size="lg" className="bg-platform-green hover:bg-platform-green-dark text-black text-lg px-8 py-6 rounded-full transition-all duration-300 hover:scale-105">
            Explore All Features
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;