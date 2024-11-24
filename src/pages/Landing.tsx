import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";

const Landing = () => {
  return (
    <div className="min-h-screen bg-platform-dark text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <img src="/placeholder.svg" alt="CelerFi" className="w-8 h-8" />
              <span className="text-xl font-bold bg-gradient-to-r from-platform-green to-platform-green-dark bg-clip-text text-transparent">
                CelerFi
              </span>
            </Link>
            <div className="flex items-center space-x-6">
              <Link to="/login" className="text-sm hover:text-platform-green transition-colors">Login</Link>
              <Link to="/signup" className="text-sm hover:text-platform-green transition-colors">Sign Up</Link>
              <Link to="/dashboard">
                <Button className="bg-platform-green hover:bg-platform-green-dark text-black">
                  Launch App
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <HeroSection />
      <FeaturesSection />

      {/* Additional sections can be added here as separate components */}
      
      {/* Footer */}
      <footer className="py-12 px-6 bg-black/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Link to="/" className="flex items-center space-x-2 mb-6">
                <img src="/placeholder.svg" alt="CelerFi" className="w-8 h-8" />
                <span className="text-xl font-bold bg-gradient-to-r from-platform-green to-platform-green-dark bg-clip-text text-transparent">
                  CelerFi
                </span>
              </Link>
              <p className="text-gray-400">
                Pioneering AI and sustainability in blockchain technology.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Platform</h4>
              <ul className="space-y-2">
                <li><Link to="/staking" className="text-gray-400 hover:text-platform-green">Staking</Link></li>
                <li><Link to="/validators" className="text-gray-400 hover:text-platform-green">Validators</Link></li>
                <li><Link to="/swap" className="text-gray-400 hover:text-platform-green">Swap</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><Link to="/docs" className="text-gray-400 hover:text-platform-green">Documentation</Link></li>
                <li><Link to="/whitepaper" className="text-gray-400 hover:text-platform-green">Whitepaper</Link></li>
                <li><Link to="/faq" className="text-gray-400 hover:text-platform-green">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Connect</h4>
              <ul className="space-y-2">
                <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-platform-green">Twitter</a></li>
                <li><a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-platform-green">Discord</a></li>
                <li><a href="https://telegram.org" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-platform-green">Telegram</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} CelerFi. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
