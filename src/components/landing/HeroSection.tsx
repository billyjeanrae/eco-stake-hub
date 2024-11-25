import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen pt-32 pb-20 px-6 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-platform-green/20 via-platform-dark to-platform-dark z-0"></div>
      <div className="absolute top-20 right-20 w-72 h-72 bg-platform-green/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-platform-green via-platform-green-dark to-purple-500 bg-clip-text text-transparent">
                Pioneering AI and Sustainability in Blockchain
              </span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed max-w-xl">
              CelerFi reimagines blockchain by seamlessly blending advanced AI technology with a commitment to eco-friendly innovation.
            </p>
            <div className="flex items-center space-x-4 pt-6">
              <Link to="/signup">
                <Button size="lg" className="bg-platform-green hover:bg-platform-green-dark text-black text-lg px-8 py-6 rounded-full transition-all duration-300 hover:scale-105">
                  Start Building
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="#features">
                <Button size="lg" variant="outline" className="border-2 border-platform-green text-platform-green hover:bg-platform-green/10 text-lg px-8 py-6 rounded-full">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative animate-fade-in" style={{ animationDelay: "200ms" }}>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0"
                alt="Sustainable Blockchain Technology" 
                className="w-full rounded-3xl shadow-2xl glass-card"
              />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-platform-green rounded-full blur-3xl opacity-20"></div>
            </div>
            {/* Floating Stats */}
            <div className="absolute -right-8 top-1/4 glass-card p-4 animate-float">
              <p className="text-platform-green font-bold text-2xl">500ms</p>
              <p className="text-sm text-gray-400">Avg. Response Time</p>
            </div>
            <div className="absolute -left-8 bottom-1/4 glass-card p-4 animate-float" style={{ animationDelay: "1s" }}>
              <p className="text-platform-green font-bold text-2xl">99.9%</p>
              <p className="text-sm text-gray-400">Energy Efficient</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;