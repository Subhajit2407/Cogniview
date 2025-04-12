import React from 'react';
import { Squares } from '@/components/ui/squares-background';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, FileText, AlertCircle, CheckSquare, Users, Scale, ShieldCheck } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { GlowingEffect } from '@/components/ui/glowing-effect';

const Terms = () => {
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
                Legal Agreement
              </Badge>
              <div className="h-[1px] w-16 bg-gradient-to-r from-[#FFE066] to-transparent ml-4"></div>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 font-['Urbanist'] bg-clip-text text-transparent bg-gradient-to-r from-[#FFFFFF] to-[#FFE066] leading-tight tracking-tight">
              Terms of Service
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
                <FileText className="text-[#FFE066] mr-3 mt-1" size={20} />
                <h2 className="text-xl font-bold font-['Urbanist'] text-white">Introduction</h2>
              </div>
              <p className="text-[#E2E4ED]/80 mb-4 font-['Inter']">
                Welcome to Cogniview. These Terms of Service ("Terms") govern your access to and use of the Cogniview platform and services, including our website, AI technology, and content (collectively, the "Services").
              </p>
              <p className="text-[#E2E4ED]/80 font-['Inter']">
                By using our Services, you agree to be bound by these Terms. If you don't agree to these Terms, you may not use the Services. Please read them carefully.
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
                <Users className="text-[#FFE066] mr-3 mt-1" size={20} />
                <h2 className="text-xl font-bold text-[#F0F6FC]">Using Our Services</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-[#F0F6FC]">Account Creation</h3>
                  <p className="text-[#F0F6FC]/80">
                    To use certain features of our Services, you may need to create an account. You are responsible for:
                  </p>
                  <ul className="list-disc pl-5 mt-2 text-[#F0F6FC]/80 space-y-1">
                    <li>Providing accurate and complete information</li>
                    <li>Maintaining the security of your account credentials</li>
                    <li>All activities that occur under your account</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-[#F0F6FC]">Acceptable Use</h3>
                  <p className="text-[#F0F6FC]/80">
                    When using our Services, you agree not to:
                  </p>
                  <ul className="list-disc pl-5 mt-2 text-[#F0F6FC]/80 space-y-1">
                    <li>Violate any applicable laws or regulations</li>
                    <li>Infringe the intellectual property rights of others</li>
                    <li>Attempt to gain unauthorized access to any part of the Services</li>
                    <li>Use the Services to develop competing products or services</li>
                    <li>Engage in any activity that interferes with or disrupts the Services</li>
                    <li>Use the Services to distribute malware or harmful code</li>
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
                <CheckSquare className="text-[#FFE066] mr-3 mt-1" size={20} />
                <h2 className="text-xl font-bold text-[#F0F6FC]">Content and Intellectual Property</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-[#F0F6FC]">Your Content</h3>
                  <p className="text-[#F0F6FC]/80">
                    Our Services allow you to submit, store, and share content such as text, voice recordings, and other materials ("User Content"). You retain all rights to your User Content, and you are responsible for it.
                  </p>
                  <p className="text-[#F0F6FC]/80 mt-2">
                    By submitting User Content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, and display such User Content for the purpose of providing and improving our Services.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-[#F0F6FC]">Our Content</h3>
                  <p className="text-[#F0F6FC]/80">
                    The Services and all content and materials available through the Services, including but not limited to text, graphics, logos, icons, images, audio clips, and software, are the property of Cogniview or our licensors and are protected by copyright, trademark, and other intellectual property laws.
                  </p>
                  <p className="text-[#F0F6FC]/80 mt-2">
                    We grant you a limited, non-exclusive, non-transferable, and revocable license to use the Services for their intended purposes.
                  </p>
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
                <ShieldCheck className="text-[#FFE066] mr-3 mt-1" size={20} />
                <h2 className="text-xl font-bold text-[#F0F6FC]">Privacy and Data Protection</h2>
              </div>
              <p className="text-[#F0F6FC]/80 mb-4">
                Our <Link to="/privacy" className="text-[#FFE066] hover:underline">Privacy Policy</Link> explains how we collect, use, and protect your personal information. By using our Services, you agree to our data practices as described in our Privacy Policy.
              </p>
              <p className="text-[#F0F6FC]/80">
                We implement reasonable security measures to protect your data, but no method of transmission or storage is 100% secure. You acknowledge this and use the Services at your own risk.
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
                <Scale className="text-[#FFE066] mr-3 mt-1" size={20} />
                <h2 className="text-xl font-bold text-[#F0F6FC]">Limitations of Liability</h2>
              </div>
              <p className="text-[#F0F6FC]/80 mb-4">
                To the maximum extent permitted by law, Cogniview and its affiliates, directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
              </p>
              <ul className="list-disc pl-5 text-[#F0F6FC]/80 space-y-2">
                <li>Your access to or use of or inability to access or use the Services</li>
                <li>Any conduct or content of any third party on the Services</li>
                <li>Any content obtained from the Services</li>
                <li>Unauthorized access, use, or alteration of your transmissions or content</li>
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
                <AlertCircle className="text-[#FFE066] mr-3 mt-1" size={20} />
                <h2 className="text-xl font-bold text-[#F0F6FC]">Changes to Terms and Services</h2>
              </div>
              <p className="text-[#F0F6FC]/80 mb-4">
                We may modify these Terms or any additional terms that apply to our Services at any time. We'll post the revised terms on our website and update the "Last Updated" date.
              </p>
              <p className="text-[#F0F6FC]/80">
                We may also change or discontinue any aspect of our Services at any time without notice. It is your responsibility to check these Terms periodically for changes.
              </p>
            </Card>

            <div className="mt-12 text-center">
              <p className="text-[#F0F6FC]/60 mb-4">
                If you have any questions about these Terms, please contact us at:
              </p>
              <p className="text-[#FFE066] font-medium">legal@cogniview.ai</p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Terms; 