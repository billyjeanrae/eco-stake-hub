import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Leaf, Cpu, Network, Users, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

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

      {/* Hero Section */}
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
              <img src="/lovable-uploads/969be90e-8ed5-4381-a3ba-d31750eb50dc.png" alt="Platform Preview" className="w-full rounded-lg shadow-2xl" />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-platform-green rounded-full blur-3xl opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-6 bg-black/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-platform-green to-platform-green-dark bg-clip-text text-transparent">
              What Sets CelerFi Apart?
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="w-8 h-8 text-platform-green" />,
                title: "AI-Driven Validation",
                description: "Secure transactions, earn rewards, and optimize energy usage with AI-driven efficiency."
              },
              {
                icon: <Leaf className="w-8 h-8 text-platform-green" />,
                title: "Sustainable DeFi",
                description: "Invest in green decentralized finance with our easy-to-use stack integratable via API."
              },
              {
                icon: <Cpu className="w-8 h-8 text-platform-green" />,
                title: "Scavenger X Technology",
                description: "Unlock new possibilities with seamless blockchain migration and peak performance."
              }
            ].map((feature, index) => (
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

      {/* Token Distribution */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="glass-card p-12">
            <h2 className="text-3xl font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-platform-green to-platform-green-dark bg-clip-text text-transparent">
                CLT Token Distribution
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 glass-card">
                  <span>Staking Rewards</span>
                  <span className="text-platform-green">40%</span>
                </div>
                <div className="flex items-center justify-between p-4 glass-card">
                  <span>Community Development</span>
                  <span className="text-platform-green">30%</span>
                </div>
                <div className="flex items-center justify-between p-4 glass-card">
                  <span>Ecosystem Growth</span>
                  <span className="text-platform-green">20%</span>
                </div>
                <div className="flex items-center justify-between p-4 glass-card">
                  <span>Team & Advisors</span>
                  <span className="text-platform-green">10%</span>
                </div>
              </div>
              <div className="relative">
                {/* Placeholder for token distribution chart */}
                <div className="aspect-square rounded-full border-4 border-platform-green/30 relative">
                  <div className="absolute inset-0 border-t-4 border-platform-green rounded-full animate-spin" style={{ animationDuration: '3s' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-20 px-6 bg-black/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-platform-green to-platform-green-dark bg-clip-text text-transparent">
              Roadmap
            </span>
          </h2>
          <div className="relative">
            <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-platform-green/20"></div>
            {[
              { date: "Q1 2024", title: "Platform Launch", description: "Initial release of CelerFi platform with core staking features" },
              { date: "Q2 2024", title: "Scavenger X Integration", description: "Implementation of advanced blockchain migration technology" },
              { date: "Q3 2024", title: "Mobile App Release", description: "Launch of iOS and Android applications" },
              { date: "Q4 2024", title: "Global Expansion", description: "Strategic partnerships and international market entry" }
            ].map((milestone, index) => (
              <div 
                key={index}
                className={`relative flex items-center gap-8 mb-12 animate-fade-in ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? "text-right" : "text-left"}`}>
                  <div className="glass-card p-6">
                    <h3 className="text-xl font-bold text-platform-green mb-2">{milestone.date}</h3>
                    <h4 className="font-bold mb-2">{milestone.title}</h4>
                    <p className="text-gray-400">{milestone.description}</p>
                  </div>
                </div>
                <div className="absolute left-1/2 -ml-2.5 w-5 h-5 rounded-full bg-platform-green"></div>
                <div className="w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="glass-card p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-platform-green/10 to-transparent"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-platform-green to-platform-green-dark bg-clip-text text-transparent">
                Start Building a Better Blockchain Future
              </h2>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                Join CelerFi today and take the lead in shaping a sustainable, eco-conscious digital world.
              </p>
              <Link to="/signup">
                <Button size="lg" className="bg-platform-green hover:bg-platform-green-dark text-black">
                  Get Started
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

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