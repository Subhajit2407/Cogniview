import React from 'react';
import { Link } from 'react-router-dom';
import { Squares } from '@/components/ui/squares-background';
import { Github, ExternalLink, Code, MessageSquare, ArrowRight, Users, Globe, LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { GlowingEffect } from "@/components/ui/glowing-effect";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

type Feature = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const About = () => {
  const features: Feature[] = [
    {
      title: "Built for developers",
      description: "Designed specifically for technical interviews with real coding challenges and domain-specific questions.",
      icon: Code
    },
    {
      title: "Community-driven",
      description: "Our questions and feedback mechanisms are improved through contributions from real hiring managers and developers.",
      icon: Users
    },
    {
      title: "Global reach",
      description: "Helping developers around the world prepare for technical interviews at top companies.",
      icon: Globe
    },
    {
      title: "Real-time feedback",
      description: "Get instant, actionable feedback on your interview responses to continuously improve.",
      icon: MessageSquare
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0B14] text-[#E2E4ED] relative overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 z-0 opacity-10">
        <Squares 
          direction="diagonal"
          speed={0.2}
          squareSize={40}
          borderColor="#5D5FEF"
          hoverFillColor="#8A63D2"
        />
      </div>
      
      <Navbar />
      
      <main className="relative z-10 pb-24">
        {/* Hero Section */}
        <section className="px-6 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 text-[#FFE066] bg-[#1A1B31] border border-[#252641] hover:bg-[#1A1B31]/80 font-['Inter'] font-normal text-xs inline-flex">
              About Cogniview
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-['Urbanist'] bg-clip-text text-transparent bg-gradient-to-r from-[#FFFFFF] to-[#FFE066] leading-tight tracking-tight">
              Our Mission
            </h1>
            <p className="text-xl mb-8 font-['Inter'] text-[#E2E4ED]/80 leading-relaxed">
              We're building the best AI-powered interview coach to help developers master technical interviews and land their dream jobs.
            </p>
          </div>
        </section>
        
        {/* Features Grid */}
        <section className="px-6 py-12 bg-[#080911]/60">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 font-['Urbanist'] text-white">
                Why we built Cogniview
              </h2>
              <p className="text-lg max-w-2xl mx-auto font-['Inter'] text-[#E2E4ED]/70">
                Our platform combines cutting-edge AI with expert interview knowledge
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="border border-[#252641] rounded-xl p-6 bg-[#121327] relative overflow-hidden group"
                >
                  <GlowingEffect 
                    spread={40}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                    borderWidth={2}
                    variant="default"
                  />
                  <div className="flex items-start">
                    <div className="h-12 w-12 rounded-xl bg-[#1A1B31] flex items-center justify-center mr-4 border border-[#252641]">
                      <feature.icon size={24} className="text-[#FFE066]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 font-['Urbanist'] text-white">
                        {feature.title}
                      </h3>
                      <p className="text-[#E2E4ED]/70 font-['Inter']">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="px-6 py-12 mt-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 font-['Inter'] text-[#F0F6FC]">
              Ready to start practicing?
            </h2>
            <p className="text-lg text-center max-w-3xl mx-auto font-['Inter'] text-[#E2E4ED]/80">
              Join thousands of developers who are mastering technical interviews with Cogniview
            </p>
            <div className="flex flex-col sm:flex-row justify-center mt-8 gap-4">
              <Button 
                size="lg" 
                className="bg-[#FFE066] hover:bg-[#FFE066]/90 text-[#0D1117] font-['Inter'] font-bold shadow-lg shadow-[#FFE066]/20"
              >
                Get Started
                <ArrowRight className="ml-2" size={16} />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-[#21262D] hover:border-[#FFE066] text-[#F0F6FC] hover:text-[#FFE066] font-['Inter']"
              >
                <Github className="mr-2" size={18} />
                GitHub
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About; 