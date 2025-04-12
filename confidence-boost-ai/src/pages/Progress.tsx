import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BarChart, User, LockKeyhole, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Navbar from '@/components/Navbar';
import { useInterviewSession } from '@/hooks/useInterviewSession';
import ProgressTracker from '@/components/ProgressTracker';
import { domains } from '@/components/DomainSelector';

const Progress = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { getSessionHistory } = useInterviewSession();
  const [selectedDomain, setSelectedDomain] = useState('software-development');
  const [hasCompletedSessions, setHasCompletedSessions] = useState(false);
  const [sessionHistory, setSessionHistory] = useState<any[]>([]);
  
  // Load session history on mount
  useEffect(() => {
    const history = getSessionHistory();
    if (history.length > 0) {
      setHasCompletedSessions(true);
      setSessionHistory(history);
      
      // Set selected domain to the domain of the most recent session
      const sortedHistory = [...history].sort((a, b) => 
        new Date(b.endTime || 0).getTime() - new Date(a.endTime || 0).getTime()
      );
      if (sortedHistory[0].domain) {
        setSelectedDomain(sortedHistory[0].domain);
      }
    } else {
      setHasCompletedSessions(false);
    }
  }, [getSessionHistory]);
  
  // Get data for the selected domain
  const getDomainData = () => {
    // Filter sessions for the selected domain
    const domainSessions = sessionHistory.filter(session => session.domain === selectedDomain);
    
    if (domainSessions.length === 0) return [];
    
    // Convert sessions to progress entries
    return domainSessions.map(session => {
      const endDate = session.endTime ? new Date(session.endTime) : new Date();
      return {
        date: endDate.toISOString().split('T')[0], // Just get the date part
        confidenceScore: session.feedback?.confidenceScore || 0,
        technicalScore: session.feedback?.technicalScore || 0,
        communicationScore: session.feedback?.communicationScore || 0,
        codeQualityScore: session.feedback?.codeQualityScore || 0,
        problemSolvingScore: session.feedback?.problemSolvingScore || 0,
        sessionCount: 1,
        overallScore: session.feedback?.overallScore || 0
      };
    });
  };
  
  // Calculate domain statistics
  const calculateDomainStats = () => {
    const domainData = getDomainData();
    
    if (domainData.length === 0) {
      return {
        totalSessions: 0,
        averageScore: 0,
        topSkill: "N/A",
        improvementArea: "N/A"
      };
    }
    
    // Calculate total sessions
    const totalSessions = domainData.length;
    
    // Calculate average scores
    const avgConfidence = domainData.reduce((sum, entry) => sum + entry.confidenceScore, 0) / domainData.length;
    const avgTechnical = domainData.reduce((sum, entry) => sum + entry.technicalScore, 0) / domainData.length;
    const avgCommunication = domainData.reduce((sum, entry) => sum + entry.communicationScore, 0) / domainData.length;
    const avgCodeQuality = domainData.reduce((sum, entry) => sum + entry.codeQualityScore, 0) / domainData.length;
    const avgProblemSolving = domainData.reduce((sum, entry) => sum + entry.problemSolvingScore, 0) / domainData.length;
    
    const averageScore = Math.floor((avgConfidence + avgTechnical + avgCommunication + avgCodeQuality + avgProblemSolving) / 5);
    
    // Determine top skill and improvement area
    const scores = {
      "Technical Knowledge": avgTechnical,
      "Communication Clarity": avgCommunication,
      "Confidence": avgConfidence,
      "Code Quality": avgCodeQuality,
      "Problem Solving": avgProblemSolving
    };
    
    const sortedSkills = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const topSkill = sortedSkills[0][0];
    const improvementArea = sortedSkills[sortedSkills.length - 1][0];
    
    return {
      totalSessions,
      averageScore,
      topSkill,
      improvementArea
    };
  };
  
  const domainStats = calculateDomainStats();
  const progressData = getDomainData();
  const selectedDomainInfo = domains.find(d => d.id === selectedDomain);
  const DomainIcon = selectedDomainInfo?.icon;
  
  return (
    <div className="min-h-screen bg-[#0F111A] text-[#C3C8D3]">
      <Navbar />
      
      <div className="max-w-5xl mx-auto w-full p-6">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            className="text-[#C3C8D3] hover:text-[#FFE066] mr-2"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="mr-1" size={16} />
            Back
          </Button>
          <h1 className="text-2xl font-['Urbanist'] font-bold text-[#FFE066]">Progress Tracking</h1>
        </div>
        
        {isAuthenticated && hasCompletedSessions ? (
          <>
            <div className="mb-6 border border-[#1F222E] rounded-lg p-4 bg-[#141622]">
              <h2 className="text-xl font-['Urbanist'] font-semibold mb-4 text-white">Select Career Domain</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {domains.map((domain) => {
                  const Icon = domain.icon;
                  const isSelected = domain.id === selectedDomain;
                  
                  // Check if we have data for this domain
                  const hasDomainData = sessionHistory.some(session => session.domain === domain.id);
                  
                  if (!hasDomainData) return null;
                  
                  return (
                    <div
                      key={domain.id}
                      onClick={() => setSelectedDomain(domain.id)}
                      className={`
                        flex items-center p-3 rounded-md cursor-pointer transition-all
                        ${isSelected 
                          ? 'bg-[#FFE066]/10 border border-[#FFE066] text-white' 
                          : 'bg-[#1F222E] hover:bg-[#1F222E]/70 text-[#C3C8D3]'}
                      `}
                    >
                      <Icon size={18} className={isSelected ? 'text-[#FFE066]' : ''} />
                      <span className="ml-2 font-['Urbanist'] text-sm">{domain.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {selectedDomainInfo && (
              <div className="mb-6 p-4 border border-[#1F222E] rounded-lg bg-[#141622] flex items-start">
                {DomainIcon && <DomainIcon size={24} className="text-[#FFE066] mt-1 mr-3" />}
                <div>
                  <h2 className="text-xl font-['Urbanist'] font-semibold text-white">{selectedDomainInfo.name}</h2>
                  <p className="text-[#C3C8D3]/70 font-['Urbanist']">{selectedDomainInfo.description}</p>
                </div>
              </div>
            )}
            
            <ProgressTracker 
              progressData={progressData}
              totalSessions={domainStats.totalSessions}
              averageScore={domainStats.averageScore}
              topSkill={domainStats.topSkill}
              improvementArea={domainStats.improvementArea}
            />
            
            <div className="mt-6 flex justify-end">
              <Button 
                className="bg-[#FFE066] hover:bg-[#FFE066]/80 text-[#0F111A] font-['Urbanist']"
                onClick={() => navigate('/simulate')}
              >
                Start New Session
              </Button>
            </div>
          </>
        ) : (
          <div className="border border-[#1F222E] rounded-lg p-8 bg-[#141622]/80 backdrop-blur flex flex-col items-center justify-center text-center min-h-[500px]">
            <div className="w-20 h-20 bg-[#1A1B31] rounded-full flex items-center justify-center mb-6">
              <BarChart size={32} className="text-[#FFE066]" />
            </div>
            
            <h2 className="text-2xl font-['Urbanist'] font-bold text-[#E2E4ED] mb-3">No Progress Data Available</h2>
            
            <p className="text-[#C3C8D3]/80 font-['Urbanist'] max-w-md mb-6">
              {isAuthenticated 
                ? "Complete at least one interview session to see your performance metrics and progress over time."
                : "Sign up or log in to track your interview performance and see your improvement over time."}
            </p>
            
            {isAuthenticated ? (
              <Button 
                className="bg-[#FFE066] hover:bg-[#FFE066]/80 text-[#0F111A] font-['Urbanist']"
                onClick={() => navigate('/simulate')}
              >
                Start Practicing
              </Button>
            ) : (
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  className="bg-[#FFE066] hover:bg-[#FFE066]/80 text-[#0F111A] font-['Urbanist']"
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
            
            {isAuthenticated && (
              <div className="mt-10 text-[#C3C8D3]/60 text-sm font-['Urbanist']">
                <p>Practice regularly to unlock detailed analytics and track your improvement</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Progress;
