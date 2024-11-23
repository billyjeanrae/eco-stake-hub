import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-titan-dark to-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <img src="/placeholder.svg" alt="CelerFi" className="w-8 h-8" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-green-400 bg-clip-text text-transparent">
                CelerFi
              </span>
            </Link>
            <div className="flex items-center space-x-6">
              <Link to="/login" className="text-sm hover:text-primary transition-colors">Login</Link>
              <Link to="/signup" className="text-sm hover:text-primary transition-colors">Sign Up</Link>
              <Link to="/dashboard">
                <Button className="bg-primary hover:bg-primary/90">
                  Launch App
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight bg-gradient-to-r from-primary to-green-400 bg-clip-text text-transparent">
              Redefining Blockchain with AI and Sustainability
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
              CelerFi combines cutting-edge AI and eco-conscious innovation to create a blockchain platform that's smart, sustainable, and seamless.
            </p>
            <div className="flex items-center justify-center space-x-4 pt-6">
              <Link to="/signup">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Start Staking Today
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="#features">
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-black/50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "AI-Powered Validation",
                description: "Secure transactions, earn rewards, and optimize energy usage with AI-driven efficiency."
              },
              {
                title: "Green DeFi Innovation",
                description: "Invest in sustainable decentralized finance with an easy-to-use stack integratable via API."
              },
              {
                title: "Eco-Friendly Tasks",
                description: "Complete AI-curated tasks supporting green causes and earn rewards for your contributions."
              }
            ].map((feature, index) => (
              <div key={index} className="glass-card p-6 rounded-lg animate-fade-in" style={{ animationDelay: `${index * 200}ms` }}>
                <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-primary to-green-400 bg-clip-text text-transparent">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="glass-card p-12 rounded-lg text-center">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-green-400 bg-clip-text text-transparent">
              Join the Movement
            </h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Take the first step toward a smarter, greener blockchain future. Join CelerFi today and make an impact with every transaction.
            </p>
            <Link to="/signup">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Get Started
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;