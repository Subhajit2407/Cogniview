import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Sparkles, AlertTriangle, Battery, BatteryCharging, ChevronRight, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import TerminalInterview, { AnswerScores } from '@/components/TerminalInterview';
import { DomainSelector } from '@/components/DomainSelector';
import { useInterviewSession } from '@/hooks/useInterviewSession';
import { Squares } from '@/components/ui/squares-background';
import { LevelSelector } from '@/components/LevelSelector';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import Navbar from '@/components/Navbar';

const Simulate = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAuthenticated, clearSessionHistory } = useAuth();
  
  const [hasSelectedDomain, setHasSelectedDomain] = useState(false);
  const [difficultyLevel, setDifficultyLevel] = useState('beginner');
  const [isRecharging, setIsRecharging] = useState(false);
  const [rechargingTimeLeft, setRechargingTimeLeft] = useState(0);
  
  const { 
    domain, 
    changeDomain, 
    startNewSession, 
    session,
    currentQuestion,
    currentQuestionIndex,
    recordAnswer,
    goToNextQuestion, 
    progress,
    isInterviewComplete,
    setIsInterviewComplete
  } = useInterviewSession();

  // Check local storage on mount for recharge status
  useEffect(() => {
    const storedRechargeTime = localStorage.getItem('cogniview_recharge_until');
    
    if (storedRechargeTime) {
      const rechargeUntil = parseInt(storedRechargeTime);
      const now = Date.now();
      
      if (now < rechargeUntil) {
        // Still recharging
        setIsRecharging(true);
        setRechargingTimeLeft(Math.floor((rechargeUntil - now) / 1000));
      } else {
        // Recharge completed
        localStorage.removeItem('cogniview_recharge_until');
      }
    }
  }, []);

  // Timer for recharging countdown
  useEffect(() => {
    let timer: number;
    
    if (isRecharging && rechargingTimeLeft > 0) {
      timer = window.setInterval(() => {
        setRechargingTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsRecharging(false);
            localStorage.removeItem('cogniview_recharge_until');
            
            toast({
              title: "Cogniview Recharged!",
              description: "Your interview bot is ready for a new session.",
              variant: "default",
            });
            
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRecharging, rechargingTimeLeft, toast]);

  // Check if session limit reached (10 questions)
  useEffect(() => {
    if (session && currentQuestionIndex >= 10) {
      // Complete the session when 10 questions are answered
      setIsInterviewComplete(true);
      
      // Set recharging state for 3 minutes
      setIsRecharging(true);
      const rechargingTime = 3 * 60; // 3 minutes in seconds
      setRechargingTimeLeft(rechargingTime);
      
      // Store recharge end time in localStorage
      const rechargeUntil = Date.now() + (rechargingTime * 1000);
      localStorage.setItem('cogniview_recharge_until', rechargeUntil.toString());
      
      // Wait a moment to let the user see the final response
      setTimeout(() => {
        navigate('/feedback');
      }, 2000);
    }
  }, [currentQuestionIndex, session, navigate]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Handle domain selection
  const handleDomainSelect = (selectedDomain: string) => {
    changeDomain(selectedDomain);
  };

  // Monitor domain changes
  useEffect(() => {
    // This effect ensures the UI properly reflects the current domain
    console.log(`Current domain: ${domain}`);
  }, [domain]);

  const handleStartInterview = () => {
    if (isRecharging) {
      toast({
        title: "Cogniview is Recharging",
        description: `Please wait ${formatTime(rechargingTimeLeft)} before starting a new session.`,
        variant: "destructive",
      });
      return;
    }
    
    startNewSession(difficultyLevel);
    setHasSelectedDomain(true);
  };

  const handleBackToDomains = () => {
    setHasSelectedDomain(false);
  };
  
  const handleLevelChange = (level: string) => {
    setDifficultyLevel(level);
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const handleAnswerSubmit = (answer: string, scores: AnswerScores) => {
    recordAnswer(answer, scores);
  };

  const handleResetProgress = () => {
    clearSessionHistory();
    toast({
      title: "Progress Reset",
      description: "Your interview history has been cleared. You can start fresh interviews.",
      variant: "default",
    });
    // Go back to domain selection
    setHasSelectedDomain(false);
  };

  return (
    <div className="min-h-screen relative bg-[#0F111A] text-[#C3C8D3] overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <Squares 
          direction="diagonal"
          speed={0.5}
          squareSize={40}
          borderColor="#00FFE0"
          hoverFillColor="#00FFE0"
        />
      </div>
      
      <Navbar />
      
      <div className="relative z-10 p-6 max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            className="text-[#C3C8D3] hover:text-[#00FFE0] mr-2"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="mr-1" size={16} />
            Back
          </Button>
          <h1 className="text-2xl font-['Urbanist'] font-bold text-[#00FFE0]">Interview Simulator</h1>
          
          <div className="ml-auto flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleResetProgress}
              className="flex items-center text-xs border-[#1F222E] text-[#C3C8D3] hover:bg-[#1F222E]/30"
            >
              <RefreshCw size={14} className="mr-1" /> Reset Progress
            </Button>

            {isRecharging && (
              <div className="flex items-center text-yellow-400">
                <BatteryCharging size={18} className="mr-2 animate-pulse" />
                <span className="font-['Urbanist'] text-sm">Recharging: {formatTime(rechargingTimeLeft)}</span>
              </div>
            )}
            
            {!isRecharging && progress && (
              <div className="flex items-center">
                <Battery size={18} className="mr-2 text-[#00FFE0]" />
                <span className="font-['Urbanist'] text-sm text-[#00FFE0]">
                  Stage: {currentQuestionIndex + 1}/{progress.total}
                </span>
                {session && session.answers && (
                  <div className="ml-4 flex items-center">
                    {Object.values(session.answers).map((answer, idx) => (
                      <div 
                        key={idx}
                        className={`w-2 h-2 rounded-full mx-1 ${
                          answer.scores.overallScore >= 75 ? 'bg-green-400' : 
                          answer.scores.overallScore >= 50 ? 'bg-yellow-400' : 
                          'bg-red-400'
                        }`}
                        title={`Q${idx + 1}: ${answer.scores.overallScore}%`}
                      />
                    ))}
                    {/* Placeholder dots for unanswered questions */}
                    {Array.from({ length: progress.total - Object.keys(session.answers).length }).map((_, idx) => (
                      <div 
                        key={`unanswered-${idx}`}
                        className="w-2 h-2 rounded-full mx-1 bg-[#1F222E]"
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        {!hasSelectedDomain ? (
          <div className="border border-[#1F222E] rounded-lg p-6 bg-[#141622]/80 backdrop-blur">
            <div className="flex justify-center mb-5">
              <img 
                src="/cogniview.png.png" 
                alt="Cogniview Logo" 
                className="h-16 w-16" 
              />
            </div>
            <div className="flex items-center mb-4 text-[#00FFE0]">
              <Sparkles size={20} className="mr-2" />
              <h2 className="text-xl font-['Urbanist']">Choose Your Career Domain</h2>
            </div>
            
            <p className="mb-6 text-[#C3C8D3]/80 font-['Urbanist']">
              Select the domain that best matches your career goals. We'll tailor the interview questions accordingly.
            </p>
            
            <DomainSelector 
              selectedDomain={domain} 
              onSelectDomain={handleDomainSelect} 
            />
            
            <div className="mt-6 mb-6">
              <LevelSelector 
                selectedLevel={difficultyLevel}
                onSelectLevel={handleLevelChange}
              />
            </div>
            
            <div className="flex justify-end">
              <Button 
                className={`bg-[#00FFE0] hover:bg-[#00FFE0]/80 text-[#0F111A] font-['Urbanist'] ${isRecharging ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={handleStartInterview}
                disabled={isRecharging}
              >
                {isRecharging ? 'Recharging...' : 'Start Interview'}
              </Button>
            </div>
            
            {isRecharging && (
              <div className="mt-4 p-3 bg-yellow-400/10 border border-yellow-400/30 rounded-md flex items-center">
                <AlertTriangle size={16} className="text-yellow-400 mr-2" />
                <p className="text-sm text-yellow-400 font-['Urbanist']">
                  Cogniview is recharging. Please wait {formatTime(rechargingTimeLeft)} before starting a new session.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="border border-[#1F222E] rounded-lg p-6 bg-[#141622]/90 backdrop-blur">
            <div className="mb-4 flex justify-between items-center">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-[#C3C8D3] border-[#1F222E]"
                onClick={handleBackToDomains}
              >
                Change Domain
              </Button>
              
              <div className="flex items-center">
                <span className="text-sm font-['Urbanist'] text-[#C3C8D3] mr-2">
                  Level: {difficultyLevel.charAt(0).toUpperCase() + difficultyLevel.slice(1)}
                </span>
              </div>
            </div>
            
            {/* Question Progress Indicator */}
            {session && progress && (
              <div className="mb-4 bg-[#0D1117] p-3 rounded-md border border-[#1F222E]">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-['Urbanist'] text-[#C3C8D3]">
                    Question {currentQuestionIndex + 1} of {progress.total}
                  </span>
                  <span className="text-sm font-['Urbanist'] text-[#00FFE0]">
                    {progress.completed}/{progress.total} Answered
                  </span>
                </div>
                <div className="w-full h-2 bg-[#1F222E] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#00FFE0]" 
                    style={{ width: `${(progress.completed / progress.total) * 100}%` }}
                  />
                </div>
              </div>
            )}
            
            <TerminalInterview 
              domain={domain}
              difficultyLevel={difficultyLevel}
              currentQuestion={currentQuestion?.question || ""}
              onAnswerSubmit={handleAnswerSubmit}
              disabled={isRecharging}
            />
            
            {session && session.answers && currentQuestion && !isRecharging && (
              <div className="mt-4">
                {session.answers[currentQuestion.id] && (
                  <div className="flex flex-col space-y-3">
                    <div className="p-4 bg-[#141622]/80 border border-[#1F222E] rounded-lg">
                      <h3 className="text-md font-semibold text-[#00FFE0] mb-2 font-['Urbanist']">
                        Answer Evaluation
                      </h3>
                      <div className="flex items-center mb-3">
                        <div className="w-full bg-[#0D1117] h-2 rounded-full overflow-hidden mr-3">
                          <div 
                            className={`h-full rounded-full ${
                              session.answers[currentQuestion.id].scores.overallScore >= 80 ? 'bg-green-400' : 
                              session.answers[currentQuestion.id].scores.overallScore >= 60 ? 'bg-[#00FFE0]' : 
                              session.answers[currentQuestion.id].scores.overallScore >= 40 ? 'bg-yellow-400' : 
                              'bg-red-400'
                            }`} 
                            style={{ width: `${session.answers[currentQuestion.id].scores.overallScore}%` }}
                          />
                        </div>
                        <span className="text-sm font-['Urbanist'] font-medium">
                          {session.answers[currentQuestion.id].scores.overallScore}%
                        </span>
                      </div>
                      <p className="text-sm text-[#C3C8D3]/80 font-['Urbanist']">
                        {session.answers[currentQuestion.id].scores.overallScore >= 80 
                          ? "Excellent answer! You've demonstrated strong knowledge on this topic." 
                          : session.answers[currentQuestion.id].scores.overallScore >= 60
                          ? "Good answer! You covered important points, with some room for improvement."
                          : session.answers[currentQuestion.id].scores.overallScore >= 40
                          ? "You're on the right track, but there are gaps in your understanding."
                          : "This topic needs more study. Review the feedback carefully before moving on."
                        }
                      </p>
                    </div>
                    <div className="flex justify-end">
                      <Button 
                        onClick={goToNextQuestion}
                        className="bg-[#00FFE0] hover:bg-[#00FFE0]/80 text-[#0F111A] font-['Urbanist'] flex items-center"
                      >
                        Continue to Next Question <ChevronRight size={16} className="ml-1" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Simulate;
