import React from 'react';
import { AlertTriangle, CheckCircle, Info, Code, Clock, User, Calendar } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/hooks/useAuth';

interface FeedbackItem {
  category: string;
  score: number;
  level: 'success' | 'warning' | 'info' | 'error';
  message: string;
  codeSnippet?: string;
}

interface AIFeedbackPanelProps {
  feedbackItems: FeedbackItem[];
  overallScore: number;
  timeSpent: number; // in seconds
  domain?: string;
  level?: string;
}

const AIFeedbackPanel: React.FC<AIFeedbackPanelProps> = ({ 
  feedbackItems, 
  overallScore,
  timeSpent,
  domain = 'software-development',
  level = 'beginner'
}) => {
  const { user } = useAuth();
  
  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'success':
        return <CheckCircle className="text-green-400" size={16} />;
      case 'warning':
        return <AlertTriangle className="text-yellow-400" size={16} />;
      case 'error':
        return <AlertTriangle className="text-[#FF0070]" size={16} />;
      default:
        return <Info className="text-[#00FFE0]" size={16} />;
    }
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="border border-[#1F222E] rounded-lg bg-[#141622] overflow-hidden font-mono">
      {/* Header */}
      <div className="border-b border-[#1F222E] bg-[#0D0F18] p-3 flex items-center justify-between">
        <div className="flex items-center">
          <Code className="mr-2 text-[#00FFE0]" size={18} />
          <h3 className="text-[#C3C8D3] font-semibold">Interview Feedback Analysis</h3>
        </div>
        <div className="flex items-center text-sm">
          <Clock className="mr-1 text-[#C3C8D3]/60" size={14} />
          <span className="text-[#C3C8D3]/60">{formatTime(timeSpent)}</span>
        </div>
      </div>
      
      {/* User Info */}
      {user && (
        <div className="p-3 border-b border-[#1F222E] bg-[#0D0F18]/50 flex justify-between items-center">
          <div className="flex items-center">
            <User className="mr-2 text-[#00FFE0]" size={16} />
            <span className="text-[#C3C8D3]">{user.name}</span>
          </div>
          <div className="flex items-center text-xs text-[#C3C8D3]/60">
            <Calendar className="mr-1" size={14} />
            <span>Member since {new Date(user.joinedDate).toLocaleDateString()}</span>
          </div>
        </div>
      )}
      
      {/* Domain Info */}
      <div className="p-3 border-b border-[#1F222E] bg-[#0D0F18]/70 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-[#C3C8D3]">Domain: </span>
          <span className="ml-2 text-[#00FFE0]">
            {domain.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </span>
        </div>
        <div className="flex items-center">
          <span className="text-[#C3C8D3]">Level: </span>
          <span className="ml-2 text-[#FFD700]">{level.charAt(0).toUpperCase() + level.slice(1)}</span>
        </div>
      </div>
      
      {/* Summary */}
      <div className="p-4 border-b border-[#1F222E] bg-[#0D0F18]/50">
        <div className="flex justify-between items-center mb-1">
          <span className="text-[#C3C8D3]">Overall Performance:</span>
          <span className="text-[#00FFE0]">{overallScore}/100</span>
        </div>
        <Progress value={overallScore} className="h-2 bg-[#1F222E]" />
        
        <div className="mt-4 text-xs text-[#C3C8D3]/60 bg-[#0D0F18] p-2 rounded border border-[#1F222E]">
          <span className="text-[#00FFE0]">console.log</span>
          (
          <span className="text-[#FF0070]">'Performance summary'</span>
          ):&nbsp;
          {overallScore >= 80 ? (
            <span>Excellent work! You're demonstrating strong interview skills.</span>
          ) : overallScore >= 60 ? (
            <span>Good progress. Some areas need refinement to stand out more.</span>
          ) : (
            <span>Keep practicing. Focus on the highlighted improvement areas.</span>
          )}
        </div>
        
        {/* Domain-specific improvement recommendations */}
        <div className="mt-4 text-xs text-[#C3C8D3]/80 bg-[#0D0F18] p-2 rounded border border-[#1F222E]">
          <span className="text-[#00FFE0]">// Actionable improvement recommendations</span>
          <div className="mt-2">
            {domain === 'software-development' && (
              <ul className="list-disc pl-4 space-y-1">
                <li>Practice explaining technical concepts clearly with analogies</li>
                <li>Research system design patterns relevant to your expertise</li>
                <li>Prepare code examples that demonstrate error handling and edge cases</li>
                <li>Be ready to discuss trade-offs in technology choices</li>
              </ul>
            )}
            
            {domain === 'ai-engineering' && (
              <ul className="list-disc pl-4 space-y-1">
                <li>Prepare to explain model evaluation metrics and when to use them</li>
                <li>Practice discussing ML model deployment challenges</li>
                <li>Be ready to explain bias mitigation strategies for models</li>
                <li>Research latest advancements in your AI specialty</li>
              </ul>
            )}
            
            {domain === 'graphic-design' && (
              <ul className="list-disc pl-4 space-y-1">
                <li>Prepare a narrative around your design process</li>
                <li>Practice articulating design decisions and their impact</li>
                <li>Be ready to discuss how you incorporate user feedback</li>
                <li>Research current design trends in your specialty</li>
              </ul>
            )}
            
            {domain === 'freelancing' && (
              <ul className="list-disc pl-4 space-y-1">
                <li>Practice explaining your client management process</li>
                <li>Prepare examples of how you handle scope creep</li>
                <li>Be ready to discuss your pricing and time estimation strategies</li>
                <li>Research effective marketing approaches for your services</li>
              </ul>
            )}
            
            {domain === 'team-leadership' && (
              <ul className="list-disc pl-4 space-y-1">
                <li>Prepare concrete examples of team conflict resolution</li>
                <li>Practice articulating your leadership philosophy</li>
                <li>Be ready to discuss how you motivate underperforming team members</li>
                <li>Research effective delegation and feedback strategies</li>
              </ul>
            )}
            
            {domain === 'product-management' && (
              <ul className="list-disc pl-4 space-y-1">
                <li>Practice explaining your prioritization framework</li>
                <li>Prepare examples of cross-functional team collaboration</li>
                <li>Be ready to discuss how you gather and apply user feedback</li>
                <li>Research product metrics and how to measure success</li>
              </ul>
            )}
          </div>
        </div>
      </div>
      
      {/* Feedback Items */}
      <div className="p-4 bg-[#0D0F18]">
        <pre className="text-sm">
          {feedbackItems.map((item, index) => (
            <div key={index} className="mb-4 pb-3 border-b border-[#1F222E] last:border-0">
              <div className="flex items-center mb-2">
                {getLevelIcon(item.level)}
                <span className={`ml-2 font-semibold ${
                  item.level === 'success' ? 'text-green-400' : 
                  item.level === 'warning' ? 'text-yellow-400' : 
                  item.level === 'error' ? 'text-[#FF0070]' : 
                  'text-[#00FFE0]'
                }`}>
                  {item.category}
                </span>
                <div className="ml-auto flex items-center">
                  <div className="w-16 bg-[#1F222E] h-1.5 rounded-full mr-2">
                    <div 
                      className={`h-full rounded-full ${
                        item.score >= 80 ? 'bg-green-400' : 
                        item.score >= 60 ? 'bg-yellow-400' : 
                        'bg-[#FF0070]'
                      }`} 
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                  <span className="text-xs text-[#C3C8D3]/60">{item.score}%</span>
                </div>
              </div>
              
              <div className="text-[#C3C8D3] ml-6">
                {item.message}
              </div>
              
              {item.codeSnippet && (
                <div className="ml-6 mt-2 bg-[#1F222E] p-2 rounded text-[#C3C8D3]/80 border-l-2 border-[#00FFE0]">
                  <code>{item.codeSnippet}</code>
                </div>
              )}
            </div>
          ))}
        </pre>
      </div>
      
      {/* Actions */}
      <div className="p-3 border-t border-[#1F222E] bg-[#0D0F18] flex justify-between">
        <button className="text-[#C3C8D3] text-sm hover:text-[#00FFE0] transition-colors">
          Export as JSON
        </button>
        <button className="text-[#C3C8D3] text-sm hover:text-[#00FFE0] transition-colors">
          Practice Again
        </button>
      </div>
    </div>
  );
};

export default AIFeedbackPanel;
