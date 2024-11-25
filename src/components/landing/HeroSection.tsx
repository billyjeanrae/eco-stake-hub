import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen pt-40 pb-32 px-6 overflow-hidden">
      {/* Cosmic Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/20 via-platform-dark to-platform-dark z-0"></div>
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-platform-green/20 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-1/4 left-1/4 w-[30rem] h-[30rem] bg-purple-500/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>
      <div className="absolute top-1/3 left-1/2 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px] animate-pulse delay-500"></div>
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col items-center text-center space-y-12">
          <div className="space-y-8 animate-fade-in max-w-4xl">
            <h1 className="text-6xl md:text-8xl font-bold leading-tight tracking-tight">
              <span className="bg-gradient-to-r from-platform-green via-platform-green-dark to-purple-500 bg-clip-text text-transparent">
                Pioneering AI and Sustainability in Blockchain
              </span>
            </h1>
            <p className="text-2xl md:text-3xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
              CelerFi reimagines blockchain by seamlessly blending advanced AI technology with a commitment to eco-friendly innovation.
            </p>
            <div className="flex items-center justify-center space-x-6 pt-8">
              <Link to="/signup">
                <Button size="lg" className="bg-platform-green hover:bg-platform-green-dark text-black text-xl px-10 py-8 rounded-full transition-all duration-300 hover:scale-105">
                  Start Building
                  <ArrowRight className="ml-3 w-6 h-6" />
                </Button>
              </Link>
              <Link to="#features">
                <Button size="lg" variant="outline" className="border-2 border-platform-green text-platform-green hover:bg-platform-green/10 text-xl px-10 py-8 rounded-full">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>

          {/* Floating Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mt-20">
            <div className="glass-card p-8 animate-float backdrop-blur-xl">
              <p className="text-platform-green font-bold text-4xl">500ms</p>
              <p className="text-xl text-gray-400">Avg. Response Time</p>
            </div>
            <div className="glass-card p-8 animate-float delay-300 backdrop-blur-xl">
              <p className="text-platform-green font-bold text-4xl">99.9%</p>
              <p className="text-xl text-gray-400">Energy Efficient</p>
            </div>
            <div className="glass-card p-8 animate-float delay-500 backdrop-blur-xl">
              <p className="text-platform-green font-bold text-4xl">24/7</p>
              <p className="text-xl text-gray-400">Global Support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;