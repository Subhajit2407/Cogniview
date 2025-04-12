import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, User, LockKeyhole, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Navbar from '@/components/Navbar';
import { useInterviewSession } from '@/hooks/useInterviewSession';
import AIFeedbackPanel from '@/components/AIFeedbackPanel';

const Feedback = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { session, getSessionHistory } = useInterviewSession();
  const [hasCompletedSessions, setHasCompletedSessions] = useState(false);
  const [latestSession, setLatestSession] = useState<any>(null);
  
  // Check for completed sessions on mount
  useEffect(() => {
    const history = getSessionHistory();
    if (history.length > 0) {
      setHasCompletedSessions(true);
      
      // Get the latest session
      const sortedHistory = [...history].sort((a, b) => 
        new Date(b.endTime || 0).getTime() - new Date(a.endTime || 0).getTime()
      );
      
      setLatestSession(sortedHistory[0]);
    } else {
      setHasCompletedSessions(false);
    }
  }, [getSessionHistory]);
  
  // Generate feedback items from session data
  const generateFeedbackItems = () => {
    const sessionToUse = session?.feedback ? session : latestSession;
    
    if (!sessionToUse || !sessionToUse.feedback) {
      return [];
    }
    
    const domain = sessionToUse.domain;
    const feedbackItems = [];
    
    // Confidence score - shown for all domains
    feedbackItems.push({
      category: "Confidence",
      score: sessionToUse.feedback.confidenceScore || 0,
      level: determineLevel(sessionToUse.feedback.confidenceScore || 0),
      message: "Your confidence level was good throughout the interview."
    });
    
    // Problem Solving - shown for all domains
    feedbackItems.push({
      category: "Problem Solving",
      score: sessionToUse.feedback.problemSolvingScore || 0,
      level: determineLevel(sessionToUse.feedback.problemSolvingScore || 0),
      message: "You approached problems systematically and provided clear solutions."
    });
    
    // Domain-specific criteria
    if (domain !== 'graphic-design') {
      // Technical Knowledge - for all domains except graphic design
      feedbackItems.push({
        category: "Technical Knowledge",
        score: sessionToUse.feedback.technicalScore || 0,
        level: determineLevel(sessionToUse.feedback.technicalScore || 0),
        message: "You demonstrated solid technical knowledge in your responses."
      });
      
      // Communication - for all domains except graphic design
      feedbackItems.push({
        category: "Communication",
        score: sessionToUse.feedback.communicationScore || 0,
        level: determineLevel(sessionToUse.feedback.communicationScore || 0),
        message: "Your communication was clear and articulate. You explained technical concepts effectively."
      });
    }
    
    // Code Quality - only for software development and AI
    if (domain === 'software-development' || domain === 'ai-engineering' || domain === 'product-management') {
      feedbackItems.push({
        category: "Code Quality",
        score: sessionToUse.feedback.codeQualityScore || 0,
        level: determineLevel(sessionToUse.feedback.codeQualityScore || 0),
        message: "Your code examples showed awareness of best practices and error handling."
      });
    }
    
    // Management - only for team leadership
    if (domain === 'team-leadership' && sessionToUse.feedback.managementScore !== undefined) {
      feedbackItems.push({
        category: "Management Skills",
        score: sessionToUse.feedback.managementScore || 0,
        level: determineLevel(sessionToUse.feedback.managementScore || 0),
        message: "Your leadership approach demonstrates strong team management skills."
      });
    }
    
    return feedbackItems;
  };
  
  // Helper to determine feedback level based on score
  const determineLevel = (score: number): "success" | "info" | "warning" | "error" => {
    if (score >= 80) return "success";
    if (score >= 70) return "info";
    if (score >= 60) return "warning";
    return "error";
  };
  
  // Calculate session duration
  const calculateSessionDuration = () => {
    const sessionToUse = session || latestSession;
    
    if (!sessionToUse || !sessionToUse.startTime || !sessionToUse.endTime) return 0;
    
    const startTime = new Date(sessionToUse.startTime).getTime();
    const endTime = new Date(sessionToUse.endTime).getTime();
    return Math.floor((endTime - startTime) / 1000); // duration in seconds
  };
  
  // Get overall score from session
  const getOverallScore = () => {
    const sessionToUse = session || latestSession;
    
    if (sessionToUse?.feedback?.overallScore) {
      return sessionToUse.feedback.overallScore;
    }
    return 0;
  };
  
  // Get domain and level from session
  const getDomain = () => {
    const sessionToUse = session || latestSession;
    return sessionToUse?.domain || 'software-development';
  };
  
  const getLevel = () => {
    const sessionToUse = session || latestSession;
    return sessionToUse?.difficultyLevel || 'beginner';
  };
  
  return (
    <div className="min-h-screen bg-[#0F111A] text-[#C3C8D3]">
      <Navbar />
      
      <div className="max-w-4xl mx-auto w-full p-6">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            className="text-[#C3C8D3] hover:text-[#00FFE0] mr-2"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="mr-1" size={16} />
            Back
          </Button>
          <h1 className="text-2xl font-['Urbanist'] font-bold text-[#00FFE0]">Interview Feedback</h1>
        </div>
        
        {isAuthenticated && hasCompletedSessions ? (
          <>
            <AIFeedbackPanel 
              feedbackItems={generateFeedbackItems()} 
              overallScore={getOverallScore()} 
              timeSpent={calculateSessionDuration()} 
              domain={getDomain()}
              level={getLevel()}
            />
            
            <div className="mt-6 flex justify-end">
              <Button 
                className="bg-[#00FFE0] hover:bg-[#00FFE0]/80 text-[#0F111A] font-['Urbanist'] mr-2"
                onClick={() => navigate('/simulate')}
              >
                Practice Again
              </Button>
              <Button 
                className="bg-[#1F222E] hover:bg-[#1F222E]/80 text-[#C3C8D3] font-['Urbanist']"
                onClick={() => navigate('/progress')}
              >
                View Progress
              </Button>
            </div>
          </>
        ) : (
          <div className="border border-[#1F222E] rounded-lg p-8 bg-[#141622]/80 backdrop-blur flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-[#1A1B31] rounded-full flex items-center justify-center mb-6">
              <User size={32} className="text-[#00FFE0]" />
            </div>
            
            <h2 className="text-2xl font-['Urbanist'] font-bold text-[#E2E4ED] mb-3">No Feedback Available</h2>
            
            <p className="text-[#C3C8D3]/80 font-['Urbanist'] max-w-md mb-6">
              {isAuthenticated 
                ? "Complete your first interview session to receive personalized feedback and performance analysis."
                : "Sign up or log in to start practicing interviews and receive detailed AI-powered feedback on your performance."}
            </p>
            
            {isAuthenticated ? (
              <Button 
                className="bg-[#00FFE0] hover:bg-[#00FFE0]/80 text-[#0F111A] font-['Urbanist']"
                onClick={() => navigate('/simulate')}
              >
                Start Practicing
              </Button>
            ) : (
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  className="bg-[#00FFE0] hover:bg-[#00FFE0]/80 text-[#0F111A] font-['Urbanist']"
                  onClick={() => navigate('/register')}
                >
                  <LockKeyhole size={16} className="mr-2" />
                  Sign Up
                </Button>
                <Button 
                  className="bg-[#1F222E] hover:bg-[#1F222E]/80 text-[#C3C8D3] font-['Urbanist']"
                  onClick={() => navigate('/login')}
                >
                  <LogIn size={16} className="mr-2" />
                  Log In
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Feedback;
