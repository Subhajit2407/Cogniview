import React from 'react';
import { Squares } from '@/components/ui/squares-background';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Shield, Lock, Eye, File, Clock } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { GlowingEffect } from '@/components/ui/glowing-effect';

const Privacy = () => {
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
      
      <main className="relative z-10 pb-20 pt-10 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <Link to="/" className="inline-flex items-center text-[#E2E4ED]/60 hover:text-[#FFE066] transition-colors text-sm mb-4">
              <ArrowLeft size={16} className="mr-2" />
              Back to Home
            </Link>
            
            <div className="flex items-center mb-5">
              <Badge className="text-[#FFE066] bg-[#1A1B31] border border-[#252641] hover:bg-[#1A1B31]/80 font-['Inter'] font-normal text-xs">
                Privacy & Data
              </Badge>
              <div className="h-[1px] w-16 bg-gradient-to-r from-[#FFE066] to-transparent ml-4"></div>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 font-['Urbanist'] bg-clip-text text-transparent bg-gradient-to-r from-[#FFFFFF] to-[#FFE066] leading-tight tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-lg text-[#E2E4ED]/80 leading-relaxed mb-6 max-w-3xl font-['Inter']">
              Last Updated: May 4, 2025
            </p>
          </div>

          <div className="prose prose-invert max-w-none">
            <Card className="border border-[#252641] bg-[#121327] p-6 rounded-xl mb-8 relative overflow-hidden">
              <GlowingEffect 
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={2}
                variant="default"
              />
              <div className="flex items-start mb-4">
                <Shield className="text-[#FFE066] mr-3 mt-1" size={20} />
                <h2 className="text-xl font-bold font-['Urbanist'] text-white">Overview</h2>
              </div>
              <p className="text-[#E2E4ED]/80 mb-4 font-['Inter']">
                This Privacy Policy explains how Cogniview ("we", "us", or "our") collects, uses, and shares your personal information when you use our AI-powered interview practice platform.
              </p>
              <p className="text-[#E2E4ED]/80 font-['Inter']">
                By using Cogniview, you agree to the collection and use of information in accordance with this policy. We take your privacy seriously and are committed to protecting your personal data.
              </p>
            </Card>

            <Card className="border border-[#21262D] bg-[#161B22] p-6 rounded-xl mb-8 relative overflow-hidden">
              <GlowingEffect 
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={2}
                variant="cyan"
              />
              <div className="flex items-start mb-4">
                <File className="text-[#FFE066] mr-3 mt-1" size={20} />
                <h2 className="text-xl font-bold text-[#F0F6FC]">Information We Collect</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-[#F0F6FC]">Personal Information</h3>
                  <p className="text-[#F0F6FC]/80">
                    We collect information that you provide directly to us when you:
                  </p>
                  <ul className="list-disc pl-5 mt-2 text-[#F0F6FC]/80 space-y-1">
                    <li>Create an account (name, email address, password)</li>
                    <li>Complete your profile (professional background, career interests)</li>
                    <li>Participate in interview simulations (voice recordings, text responses)</li>
                    <li>Contact our support team</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-[#F0F6FC]">Usage Information</h3>
                  <p className="text-[#F0F6FC]/80">
                    We automatically collect certain information about your interactions with our platform:
                  </p>
                  <ul className="list-disc pl-5 mt-2 text-[#F0F6FC]/80 space-y-1">
                    <li>Log data (IP address, browser type, pages visited, time spent)</li>
                    <li>Device information (hardware model, operating system)</li>
                    <li>Performance data (response metrics, engagement patterns)</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="border border-[#21262D] bg-[#161B22] p-6 rounded-xl mb-8 relative overflow-hidden">
              <GlowingEffect 
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={2}
                variant="cyan"
              />
              <div className="flex items-start mb-4">
                <Lock className="text-[#FFE066] mr-3 mt-1" size={20} />
                <h2 className="text-xl font-bold text-[#F0F6FC]">How We Use Your Information</h2>
              </div>
              <p className="text-[#F0F6FC]/80 mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-5 text-[#F0F6FC]/80 space-y-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Process and complete transactions</li>
                <li>Send you technical notices, updates, and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Develop new products and services</li>
                <li>Train and improve our AI interview models</li>
                <li>Monitor and analyze trends, usage, and activities</li>
                <li>Detect, investigate, and prevent fraudulent or unauthorized activities</li>
                <li>Personalize your experience and provide content tailored to your interests</li>
              </ul>
            </Card>

            <Card className="border border-[#21262D] bg-[#161B22] p-6 rounded-xl mb-8 relative overflow-hidden">
              <GlowingEffect 
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={2}
                variant="cyan"
              />
              <div className="flex items-start mb-4">
                <Eye className="text-[#FFE066] mr-3 mt-1" size={20} />
                <h2 className="text-xl font-bold text-[#F0F6FC]">Information Sharing</h2>
              </div>
              <p className="text-[#F0F6FC]/80 mb-4">
                We do not sell, rent, or share your personal information with third parties except in the following circumstances:
              </p>
              <ul className="list-disc pl-5 text-[#F0F6FC]/80 space-y-2">
                <li>With your consent or at your direction</li>
                <li>With vendors, consultants, and service providers who need access to such information to carry out work on our behalf</li>
                <li>In response to a request for information if we believe disclosure is in accordance with applicable law or legal process</li>
                <li>If we believe your actions are inconsistent with our user agreements or policies, or to protect the rights, property, and safety of Cogniview or others</li>
                <li>In connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business by another company</li>
              </ul>
            </Card>

            <Card className="border border-[#21262D] bg-[#161B22] p-6 rounded-xl mb-8 relative overflow-hidden">
              <GlowingEffect 
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={2}
                variant="cyan"
              />
              <div className="flex items-start mb-4">
                <Clock className="text-[#FFE066] mr-3 mt-1" size={20} />
                <h2 className="text-xl font-bold text-[#F0F6FC]">Data Retention</h2>
              </div>
              <p className="text-[#F0F6FC]/80 mb-4">
                We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
              </p>
              <p className="text-[#F0F6FC]/80">
                When you delete your account, we will delete or anonymize your personal information, unless we are legally required to maintain certain records. Note that we may retain anonymized, aggregated data for analytical purposes.
              </p>
            </Card>

            <div className="mt-12 text-center">
              <p className="text-[#F0F6FC]/60 mb-4">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p className="text-[#FFE066] font-medium">privacy@cogniview.ai</p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Privacy; 