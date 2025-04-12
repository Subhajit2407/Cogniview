import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronRight, Terminal, MessageSquare, BarChart, BookOpen, Calendar, BrainCircuit, Briefcase, Award, Users, Zap, CheckCircle, Command, Sparkles, MousePointerClick } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { domains } from '@/components/DomainSelector';
import { Squares } from '@/components/ui/squares-background';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { AnimatedButton } from '@/components/ui/animated-button';
import { HowItWorks } from '@/components/HowItWorks';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

// New primary colors based on new design
// Primary: #0A0B14 (dark background)
// Secondary: #121327 (surface color)
// Accent: #FFE066 (yellow accent from logo)
// Text: #E2E4ED (light text)

const keyFeatures = [
  {
    title: "AI-Powered Mock Interviews",
    description: "Experience realistic interview scenarios with our AI system that adapts to your skill level and provides domain-specific technical questions tailored to your target roles.",
    icon: <BrainCircuit className="h-5 w-5 text-[#FFE066]" />,
    benefits: [
      "Practice with industry-specific questions",
      "Multiple difficulty levels to match your experience",
      "Realistic conversation flow with follow-up questions",
      "24/7 access to practice sessions"
    ]
  },
  {
    title: "Comprehensive Performance Analysis",
    description: "Receive detailed feedback on every aspect of your interview performance, from technical accuracy to communication style and confidence metrics.",
    icon: <BarChart className="h-5 w-5 text-[#FFE066]" />,
    benefits: [
      "Multi-dimensional scoring system",
      "Detailed strength and weakness assessment",
      "Personalized improvement recommendations",
      "Progress tracking over time"
    ]
  },
  {
    title: "Personalized Learning Path",
    description: "Our AI creates a customized improvement plan based on your performance data, focusing on the specific areas where you need the most development.",
    icon: <BookOpen className="h-5 w-5 text-[#FFE066]" />,
    benefits: [
      "Targeted skill development exercises",
      "Curated resources for knowledge gaps",
      "Adaptive difficulty progression",
      "Career-specific preparation guidance"
    ]
  },
  {
    title: "Industry-Validated Approach",
    description: "Our platform is developed in collaboration with hiring managers and technical interviewers from leading tech companies to ensure relevance and accuracy.",
    icon: <Award className="h-5 w-5 text-[#FFE066]" />,
    benefits: [
      "Up-to-date with industry interview standards",
      "Questions reflecting real hiring processes",
      "Feedback aligned with recruiter expectations",
      "Preparation for modern technical assessments"
    ]
  },
  {
    title: "Confidence Building Framework",
    description: "Beyond technical preparation, we focus on building your interview confidence through targeted exercises and positive reinforcement techniques.",
    icon: <Zap className="h-5 w-5 text-[#FFE066]" />,
    benefits: [
      "Anxiety reduction strategies",
      "Communication style improvement",
      "Body language and presentation coaching",
      "Stress management techniques"
    ]
  }
];

