import { Shield, Leaf, Cpu, Users, Zap } from "lucide-react";

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
    }
  ];

  return (
    <section id="features" className="py-20 px-6 bg-black/30">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-center mb-12">
          <span className="bg-gradient-to-r from-platform-green to-platform-green-dark bg-clip-text text-transparent">
            What Sets CelerFi Apart?
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="glass-card p-6 hover:border-platform-green/50 transition-all duration-300 animate-fade-in" 
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-platform-green to-platform-green-dark bg-clip-text text-transparent">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;