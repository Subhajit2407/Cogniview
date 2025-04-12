import React from 'react';
import { Calendar, LineChart as LineChartIcon, Activity, Star, Award, Brain, MessageSquare, Code, Lightbulb, Users } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, Cell } from 'recharts';
import { Progress } from '@/components/ui/progress';

interface ProgressEntry {
  date: string;
  confidenceScore: number;
  technicalScore: number;
  communicationScore: number;
  codeQualityScore: number;
  problemSolvingScore: number;
  managementScore?: number;
  sessionCount: number;
  domain?: string;
  overallScore?: number;
}

interface ProgressTrackerProps {
  progressData: ProgressEntry[];
  totalSessions: number;
  averageScore: number;
  topSkill: string;
  improvementArea: string;
  domain?: string;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  progressData,
  totalSessions,
  averageScore,
  topSkill,
  improvementArea,
  domain = 'software-development'
}) => {
  const lastSession = progressData[progressData.length - 1];
  
  // Calculate improvement percentage between first and last entry
  const calculateImprovement = (dataKey: keyof ProgressEntry) => {
    if (progressData.length < 2) return 0;
    const first = progressData[0][dataKey] as number;
    const last = progressData[progressData.length - 1][dataKey] as number;
    return Math.round(((last - first) / first) * 100);
  };

  // Calculate average scores for each category
  const calculateCategoryAverages = () => {
    if (progressData.length === 0) return { 
      confidence: 0, 
      technical: 0, 
      communication: 0, 
      codeQuality: 0,
      problemSolving: 0,
      management: 0
    };
    
    const confidence = progressData.reduce((acc, entry) => acc + entry.confidenceScore, 0) / progressData.length;
    const technical = progressData.reduce((acc, entry) => acc + entry.technicalScore, 0) / progressData.length;
    const communication = progressData.reduce((acc, entry) => acc + entry.communicationScore, 0) / progressData.length;
    const codeQuality = progressData.reduce((acc, entry) => acc + (entry.codeQualityScore || 0), 0) / progressData.length;
    const problemSolving = progressData.reduce((acc, entry) => acc + (entry.problemSolvingScore || 0), 0) / progressData.length;
    const management = progressData.reduce((acc, entry) => acc + (entry.managementScore || 0), 0) / progressData.length;
    
    return {
      confidence: Math.round(confidence),
      technical: Math.round(technical),
      communication: Math.round(communication),
      codeQuality: Math.round(codeQuality),
      problemSolving: Math.round(problemSolving),
      management: Math.round(management)
    };
  };

  const categoryAverages = calculateCategoryAverages();

  // For the bar chart - skill categories and scores based on domain
  const getSkillDataForDomain = (domain: string) => {
    // Base skills for all domains
    const baseSkills = [
      { name: 'Confidence', score: categoryAverages.confidence, color: '#00FFE0' },
      { name: 'Problem Solving', score: categoryAverages.problemSolving, color: '#E15FED' }
    ];
    
    // Add domain-specific skills
    if (domain !== 'graphic-design') {
      baseSkills.push(
        { name: 'Technical', score: categoryAverages.technical, color: '#FFD700' },
        { name: 'Communication', score: categoryAverages.communication, color: '#FF0070' }
      );
    }
    
    if (domain === 'software-development' || domain === 'ai-engineering' || domain === 'product-management') {
      baseSkills.push(
        { name: 'Code Quality', score: categoryAverages.codeQuality, color: '#4D9DE0' }
      );
    }
    
    if (domain === 'team-leadership') {
      baseSkills.push(
        { name: 'Management', score: categoryAverages.management, color: '#9AD173' }
      );
    }
    
    return baseSkills;
  };

  const skillData = getSkillDataForDomain(domain);

  // Prepare historical data for chart
  const chartData = progressData.map(entry => ({
    ...entry,
    overallScore: entry.overallScore || Math.round((entry.confidenceScore + entry.technicalScore + entry.communicationScore) / 3)
  }));

  return (
    <div className="border border-[#1F222E] rounded-lg bg-[#141622] overflow-hidden font-mono">
      {/* Header */}
      <div className="border-b border-[#1F222E] bg-[#0D0F18] p-3 flex items-center">
        <Activity className="mr-2 text-[#FFE066]" size={18} />
        <h3 className="text-[#C3C8D3] font-semibold">Interview Progress Tracker</h3>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border-b border-[#1F222E]">
        <div className="bg-[#0D0F18] p-3 rounded border border-[#1F222E]">
          <div className="text-[#C3C8D3]/60 text-xs mb-1">Total Sessions</div>
          <div className="text-[#FFE066] text-xl font-bold">{totalSessions}</div>
        </div>
        <div className="bg-[#0D0F18] p-3 rounded border border-[#1F222E]">
          <div className="text-[#C3C8D3]/60 text-xs mb-1">Average Score</div>
          <div className="text-[#FFE066] text-xl font-bold">{averageScore}%</div>
        </div>
        <div className="bg-[#0D0F18] p-3 rounded border border-[#1F222E]">
          <div className="text-[#C3C8D3]/60 text-xs mb-1">Top Skill</div>
          <div className="text-[#FFE066] text-xl font-bold">{topSkill}</div>
        </div>
        <div className="bg-[#0D0F18] p-3 rounded border border-[#1F222E]">
          <div className="text-[#C3C8D3]/60 text-xs mb-1">Improvement Area</div>
          <div className="text-[#FF0070] text-xl font-bold">{improvementArea}</div>
        </div>
      </div>
      
      {/* Skill Breakdown */}
      <div className="p-4 border-b border-[#1F222E]">
        <div className="mb-2 flex items-center justify-between">
          <h4 className="text-[#C3C8D3] text-sm font-semibold">Skill Breakdown</h4>
          <div className="flex items-center">
            <Brain className="text-[#C3C8D3]/60 mr-1" size={14} />
            <span className="text-xs text-[#C3C8D3]/60">Core competencies</span>
          </div>
        </div>
        
        <div className="space-y-3">
          {/* Confidence - shown for all domains */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center">
                <Award className="text-[#FFE066] mr-1" size={14} />
                <span className="text-[#C3C8D3] text-sm">Confidence</span>
              </div>
              <span className="text-[#FFE066] text-sm">{categoryAverages.confidence}%</span>
            </div>
            <Progress value={categoryAverages.confidence} className="h-2 bg-[#1F222E]" indicatorColor="bg-[#FFE066]" />
          </div>
          
          {/* Problem Solving - shown for all domains */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center">
                <Lightbulb className="text-[#E15FED] mr-1" size={14} />
                <span className="text-[#C3C8D3] text-sm">Problem Solving</span>
              </div>
              <span className="text-[#E15FED] text-sm">{categoryAverages.problemSolving}%</span>
            </div>
            <Progress value={categoryAverages.problemSolving} className="h-2 bg-[#1F222E]" indicatorColor="bg-[#E15FED]" />
          </div>
          
          {/* Domain-specific metrics */}
          {domain !== 'graphic-design' && (
            <>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center">
                    <Brain className="text-[#FFD700] mr-1" size={14} />
                    <span className="text-[#C3C8D3] text-sm">Technical</span>
                  </div>
                  <span className="text-[#FFD700] text-sm">{categoryAverages.technical}%</span>
                </div>
                <Progress value={categoryAverages.technical} className="h-2 bg-[#1F222E]" indicatorColor="bg-[#FFD700]" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center">
                    <MessageSquare className="text-[#FF0070] mr-1" size={14} />
                    <span className="text-[#C3C8D3] text-sm">Communication</span>
                  </div>
                  <span className="text-[#FF0070] text-sm">{categoryAverages.communication}%</span>
                </div>
                <Progress value={categoryAverages.communication} className="h-2 bg-[#1F222E]" indicatorColor="bg-[#FF0070]" />
              </div>
            </>
          )}

          {/* Code Quality - only for software development and AI */}
          {(domain === 'software-development' || domain === 'ai-engineering' || domain === 'product-management') && (
            <div>
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center">
                  <Code className="text-[#4D9DE0] mr-1" size={14} />
                  <span className="text-[#C3C8D3] text-sm">Code Quality</span>
                </div>
                <span className="text-[#4D9DE0] text-sm">{categoryAverages.codeQuality}%</span>
              </div>
              <Progress value={categoryAverages.codeQuality} className="h-2 bg-[#1F222E]" indicatorColor="bg-[#4D9DE0]" />
            </div>
          )}

          {/* Management - only for team leadership */}
          {domain === 'team-leadership' && (
            <div>
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center">
                  <Users className="text-[#9AD173] mr-1" size={14} />
                  <span className="text-[#C3C8D3] text-sm">Management</span>
                </div>
                <span className="text-[#9AD173] text-sm">{categoryAverages.management}%</span>
              </div>
              <Progress value={categoryAverages.management} className="h-2 bg-[#1F222E]" indicatorColor="bg-[#9AD173]" />
            </div>
          )}
        </div>
      </div>
      
      {/* Progress Chart */}
      <div className="p-4 border-b border-[#1F222E]">
        <div className="mb-2 flex items-center justify-between">
          <h4 className="text-[#C3C8D3] text-sm font-semibold">Performance Trends</h4>
          <div className="flex items-center">
            <span className="inline-block h-3 w-3 rounded-full bg-[#FFE066] mr-1"></span>
            <span className="text-xs text-[#C3C8D3] mr-4">Technical</span>
            <span className="inline-block h-3 w-3 rounded-full bg-[#FF0070] mr-1"></span>
            <span className="text-xs text-[#C3C8D3]">Communication</span>
          </div>
        </div>
        
        <div className="bg-[#0D0F18] border border-[#1F222E] rounded p-2 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData.length < 7 ? getSampleProgressData() : chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1F222E" />
              <XAxis 
                dataKey="date" 
                stroke="#3A3F4C" 
                tick={{ fill: "#C3C8D3", fontSize: 10 }} 
                axisLine={{ stroke: "#1F222E" }}
                tickFormatter={(value, index) => `#${index + 1}`}
              />
              <YAxis 
                stroke="#3A3F4C" 
                tick={{ fill: "#C3C8D3", fontSize: 10 }} 
                axisLine={{ stroke: "#1F222E" }}
                domain={[0, 100]} 
                ticks={[0, 20, 40, 60, 80, 100]}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: "#0D0F18", borderColor: "#1F222E", borderRadius: "4px" }} 
                itemStyle={{ color: "#C3C8D3" }}
                formatter={(value: number) => [`${value}%`]}
                labelFormatter={(value, entry) => `Session ${entry[0].payload.sessionNumber}`}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="technicalScore" 
                name="Technical" 
                stroke="#FFE066" 
                activeDot={{ r: 6, fill: "#FFE066" }} 
                dot={{ r: 4, fill: "#FFE066" }}
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="communicationScore" 
                name="Communication" 
                stroke="#FF0070" 
                activeDot={{ r: 6, fill: "#FF0070" }} 
                dot={{ r: 4, fill: "#FF0070" }}
                strokeWidth={2} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-3 text-center text-sm text-[#FFE066]">
          Your interview performance has improved by 44% over 7 sessions
        </div>
      </div>
      
      {/* Score Distribution Chart */}
      <div className="p-4 border-b border-[#1F222E]">
        <h4 className="text-[#C3C8D3] text-sm font-semibold mb-2">Skill Distribution</h4>
        <div className="bg-[#0D0F18] border border-[#1F222E] rounded p-2 h-40">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={skillData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1F222E" />
              <XAxis dataKey="name" stroke="#C3C8D3" style={{ fontSize: '10px' }} />
              <YAxis stroke="#C3C8D3" style={{ fontSize: '10px' }} />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: '#0D0F18', 
                  border: '1px solid #1F222E',
                  borderRadius: '4px',
                  color: '#C3C8D3',
                  fontFamily: 'monospace'
                }}
              />
              <Bar dataKey="score" fill="#00FFE0">
                {skillData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Terminal Style Log Output */}
      <div className="p-4 bg-[#0D0F18]">
        <h4 className="text-[#C3C8D3] text-sm font-semibold mb-2">Session Log</h4>
        <pre className="bg-[#141622] p-3 rounded border border-[#1F222E] text-xs text-[#C3C8D3] overflow-auto max-h-48">
          <div className="text-[#00FFE0]">$ lastSession.toString()</div>
          {`{
  "date": "${lastSession?.date || 'N/A'}",
  "confidenceScore": ${lastSession?.confidenceScore || 0},
  "technicalScore": ${lastSession?.technicalScore || 0},
  "communicationScore": ${lastSession?.communicationScore || 0},
  "codeQualityScore": ${lastSession?.codeQualityScore || 0},
  "problemSolvingScore": ${lastSession?.problemSolvingScore || 0},
  "overallScore": ${lastSession?.overallScore || Math.round((lastSession?.confidenceScore + lastSession?.technicalScore + lastSession?.communicationScore + lastSession?.codeQualityScore + lastSession?.problemSolvingScore) / 5) || 0},
  "insights": [
    "Demonstrated strong problem-solving skills",
    "Mentioned specific examples from past experience",
    "Could improve on explaining system architecture"
  ],
  "questionCount": 12,
  "duration": "18m 45s"
}`}
        </pre>
      </div>
      
      {/* Actions */}
      <div className="p-3 border-t border-[#1F222E] bg-[#0D0F18] flex justify-between">
        <button className="text-[#C3C8D3] text-sm hover:text-[#00FFE0] transition-colors flex items-center">
          <Calendar size={14} className="mr-1" /> View Calendar
        </button>
        <button className="text-[#C3C8D3] text-sm hover:text-[#00FFE0] transition-colors flex items-center">
          <Star size={14} className="mr-1" /> Set Goals
        </button>
      </div>
    </div>
  );
};

// Function to generate sample progress data if no real data is available
function getSampleProgressData() {
  return [
    {
      date: "2023-09-01",
      sessionNumber: 1,
      confidenceScore: 40,
      technicalScore: 45,
      communicationScore: 50,
      problemSolvingScore: 42,
      codeQualityScore: 38,
      sessionCount: 1,
      overallScore: 43
    },
    {
      date: "2023-09-08",
      sessionNumber: 2,
      confidenceScore: 45,
      technicalScore: 50,
      communicationScore: 52,
      problemSolvingScore: 48,
      codeQualityScore: 44,
      sessionCount: 1,
      overallScore: 48
    },
    {
      date: "2023-09-15",
      sessionNumber: 3,
      confidenceScore: 51,
      technicalScore: 54,
      communicationScore: 56,
      problemSolvingScore: 53,
      codeQualityScore: 50,
      sessionCount: 1,
      overallScore: 53
    },
    {
      date: "2023-09-22",
      sessionNumber: 4,
      confidenceScore: 57,
      technicalScore: 59,
      communicationScore: 63,
      problemSolvingScore: 58,
      codeQualityScore: 57,
      sessionCount: 1,
      overallScore: 59
    },
    {
      date: "2023-09-29",
      sessionNumber: 5,
      confidenceScore: 62,
      technicalScore: 65,
      communicationScore: 68,
      problemSolvingScore: 63,
      codeQualityScore: 61,
      sessionCount: 1,
      overallScore: 64
    },
    {
      date: "2023-10-06",
      sessionNumber: 6,
      confidenceScore: 68,
      technicalScore: 70,
      communicationScore: 72,
      problemSolvingScore: 67,
      codeQualityScore: 66,
      sessionCount: 1,
      overallScore: 69
    },
    {
      date: "2023-10-13",
      sessionNumber: 7,
      confidenceScore: 75,
      technicalScore: 76,
      communicationScore: 79,
      problemSolvingScore: 74,
      codeQualityScore: 72,
      sessionCount: 1,
      overallScore: 75
    }
  ];
}

export default ProgressTracker;
