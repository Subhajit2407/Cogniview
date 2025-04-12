import React, { useState } from 'react';
import { Squares } from '@/components/ui/squares-background';
import { Send, Mail, MapPin, MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from "@/components/ui/card";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { toast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent successfully",
        description: "We'll get back to you as soon as possible.",
        variant: "success",
        className: "border-[#FFE066] bg-[#121327] text-white shadow-lg"
      });
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "discoveryofaii248@gmail.com",
      link: "mailto:discoveryofaii248@gmail.com"
    },
    {
      icon: MapPin,
      title: "Office",
      value: "Bengaluru, Karnataka",
      link: null
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
          borderColor="#FFE066"
          hoverFillColor="#FFE066"
        />
      </div>
      
      <Navbar />
      
      <main className="relative z-10 pb-24">
        {/* Hero Section */}
        <section className="px-6 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 text-[#FFE066] bg-[#1A1B31] border border-[#252641] hover:bg-[#1A1B31]/80 font-['Inter'] font-normal text-xs inline-flex">
              Get in Touch
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-['Urbanist'] bg-clip-text text-transparent bg-gradient-to-r from-[#FFFFFF] to-[#FFE066] leading-tight tracking-tight">
              Contact Us
            </h1>
            <p className="text-xl mb-8 font-['Inter'] text-[#E2E4ED]/80 leading-relaxed">
              Have questions or feedback? We'd love to hear from you.
            </p>
          </div>
        </section>
        
        {/* Contact Form Section */}
        <section className="px-6 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Contact Info */}
              <div className="md:col-span-1 space-y-6">
                {contactInfo.map((item, index) => (
                  <Card 
                    key={index} 
                    className="border border-[#252641] bg-[#121327] p-6 rounded-xl relative overflow-hidden"
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
                        <item.icon size={24} className="text-[#FFE066]" />
                      </div>
                      <div>
                        <h3 className="text-base font-medium mb-1 font-['Urbanist'] text-white">
                          {item.title}
                        </h3>
                        {item.link ? (
                          <a 
                            href={item.link} 
                            className="text-[#FFE066] font-['Inter'] hover:underline"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-[#E2E4ED]/80 font-['Inter']">{item.value}</p>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              
              {/* Contact Form */}
              <div className="md:col-span-2">
                <Card className="border border-[#252641] bg-[#121327] p-8 rounded-xl relative overflow-hidden shadow-lg">
                  <GlowingEffect 
                    spread={40}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                    borderWidth={2}
                    variant="default"
                  />
                  <h2 className="text-2xl font-bold mb-6 font-['Urbanist'] text-white flex items-center">
                    <MessageSquare className="mr-3 text-[#FFE066]" size={24} />
                    Send us a message
                  </h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2 font-['Urbanist'] text-white">
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-[#121327] border border-[#252641] rounded-lg focus:border-[#FFE066] focus:outline-none font-['Urbanist'] text-white placeholder-white/30"
                          placeholder="Enter your name"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2 font-['Urbanist'] text-white">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-[#121327] border border-[#252641] rounded-lg focus:border-[#FFE066] focus:outline-none font-['Urbanist'] text-white placeholder-white/30"
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-2 font-['Urbanist'] text-white">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[#121327] border border-[#252641] rounded-lg focus:border-[#FFE066] focus:outline-none font-['Urbanist'] text-white placeholder-white/30"
                        placeholder="What's this about?"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2 font-['Urbanist'] text-white">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        className="w-full px-4 py-3 bg-[#121327] border border-[#252641] rounded-lg focus:border-[#FFE066] focus:outline-none font-['Urbanist'] text-white placeholder-white/30 resize-none"
                        placeholder="Tell us what you need help with..."
                        required
                      />
                    </div>
                    
                    <div>
                      <Button
                        type="submit"
                        className="w-full md:w-auto bg-[#FFE066] hover:bg-[#FFE066]/90 text-[#0A0B14] font-['Urbanist'] font-bold px-8 py-3 h-auto shadow-lg shadow-[#FFE066]/10 flex items-center justify-center"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="mr-2">Sending...</span>
                            <div className="h-4 w-4 border-2 border-[#0A0B14] border-t-transparent rounded-full animate-spin" />
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send className="ml-2" size={16} />
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </Card>
              </div>
            </div>
          </div>
        </section>
        
        {/* Map or Location Section */}
        <section className="px-6 py-12 mt-8">
          <div className="max-w-6xl mx-auto">
            <div className="border border-[#252641] bg-[#121327] rounded-xl overflow-hidden relative shadow-lg h-[300px]">
              <GlowingEffect 
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={2}
                variant="default"
              />
              <a 
                href="https://www.google.com/maps/place/Bengaluru,+Karnataka" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full h-full"
              >
                <div className="absolute inset-0 flex items-center justify-center hover:bg-[#0A0B14]/40 transition-colors group">
                  <div className="text-center p-4 bg-[#121327]/80 rounded-lg backdrop-blur-sm border border-[#252641] transform transition-transform group-hover:scale-105">
                    <MapPin size={40} className="text-[#FFE066] mx-auto mb-4" />
                    <h3 className="text-2xl font-medium font-['Urbanist'] text-white mb-2">
                      Our Location
                    </h3>
                    <p className="text-[#E2E4ED]/70 font-['Urbanist']">
                      Bengaluru, Karnataka, India
                    </p>
                    <p className="text-[#FFE066] text-sm mt-2">
                      Click to view on Google Maps
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact; 