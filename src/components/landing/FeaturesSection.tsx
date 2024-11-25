import { Shield, Leaf, Cpu, Users, Zap, Globe, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const FeaturesSection = () => {
  const features = [
    {
      icon: <Shield className="w-12 h-12 text-platform-green" />,
      title: "AI-Driven Validation",
      description: "Secure transactions, earn rewards, and reduce energy consumption with intelligent, automated efficiency."
    },
    {
      icon: <Leaf className="w-12 h-12 text-platform-green" />,
      title: "Sustainable DeFi Solutions",
      description: "Invest in green decentralized finance initiatives with our developer-friendly stack."
    },
    {
      icon: <Zap className="w-12 h-12 text-platform-green" />,
      title: "Eco-Task Rewards",
      description: "Participate in AI-curated tasks supporting green initiatives and earn CLT for your efforts."
    },
    {
      icon: <Cpu className="w-12 h-12 text-platform-green" />,
      title: "Scavenger X Technology",
      description: "Unlock new possibilities with seamless blockchain migration and peak performance."
    },
    {
      icon: <Users className="w-12 h-12 text-platform-green" />,
      title: "Community-Powered Growth",
      description: "Stake, validate, and earn while supporting clean energy innovations."
    },
    {
      icon: <Globe className="w-12 h-12 text-platform-green" />,
      title: "Global Impact",
      description: "Join forces with a worldwide network committed to sustainable blockchain solutions."
    }
  ];

  return (
    <section id="features" className="relative py-40 px-6">
      {/* Cosmic Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/20 via-platform-dark to-platform-dark z-0"></div>
      <div className="absolute top-1/3 right-1/4 w-[40rem] h-[40rem] bg-blue-500/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-1/3 left-1/4 w-[35rem] h-[35rem] bg-platform-green/20 rounded-full blur-[100px] animate-pulse delay-700"></div>
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
            <span className="bg-gradient-to-r from-platform-green to-platform-green-dark bg-clip-text text-transparent">
              What Sets CelerFi Apart?
            </span>
          </h2>
          <p className="text-2xl md:text-3xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Experience the next generation of sustainable blockchain technology with our innovative features and solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="glass-card p-10 hover:border-platform-green/50 transition-all duration-500 animate-fade-in rounded-3xl backdrop-blur-xl hover:scale-105"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="mb-8 p-4 bg-platform-green/10 rounded-2xl inline-block">{feature.icon}</div>
              <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-platform-green to-platform-green-dark bg-clip-text text-transparent">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-xl leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Enhanced Call to Action Section */}
        <div className="mt-32 text-center max-w-4xl mx-auto">
          <h3 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-platform-green to-platform-green-dark bg-clip-text text-transparent">
            Ready to Join the Future of Sustainable Staking?
          </h3>
          <p className="text-xl md:text-2xl text-gray-400 mb-12">
            Join thousands of validators and stakers who are already contributing to a greener blockchain future while earning CLT rewards.
          </p>
          <Link to="/signup" className="inline-block">
            <Button size="lg" className="bg-platform-green hover:bg-platform-green-dark text-black text-xl px-12 py-8 rounded-full transition-all duration-300 hover:scale-105">
              Start Staking Now
              <ArrowRight className="ml-3 w-6 h-6" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;