import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-platform-green to-platform-green-dark bg-clip-text text-transparent">
                Pioneering AI and Sustainability in Blockchain
              </span>
            </h1>
            <p className="text-lg text-gray-400">
              CelerFi reimagines blockchain by seamlessly blending advanced AI technology with a commitment to eco-friendly innovation.
            </p>
            <div className="flex items-center space-x-4 pt-6">
              <Link to="/signup">
                <Button size="lg" className="bg-platform-green hover:bg-platform-green-dark text-black">
                  Start Building
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="#features">
                <Button size="lg" variant="outline" className="border-platform-green text-platform-green hover:bg-platform-green/10">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative animate-fade-in" style={{ animationDelay: "200ms" }}>
            <img 
              src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7" 
              alt="Sustainable Blockchain Technology" 
              className="w-full rounded-lg shadow-2xl glass-card"
            />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-platform-green rounded-full blur-3xl opacity-20"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;