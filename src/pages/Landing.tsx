import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";

const Landing = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                <span className="text-primary font-display font-bold text-xl">C</span>
              </div>
              <span className="text-xl font-display font-bold text-foreground">
                CelerFi
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/signup" className="nav-link">Sign Up</Link>
              <Link to="/dashboard">
                <Button className="btn-primary h-11 px-6 text-sm gap-2">
                  Launch App
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pt-4 pb-6 space-y-4 border-t border-border/50 mt-4">
              <Link 
                to="/login" 
                className="block py-2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className="block py-2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign Up
              </Link>
              <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                <Button className="btn-primary w-full h-12 mt-2 gap-2">
                  Launch App
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </nav>

      <main>
        <HeroSection />
        <FeaturesSection />
      </main>

      {/* Footer */}
      <footer className="py-16 px-6 bg-card/50 border-t border-border/50">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="space-y-4">
              <Link to="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                  <span className="text-primary font-display font-bold text-xl">C</span>
                </div>
                <span className="text-xl font-display font-bold text-foreground">
                  CelerFi
                </span>
              </Link>
              <p className="text-muted-foreground leading-relaxed">
                Pioneering AI and sustainability in blockchain technology.
              </p>
            </div>

            {/* Platform Links */}
            <div>
              <h4 className="font-display font-bold text-foreground mb-4">Platform</h4>
              <ul className="space-y-3">
                <li><Link to="/staking" className="text-muted-foreground hover:text-primary transition-colors">Staking</Link></li>
                <li><Link to="/validators" className="text-muted-foreground hover:text-primary transition-colors">Validators</Link></li>
                <li><Link to="/swap" className="text-muted-foreground hover:text-primary transition-colors">Swap</Link></li>
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h4 className="font-display font-bold text-foreground mb-4">Resources</h4>
              <ul className="space-y-3">
                <li><Link to="/docs" className="text-muted-foreground hover:text-primary transition-colors">Documentation</Link></li>
                <li><Link to="/whitepaper" className="text-muted-foreground hover:text-primary transition-colors">Whitepaper</Link></li>
                <li><Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">FAQ</Link></li>
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-display font-bold text-foreground mb-4">Connect</h4>
              <ul className="space-y-3">
                <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">Twitter</a></li>
                <li><a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">Discord</a></li>
                <li><a href="https://telegram.org" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">Telegram</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-border/50 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} CelerFi. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-foreground transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;