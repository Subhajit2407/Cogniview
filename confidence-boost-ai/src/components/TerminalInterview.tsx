import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Mic, Send, Loader, ChevronRight, Code, Palette, Database, Brain, Figma } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { VoiceInput } from '@/components/ui/VoiceInput';
import { Squares } from '@/components/ui/squares-background';
import { toast } from '@/hooks/use-toast';
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { getRandomSuccessMessage } from "@/utils/successMessages";
import { verifyAnswer, analyzeAnswerLength } from "@/services/AnswerVerificationService";

// New primary colors based on GitNess/Cursor premium look
// Primary: #0D1117 (dark background)
// Secondary: #161B22 (surface color)
// Accent: #FFE066 (yellow accent)
// Text: #F0F6FC (light text)

interface TerminalInterviewProps {
  domain: string;
  difficultyLevel: string;
  currentQuestion: string;
  onAnswerSubmit: (answer: string, scores: AnswerScores) => void;
  onComplete?: (transcript: string) => void;
  disabled?: boolean;
}

export interface AnswerScores {
  confidenceScore: number;
  technicalScore: number;
  communicationScore: number;
  codeQualityScore: number;
  problemSolvingScore: number;
  managementScore?: number;
  overallScore: number;
}

type Career = 'software-development' | 'graphic-design' | 'data-science' | 'ai-engineering' | 'freelancing' | 'teaching' | 'product-management' | 'team-leadership' | string;

type Message = {
  role: 'system' | 'user' | 'assistant';
  content: string;
  timestamp: Date;
  scores?: AnswerScores;
};

