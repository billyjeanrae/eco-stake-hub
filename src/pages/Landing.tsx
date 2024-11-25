import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";

const Landing = () => {
  return (
    <div className="min-h-screen bg-platform-dark text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/30 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <img src="/placeholder.svg" alt="CelerFi" className="w-10 h-10" />
              <span className="text-2xl font-bold bg-gradient-to-r from-platform-green to-platform-green-dark bg-clip-text text-transparent">
                CelerFi
              </span>
            </Link>
            <div className="flex items-center space-x-8">
              <Link to="/login" className="text-lg hover:text-platform-green transition-colors">Login</Link>
              <Link to="/signup" className="text-lg hover:text-platform-green transition-colors">Sign Up</Link>
              <Link to="/dashboard">
                <Button className="bg-platform-green hover:bg-platform-green-dark text-black text-lg px-8 py-6 rounded-full">
                  Launch App
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <HeroSection />
      <FeaturesSection />

      {/* Footer */}
      <footer className="py-20 px-8 bg-black/30 backdrop-blur-xl border-t border-white/10">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="space-y-6">
              <Link to="/" className="flex items-center space-x-3">
                <img src="/placeholder.svg" alt="CelerFi" className="w-10 h-10" />
                <span className="text-2xl font-bold bg-gradient-to-r from-platform-green to-platform-green-dark bg-clip-text text-transparent">
                  CelerFi
                </span>
              </Link>
              <p className="text-xl text-gray-400">
                Pioneering AI and sustainability in blockchain technology.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-6">Platform</h4>
              <ul className="space-y-4">
                <li><Link to="/staking" className="text-lg text-gray-400 hover:text-platform-green">Staking</Link></li>
                <li><Link to="/validators" className="text-lg text-gray-400 hover:text-platform-green">Validators</Link></li>
                <li><Link to="/swap" className="text-lg text-gray-400 hover:text-platform-green">Swap</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-6">Resources</h4>
              <ul className="space-y-4">
                <li><Link to="/docs" className="text-lg text-gray-400 hover:text-platform-green">Documentation</Link></li>
                <li><Link to="/whitepaper" className="text-lg text-gray-400 hover:text-platform-green">Whitepaper</Link></li>
                <li><Link to="/faq" className="text-lg text-gray-400 hover:text-platform-green">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-6">Connect</h4>
              <ul className="space-y-4">
                <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-lg text-gray-400 hover:text-platform-green">Twitter</a></li>
                <li><a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-lg text-gray-400 hover:text-platform-green">Discord</a></li>
                <li><a href="https://telegram.org" target="_blank" rel="noopener noreferrer" className="text-lg text-gray-400 hover:text-platform-green">Telegram</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-16 pt-8 text-center">
            <p className="text-lg text-gray-400">&copy; {new Date().getFullYear()} CelerFi. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;