const Index = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  
  const [typedText, setTypedText] = useState("");
  const [commandInput, setCommandInput] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [activeTab, setActiveTab] = useState("features");
  const [featureTab, setFeatureTab] = useState("mockinterviews");
  
  const fullText = "Welcome to Cogniview - Your AI Interview Coach for technical roles.";
  
  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);
    
    // Blinking cursor effect
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    
    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, []);
  
  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (commandInput.toLowerCase() === "start" || commandInput.toLowerCase() === "practice") {
      navigate('/simulate');
    } else if (commandInput.toLowerCase() === "feedback") {
      navigate('/feedback');
    } else if (commandInput.toLowerCase() === "progress") {
      navigate('/progress');
    } else if (commandInput.toLowerCase() === "login") {
      navigate('/login');
    } else if (commandInput.toLowerCase() === "register") {
      navigate('/register');
    } else if (commandInput.toLowerCase() === "logout" && isAuthenticated) {
      logout();
    } else if (commandInput.toLowerCase() === "help") {
      console.log("Help command triggered");
      // Display help info
    }
    
    setCommandInput("");
  };
  
  const handleStartClick = () => {
    if (isAuthenticated) {
      navigate('/simulate');
    } else {
      navigate('/login');
    }
  };

  const testimonials = [
    {
      name: "Alex Chen",
      role: "Software Engineer",
      quote: "Cogniview helped me prepare for technical interviews with specific questions I actually encountered during real interviews.",
      avatar: "A"
    },
    {
      name: "Sarah Johnson",
      role: "Data Scientist",
      quote: "The domain-specific feedback improved my statistical explanations for data science roles.",
      avatar: "S"
    },
    {
      name: "Marcus Williams",
      role: "Product Manager",
      quote: "The confidence metrics helped me identify and improve my weaker areas when discussing product strategy.",
      avatar: "M"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col justify-start bg-[#0A0B14] text-[#E2E4ED] relative overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 z-0 opacity-10">
        <Squares 
          direction="diagonal"
          speed={0.2}
          squareSize={40}
          borderColor="#FFE066"
          hoverFillColor="#FFA500"
        />
      </div>
      
      <Navbar />
      
      <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <section className="pt-8 pb-16 px-6 md:pt-12 md:pb-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                <div className="flex items-center mb-3">
                  <Badge className="text-[#FFE066] bg-[#121327] border border-[#252641] hover:bg-[#121327]/80 font-['Urbanist'] font-normal text-xs">
                    AI-Powered Interview Coach
                  </Badge>
                  <div className="h-[1px] w-16 bg-gradient-to-r from-[#FFE066] to-transparent ml-4"></div>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 font-['Urbanist'] bg-clip-text text-transparent bg-gradient-to-r from-[#E2E4ED] to-[#FFE066] leading-tight tracking-tight">
                  Master Your<br />Technical Interviews
                </h1>
                <p className="text-lg md:text-xl mb-5 md:mb-6 font-['Urbanist'] text-[#E2E4ED]/80 leading-relaxed max-w-xl">
                  Practice with our AI-powered interview simulator. 
                  Get real-time feedback and domain-specific coaching.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <AnimatedButton 
                    size="lg" 
                    variant="primary"
                    animationType="spotlight"
                    onClick={handleStartClick}
                    className="w-full sm:w-auto"
                  >
                    {isAuthenticated ? "Start Practicing" : "Get Started"}
                  </AnimatedButton>
                  
                  <div className="flex items-center text-[#E2E4ED]/60 font-['Urbanist'] text-sm">
                    <CheckCircle size={16} className="text-[#FFE066] mr-2" />
                    <span>No credit card required</span>
                  </div>
                </div>
                
                <div className="mt-10 grid grid-cols-2 gap-6">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-[#121327] flex items-center justify-center mr-3 border border-[#252641]">
                      <Command className="h-5 w-5 text-[#FFE066]" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-[#E2E4ED] font-['Urbanist']">10,000+</div>
                      <div className="text-xs text-[#E2E4ED]/60 font-['Urbanist']">Interview Questions</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-[#121327] flex items-center justify-center mr-3 border border-[#252641]">
                      <Users className="h-5 w-5 text-[#FFE066]" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-[#E2E4ED] font-['Urbanist']">2,000+</div>
                      <div className="text-xs text-[#E2E4ED]/60 font-['Urbanist']">Active Users</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Updated Terminal Interface */}
              <div className="border border-[#252641] rounded-xl overflow-hidden shadow-2xl relative">
                <div className="flex items-center bg-[#121327] px-4 py-3 border-b border-[#252641]">
                  <div className="flex space-x-1.5 mr-4">
                    <div className="w-3 h-3 rounded-full bg-[#F44336]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#FFEB3B]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#4CAF50]"></div>
                  </div>
                  <p className="text-sm font-['Urbanist'] text-[#E2E4ED]/80 font-medium">Cogniview@shell:~</p>
                </div>
                
                <div className="bg-[#0A0B14] p-6">
                  <div className="font-['Urbanist'] text-sm mb-6">
                    <p className="text-[#FFE066]">$ system.init()</p>
                    <p className="text-[#E2E4ED]/70 ml-4">Loading AI Interview Coach...</p>
                    <p className="text-[#FFE066] mt-2">$ system.ready()</p>
                    <p className="text-[#E2E4ED] ml-4">
                      {typedText}{showCursor && <span className="text-[#FFE066]">▋</span>}
                    </p>
                  </div>
                  
                  <div className="mt-6 bg-[#121327] rounded-lg p-4 border border-[#252641]">
                    <div className="flex items-center mb-2">
                      <Badge className="bg-[#FFE066] text-[#0A0B14] font-['Urbanist'] font-normal text-xs">
                        QUESTION 1
                      </Badge>
                    </div>
                    <p className="text-[#E2E4ED] mb-4 font-['Urbanist'] text-sm">
                      Given a binary tree, implement a function to check if it is a valid binary search tree.
                    </p>
                    <pre className="bg-[#0A0B14] p-3 rounded-md border border-[#252641] text-xs overflow-x-auto">
                      <code className="text-[#E2E4ED] font-['Urbanist']">
{`function isValidBST(root) {
  // Your code here
  return checkBST(root, -Infinity, Infinity);
}

function checkBST(node, min, max) {
  if (!node) return true;
  if (node.val <= min || node.val >= max) return false;
  
  return checkBST(node.left, min, node.val) && 
         checkBST(node.right, node.val, max);
}`}
                      </code>
                    </pre>
                  </div>
                  
                  <form onSubmit={handleCommandSubmit} className="mt-6 flex items-center">
                    <div className="flex-1 flex items-center bg-[#121327] border border-[#252641] rounded-lg px-3 py-2">
                      <ChevronRight className="text-[#FFE066] mr-2" size={16} />
                      <input
                        type="text"
                        value={commandInput}
                        onChange={(e) => setCommandInput(e.target.value)}
                        className="bg-transparent border-none outline-none flex-1 font-['Urbanist'] text-[#E2E4ED] placeholder-[#E2E4ED]/30 text-sm"
                        placeholder="Type 'start' to begin or 'help' for commands..."
                      />
                    </div>
                  </form>
                  
                  <div className="mt-3 text-[#E2E4ED]/40 font-['Urbanist'] text-xs flex gap-3">
                    <span><kbd className="px-1 py-0.5 bg-[#121327] border border-[#252641] rounded text-xs">Ctrl+I</kbd> Interview</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* How It Works section */}
        <HowItWorks />
        
        {/* Features Section */}
        <section className="px-6 py-16 md:py-20 bg-[#080911]/60">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 text-[#FFE066] bg-[#121327] border border-[#252641] hover:bg-[#121327]/80 font-['Urbanist'] font-normal text-xs">
                Features
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-['Urbanist'] text-[#E2E4ED]">
                Everything you need to ace your interviews
              </h2>
              <p className="text-lg max-w-2xl mx-auto font-['Urbanist'] text-[#E2E4ED]/70">
                From realistic mock interviews to personalized feedback, our platform has you covered
              </p>
            </div>
            
            <div className="mb-12">
              <Tabs defaultValue="mockinterviews" className="w-full">
                <div className="flex justify-center mb-8">
                  <TabsList className="bg-[#121327] border border-[#252641] p-1 rounded-lg">
                    <TabsTrigger
                      value="mockinterviews"
                      className="px-4 py-2 rounded-md data-[state=active]:bg-[#1A1B31] data-[state=active]:text-[#FFE066] data-[state=active]:shadow-none"
                    >
                      <div className="flex items-center gap-2">
                        <Terminal size={16} />
                        <span>Mock Interviews</span>
                      </div>
                    </TabsTrigger>
                    <TabsTrigger
                      value="feedback"
                      className="px-4 py-2 rounded-md data-[state=active]:bg-[#1A1B31] data-[state=active]:text-[#FFE066] data-[state=active]:shadow-none"
                    >
                      <div className="flex items-center gap-2">
                        <MessageSquare size={16} />
                        <span>Real-time Feedback</span>
                      </div>
                    </TabsTrigger>
                    <TabsTrigger
                      value="analytics"
                      className="px-4 py-2 rounded-md data-[state=active]:bg-[#1A1B31] data-[state=active]:text-[#FFE066] data-[state=active]:shadow-none"
                    >
                      <div className="flex items-center gap-2">
                        <BarChart size={16} />
                        <span>Analytics</span>
                      </div>
                    </TabsTrigger>
                    <TabsTrigger
                      value="coaching"
                      className="px-4 py-2 rounded-md data-[state=active]:bg-[#1A1B31] data-[state=active]:text-[#FFE066] data-[state=active]:shadow-none"
                    >
                      <div className="flex items-center gap-2">
                        <BrainCircuit size={16} />
                        <span>AI Coaching</span>
                      </div>
                    </TabsTrigger>
                  </TabsList>
                </div>
                
                <div className="relative overflow-hidden rounded-xl border border-[#252641] bg-[#121327]">
                  <GlowingEffect 
                    spread={60}
                    glow={true}
                    disabled={false}
                    proximity={100}
                    inactiveZone={0.01}
                    borderWidth={2}
                    variant="default"
                  />
                  
                  <TabsContent value="mockinterviews" className="relative z-10">
                    <div className="grid md:grid-cols-2 p-8">
                      <div className="pr-8">
                        <h3 className="text-2xl font-bold mb-4 font-['Urbanist'] text-[#E2E4ED]">
                          Practice with domain-specific interviews
                        </h3>
                        <p className="text-[#E2E4ED]/80 mb-6 font-['Urbanist']">
                          Our AI-powered interview simulator delivers realistic technical questions tailored specifically to your career path, whether you're a software developer, data scientist, or AI engineer.
                        </p>
                        <ul className="space-y-3">
                          {["Domain-specific question bank", "Adjustable difficulty levels", "Code evaluation capabilities", "Technical knowledge assessment"].map((feature, i) => (
                            <li key={i} className="flex items-center">
                              <div className="h-5 w-5 rounded-full bg-[#FFE066]/20 flex items-center justify-center mr-3">
                                <CheckCircle className="h-3 w-3 text-[#FFE066]" />
                              </div>
                              <span className="text-[#E2E4ED]/90 font-['Urbanist']">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-6 md:mt-0 bg-[#0A0B14] rounded-lg p-6 border border-[#252641] relative overflow-hidden">
                        <div className="flex items-center mb-4">
                          <div className="flex space-x-1.5 mr-4">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#F44336]"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-[#FFEB3B]"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-[#4CAF50]"></div>
                          </div>
                          <p className="text-xs font-['JetBrains Mono'] text-[#E2E4ED]/60">interviewer@software-development:~</p>
                        </div>
                        <div className="font-['JetBrains Mono'] text-sm">
                          <p className="text-[#7D4CDB] mb-3">Can you explain how you would implement a cache with an LRU (Least Recently Used) eviction policy?</p>
                          <p className="text-[#FFE066] mb-3">I would use a combination of a HashMap and a doubly linked list...</p>
                          <p className="text-[#7D4CDB]">Great approach. How would you handle concurrency in your implementation?</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="feedback" className="relative z-10">
                    <div className="grid md:grid-cols-2 p-8">
                      <div className="pr-8">
                        <h3 className="text-2xl font-bold mb-4 font-['Urbanist'] text-[#E2E4ED]">
                          Get instant, multi-dimensional feedback
                        </h3>
                        <p className="text-[#E2E4ED]/80 mb-6 font-['Urbanist']">
                          Receive immediate scoring and detailed feedback on multiple dimensions of your interview performance, helping you identify strengths and areas for improvement.
                        </p>
                        <ul className="space-y-3">
                          {["Technical accuracy assessment", "Communication skills scoring", "Confidence metrics", "Problem-solving evaluation", "Code quality analysis"].map((feature, i) => (
                            <li key={i} className="flex items-center">
                              <div className="h-5 w-5 rounded-full bg-[#FFE066]/20 flex items-center justify-center mr-3">
                                <CheckCircle className="h-3 w-3 text-[#FFE066]" />
                              </div>
                              <span className="text-[#E2E4ED]/90 font-['Urbanist']">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-6 md:mt-0 bg-[#0A0B14] rounded-lg p-6 border border-[#252641] relative overflow-hidden">
                        <div className="bg-[#161B22] p-4 rounded-lg border border-[#21262D] mb-4">
                          <div className="flex justify-between items-center mb-3">
                            <span className="font-medium text-sm text-[#E2E4ED]">Score: 85/100</span>
                            <div className="w-32 bg-[#0D1117] h-2 rounded-full overflow-hidden">
                              <div className="h-full rounded-full bg-[#FFE066]" style={{ width: '85%' }} />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="flex justify-between items-center">
                              <span className="text-[#E2E4ED]/70">Technical:</span>
                              <div className="w-16 bg-[#0D1117] h-1.5 rounded-full overflow-hidden">
                                <div className="h-full bg-[#7D4CDB] rounded-full" style={{ width: '88%' }} />
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-[#E2E4ED]/70">Communication:</span>
                              <div className="w-16 bg-[#0D1117] h-1.5 rounded-full overflow-hidden">
                                <div className="h-full bg-[#7D4CDB] rounded-full" style={{ width: '82%' }} />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="font-['Urbanist'] text-sm text-[#E2E4ED]/80">
                          <p className="mb-2"><span className="text-[#FFE066] font-medium">Strengths:</span> Strong technical understanding and problem-solving approach.</p>
                          <p><span className="text-[#FFE066] font-medium">Areas to improve:</span> Consider providing more concrete examples from your experience.</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="analytics" className="relative z-10">
                    <div className="grid md:grid-cols-2 p-8">
                      <div className="pr-8">
                        <h3 className="text-2xl font-bold mb-4 font-['Urbanist'] text-[#E2E4ED]">
                          Track your progress with detailed analytics
                        </h3>
                        <p className="text-[#E2E4ED]/80 mb-6 font-['Urbanist']">
                          Monitor your improvement over time with comprehensive analytics dashboards that track your performance across all interview skills dimensions.
                        </p>
                        <ul className="space-y-3">
                          {["Performance trend visualization", "Skill gap identification", "Interview history timeline", "Comparative analysis", "Customizable performance metrics"].map((feature, i) => (
                            <li key={i} className="flex items-center">
                              <div className="h-5 w-5 rounded-full bg-[#FFE066]/20 flex items-center justify-center mr-3">
                                <CheckCircle className="h-3 w-3 text-[#FFE066]" />
                              </div>
                              <span className="text-[#E2E4ED]/90 font-['Urbanist']">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-6 md:mt-0 bg-[#0A0B14] rounded-lg p-6 border border-[#252641] relative overflow-hidden">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="text-sm font-medium text-[#E2E4ED]">Performance Trends</h4>
                          <div className="flex space-x-2 text-xs">
                            <span className="flex items-center"><span className="h-2 w-2 rounded-full bg-[#FFE066] mr-1"></span>Technical</span>
                            <span className="flex items-center"><span className="h-2 w-2 rounded-full bg-[#7D4CDB] mr-1"></span>Communication</span>
                          </div>
                        </div>
                        <div className="h-32 flex items-end space-x-1">
                          {[45, 58, 65, 72, 78, 85, 89].map((height, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center">
                              <div className="w-full bg-[#161B22]/50 rounded-sm h-full flex items-end">
                                <div className="w-1/2 bg-[#FFE066] rounded-sm" style={{ height: `${height}%` }}></div>
                                <div className="w-1/2 bg-[#7D4CDB] rounded-sm" style={{ height: `${height - 10 + Math.floor(Math.random() * 20)}%` }}></div>
                              </div>
                              <span className="text-[#E2E4ED]/50 text-xs mt-1">#{i+1}</span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 text-xs text-center text-[#E2E4ED]/70 font-['Urbanist']">
                          Your interview performance has improved by 44% over 7 sessions
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="coaching" className="relative z-10">
                    <div className="grid md:grid-cols-2 p-8">
                      <div className="pr-8">
                        <h3 className="text-2xl font-bold mb-4 font-['Urbanist'] text-[#E2E4ED]">
                          Receive personalized AI coaching
                        </h3>
                        <p className="text-[#E2E4ED]/80 mb-6 font-['Urbanist']">
                          Get tailored advice and guidance to improve your interview performance based on your specific strengths, weaknesses, and career goals.
                        </p>
                        <ul className="space-y-3">
                          {["Personalized improvement plans", "Answer refinement suggestions", "Technical concept explanations", "Communication style coaching", "Industry-specific preparation tips"].map((feature, i) => (
                            <li key={i} className="flex items-center">
                              <div className="h-5 w-5 rounded-full bg-[#FFE066]/20 flex items-center justify-center mr-3">
                                <CheckCircle className="h-3 w-3 text-[#FFE066]" />
                              </div>
                              <span className="text-[#E2E4ED]/90 font-['Urbanist']">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-6 md:mt-0 bg-[#0A0B14] rounded-lg p-6 border border-[#252641] relative overflow-hidden">
                        <div className="flex items-center mb-4">
                          <div className="h-8 w-8 rounded-full bg-[#1A1B31] flex items-center justify-center mr-3 border border-[#252641]">
                            <BrainCircuit className="h-4 w-4 text-[#FFE066]" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-[#E2E4ED]">AI Coach</h4>
                            <p className="text-xs text-[#E2E4ED]/60">Personalized guidance</p>
                          </div>
                        </div>
                        <div className="space-y-3 text-sm font-['Urbanist']">
                          <p className="text-[#E2E4ED]/90">Based on your recent interviews, I recommend focusing on these areas:</p>
                          <div className="bg-[#161B22]/50 p-3 rounded-md border border-[#252641]">
                            <p className="text-[#FFE066] mb-1">1. System Design Explanations</p>
                            <p className="text-[#E2E4ED]/70 text-xs">Practice explaining complex architectures with clearer component relationships</p>
                          </div>
                          <div className="bg-[#161B22]/50 p-3 rounded-md border border-[#252641]">
                            <p className="text-[#FFE066] mb-1">2. Algorithmic Time Complexity</p>
                            <p className="text-[#E2E4ED]/70 text-xs">Work on more accurate big O analysis of your solutions</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </div>

            {/* Key Features display using Accordion for toggleable interface */}
            <div className="mt-16">
              <div className="text-center mb-12">
                <Badge className="mb-4 text-[#FFE066] bg-[#121327] border border-[#252641] hover:bg-[#121327]/80 font-['Urbanist'] font-normal text-xs">
                  Key Benefits
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 font-['Urbanist'] text-[#E2E4ED]">
                  Why professionals trust our platform
                </h2>
                <p className="text-lg max-w-2xl mx-auto font-['Urbanist'] text-[#E2E4ED]/70">
                  Discover the comprehensive features that make our AI interview coach the top choice for technical professionals
                </p>
              </div>
              
              <div className="relative overflow-hidden rounded-xl border border-[#252641] bg-[#121327] p-8">
                <GlowingEffect 
                  spread={60}
                  glow={true}
                  disabled={false}
                  proximity={100}
                  inactiveZone={0.01}
                  borderWidth={2}
                  variant="default"
                />
                <div className="relative z-10">
                  <Accordion type="single" collapsible className="w-full">
                    {keyFeatures.map((feature, index) => (
                      <AccordionItem 
                        key={index} 
                        value={`item-${index}`}
                        className="border-b border-[#252641] last:border-0"
                      >
                        <AccordionTrigger className="py-5 text-left font-['Urbanist']">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-[#1A1B31] flex items-center justify-center border border-[#252641]">
                              {feature.icon}
                            </div>
                            <span className="text-xl font-semibold text-[#E2E4ED]">{feature.title}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pb-5 pt-2 pl-14 text-[#E2E4ED]/70 font-['Urbanist']">
                          <p className="max-w-3xl">{feature.description}</p>
                          
                          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {feature.benefits && feature.benefits.map((benefit, i) => (
                              <div key={i} className="flex items-start gap-2">
                                <CheckCircle size={16} className="text-[#FFE066] mt-0.5 flex-shrink-0" />
                                <span className="text-sm">{benefit}</span>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                  
                  <div className="flex justify-center mt-8">
                    <AnimatedButton 
                      variant="primary"
                      size="lg" 
                      animationType="spotlight"
                      onClick={handleStartClick}
                    >
                      {isAuthenticated ? "Try It Now" : "Get Started Free"}
                    </AnimatedButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="px-6 py-16 md:py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 text-[#FFE066] bg-[#121327] border border-[#252641] hover:bg-[#121327]/80 font-['Urbanist'] font-normal text-xs">
                Testimonials
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-['Urbanist'] text-[#E2E4ED]">
                What our users are saying
              </h2>
              <p className="text-lg max-w-2xl mx-auto font-['Urbanist'] text-[#E2E4ED]/70">
                Join thousands of developers who have improved their interview skills
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <Card 
                  key={index} 
                  className="border border-[#252641] bg-[#121327] relative overflow-hidden group"
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
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={`https://ui-avatars.com/api/?name=${testimonial.name}&background=1A1B31&color=FFE066&size=100`} />
                        <AvatarFallback className="bg-[#1A1B31] text-[#FFE066] border border-[#252641]">
                          {testimonial.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="text-base font-semibold font-['Urbanist'] text-[#E2E4ED]">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-[#FFE066] font-['Urbanist']">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                    <p className="text-[#E2E4ED]/80 italic font-['Urbanist']">
                      "{testimonial.quote}"
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="px-6 py-16 md:py-20 bg-[#080911]/60">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-['Urbanist'] text-[#E2E4ED]">
              Ready to master your technical interviews?
            </h2>
            <p className="text-lg mb-8 font-['Urbanist'] text-[#E2E4ED]/70 max-w-2xl mx-auto">
              Start practicing today and get personalized feedback to improve your interview skills
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <AnimatedButton 
                variant="primary"
                size="lg" 
                animationType="spotlight"
                onClick={handleStartClick}
              >
                {isAuthenticated ? "Start Practicing" : "Get Started"}
              </AnimatedButton>
              <AnimatedButton 
                variant="outline" 
                size="lg" 
                animationType="bounce"
                icon={<Sparkles className="ml-2" size={16} />}
                onClick={() => navigate('/about')}
              >
                Learn More
              </AnimatedButton>
            </div>
            <div className="flex items-center justify-center text-[#E2E4ED]/60 font-['Urbanist'] text-sm mt-6">
              <CheckCircle size={16} className="text-[#FFE066] mr-2" />
              <span>No credit card required</span>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;