const TerminalInterview: React.FC<TerminalInterviewProps> = ({ 
  domain, 
  difficultyLevel,
  currentQuestion, 
  onAnswerSubmit, 
  onComplete,
  disabled = false
}) => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'system',
      content: 'Interview simulation initialized. I will ask you questions about your career interests and skills.',
      timestamp: new Date()
    },
    {
      role: 'assistant',
      content: currentQuestion || 'Welcome to your interview simulation! Please respond to the question above.',
      timestamp: new Date()
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [careerPath, setCareerPath] = useState<string>(domain || 'default');
  const [interviewStage, setInterviewStage] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const showBackground = true;

  useEffect(() => {
    // Update careerPath when domain prop changes
    setCareerPath(domain || 'default');
  }, [domain]);

  // Update interview stage when currentQuestionIndex changes
  useEffect(() => {
    // Extract the current question index from the current question content if available
    if (currentQuestion && currentQuestion.includes("Question")) {
      try {
        const match = currentQuestion.match(/Question (\d+)/);
        if (match && match[1]) {
          const questionNumber = parseInt(match[1], 10);
          if (!isNaN(questionNumber)) {
            setInterviewStage(questionNumber);
          }
        }
      } catch (e) {
        console.error("Error parsing question number", e);
      }
    }
  }, [currentQuestion]);

  useEffect(() => {
    // Update messages when currentQuestion changes
    if (currentQuestion && currentQuestion.trim() !== '') {
      const questionMessage: Message = {
        role: 'assistant',
        content: currentQuestion,
        timestamp: new Date()
      };
      setMessages(prevMessages => {
        // Only add if it's different from the last message
        const lastMessage = prevMessages[prevMessages.length - 1];
        if (lastMessage.role !== 'assistant' || lastMessage.content !== currentQuestion) {
          return [...prevMessages, questionMessage];
        }
        return prevMessages;
      });
    }
  }, [currentQuestion]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const detectCareerPath = (input: string): Career => {
    const input_lower = input.toLowerCase();
    
    if (input_lower.includes('software') || 
        input_lower.includes('develop') || 
        input_lower.includes('code') || 
        input_lower.includes('programming')) {
      return 'software-development';
    }
    
    if (input_lower.includes('design') || 
        input_lower.includes('graphic') || 
        input_lower.includes('ux') || 
        input_lower.includes('ui')) {
      return 'graphic-design';
    }
    
    if (input_lower.includes('data') || 
        input_lower.includes('analy') || 
        input_lower.includes('statistic')) {
      return 'data-science';
    }
    
    if (input_lower.includes('ai') || 
        input_lower.includes('machine learning') || 
        input_lower.includes('artificial intelligence') ||
        input_lower.includes('deep learning')) {
      return 'ai-engineering';
    }
    
    if (input_lower.includes('freelance') ||
        input_lower.includes('contract') ||
        input_lower.includes('gigs')) {
      return 'freelancing';
    }

    if (input_lower.includes('teach') ||
        input_lower.includes('instruct') ||
        input_lower.includes('educate')) {
      return 'teaching';
    }

    if (input_lower.includes('product management') ||
        input_lower.includes('product owner') ||
        input_lower.includes('product roadmap')) {
      return 'product-management';
    }

    if (input_lower.includes('team leadership') ||
        input_lower.includes('manage team') ||
        input_lower.includes('lead team')) {
      return 'team-leadership';
    }
    
    return null;
  };

  const evaluateAnswer = async (answer: string): Promise<AnswerScores> => {
    // Check for "I don't know" type responses
    const dontKnowPatterns = [
      /i don'?t know/i, 
      /idk/i, 
      /no idea/i, 
      /not sure/i, 
      /can'?t answer/i,
      /unsure/i,
      /don'?t have (a|an|the) answer/i,
      /^no$/i
    ];
    
    // Check if the answer contains any "I don't know" patterns
    const isDontKnowAnswer = dontKnowPatterns.some(pattern => pattern.test(answer.trim()));
    
    // If it's an "I don't know" answer, return very low scores
    if (isDontKnowAnswer) {
      return {
        confidenceScore: 0,
        technicalScore: 0,
        communicationScore: 20, // Give a small score for honest communication
        codeQualityScore: 0,
        problemSolvingScore: 0,
        managementScore: 0,
        overallScore: 10
      };
    }

    // Check answer length using analyzer
    const lengthAnalysis = analyzeAnswerLength(answer);
    
    // Check answer content length
    const answerLength = answer.trim().length;
    
    // More realistic base scores - starting more neutral but slightly higher
    let confidenceScore = 60; // Increased base score
    let technicalScore = 60; // Increased base score
    let communicationScore = 60; // Increased base score
    let codeQualityScore = 60; // Increased base score
    let problemSolvingScore = 60; // Increased base score
    let managementScore = 60; // Increased base score
    
    // Adjust scores based on length analysis
    if (lengthAnalysis.assessment === 'too_short') {
      confidenceScore = Math.max(30, confidenceScore - 20);
      communicationScore = Math.max(30, communicationScore - 15);
    } else if (lengthAnalysis.assessment === 'too_long') {
      communicationScore = Math.max(40, communicationScore - 10);
    } else {
      // Appropriate length - small bonus
      confidenceScore += 5;
      communicationScore += 5;
    }
    
    // Check for definitive language patterns that indicate confidence
    const confidentLanguage = [
      /definitely/i, 
      /certainly/i, 
      /absolutely/i, 
      /without a doubt/i,
      /I'm confident/i,
      /I'm certain/i,
      /I know/i,
      /clearly/i,
      /precisely/i,
      /indeed/i
    ];
    
    const uncertainLanguage = [
      /maybe/i,
      /perhaps/i,
      /I think/i,
      /possibly/i,
      /I guess/i,
      /probably/i,
      /not entirely sure/i,
      /could be/i
    ];
    
    // Count confident and uncertain language markers
    const confidentMarkers = confidentLanguage.filter(pattern => pattern.test(answer)).length;
    const uncertainMarkers = uncertainLanguage.filter(pattern => pattern.test(answer)).length;
    
    // Adjust confidence based on language used
    confidenceScore += (confidentMarkers * 7); // Increased impact
    confidenceScore -= (uncertainMarkers * 4); // Decreased penalty

    try {
      // Attempt to verify the answer using the verification service
      const verificationResult = await verifyAnswer(currentQuestion, answer, careerPath);
      
      // Adjust technical score based on verification results
      if (verificationResult.isCorrect) {
        technicalScore = Math.min(100, technicalScore + 15);
      } else {
        technicalScore = Math.max(30, technicalScore - 10);
      }
      
      // Apply verification confidence directly to technical score (weighted)
      technicalScore = 0.7 * technicalScore + 0.3 * verificationResult.confidenceScore;
    } catch (error) {
      console.error('Error during answer verification:', error);
      // Continue with normal evaluation if verification fails
    }
    
    // Adjust confidence score based on answer attributes
    if (answerLength < 20) {
      confidenceScore = Math.max(30, confidenceScore - 30); // Less severe penalty
    } else if (answerLength > 100) {
      confidenceScore = Math.min(95, confidenceScore + 25); // Higher reward for detailed answers
    }
    
    // Check for technical keywords based on domain
    const technicalKeywords: Record<string, string[]> = {
      'software-development': ['code', 'algorithm', 'function', 'programming', 'variable', 'object', 'class', 'complexity', 'data structure', 'optimization', 'API', 'framework', 'library', 'database', 'security', 'architecture', 'pattern', 'testing', 'deployment', 'version control'],
      'ai-engineering': ['model', 'training', 'neural', 'machine learning', 'dataset', 'algorithm', 'accuracy', 'precision', 'recall', 'inference', 'classification', 'regression', 'clustering', 'overfitting', 'bias', 'CNN', 'RNN', 'transformer', 'feature extraction', 'deep learning'],
      'graphic-design': ['design', 'color', 'layout', 'typography', 'visual', 'composition', 'user experience', 'wireframe', 'mockup', 'prototype', 'branding', 'logo', 'illustration', 'UX', 'UI', 'responsive', 'grid system', 'style guide', 'accessibility', 'hierarchy'],
      'ux-design': ['user research', 'usability testing', 'user journey', 'personas', 'information architecture', 'wireframes', 'prototyping', 'interaction design', 'user-centered', 'accessibility', 'user flows', 'heuristic evaluation', 'cognitive load', 'mental models', 'A/B testing', 'card sorting', 'user interviews', 'empathy map', 'UX strategy', 'user needs'],
      'data-science': ['data', 'analysis', 'statistics', 'visualization', 'pattern', 'insight', 'correlation', 'hypothesis', 'regression', 'classification', 'clustering', 'predictive modeling', 'ETL', 'data cleaning', 'outliers', 'big data', 'SQL', 'dashboard', 'A/B testing', 'metrics'],
      'freelancing': ['client', 'project', 'contract', 'deliverable', 'deadline', 'scope', 'proposal', 'invoice', 'timeframe', 'milestone', 'estimation', 'communication', 'portfolio', 'networking', 'pricing', 'branding', 'marketing', 'time management', 'legal', 'freelancing platform'],
      'teaching': ['student', 'learning', 'curriculum', 'education', 'assessment', 'classroom', 'pedagogy', 'engagement', 'differentiation', 'outcomes', 'evaluation', 'feedback', 'objectives', 'lesson plan', 'methodology', 'instruction', 'strategy', 'theory', 'education technology', 'inclusive learning'],
      'product-management': ['product', 'feature', 'user', 'roadmap', 'stakeholder', 'requirement', 'backlog', 'sprint', 'metrics', 'adoption', 'MVP', 'customer', 'prioritization', 'market research', 'user testing', 'analytics', 'KPI', 'value proposition', 'market fit', 'user story'],
      'team-leadership': ['team', 'leadership', 'management', 'delegate', 'motivation', 'strategy', 'performance', 'feedback', 'development', 'collaboration', 'mentoring', 'coaching', 'conflict resolution', 'onboarding', 'goals', 'recognition', 'accountability', 'decision-making', 'negotiation', 'retention'],
      'default': ['experience', 'skill', 'project', 'work', 'learn', 'career', 'growth', 'challenge', 'opportunity', 'strength', 'weakness', 'improvement', 'achievement', 'success', 'failure', 'learning', 'adaptation', 'industry', 'professional', 'role']
    };
    
    // Get keywords from the current question to include in the evaluation
    const questionKeywords = currentQuestion.toLowerCase().split(' ')
      .filter(word => word.length > 4)  // Only include meaningful words
      .filter(word => !['what', 'when', 'where', 'which', 'their', 'there', 'would', 'should', 'could', 'about'].includes(word));
    
    // Check for question-specific keywords in the answer
    const questionSpecificMatches = questionKeywords.filter(keyword => 
      answer.toLowerCase().includes(keyword)
    ).length;
    
    // Boost score based on question relevance
    const questionRelevanceBonus = Math.min(30, questionSpecificMatches * 6);
    technicalScore += questionRelevanceBonus;
    
    // Domain-specific incorrect technical terms or misconceptions
    const domainMisconceptions: Record<string, string[]> = {
      'software-development': ['HTML is a programming language', 'Java and JavaScript are the same', 'more CPU cores always means faster code', 'the cloud is just someone else\'s computer', 'web design is the same as web development'],
      'ai-engineering': ['AI can solve any problem', 'neural networks work like the human brain', 'more data always means better models', 'AI and ML are the same thing', 'correlation implies causation'],
      'graphic-design': ['good design is purely subjective', 'design is just making things look pretty', 'more colors mean better design', 'comic sans is a professional font', 'all designs should be minimalist'],
      'ux-design': ['UX is the same as UI', 'UX design is just about making things look good', 'users always know what they want', 'UX is only about usability testing', 'following UX best practices guarantees a successful product'],
      'data-science': ['data science is just statistics', 'bigger datasets are always better', 'correlation implies causation', 'you need big data for machine learning', 'data cleaning is not important'],
      'default': ['qualifications matter more than skills', 'hard skills are more important than soft skills', 'networking isn\'t important', 'success is purely merit-based', 'failure means you\'re not qualified']
    };
    
    // Code quality indicators
    const codeQualityIndicators = [
      'clean code', 'refactor', 'maintainable', 'readable', 'documentation', 
      'testing', 'unit test', 'integration test', 'version control', 'git',
      'review', 'standards', 'best practice', 'pattern', 'architecture',
      'reusability', 'modularity', 'separation of concerns', 'SOLID', 'DRY principle',
      'continuous integration', 'code review', 'linting', 'type safety', 'error handling'
    ];
    
    // Problem solving indicators
    const problemSolvingIndicators = [
      'problem', 'solution', 'approach', 'method', 'process',
      'debug', 'troubleshoot', 'identify', 'analyze', 'evaluate',
      'optimize', 'improve', 'efficiency', 'complexity', 'tradeoff',
      'root cause', 'systematic', 'step-by-step', 'investigation', 'reasoning',
      'logic', 'critical thinking', 'alternative solutions', 'edge cases', 'constraints'
    ];
    
    const domainKeywords = technicalKeywords[careerPath || 'default'] || technicalKeywords['default'];
    const domainErrors = domainMisconceptions[careerPath || 'default'] || domainMisconceptions['default'];
    
    // Find domain keywords
    const keywordsFound = domainKeywords.filter(keyword => 
      answer.toLowerCase().includes(keyword.toLowerCase())
    ).length;
    
    // Find misconceptions or errors
    const misconceptionsFound = domainErrors.filter(error => 
      answer.toLowerCase().includes(error.toLowerCase())
    ).length;
    
    // Find code quality indicators
    const codeQualityFound = codeQualityIndicators.filter(keyword =>
      answer.toLowerCase().includes(keyword.toLowerCase())
    ).length;
    
    // Find problem solving indicators
    const problemSolvingFound = problemSolvingIndicators.filter(keyword =>
      answer.toLowerCase().includes(keyword.toLowerCase())
    ).length;
    
    // Simulated internet knowledge verification
    // Increased baseline for knowledge score
    const knowledgeVerificationScore = Math.min(100, 40 + keywordsFound * 10);
    
    // Adjust technical score based on:
    // 1. Relevant keywords found
    // 2. Presence of misconceptions/errors
    // 3. Simulated internet knowledge verification
    let domainKeywordBonus = 0;
    if (keywordsFound > 5) {
      domainKeywordBonus = 45; // Increased reward for using many domain terms
    } else if (keywordsFound > 3) {
      domainKeywordBonus = 35; // Increased reward for moderate domain terms
    } else if (keywordsFound > 1) {
      domainKeywordBonus = 25; // Increased reward for some domain terms
    }
    
    // Technical score adjustment
    technicalScore += domainKeywordBonus;
    technicalScore -= (misconceptionsFound * 15); // Reduced penalty for misconceptions
    technicalScore = Math.max(0, Math.min(100, technicalScore)); // Keep within 0-100 range
    
    // Adjust knowledge verification based on answer length
    // Reduced penalty for shorter answers with keywords
    if (answerLength < 40 && keywordsFound > 3) {
      technicalScore -= 5; // Reduced penalty
    }
    
    // Adjust code quality score
    if (codeQualityFound > 3) {
      codeQualityScore = Math.min(100, codeQualityScore + 40);
    } else if (codeQualityFound > 1) {
      codeQualityScore = Math.min(100, codeQualityScore + 25);
    } else if (codeQualityFound === 0 && careerPath === 'software-development') {
      codeQualityScore = Math.max(40, codeQualityScore - 10); // Reduced penalty
    }
    
    // Adjust problem solving score
    if (problemSolvingFound > 3) {
      problemSolvingScore = Math.min(100, problemSolvingScore + 40);
    } else if (problemSolvingFound > 1) {
      problemSolvingScore = Math.min(100, problemSolvingScore + 25);
    } else {
      problemSolvingScore = Math.max(40, problemSolvingScore - 5); // Reduced penalty
    }
    
    // Communication score adjustments
    const sentences = answer.split(/[.!?]/).filter(s => s.trim().length > 0);
    
    // Check for well-formed sentences (starting with capital, proper length)
    const wellFormedSentences = sentences.filter(s => {
      const trimmed = s.trim();
      return trimmed.length > 0 && 
        trimmed[0] === trimmed[0].toUpperCase() &&
        trimmed.length > 5;
    }).length;
    
    const sentenceRatio = sentences.length > 0 ? wellFormedSentences / sentences.length : 0;
    
    if (sentences.length > 4 && sentenceRatio > 0.7) {
      communicationScore = Math.min(100, communicationScore + 35); // Increased bonus for well-structured response
    } else if (sentences.length > 2 && sentenceRatio > 0.5) {
      communicationScore = Math.min(100, communicationScore + 20); // Increased bonus for moderately clear response
    } else if (sentences.length === 0 || sentenceRatio < 0.3) {
      communicationScore = Math.max(30, communicationScore - 15); // Reduced penalty for poor structure
    }
    
    // Penalize very short or overly verbose answers
    if (answerLength < 25) {
      communicationScore = Math.max(30, communicationScore - 20); // Reduced penalty for brief answers
    } else if (answerLength > 1000) {
      communicationScore = Math.max(40, communicationScore - 10); // Reduced penalty for verbose answers
    }
    
    // Overall score is a weighted average with adjustments for domain
    let domainWeights: Record<string, Record<string, number>> = {
      'software-development': {
        confidenceScore: 0.15,
        technicalScore: 0.30,
        communicationScore: 0.20,
        codeQualityScore: 0.20,
        problemSolvingScore: 0.15
      },
      'ai-engineering': {
        confidenceScore: 0.15,
        technicalScore: 0.35,
        communicationScore: 0.15,
        codeQualityScore: 0.10,
        problemSolvingScore: 0.25
      },
      'graphic-design': {
        confidenceScore: 0.20,
        technicalScore: 0.25,
        communicationScore: 0.30,
        codeQualityScore: 0.05,
        problemSolvingScore: 0.20
      },
      'ux-design': {
        confidenceScore: 0.15,
        technicalScore: 0.20,
        communicationScore: 0.25,
        codeQualityScore: 0.10,
        problemSolvingScore: 0.30
      },
      'team-leadership': {
        confidenceScore: 0.20,
        technicalScore: 0.25,
        communicationScore: 0.25,
        codeQualityScore: 0.10,
        problemSolvingScore: 0.20
      },
      'default': {
        confidenceScore: 0.20,
        technicalScore: 0.25,
        communicationScore: 0.25,
        codeQualityScore: 0.10,
        problemSolvingScore: 0.20
      }
    };
    
    const weights = domainWeights[careerPath] || domainWeights['default'];
    
    // Baseline score adjustment - slightly boost overall scores
    const baselineAdjustment = 5;
    
    const overallScore = Math.floor(
      baselineAdjustment +
      (confidenceScore * weights.confidenceScore) + 
      (technicalScore * weights.technicalScore) + 
      (communicationScore * weights.communicationScore) +
      (codeQualityScore * weights.codeQualityScore) +
      (problemSolvingScore * weights.problemSolvingScore)
    );
    
    return {
      confidenceScore: Math.max(0, Math.min(100, confidenceScore)),
      technicalScore: Math.max(0, Math.min(100, technicalScore)),
      communicationScore: Math.max(0, Math.min(100, communicationScore)),
      codeQualityScore: Math.max(0, Math.min(100, codeQualityScore)),
      problemSolvingScore: Math.max(0, Math.min(100, problemSolvingScore)),
      overallScore: Math.max(0, Math.min(100, overallScore))
    };
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading || disabled) return;
    
    // Add user message
    const userMessage: Message = {
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    try {
      // Generate scores for the answer - now awaiting the async function
      const scores = await evaluateAnswer(inputValue);
      
      // Add customized AI response based on domain and scores
      const aiResponseContent = generateAIResponse(inputValue, scores, careerPath, currentQuestion, difficultyLevel);
      
      // Simulate AI typing delay based on response length
      const typingDelay = Math.min(1500, aiResponseContent.length * 10);
      
      setTimeout(() => {
        const aiResponse: Message = {
          role: 'assistant',
          content: aiResponseContent,
          timestamp: new Date(),
          scores
        };
        
        setMessages(prevMessages => [...prevMessages, aiResponse]);
        setIsLoading(false);
        
        // Callback with scores for the main app
        onAnswerSubmit(inputValue, scores);
      }, typingDelay);
    } catch (error) {
      console.error('Error evaluating answer:', error);
      setIsLoading(false);
      
      // Fallback to basic evaluation in case of error
      const fallbackScores = {
        confidenceScore: 50,
        technicalScore: 50,
        communicationScore: 50,
        codeQualityScore: 50,
        problemSolvingScore: 50,
        overallScore: 50
      };
      
      const fallbackResponse = "I'm having trouble evaluating your answer at the moment. Please try again or rephrase your response.";
      
      const aiResponse: Message = {
        role: 'assistant',
        content: fallbackResponse,
        timestamp: new Date(),
        scores: fallbackScores
      };
      
      setMessages(prevMessages => [...prevMessages, aiResponse]);
      onAnswerSubmit(inputValue, fallbackScores);
    }
  };

  // Generate domain-specific AI responses
  const generateAIResponse = (answer: string, scores: AnswerScores, domain: string, question: string, level: string): string => {
    // Very short or "I don't know" type answers
    const dontKnowPatterns = [
      /i don'?t know/i, 
      /idk/i, 
      /no idea/i, 
      /not sure/i, 
      /can'?t answer/i,
      /unsure/i,
      /don'?t have (a|an|the) answer/i,
      /^no$/i
    ];
    
    // Check if the answer contains any "I don't know" patterns
    const isDontKnowAnswer = dontKnowPatterns.some(pattern => pattern.test(answer.trim()));
    
    // Extract just the question part without the "Question X:" prefix
    const questionText = question.replace(/^Question \d+: /i, '');
    
    // Educational response for completely wrong or "I don't know" answers
    if (answer.trim().length < 20 || isDontKnowAnswer) {
      const correctAnswer = getCorrectAnswer(questionText, domain);
      let response = `I noticed your answer was quite brief. Let me help you understand this topic better:\n\n`;
      
      // Add difficulty-based explanations with clearer formatting
      response += `📌 **Correct Answer:**\n${correctAnswer}\n\n`;
      
      if (level === 'beginner') {
        response += `💡 **Learning Tip:**\nThis is a fundamental concept in ${formatDomain(domain)}. Understanding this will help you build a solid foundation for more advanced topics.\n\n`;
        response += `🔗 **Resources:**\n${getDomainResources(domain, 'beginner')}`;
      } else if (level === 'intermediate') {
        response += `💡 **Interview Tip:**\nAt the intermediate level, interviewers want to see not just your understanding of the concept, but how you can apply it to real-world scenarios. Try to include examples from your experience.\n\n`;
        response += `🔗 **Resources:**\n${getDomainResources(domain, 'intermediate')}`;
      } else {
        response += `💡 **Expert Insight:**\nAt the expert level, you should be able to discuss nuances, trade-offs, and implementation details. Consider how this concept connects to other aspects of ${formatDomain(domain)}.\n\n`;
        response += `🔗 **Resources:**\n${getDomainResources(domain, 'expert')}`;
      }
      
      return response;
    }
    
    // Educational response for partially correct answers (below 60%)
    if (scores.overallScore < 60) {
      const correctAnswer = getCorrectAnswer(questionText, domain);
      let response = `Your answer covers some points, but has important gaps. Let me provide a more complete explanation:\n\n`;
      
      // Add the correct answer with clear formatting
      response += `📌 **Complete Answer:**\n${correctAnswer}\n\n`;
      
      // Add what was missing from their answer
      response += `🔍 **What Your Answer Missed:**\n`;
      
      // Try to identify gaps based on keywords
      const keywords = correctAnswer.toLowerCase().match(/\b\w{5,}\b/g) || [];
      const uniqueKeywords = [...new Set(keywords)];
      const missingKeywords = uniqueKeywords.filter(keyword => 
        !answer.toLowerCase().includes(keyword) && Math.random() > 0.6 // Only show some missing keywords
      ).slice(0, 3);
      
      if (missingKeywords.length > 0) {
        response += `Your answer didn't mention concepts like: ${missingKeywords.join(', ')}.\n\n`;
      } else {
        response += `Your answer lacked detail and specific examples.\n\n`;
      }
      
      // Add difficulty-based feedback
      if (level === 'beginner') {
        response += `💡 **Improvement Tip:**\nFocus on building your basic understanding. Consider studying ${getDomainResources(domain, 'beginner')} to strengthen your foundation.`;
      } else if (level === 'intermediate') {
        response += `💡 **Improvement Tip:**\nAt your level, try to connect concepts to practical implementations. ${getDomainResources(domain, 'intermediate')} might help deepen your knowledge.`;
      } else {
        response += `💡 **Improvement Tip:**\nAs an expert, you should articulate the nuances and edge cases. Consider reviewing ${getDomainResources(domain, 'expert')} to polish your understanding.`;
      }
      
      return response;
    }
    
    // For answers that need minor improvements (60-80%)
    if (scores.overallScore >= 60 && scores.overallScore <= 80) {
      let domainSpecificFeedback = "";
      
      // Domain-specific feedback based on the weakest score
      if (domain === 'software-development') {
        if (scores.technicalScore < 70) {
          domainSpecificFeedback = "Your technical terminology could be more precise. Try incorporating more specific programming concepts and principles.";
        } else if (scores.codeQualityScore < 70) {
          domainSpecificFeedback = "Consider adding more details about code quality aspects like maintainability, performance, and error handling.";
        } else {
          domainSpecificFeedback = "You have a good foundation, but could add more specific examples from your coding experience.";
        }
      } else if (domain === 'ai-engineering') {
        if (scores.technicalScore < 70) {
          domainSpecificFeedback = "Try incorporating more AI-specific concepts like model evaluation metrics, feature engineering, or neural network architectures.";
        } else if (scores.problemSolvingScore < 70) {
          domainSpecificFeedback = "Consider discussing how you approach model selection, hyperparameter tuning, and performance evaluation.";
        } else {
          domainSpecificFeedback = "Your answer is on the right track, but could benefit from more technical depth around AI algorithms and implementations.";
        }
      } else if (domain === 'graphic-design') {
        if (scores.problemSolvingScore < 70) {
          domainSpecificFeedback = "Try framing your design work more as solutions to specific client problems or user needs.";
        } else {
          domainSpecificFeedback = "Your creative approach is good, but could be explained more methodically in terms of your design process.";
        }
      } else if (domain === 'ux-design') {
        if (scores.problemSolvingScore < 70) {
          domainSpecificFeedback = "Try articulating how your design decisions address specific user pain points and business goals.";
        } else if (scores.communicationScore < 70) {
          domainSpecificFeedback = "Consider explaining your user research methods and findings more thoroughly to strengthen your answer.";
        } else {
          domainSpecificFeedback = "Your UX approach is good, but could demonstrate more user empathy and testing insights.";
        }
      } else if (domain === 'team-leadership') {
        if (scores.managementScore && scores.managementScore < 70) {
          domainSpecificFeedback = "Add more concrete examples of specific leadership techniques you've used and their outcomes.";
        } else {
          domainSpecificFeedback = "Your leadership approach is sound, but could benefit from more specific strategies for different team scenarios.";
        }
      } else if (domain === 'product-management') {
        if (scores.problemSolvingScore < 70) {
          domainSpecificFeedback = "Elaborate more on how you balance user needs with business requirements in your product decisions.";
        } else {
          domainSpecificFeedback = "Good product thinking, but consider adding more about metrics and stakeholder communication.";
        }
      } else if (domain === 'freelancing') {
        if (scores.communicationScore < 70) {
          domainSpecificFeedback = "Consider adding more about client communication strategies and expectation management.";
        } else {
          domainSpecificFeedback = "Your freelancing approach is good, but could include more business strategy details.";
        }
      } else {
        domainSpecificFeedback = "Your answer contains good points, but could be more comprehensive with specific examples.";
      }
      
      // Highlight strengths in the answer
      let strengths = "";
      if (scores.confidenceScore > 70) strengths += "confident delivery, ";
      if (scores.technicalScore > 70) strengths += "good technical knowledge, ";
      if (scores.communicationScore > 70) strengths += "clear communication, ";
      if (scores.problemSolvingScore > 70) strengths += "effective problem-solving, ";
      if (scores.codeQualityScore > 70) strengths += "attention to quality, ";
      strengths = strengths.replace(/, $/, "");
      
      // Add domain and level specific tips
      const tipsByDomain = getDomainTips(domain, level);
      
      // Format the response with clear sections
      return `✅ **Score: ${scores.overallScore}/100**\n\n` +
             `💪 **Strengths:** Your answer shows ${strengths || "some good understanding"}.\n\n` + 
             `🔍 **Areas for Improvement:** ${domainSpecificFeedback}\n\n` + 
             `💡 **Interview Tip:** ${tipsByDomain}`;
    }
    
    // For good answers (>80%)
    // Highlight what made the answer strong and give advanced tips
    const overallFeedback = scores.overallScore >= 90 ? 
      "Excellent answer! You've demonstrated strong knowledge and communication skills." : 
      "Very good answer! You've shown solid understanding of the topic.";
    
    // Identify specific strengths
    let specificStrengths = "";
    if (scores.technicalScore >= 80) specificStrengths += "Your technical knowledge is strong. ";
    if (scores.communicationScore >= 80) specificStrengths += "You communicate concepts clearly. ";
    if (scores.problemSolvingScore >= 80) specificStrengths += "Your problem-solving approach is effective. ";
    if (scores.confidenceScore >= 80) specificStrengths += "You present your thoughts confidently. ";
    
    // Add domain-specific advanced tip
    let advancedTip = "";
    if (domain === 'software-development') {
      advancedTip = "To further strengthen your answers, consider discussing system design implications or performance considerations.";
    } else if (domain === 'ai-engineering') {
      advancedTip = "For even stronger answers, you could discuss model interpretability and ethical considerations in AI deployment.";
    } else if (domain === 'graphic-design' || domain === 'ux-design') {
      advancedTip = "To elevate your answers further, discuss how you measure the impact and effectiveness of your design decisions.";
    } else if (domain === 'team-leadership') {
      advancedTip = "For even more impact, include how you adapt your leadership style to different team member personalities and situations.";
    } else if (domain === 'product-management') {
      advancedTip = "To take your answers to the next level, discuss how you handle product decisions when data is limited or conflicting.";
    } else {
      advancedTip = "To further improve, consider adding more specific examples from your experience.";
    }
    
    return `✅ **Score: ${scores.overallScore}/100**\n\n` +
           `🏆 **Feedback:** ${overallFeedback}\n\n` +
           `💪 **Strengths:** ${specificStrengths}\n\n` + 
           `💡 **Advanced Tip:** ${advancedTip}`;
  };

  // Helper function to format domain names for display
  const formatDomain = (domain: string): string => {
    return domain.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };
  
  // Get domain-specific learning resources based on level
  const getDomainResources = (domain: string, level: string): string => {
    const resources = {
      'software-development': {
        'beginner': "basic tutorials on data structures and algorithms",
        'intermediate': "design patterns and system architecture resources",
        'expert': "advanced system design and performance optimization literature"
      },
      'ai-engineering': {
        'beginner': "introductory courses on machine learning fundamentals",
        'intermediate': "practical ML deployment and optimization guides",
        'expert': "research papers on cutting-edge AI techniques"
      },
      'graphic-design': {
        'beginner': "foundational design principle tutorials",
        'intermediate': "case studies on successful design projects",
        'expert': "advanced resources on design systems and accessibility"
      },
      'ux-design': {
        'beginner': "introductory user research and usability testing guides",
        'intermediate': "interaction design patterns and user journey mapping resources",
        'expert': "advanced UX strategy and service design frameworks"
      },
      'team-leadership': {
        'beginner': "fundamental leadership and team building guides",
        'intermediate': "conflict resolution and performance management resources",
        'expert': "strategic leadership and organizational development materials"
      },
      'product-management': {
        'beginner': "introductory product management frameworks",
        'intermediate': "user research and product metrics guides",
        'expert': "product strategy and innovation management resources"
      },
      'freelancing': {
        'beginner': "beginner guides to freelance business setup",
        'intermediate': "client management and project scoping resources",
        'expert': "advanced freelance business scaling strategies"
      },
      'teaching': {
        'teaching methods': 'Effective teaching methods should be varied to accommodate different learning styles (visual, auditory, kinesthetic). Use a mix of lectures, discussions, hands-on activities, and multimedia resources to engage all students.',
        'assessment': 'Good assessment strategies include formative (ongoing) and summative (final) assessments, use rubrics for consistent grading, provide timely specific feedback, and measure both knowledge acquisition and practical application.',
        'technology': 'Educational technology should enhance, not replace, good pedagogy. Choose tools that address specific learning objectives, ensure accessibility for all students, and provide training and support for both students and educators.',
        'classroom management': 'Effective classroom management establishes clear expectations, creates routines, uses positive reinforcement, addresses issues promptly and privately, and creates an environment where students feel safe to participate and make mistakes.',
        'curriculum design': 'Strong curriculum design aligns with educational standards, incorporates backward design (starting with desired outcomes), includes diverse perspectives and materials, addresses different levels of complexity, and makes real-world connections.'
      }
    };
    
    return resources[domain]?.[level] || "relevant learning resources for your field";
  };
  
  // Get domain-specific tips based on level
  const getDomainTips = (domain: string, level: string): string => {
    const tips = {
      'software-development': {
        'beginner': "Try to include at least one specific code example or algorithm when discussing programming concepts.",
        'intermediate': "Discuss trade-offs between different approaches and mention best practices relevant to the technology.",
        'expert': "Include system design considerations, scalability concerns, and performance optimization strategies."
      },
      'ai-engineering': {
        'beginner': "Make sure to explain the fundamental machine learning concepts clearly with simple examples.",
        'intermediate': "Include details about model selection, evaluation metrics, and data preprocessing steps.",
        'expert': "Discuss state-of-the-art approaches, model limitations, and ethical considerations in AI systems."
      },
      'graphic-design': {
        'beginner': "Describe your design process step-by-step and mention specific design principles you apply.",
        'intermediate': "Explain how your design decisions address specific user needs and business goals.",
        'expert': "Discuss how you approach complex design systems and measure the effectiveness of your designs."
      },
      'ux-design': {
        'beginner': "Explain your user research methods and how you translate findings into design decisions.",
        'intermediate': "Describe how you test and iterate on your designs based on user feedback and quantitative data.",
        'expert': "Discuss how you balance business objectives with user needs and measure the success of your UX solutions."
      },
      'team-leadership': {
        'beginner': "Describe specific team communication and motivation techniques you use.",
        'intermediate': "Include examples of how you've handled challenging team situations and developed team members.",
        'expert': "Explain your strategic leadership approach and how you align team performance with organizational goals."
      },
      'product-management': {
        'beginner': "Include specific frameworks you use for product decisions and prioritization.",
        'intermediate': "Describe how you collect and act on user feedback and measure product success.",
        'expert': "Explain your approach to product strategy, innovation management, and cross-functional leadership."
      },
      'teaching': {
        'teaching methods': "Effective teaching methods should be varied to accommodate different learning styles (visual, auditory, kinesthetic). Use a mix of lectures, discussions, hands-on activities, and multimedia resources to engage all students.",
        'assessment': "Good assessment strategies include formative (ongoing) and summative (final) assessments, use rubrics for consistent grading, provide timely specific feedback, and measure both knowledge acquisition and practical application.",
        'technology': "Educational technology should enhance, not replace, good pedagogy. Choose tools that address specific learning objectives, ensure accessibility for all students, and provide training and support for both students and educators.",
        'classroom management': "Effective classroom management establishes clear expectations, creates routines, uses positive reinforcement, addresses issues promptly and privately, and creates an environment where students feel safe to participate and make mistakes.",
        'curriculum design': "Strong curriculum design aligns with educational standards, incorporates backward design (starting with desired outcomes), includes diverse perspectives and materials, addresses different levels of complexity, and makes real-world connections."
      }
    };
    
    return tips[domain]?.[level] || "Provide specific examples from your experience to strengthen your answer.";
  };

  // Provide correct answers based on the question
  const getCorrectAnswer = (question: string, domain: string): string => {
    // Basic mapping of questions to "ideal" answers based on domain
    // This is just for educational purposes in the simulation
    
    const domainAnswers: Record<string, Record<string, string>> = {
      'software-development': {
        'variable': 'A variable is a named storage location in memory that contains data which can be modified during program execution. Variables have a name, a type, and a value.',
        'function': 'A function is a reusable block of code designed to perform a specific task. It can take inputs (parameters), process them, and return an output. Functions help organize code and promote reusability.',
        'loop': 'A loop is a control structure that allows code to be executed repeatedly based on a given condition. Common types include for loops, while loops, and do-while loops.',
        'array': 'An array is a data structure that stores a collection of elements (values or variables), each identified by an index or a key.',
        'if statement': 'An if statement is a conditional control structure that executes a block of code only if a specified condition evaluates to true.'
      },
      'team-leadership': {
        'conflicts': 'Effective conflict resolution involves addressing issues directly, listening to all perspectives, focusing on facts rather than personalities, finding common ground, and working toward mutually beneficial solutions. It\'s important to address conflicts early before they escalate.',
        'delegating': 'Effective delegation involves matching tasks to team members\' skills, providing clear instructions and expectations, granting appropriate authority, offering support, and following up without micromanaging.',
        'motivate': 'To motivate struggling team members, identify the root causes of performance issues, provide specific feedback, establish clear expectations, offer necessary resources and support, recognize improvements, and develop personalized improvement plans.',
        'goals': 'Setting effective team goals involves making them SMART (Specific, Measurable, Achievable, Relevant, Time-bound), involving team members in the goal-setting process, tracking progress regularly, adjusting as needed, and celebrating achievements.',
        'innovation': 'Fostering innovation involves creating psychological safety, encouraging idea sharing, allocating time for experimentation, embracing failures as learning opportunities, and recognizing innovative efforts regardless of outcomes.'
      },
      'ai-engineering': {
        'machine learning': 'Machine learning is a subset of artificial intelligence that uses algorithms and statistical models to enable computers to perform tasks without explicit instructions, instead relying on patterns and inference. Key types include supervised, unsupervised, and reinforcement learning.',
        'supervised learning': 'Supervised learning involves training models on labeled data, where the algorithm learns to map inputs to known outputs. Applications include classification (predicting categories) and regression (predicting continuous values).',
        'unsupervised learning': 'Unsupervised learning identifies patterns in unlabeled data. Common techniques include clustering (grouping similar data points) and dimensionality reduction (simplifying data while retaining important information).',
        'model evaluation': 'Effective model evaluation combines metrics (accuracy, precision, recall, F1-score for classification; RMSE, MAE for regression), cross-validation techniques, and consideration of business requirements and ethical implications.',
        'imbalanced datasets': 'Techniques for handling imbalanced datasets include resampling (oversampling minority classes or undersampling majority classes), synthetic data generation (SMOTE), algorithm-level approaches (cost-sensitive learning), and ensemble methods.'
      },
      'graphic-design': {
        'design process': 'An effective design process typically includes discovery (understanding client needs), research (market analysis, competitor research), ideation (sketching, brainstorming), prototyping (creating mockups), feedback (client and user reviews), and refinement (iterative improvements).',
        'design trends': 'Staying current with design trends involves following design blogs and publications, participating in online communities, attending industry events, analyzing competitor work, and experimenting with new techniques while maintaining a critical perspective on which trends serve your specific project goals.',
        'rebrand': 'A successful rebrand strategy involves thorough research of the company\'s history and values, stakeholder interviews, competitive analysis, preserving recognizable elements while modernizing others, ensuring cohesive implementation across all touchpoints, and developing comprehensive brand guidelines.',
        'client feedback': 'Handling client feedback effectively requires active listening, separating personal attachment from professional assessment, asking clarifying questions, presenting design decisions with strategic rationale, offering solutions rather than just accommodations, and maintaining a collaborative rather than adversarial relationship.',
        'accessible designs': 'Creating accessible designs involves following WCAG guidelines, ensuring sufficient color contrast, providing text alternatives for non-text content, designing for keyboard navigation, using clear typography and layout, considering diverse user needs, and testing with assistive technologies.'
      },
      'ux-design': {
        'ux and ui': 'UX (User Experience) design focuses on the overall feel and usability of a product, addressing user needs, pain points, and journey. UI (User Interface) design is more concerned with the visual elements users interact with. UX is about how it works; UI is about how it looks.',
        'user research': 'Effective user research involves multiple methods including interviews, surveys, usability testing, card sorting, and analytics review. It should be conducted throughout the product lifecycle to validate assumptions, identify opportunities, and measure success.',
        'research insights': 'Translating research insights into design decisions requires organizing findings into patterns, creating user personas and journey maps, prioritizing pain points, ideating solutions that directly address identified problems, and continuously validating through testing.',
        'wireframes': 'Wireframes are simplified visual representations of a digital interface that outline structure, layout, information hierarchy, and core functionality without detailed visual design. They help stakeholders focus on usability and content organization before aesthetic decisions.',
        'user personas': 'User personas are fictional but research-based representations of your target users that include demographics, behaviors, goals, pain points, and motivations. They help design teams build empathy, focus on user needs, and make user-centered decisions.'
      },
      'product-management': {
        'prioritize features': 'Feature prioritization should combine user value (addressing pain points), business value (revenue potential, strategic alignment), and implementation complexity. Frameworks like RICE (Reach, Impact, Confidence, Effort) or the Kano model provide structured approaches to prioritization.',
        'user research': 'Product managers should conduct continuous user research using methods like interviews, surveys, usability testing, and analytics. Research goals should align with product lifecycle stages, from problem validation to concept testing to monitoring post-launch performance.',
        'feature success': 'Measuring feature success requires defining clear success metrics before launch that align with both user and business goals. These might include engagement metrics, conversion improvements, retention impact, or efficiency metrics, compared against pre-defined baselines.',
        'stakeholders': 'Effective stakeholder communication involves tailoring messages to different audiences (executives, engineering, marketing), using data to support decisions, maintaining transparency about trade-offs, providing regular updates, and cultivating relationships built on trust and mutual respect.',
        'trade-off': 'Making product trade-offs requires a clear understanding of user needs, business objectives, and technical constraints. Document alternatives considered, evaluate options against strategic goals, involve key stakeholders, communicate decisions transparently, and monitor outcomes to validate choices.'
      },
      'freelancing': {
        'rates': 'Setting appropriate freelance rates involves calculating your desired annual income, billable hours, overhead costs, and market positioning. Consider value-based pricing for projects where your expertise delivers significant client value, and regularly review and adjust rates as your skills and market position evolve.',
        'finding clients': 'A sustainable client acquisition strategy combines online presence (portfolio, social media), networking (industry events, professional groups), referrals from satisfied clients, targeted outreach to ideal clients, content marketing to demonstrate expertise, and selective use of freelance platforms.',
        'scope creep': 'Managing scope creep involves defining clear project boundaries in contracts, documenting all requirements before starting, establishing a formal change request process, communicating how changes impact timeline and budget, and maintaining open communication throughout the project.',
        'tools': 'Essential freelance business tools include project management software, time tracking, invoicing and accounting systems, contracts and proposal templates, communication platforms, portfolio presentation tools, and backup/security solutions. The specific tools should fit your workflow and client expectations.',
        'legal aspects': 'Handling legal aspects of freelancing requires clear contracts specifying deliverables, payment terms, intellectual property rights, and liability limitations. Consider forming an appropriate business entity, maintaining proper insurance, understanding tax obligations, and seeking professional legal advice for complex situations.'
      },
      'teaching': {
        'teaching methods': "Effective teaching methods should be varied to accommodate different learning styles (visual, auditory, kinesthetic). Use a mix of lectures, discussions, hands-on activities, and multimedia resources to engage all students.",
        'assessment': "Good assessment strategies include formative (ongoing) and summative (final) assessments, use rubrics for consistent grading, provide timely specific feedback, and measure both knowledge acquisition and practical application.",
        'technology': "Educational technology should enhance, not replace, good pedagogy. Choose tools that address specific learning objectives, ensure accessibility for all students, and provide training and support for both students and educators.",
        'classroom management': "Effective classroom management establishes clear expectations, creates routines, uses positive reinforcement, addresses issues promptly and privately, and creates an environment where students feel safe to participate and make mistakes.",
        'curriculum design': "Strong curriculum design aligns with educational standards, incorporates backward design (starting with desired outcomes), includes diverse perspectives and materials, addresses different levels of complexity, and makes real-world connections."
      }
    };
    
    // Normalize and simplify the question to help with matching
    const simplifiedQuestion = question.toLowerCase().replace(/[^\w\s]/g, '');
    
    // Try to match with domain-specific answers first
    if (domainAnswers[domain]) {
      for (const [key, answer] of Object.entries(domainAnswers[domain])) {
        if (simplifiedQuestion.includes(key)) {
          return answer;
        }
      }
    }
    
    // Generic answers for common interview questions
    if (simplifiedQuestion.includes('experience')) {
      return `When discussing your experience in ${domain.split('-').join(' ')}, focus on specific projects, challenges overcome, and measurable results. Include both technical and soft skills you've developed, and how they're relevant to the role.`;
    }
    
    if (simplifiedQuestion.includes('strengths') || simplifiedQuestion.includes('skills')) {
      return `When discussing strengths in ${domain.split('-').join(' ')}, focus on specific technical skills, soft skills like communication or problem-solving, and domain knowledge. Use concrete examples to illustrate these strengths in action.`;
    }
    
    if (simplifiedQuestion.includes('trends') || simplifiedQuestion.includes('updated')) {
      return `Staying updated in ${domain.split('-').join(' ')} involves following industry blogs, participating in professional communities, attending conferences, taking online courses, and networking with peers. Mention specific resources you use and how you apply new knowledge.`;
    }
    
    if (simplifiedQuestion.includes('challenge') || simplifiedQuestion.includes('problem')) {
      return `When discussing challenges in ${domain.split('-').join(' ')}, use the STAR method (Situation, Task, Action, Result). Clearly explain the context, your specific role, the actions you took, and quantifiable results. Focus on what you learned and how it improved your skills.`;
    }
    
    if (simplifiedQuestion.includes('collaborate') || simplifiedQuestion.includes('team')) {
      return `Effective collaboration in ${domain.split('-').join(' ')} involves clear communication, active listening, respecting diverse perspectives, setting shared goals, and leveraging team members' strengths. Provide specific examples of successful collaboration and your contribution to team success.`;
    }
    
    if (simplifiedQuestion.includes('approach') || simplifiedQuestion.includes('process')) {
      return `When describing your approach to ${domain.split('-').join(' ')}, outline your methodology step-by-step, explain how you gather requirements, handle constraints, validate solutions, and iterate based on feedback. Use a specific project example to illustrate your process.`;
    }
    
    // Default response if no specific match is found
    return `This question is asking about your knowledge, experience, or approach in ${domain.split('-').join(' ')}. Provide specific examples from your experience, focus on measurable results, and explain your reasoning clearly.`;
  };

  const toggleRecording = () => {
    if (disabled) return;
    
    setIsRecording(!isRecording);
    if (isRecording) {
      setInputValue(prev => prev + " (voice transcription would appear here)");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleVoiceResult = (text: string) => {
    if (text.trim() && !disabled) {
      // Set the input value with the transcribed text
      setInputValue(text);
      
      // Focus and highlight the text in the textarea after a short delay
      setTimeout(() => {
        const textareaElement = document.querySelector('textarea.bg-transparent') as HTMLTextAreaElement;
        if (textareaElement) {
          textareaElement.focus();
          
          // Show a toast to guide the user
          toast({
            title: "Voice transcription complete",
            description: "Review your answer and press Send or Ctrl+Enter to submit",
            variant: "default",
          });
        }
      }, 100);
    }
  };

  const getCareerIcon = () => {
    switch(careerPath) {
      case 'software-development':
        return <Code className="text-[#FFE066]" size={18} />;
      case 'graphic-design':
        return <Palette className="text-[#FFE066]" size={18} />;
      case 'ux-design':
        return <Figma className="text-[#FFE066]" size={18} />;
      case 'data-science':
        return <Database className="text-[#FFE066]" size={18} />;
      case 'ai-engineering':
        return <Brain className="text-[#FFE066]" size={18} />;
      default:
        return <Terminal className="text-[#FFE066]" size={18} />;
    }
  };

  const generalFollowUps = [
    "Can you elaborate more on that?",
    "That's interesting. What specific skills did you develop through that experience?",
    "How would you approach a similar situation differently now?",
    "What resources or learning paths would you recommend for someone new to that area?",
    "How do you see that field evolving in the next few years?"
  ];

  const careerQuestions = {
    'software-development': [
      "What programming languages are you most comfortable with?",
      "Tell me about a challenging software project you worked on. What problems did you solve?",
      "How do you stay updated with the latest technologies and frameworks?",
      "How do you approach debugging a complex issue?",
      "Describe your experience with version control systems like Git."
    ],
    'graphic-design': [
      "Which design software are you proficient in?",
      "How would you describe your design style?",
      "Walk me through your creative process from concept to final deliverable.",
      "How do you handle client feedback and revisions?",
      "What design trends are you currently excited about?"
    ],
    'ux-design': [
      "What is your process for conducting user research?",
      "How do you translate research insights into design decisions?",
      "Tell me about a time when usability testing significantly changed your design approach.",
      "How do you balance business requirements with user needs?",
      "How do you measure the success of your UX design solutions?"
    ],
    'data-science': [
      "What experience do you have with data analysis tools and languages?",
      "Describe a data project where you derived actionable insights.",
      "How do you approach cleaning and preprocessing messy datasets?",
      "Explain how you would communicate complex findings to non-technical stakeholders.",
      "What statistical methods do you commonly use in your analysis?"
    ],
    'ai-engineering': [
      "What machine learning frameworks have you worked with?",
      "Describe a project where you implemented an AI solution.",
      "How do you evaluate the performance of your machine learning models?",
      "What challenges have you faced when deploying AI models to production?",
      "How do you keep up with the rapidly evolving field of AI?"
    ],
    'freelancing': [
      "How do you determine your rates for different types of projects?",
      "What is your approach to finding and retaining clients?",
      "How do you handle scope creep in a project?",
      "What tools do you use to manage your freelance business and stay organized?",
      "How do you handle the legal aspects of freelancing, like contracts and intellectual property?"
    ],
    'teaching': [
      "How do you adapt your teaching methods for different learning styles?",
      "What technologies do you use to enhance the learning experience?",
      "How do you assess student understanding and progress?",
      "Describe a challenging teaching situation and how you handled it.",
      "How do you stay current with developments in your field?"
    ],
    'product-management': [
      "How do you prioritize features in a product roadmap?",
      "Describe your process for conducting user research.",
      "How do you measure the success of a product feature after launch?",
      "How do you communicate product decisions to stakeholders?",
      "Describe a situation where you had to make a difficult trade-off in a product decision."
    ],
    'team-leadership': [
      "How do you handle conflicts within your team?",
      "What is your approach to delegating tasks to team members?",
      "How do you motivate team members who are struggling with performance?",
      "Describe your process for setting and tracking team goals.",
      "How do you foster a culture of innovation and continuous improvement?"
    ]
  };

  return (
    <div className="flex flex-col h-full border border-[#21262D] rounded-xl bg-[#161B22] overflow-hidden relative shadow-xl">
      {showBackground && (
        <div className="absolute inset-0 z-0 opacity-10">
          <Squares 
            direction="diagonal"
            speed={0.2}
            squareSize={50}
            borderColor="#FFE066"
            hoverFillColor="#7D4CDB"
          />
        </div>
      )}
      
      <div className="flex items-center px-4 py-3 border-b border-[#21262D] bg-[#161B22] relative z-10">
        <div className="flex space-x-1.5 mr-4">
          <div className="w-3 h-3 rounded-full bg-[#F44336]"></div>
          <div className="w-3 h-3 rounded-full bg-[#FFEB3B]"></div>
          <div className="w-3 h-3 rounded-full bg-[#4CAF50]"></div>
        </div>
        {getCareerIcon()}
        <p className="text-sm font-['JetBrains Mono'] text-[#F0F6FC]/80 ml-2 font-medium">
          Cogniview@{careerPath ? `${careerPath}` : 'interview'}:~
        </p>
        <div className="ml-auto flex items-center gap-3">
          <span className="px-2.5 py-1 text-xs rounded-full bg-[#0D1117] text-[#FFE066] font-['JetBrains Mono'] font-medium border border-[#21262D]">
            Stage: {interviewStage}/10
          </span>
          <span className="px-2.5 py-1 text-xs rounded-full bg-[#0D1117] text-[#FFE066] font-['JetBrains Mono'] font-medium border border-[#21262D]">
            {difficultyLevel.charAt(0).toUpperCase() + difficultyLevel.slice(1)}
          </span>
        </div>
      </div>
      
      <div className="flex-1 p-5 overflow-y-auto bg-[#0D1117] font-['JetBrains Mono'] relative z-10">
        <div className="grid gap-6">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`${
                message.role === 'user' 
                  ? 'pl-4 border-l-2 border-[#FFE066]' 
                  : message.role === 'assistant' 
                    ? 'pl-4 border-l-2 border-[#7D4CDB]' 
                    : 'text-[#F0F6FC]/60'
              }`}
            >
              {message.role === 'system' ? (
                <p className="text-[#F0F6FC]/60 text-sm">{message.content}</p>
              ) : (
                <>
                  <div className="flex items-center mb-1.5">
                    <span className={`text-xs font-medium ${
                      message.role === 'user' ? 'text-[#FFE066]' : 'text-[#7D4CDB]'
                    }`}>
                      {message.role === 'user' ? 'you@developer' : 'interviewer@Cogniview'}:~
                    </span>
                    <span className="ml-2 text-[#F0F6FC]/40 text-xs">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-[#F0F6FC] leading-relaxed">{message.content}</p>
                  
                  {message.role === 'user' && message.scores && (
                    <div className="mt-4 text-xs text-[#F0F6FC]/80 bg-[#161B22] p-4 rounded-lg border border-[#21262D] shadow-md relative overflow-hidden group">
                      <GlowingEffect 
                        spread={40}
                        glow={true}
                        disabled={false}
                        proximity={64}
                        inactiveZone={0.01}
                        borderWidth={2}
                        variant="default"
                      />
                      <div className="grid gap-3 relative z-10">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Score: {message.scores.overallScore}/100</span>
                          <div className="w-48 bg-[#0D1117] h-2 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${
                                message.scores.overallScore >= 80 ? 'bg-[#FFE066]' : 
                                message.scores.overallScore >= 60 ? 'bg-[#7D4CDB]' : 
                                'bg-[#FF5A5A]'
                              }`} 
                              style={{ width: `${message.scores.overallScore}%` }}
                            />
                          </div>
                        </div>
                        
                        {/* Detailed score metrics */}
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex justify-between items-center">
                            <span>Technical:</span>
                            <div className="w-24 bg-[#0D1117] h-1.5 rounded-full overflow-hidden">
                              <div className="h-full bg-[#7D4CDB] rounded-full" style={{ width: `${message.scores.technicalScore}%` }} />
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Communication:</span>
                            <div className="w-24 bg-[#0D1117] h-1.5 rounded-full overflow-hidden">
                              <div className="h-full bg-[#7D4CDB] rounded-full" style={{ width: `${message.scores.communicationScore}%` }} />
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Confidence:</span>
                            <div className="w-24 bg-[#0D1117] h-1.5 rounded-full overflow-hidden">
                              <div className="h-full bg-[#FFE066] rounded-full" style={{ width: `${message.scores.confidenceScore}%` }} />
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Problem Solving:</span>
                            <div className="w-24 bg-[#0D1117] h-1.5 rounded-full overflow-hidden">
                              <div className="h-full bg-[#FFE066] rounded-full" style={{ width: `${message.scores.problemSolvingScore}%` }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
        
        {isLoading && (
          <div className="flex items-center text-[#F0F6FC]/60 p-4 bg-[#161B22] rounded-lg my-5 border border-[#21262D] relative overflow-hidden">
            <GlowingEffect 
              spread={40}
              glow={true}
              disabled={false}
              proximity={64}
              inactiveZone={0.01}
              borderWidth={2}
              variant="default"
            />
            <div className="relative z-10 flex items-center">
              <Loader className="animate-spin mr-3" size={16} />
              <p>Processing your answer...</p>
            </div>
          </div>
        )}
        
        {disabled && (
          <div className="text-[#FFE066] p-4 border border-[#FFE066]/30 bg-[#161B22] rounded-lg shadow-md my-5 relative overflow-hidden">
            <GlowingEffect 
              spread={40}
              glow={true}
              disabled={false}
              proximity={64}
              inactiveZone={0.01}
              borderWidth={2}
              variant="default"
            />
            <div className="relative z-10">
              Interview paused. Please wait for the cooldown period to complete before continuing.
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t border-[#21262D] bg-[#0D1117] relative z-10">
        <div className="flex flex-col w-full">
          {/* Add VoiceInput at the top */}
          <VoiceInput 
            onResult={handleVoiceResult} 
            className="mb-3"
            disabled={disabled}
          />
          
          {/* Main input area */}
          <div className="flex items-center gap-2 w-full">
            <div className="flex-1 flex items-center bg-[#161B22] border border-[#21262D] rounded-lg px-3 py-2.5 relative overflow-hidden">
              <GlowingEffect 
                spread={40}
                glow={false}
                disabled={!inputValue.trim()}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={2}
                variant="default"
              />
              <ChevronRight className="text-[#FFE066] mr-2 relative z-10 flex-shrink-0" size={16} />
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-transparent border-none outline-none resize-none flex-1 font-['JetBrains Mono'] text-[#F0F6FC] min-h-[40px] max-h-[120px] placeholder-[#F0F6FC]/30 text-sm relative z-10"
                placeholder={disabled ? "Interview paused..." : "Type your response..."}
                rows={1}
                disabled={disabled}
              />
            </div>
            
            <Button
              onClick={handleSendMessage}
              className={`p-2.5 h-10 w-10 flex-shrink-0 rounded-lg ${
                disabled 
                  ? 'bg-gray-500 cursor-not-allowed' 
                  : inputValue.trim() ? 'bg-[#FFE066] hover:bg-[#FFE066]/80 text-[#0D1117]' : 'bg-gray-500 cursor-not-allowed'
              }`}
              disabled={disabled || !inputValue.trim()}
            >
              <Send size={20} />
            </Button>
          </div>
        </div>
        
        <div className="mt-2.5 text-[#F0F6FC]/40 text-xs font-['JetBrains Mono'] flex justify-between items-center">
          <span>Press <kbd className="px-1.5 py-0.5 bg-[#161B22] border border-[#21262D] rounded text-xs">Ctrl</kbd>+<kbd className="px-1.5 py-0.5 bg-[#161B22] border border-[#21262D] rounded text-xs">Enter</kbd> to send</span>
          <span>{inputValue.length} characters</span>
        </div>
      </div>
    </div>
  );
};

export default TerminalInterview;
