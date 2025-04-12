import React from 'react';
import { NumberCounter } from '@/components/ui/number-counter';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { Check, Terminal, MessageSquare, BarChart, BrainCircuit } from 'lucide-react';

interface Step {
  number: number;
  title: string;
  description: string;
  highlight?: string;
  icon: React.ReactNode;
}

export const HowItWorks = () => {
  const steps: Step[] = [
    {
      number: 1,
      title: "Select Your Domain",
      description: "Choose your career focus - software development, data science, AI engineering, or other domains. The system tailors questions specifically to your field and experience level.",
      highlight: "Domain-specific questions",
      icon: <Terminal className="h-5 w-5 text-[#FFE066]" />
    },
    {
      number: 2,
      title: "Practice with AI Interviewer",
      description: "Engage in realistic mock interviews with our AI-powered interviewer. Answer technical questions, solve problems, and articulate your experience just like in a real interview.",
      highlight: "Realistic interview scenarios",
      icon: <BrainCircuit className="h-5 w-5 text-[#FFE066]" />
    },
    {
      number: 3, 
      title: "Receive Immediate Feedback",
      description: "Get instant scoring on your responses based on technical accuracy, communication skills, confidence level, and problem-solving ability. Identify your strengths and areas for improvement.",
      highlight: "Multi-dimensional evaluation",
      icon: <MessageSquare className="h-5 w-5 text-[#FFE066]" />
    },
    {
      number: 4,
      title: "Track Your Progress",
      description: "Monitor your improvement over time with detailed analytics. See how your interview performance improves across different skill dimensions as you continue to practice.",
      highlight: "Performance tracking",
      icon: <BarChart className="h-5 w-5 text-[#FFE066]" />
    }
  ];

  return (
    <section className="py-16 md:py-24 px-6 bg-[#0A0B14]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-['Urbanist'] text-transparent bg-clip-text bg-gradient-to-r from-[#E2E4ED] to-[#FFE066]">
            How It Works
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto font-['Urbanist'] text-[#E2E4ED]/80">
            Our AI-powered interview platform helps you prepare efficiently with <span className="text-[#FFE066] font-semibold">personalized feedback</span> and realistic practice scenarios.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector lines between circles for desktop */}
              {index < steps.length - 1 && index % 2 === 0 && (
                <div className="hidden md:block absolute top-12 left-12 w-[calc(100%+4rem)] h-0.5 bg-gradient-to-r from-[#FFE066]/50 to-[#FFE066]/10 z-0"></div>
              )}
              {index < steps.length - 2 && index % 2 === 0 && (
                <div className="hidden md:block absolute top-12 left-12 w-0.5 h-[calc(100%+4rem)] bg-gradient-to-b from-[#FFE066]/50 to-[#FFE066]/10 z-0"></div>
              )}
              {index > 0 && index % 2 === 1 && (
                <div className="hidden md:block absolute top-12 right-12 w-0.5 h-[calc(100%+4rem)] bg-gradient-to-b from-[#FFE066]/10 to-[#FFE066]/50 z-0"></div>
              )}
              
              <div className="flex flex-col md:flex-row gap-6">
                <div className="relative">
                  {/* Number circle */}
                  <div className="h-24 w-24 rounded-full bg-[#121327] border-2 border-[#252641] flex items-center justify-center relative z-10">
                    <div className="absolute inset-0 rounded-full overflow-hidden">
                      <GlowingEffect 
                        spread={40}
                        glow={true}
                        disabled={false}
                        proximity={64}
                        inactiveZone={0.01}
                        borderWidth={2}
                        variant="cyan"
                      />
                    </div>
                    <div className="flex flex-col items-center justify-center relative z-10">
                      <span className="text-3xl text-[#FFE066] font-['Urbanist'] font-bold">
                        {step.number}
                      </span>
                      <div className="mt-1">
                        {step.icon}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex-1 bg-[#121327] rounded-xl p-6 border border-[#252641] relative overflow-hidden">
                  <GlowingEffect 
                    spread={40}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                    borderWidth={2}
                    variant={index % 2 === 0 ? "default" : "cyan"}
                  />
                  
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold font-['Urbanist'] text-[#E2E4ED] mb-2 flex items-center">
                      {step.title}
                    </h3>
                    
                    <p className="text-[#E2E4ED]/70 font-['Urbanist'] mb-4">
                      {step.description}
                    </p>
                    
                    {step.highlight && (
                      <div className="bg-[#1A1B31] rounded-lg p-3 flex items-center gap-2 border border-[#252641]">
                        <div className="h-6 w-6 rounded-full bg-[#FFE066]/20 flex items-center justify-center">
                          <Check className="h-3.5 w-3.5 text-[#FFE066]" />
                        </div>
                        <span className="text-sm font-medium text-[#FFE066] font-['Urbanist']">
                          {step.highlight}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="inline-flex items-center justify-center bg-[#121327] rounded-xl px-8 py-4 border border-[#252641] relative overflow-hidden">
            <GlowingEffect 
              spread={40}
              glow={true}
              disabled={false}
              proximity={64}
              inactiveZone={0.01}
              borderWidth={2}
              variant="cyan"
            />
            <div className="relative z-10">
              <p className="text-[#E2E4ED]/80 font-['Urbanist'] mb-1">Improvement in interview confidence after 5 sessions</p>
              <div className="text-4xl md:text-5xl font-bold text-[#FFE066] font-['Urbanist']">
                <NumberCounter value={90} suffix="%" duration={2000} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
