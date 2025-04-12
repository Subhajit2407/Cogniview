import { useState, useEffect } from 'react';
import { domains } from '@/components/DomainSelector';
import { AnswerScores } from '@/components/TerminalInterview';

// Define common types for our interview system
export interface InterviewQuestion {
  id: string;
  question: string;
  domain: string;
  category?: string;
  difficulty?: 'beginner' | 'intermediate' | 'expert';
}

export interface InterviewSession {
  id: string;
  domain: string;
  difficultyLevel: string;
  startTime: Date;
  endTime?: Date;
  questions: InterviewQuestion[];
  answers: Record<string, {
    text: string;
    scores: AnswerScores;
  }>;
  feedback?: {
    technicalScore?: number;
    communicationScore?: number;
    confidenceScore?: number;
    codeQualityScore?: number;
    problemSolvingScore?: number;
    overallScore?: number;
    strengths?: string[];
    improvements?: string[];
    managementScore?: number;
  };
}

// Mock questions for different domains and difficulty levels
const domainQuestions: Record<string, Record<string, InterviewQuestion[]>> = {
  'software-development': {
    'beginner': [
      { id: 'sd_b1', domain: 'software-development', question: 'What programming languages are you familiar with?', category: 'languages', difficulty: 'beginner' },
      { id: 'sd_b2', domain: 'software-development', question: 'Can you explain what a variable is?', category: 'basics', difficulty: 'beginner' },
      { id: 'sd_b3', domain: 'software-development', question: 'What is a function?', category: 'basics', difficulty: 'beginner' },
      { id: 'sd_b4', domain: 'software-development', question: 'Describe the difference between HTML and CSS.', category: 'web', difficulty: 'beginner' },
      { id: 'sd_b5', domain: 'software-development', question: 'What is a loop?', category: 'basics', difficulty: 'beginner' },
      { id: 'sd_b6', domain: 'software-development', question: 'What is version control and why is it important?', category: 'tools', difficulty: 'beginner' },
      { id: 'sd_b7', domain: 'software-development', question: 'What is an array?', category: 'data-structures', difficulty: 'beginner' },
      { id: 'sd_b8', domain: 'software-development', question: 'What is debugging?', category: 'process', difficulty: 'beginner' },
      { id: 'sd_b9', domain: 'software-development', question: 'Explain what an if statement does.', category: 'control-flow', difficulty: 'beginner' },
      { id: 'sd_b10', domain: 'software-development', question: 'What is the difference between frontend and backend development?', category: 'concepts', difficulty: 'beginner' },
    ],
    'intermediate': [
      { id: 'sd_i1', domain: 'software-development', question: 'Explain the concept of recursion and provide an example.', category: 'algorithms', difficulty: 'intermediate' },
      { id: 'sd_i2', domain: 'software-development', question: 'What are the key differences between REST and GraphQL?', category: 'web', difficulty: 'intermediate' },
      { id: 'sd_i3', domain: 'software-development', question: 'How would you optimize a slow-performing database query?', category: 'database', difficulty: 'intermediate' },
      { id: 'sd_i4', domain: 'software-development', question: 'Explain the concept of closures in JavaScript.', category: 'javascript', difficulty: 'intermediate' },
      { id: 'sd_i5', domain: 'software-development', question: 'What is your approach to testing code?', category: 'testing', difficulty: 'intermediate' },
      { id: 'sd_i6', domain: 'software-development', question: 'Describe the MVC architecture pattern.', category: 'architecture', difficulty: 'intermediate' },
      { id: 'sd_i7', domain: 'software-development', question: 'What is dependency injection?', category: 'design-patterns', difficulty: 'intermediate' },
      { id: 'sd_i8', domain: 'software-development', question: 'Explain the concept of promises in JavaScript.', category: 'javascript', difficulty: 'intermediate' },
      { id: 'sd_i9', domain: 'software-development', question: 'What are the SOLID principles?', category: 'design-principles', difficulty: 'intermediate' },
      { id: 'sd_i10', domain: 'software-development', question: 'Explain how you would implement authentication in a web application.', category: 'security', difficulty: 'intermediate' },
    ],
    'expert': [
      { id: 'sd_e1', domain: 'software-development', question: 'Explain how you would design a distributed system for a high-traffic application.', category: 'system-design', difficulty: 'expert' },
      { id: 'sd_e2', domain: 'software-development', question: 'How would you implement a real-time collaborative editor?', category: 'advanced', difficulty: 'expert' },
      { id: 'sd_e3', domain: 'software-development', question: 'Explain the CAP theorem and its implications for database design.', category: 'database', difficulty: 'expert' },
      { id: 'sd_e4', domain: 'software-development', question: 'Describe approaches to handle eventual consistency in a microservices architecture.', category: 'architecture', difficulty: 'expert' },
      { id: 'sd_e5', domain: 'software-development', question: 'How would you implement a custom garbage collector?', category: 'low-level', difficulty: 'expert' },
      { id: 'sd_e6', domain: 'software-development', question: 'Explain how you would handle concurrency issues in a distributed system.', category: 'system-design', difficulty: 'expert' },
      { id: 'sd_e7', domain: 'software-development', question: 'Describe how you would implement a custom caching layer for a high-traffic application.', category: 'performance', difficulty: 'expert' },
      { id: 'sd_e8', domain: 'software-development', question: 'How would you design a system that processes millions of events per second?', category: 'system-design', difficulty: 'expert' },
      { id: 'sd_e9', domain: 'software-development', question: 'Explain how you would implement a distributed lock in a microservices architecture.', category: 'distributed-systems', difficulty: 'expert' },
      { id: 'sd_e10', domain: 'software-development', question: 'Describe approaches to achieve zero-downtime deployments in a large-scale system.', category: 'devops', difficulty: 'expert' },
    ]
  },
  'ai-engineering': {
    'beginner': [
      { id: 'ai_b1', domain: 'ai-engineering', question: 'What is machine learning?', category: 'basics', difficulty: 'beginner' },
      { id: 'ai_b10', domain: 'ai-engineering', question: 'What is the difference between supervised and unsupervised learning?', category: 'basics', difficulty: 'beginner' },
    ],
    'intermediate': [
      { id: 'ai_i1', domain: 'ai-engineering', question: 'Explain the difference between supervised and unsupervised learning.', category: 'ml-basics', difficulty: 'intermediate' },
      { id: 'ai_i10', domain: 'ai-engineering', question: 'Describe your experience with deploying machine learning models to production.', category: 'deployment', difficulty: 'intermediate' },
    ],
    'expert': [
      { id: 'ai_e1', domain: 'ai-engineering', question: 'How would you handle imbalanced datasets in a classification problem?', category: 'ml-advanced', difficulty: 'expert' },
      { id: 'ai_e10', domain: 'ai-engineering', question: 'Explain how transformers work in natural language processing.', category: 'nlp', difficulty: 'expert' },
    ]
  },
  'graphic-design': {
    'beginner': [
      { id: 'gd1', domain: 'graphic-design', question: 'Walk me through your design process from concept to completion.', category: 'process', difficulty: 'beginner' },
      { id: 'gd2', domain: 'graphic-design', question: 'How do you stay updated with current design trends?', category: 'trends', difficulty: 'beginner' },
    ],
    'intermediate': [
      { id: 'gd3', domain: 'graphic-design', question: 'Describe how you would approach a rebrand for a well-established company.', category: 'branding', difficulty: 'intermediate' },
      { id: 'gd4', domain: 'graphic-design', question: 'How do you handle client feedback, especially when you disagree with their suggestions?', category: 'client', difficulty: 'intermediate' },
    ],
    'expert': [
      { id: 'gd5', domain: 'graphic-design', question: 'Explain your approach to creating accessible designs.', category: 'accessibility', difficulty: 'expert' },
    ]
  },
  'ux-design': {
    'beginner': [
      { id: 'ux_b1', domain: 'ux-design', question: 'What is the difference between UX and UI design?', category: 'basics', difficulty: 'beginner' },
      { id: 'ux_b2', domain: 'ux-design', question: 'What is your process for conducting user research?', category: 'research', difficulty: 'beginner' },
      { id: 'ux_b3', domain: 'ux-design', question: 'How do you translate research insights into design decisions?', category: 'process', difficulty: 'beginner' },
      { id: 'ux_b4', domain: 'ux-design', question: 'What are wireframes and why are they important?', category: 'tools', difficulty: 'beginner' },
      { id: 'ux_b5', domain: 'ux-design', question: 'Explain the concept of user personas and how you use them.', category: 'research', difficulty: 'beginner' },
      { id: 'ux_b6', domain: 'ux-design', question: 'How do you ensure your designs are accessible to all users?', category: 'accessibility', difficulty: 'beginner' },
      { id: 'ux_b7', domain: 'ux-design', question: 'What tools do you use in your UX design workflow?', category: 'tools', difficulty: 'beginner' },
      { id: 'ux_b8', domain: 'ux-design', question: 'How do you approach information architecture?', category: 'structure', difficulty: 'beginner' },
      { id: 'ux_b9', domain: 'ux-design', question: 'Describe a recent UX project you worked on.', category: 'experience', difficulty: 'beginner' },
      { id: 'ux_b10', domain: 'ux-design', question: 'What makes a good user experience?', category: 'principles', difficulty: 'beginner' },
    ],
    'intermediate': [
      { id: 'ux_i1', domain: 'ux-design', question: 'How do you conduct usability testing?', category: 'testing', difficulty: 'intermediate' },
      { id: 'ux_i2', domain: 'ux-design', question: 'Tell me about a time when usability testing significantly changed your design approach.', category: 'testing', difficulty: 'intermediate' },
      { id: 'ux_i3', domain: 'ux-design', question: 'How do you balance business requirements with user needs?', category: 'strategy', difficulty: 'intermediate' },
      { id: 'ux_i4', domain: 'ux-design', question: 'How do you measure the success of your UX design solutions?', category: 'metrics', difficulty: 'intermediate' },
      { id: 'ux_i5', domain: 'ux-design', question: 'Explain how you approach designing for different platforms (mobile, web, desktop).', category: 'responsive', difficulty: 'intermediate' },
      { id: 'ux_i6', domain: 'ux-design', question: 'How do you create and use journey maps in your design process?', category: 'tools', difficulty: 'intermediate' },
      { id: 'ux_i7', domain: 'ux-design', question: 'Describe your approach to handling stakeholder feedback that conflicts with user needs.', category: 'communication', difficulty: 'intermediate' },
      { id: 'ux_i8', domain: 'ux-design', question: 'How do you integrate quantitative and qualitative research in your UX process?', category: 'research', difficulty: 'intermediate' },
      { id: 'ux_i9', domain: 'ux-design', question: 'Explain your process for creating interactive prototypes.', category: 'prototyping', difficulty: 'intermediate' },
      { id: 'ux_i10', domain: 'ux-design', question: 'How do you design for users with different abilities and accessibility needs?', category: 'accessibility', difficulty: 'intermediate' },
    ],
    'expert': [
      { id: 'ux_e1', domain: 'ux-design', question: 'How do you lead a UX team and establish design processes across an organization?', category: 'leadership', difficulty: 'expert' },
      { id: 'ux_e2', domain: 'ux-design', question: 'How do you approach designing for emerging technologies like AR/VR or voice interfaces?', category: 'innovation', difficulty: 'expert' },
      { id: 'ux_e3', domain: 'ux-design', question: 'Describe your approach to creating a comprehensive design system.', category: 'systems', difficulty: 'expert' },
      { id: 'ux_e4', domain: 'ux-design', question: 'How do you balance innovation with established design patterns?', category: 'strategy', difficulty: 'expert' },
      { id: 'ux_e5', domain: 'ux-design', question: 'How would you design for complex user workflows in enterprise applications?', category: 'complexity', difficulty: 'expert' },
      { id: 'ux_e6', domain: 'ux-design', question: 'Explain how you incorporate ethical considerations into your design process.', category: 'ethics', difficulty: 'expert' },
      { id: 'ux_e7', domain: 'ux-design', question: 'How do you measure and improve the ROI of UX design in an organization?', category: 'metrics', difficulty: 'expert' },
      { id: 'ux_e8', domain: 'ux-design', question: 'Describe a situation where you had to redesign a product with significant user adoption challenges.', category: 'challenges', difficulty: 'expert' },
      { id: 'ux_e9', domain: 'ux-design', question: 'How do you incorporate AI and machine learning into UX design?', category: 'technology', difficulty: 'expert' },
      { id: 'ux_e10', domain: 'ux-design', question: 'Explain your approach to designing complex systems with multiple user types and competing priorities.', category: 'strategy', difficulty: 'expert' },
    ]
  },
  'freelancing': {
    'beginner': [
      { id: 'fr1', domain: 'freelancing', question: 'How do you determine your rates for different types of projects?', category: 'business', difficulty: 'beginner' },
      { id: 'fr2', domain: 'freelancing', question: 'What is your approach to finding and retaining clients?', category: 'marketing', difficulty: 'beginner' },
    ],
    'intermediate': [
      { id: 'fr3', domain: 'freelancing', question: 'How do you handle scope creep in a project?', category: 'project-management', difficulty: 'intermediate' },
    ],
    'expert': [
      { id: 'fr4', domain: 'freelancing', question: 'What tools do you use to manage your freelance business and stay organized?', category: 'tools', difficulty: 'expert' },
      { id: 'fr5', domain: 'freelancing', question: 'How do you handle the legal aspects of freelancing, like contracts and intellectual property?', category: 'legal', difficulty: 'expert' },
    ]
  },
  'teaching': {
    'beginner': [
      { id: 'te1', domain: 'teaching', question: 'How do you adapt your teaching methods for different learning styles?', category: 'pedagogy', difficulty: 'beginner' },
    ],
    'intermediate': [
      { id: 'te2', domain: 'teaching', question: 'What technologies do you use to enhance the learning experience?', category: 'edtech', difficulty: 'intermediate' },
      { id: 'te3', domain: 'teaching', question: 'How do you assess student understanding and progress?', category: 'assessment', difficulty: 'intermediate' },
    ],
    'expert': [
      { id: 'te4', domain: 'teaching', question: 'Describe a challenging teaching situation and how you handled it.', category: 'challenges', difficulty: 'expert' },
      { id: 'te5', domain: 'teaching', question: 'How do you stay current with developments in your field?', category: 'professional-development', difficulty: 'expert' },
    ]
  },
  'product-management': {
    'beginner': [
      { id: 'pm1', domain: 'product-management', question: 'How do you prioritize features in a product roadmap?', category: 'roadmap', difficulty: 'beginner' },
    ],
    'intermediate': [
      { id: 'pm2', domain: 'product-management', question: 'Describe your process for conducting user research.', category: 'user-research', difficulty: 'intermediate' },
      { id: 'pm3', domain: 'product-management', question: 'How do you measure the success of a product feature after launch?', category: 'metrics', difficulty: 'intermediate' },
    ],
    'expert': [
      { id: 'pm4', domain: 'product-management', question: 'How do you communicate product decisions to stakeholders?', category: 'communication', difficulty: 'expert' },
      { id: 'pm5', domain: 'product-management', question: 'Describe a situation where you had to make a difficult trade-off in a product decision.', category: 'decision-making', difficulty: 'expert' },
    ]
  },
  'team-leadership': {
    'beginner': [
      { id: 'tl1', domain: 'team-leadership', question: 'How do you handle conflicts within your team?', category: 'conflict-resolution', difficulty: 'beginner' },
    ],
    'intermediate': [
      { id: 'tl2', domain: 'team-leadership', question: 'What is your approach to delegating tasks to team members?', category: 'delegation', difficulty: 'intermediate' },
      { id: 'tl3', domain: 'team-leadership', question: 'How do you motivate team members who are struggling with performance?', category: 'motivation', difficulty: 'intermediate' },
    ],
    'expert': [
      { id: 'tl4', domain: 'team-leadership', question: 'Describe your process for setting and tracking team goals.', category: 'goal-setting', difficulty: 'expert' },
      { id: 'tl5', domain: 'team-leadership', question: 'How do you foster a culture of innovation and continuous improvement?', category: 'culture', difficulty: 'expert' },
    ]
  }
};

export function useInterviewSession(initialDomain = 'software-development') {
  const [domain, setDomain] = useState(initialDomain);
  const [difficultyLevel, setDifficultyLevel] = useState<string>('beginner');
  const [session, setSession] = useState<InterviewSession | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isInterviewComplete, setIsInterviewComplete] = useState(false);

  // Save session to history in localStorage
  const saveSessionToHistory = (completedSession: InterviewSession) => {
    try {
      // Get existing session history
      const historyJson = localStorage.getItem('interview_session_history');
      const history = historyJson ? JSON.parse(historyJson) : [];
      
      // Add new session
      history.push({
        ...completedSession,
        // Convert dates to strings for storage
        startTime: completedSession.startTime.toISOString(),
        endTime: completedSession.endTime?.toISOString()
      });
      
      // Save back to localStorage
      localStorage.setItem('interview_session_history', JSON.stringify(history));
    } catch (error) {
      console.error('Failed to save session history:', error);
    }
  };

  // Get session history
  const getSessionHistory = (): InterviewSession[] => {
    try {
      const historyJson = localStorage.getItem('interview_session_history');
      if (!historyJson) return [];
      
      const history = JSON.parse(historyJson);
      
      // Convert string dates back to Date objects
      return history.map((session: any) => ({
        ...session,
        startTime: new Date(session.startTime),
        endTime: session.endTime ? new Date(session.endTime) : undefined
      }));
    } catch (error) {
      console.error('Failed to retrieve session history:', error);
      return [];
    }
  };

  // Initialize or reset the interview session
  const startNewSession = (level: string = 'beginner') => {
    setDifficultyLevel(level);
    
    // Get questions for the domain and difficulty level
    let questions: InterviewQuestion[] = [];
    
    // Try to get questions for the specific domain and difficulty
    if (domainQuestions[domain] && domainQuestions[domain][level]) {
      questions = [...domainQuestions[domain][level]];
    } 
    // Fallback to beginner questions if the specific level doesn't exist
    else if (domainQuestions[domain] && domainQuestions[domain]['beginner']) {
      questions = [...domainQuestions[domain]['beginner']];
    }
    // Final fallback - create domain-specific questions instead of using software development
    else {
      console.warn(`No questions available for domain: ${domain}, creating custom questions`);
      
      // Create basic questions for this domain
      questions = [
        { 
          id: `${domain}_custom_1`, 
          domain: domain, 
          question: `What experience do you have in ${domain.split('-').join(' ')}?`,
          category: 'experience', 
          difficulty: 'beginner' 
        },
        { 
          id: `${domain}_custom_2`, 
          domain: domain, 
          question: `What are your strengths related to ${domain.split('-').join(' ')}?`,
          category: 'strengths', 
          difficulty: 'beginner' 
        },
        { 
          id: `${domain}_custom_3`, 
          domain: domain, 
          question: `How do you stay updated with the latest trends in ${domain.split('-').join(' ')}?`,
          category: 'learning', 
          difficulty: 'beginner' 
        },
        { 
          id: `${domain}_custom_4`, 
          domain: domain, 
          question: `What challenges have you faced in ${domain.split('-').join(' ')} and how did you overcome them?`,
          category: 'challenges', 
          difficulty: 'beginner' 
        },
        { 
          id: `${domain}_custom_5`, 
          domain: domain, 
          question: `Where do you see yourself in the field of ${domain.split('-').join(' ')} in the next 5 years?`,
          category: 'career', 
          difficulty: 'beginner' 
        }
      ];
    }
    
    // Ensure there are enough questions (at least 10)
    if (questions.length < 10) {
      console.warn(`Not enough questions for ${domain}/${level}, adding domain-specific questions`);
      
      // Create additional domain-specific questions instead of using software development questions
      const domainText = domain.split('-').join(' ');
      
      const additionalQuestions = [
        { 
          id: `${domain}_additional_1`, 
          domain: domain, 
          question: `What tools or technologies do you use most frequently in your ${domainText} work?`,
          category: 'tools', 
          difficulty: level as 'beginner' | 'intermediate' | 'expert'
        },
        { 
          id: `${domain}_additional_2`, 
          domain: domain, 
          question: `How do you measure success in your ${domainText} projects?`,
          category: 'metrics', 
          difficulty: level as 'beginner' | 'intermediate' | 'expert'
        },
        { 
          id: `${domain}_additional_3`, 
          domain: domain, 
          question: `Describe a successful ${domainText} project you've worked on.`,
          category: 'experience', 
          difficulty: level as 'beginner' | 'intermediate' | 'expert'
        },
        { 
          id: `${domain}_additional_4`, 
          domain: domain, 
          question: `What skills do you think are most important for someone in ${domainText}?`,
          category: 'skills', 
          difficulty: level as 'beginner' | 'intermediate' | 'expert'
        },
        { 
          id: `${domain}_additional_5`, 
          domain: domain, 
          question: `How do you approach problem-solving in ${domainText}?`,
          category: 'process', 
          difficulty: level as 'beginner' | 'intermediate' | 'expert'
        },
        { 
          id: `${domain}_additional_6`, 
          domain: domain, 
          question: `What was the most challenging ${domainText} problem you've solved?`,
          category: 'problem-solving', 
          difficulty: level as 'beginner' | 'intermediate' | 'expert'
        },
        { 
          id: `${domain}_additional_7`, 
          domain: domain, 
          question: `How do you collaborate with others in your ${domainText} work?`,
          category: 'collaboration', 
          difficulty: level as 'beginner' | 'intermediate' | 'expert'
        },
        { 
          id: `${domain}_additional_8`, 
          domain: domain, 
          question: `What resources do you use to improve your ${domainText} skills?`,
          category: 'learning', 
          difficulty: level as 'beginner' | 'intermediate' | 'expert'
        },
        { 
          id: `${domain}_additional_9`, 
          domain: domain, 
          question: `How do you handle feedback on your ${domainText} work?`,
          category: 'feedback', 
          difficulty: level as 'beginner' | 'intermediate' | 'expert'
        },
        { 
          id: `${domain}_additional_10`, 
          domain: domain, 
          question: `What do you think will be the next big trend in ${domainText}?`,
          category: 'trends', 
          difficulty: level as 'beginner' | 'intermediate' | 'expert'
        }
      ];
      
      // Add as many additional questions as needed to reach 10
      const neededQuestions = 10 - questions.length;
      questions.push(...additionalQuestions.slice(0, neededQuestions));
    }
    
    // Shuffle questions to get a unique experience each time
    questions = shuffleArray(questions);
    
    // Always limit to exactly 10 questions
    questions = questions.slice(0, 10);
    
    // Add "Question X:" prefix to each question for better tracking
    questions = questions.map((q, index) => ({
      ...q,
      question: `Question ${index + 1}: ${q.question}`
    }));
    
    setSession({
      id: `session-${Date.now()}`,
      domain,
      difficultyLevel: level,
      startTime: new Date(),
      questions,
      answers: {},
    });
    
    setCurrentQuestionIndex(0);
    setIsInterviewComplete(false);
  };

  // Update domain and reset session
  const changeDomain = (newDomain: string) => {
    setDomain(newDomain);
    
    // Clear existing session when domain changes
    if (session) {
      setSession(null);
      setCurrentQuestionIndex(0);
      setIsInterviewComplete(false);
    }
  };

  // Record user's answer and advance to next question
  const recordAnswer = (answer: string, scores: AnswerScores) => {
    if (!session || currentQuestionIndex >= session.questions.length) {
      return;
    }
    
    const questionId = session.questions[currentQuestionIndex].id;
    
    // Create a new session object with the updated answer
    const updatedSession = {
      ...session,
      answers: {
        ...session.answers,
        [questionId]: {
          text: answer,
          scores: scores
        }
      }
    };
    
    // Check if this was the last question (10th question)
    const isLastQuestion = currentQuestionIndex === 9; // 0-indexed, so 9 is the 10th question
    
    if (isLastQuestion) {
      // Complete the session with an end time and feedback
      const completedSession = {
        ...updatedSession,
        endTime: new Date()
      };
      
      // Generate feedback using the new generateFeedback function
      completedSession.feedback = generateFeedback(completedSession);
      
      // Save the completed session to history
      saveSessionToHistory(completedSession);
      
      // Update the session in state
      setSession(completedSession);
      
      // Set flag for interview completion
      setIsInterviewComplete(true);
      
      console.log("Interview complete after 10 questions!");
    } else {
      // Simply update the session with the new answer
      setSession(updatedSession);
      
      // Don't automatically advance to the next question
      // Let the user explicitly move to the next question
      // setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  // Generate strengths based on scores
  const generateStrengths = (scores: AnswerScores[]) => {
    const avgConfidence = scores.reduce((sum, s) => sum + s.confidenceScore, 0) / scores.length;
    const avgTechnical = scores.reduce((sum, s) => sum + s.technicalScore, 0) / scores.length;
    const avgCommunication = scores.reduce((sum, s) => sum + s.communicationScore, 0) / scores.length;
    const avgCodeQuality = scores.reduce((sum, s) => sum + (s.codeQualityScore || 0), 0) / scores.length;
    const avgProblemSolving = scores.reduce((sum, s) => sum + (s.problemSolvingScore || 0), 0) / scores.length;
    
    const strengths: string[] = [];
    
    if (avgConfidence > 80) {
      strengths.push('Strong confidence in responses');
    } else if (avgConfidence > 70) {
      strengths.push('Good confidence level overall');
    }
    
    if (avgTechnical > 80) {
      strengths.push('Excellent technical knowledge');
    } else if (avgTechnical > 70) {
      strengths.push('Solid technical understanding');
    }
    
    if (avgCommunication > 80) {
      strengths.push('Clear and effective communication');
    } else if (avgCommunication > 70) {
      strengths.push('Good communication skills');
    }
    
    if (avgCodeQuality > 80) {
      strengths.push('Excellent code quality awareness');
    } else if (avgCodeQuality > 70) {
      strengths.push('Good understanding of code quality principles');
    }
    
    if (avgProblemSolving > 80) {
      strengths.push('Outstanding problem-solving approach');
    } else if (avgProblemSolving > 70) {
      strengths.push('Effective problem-solving skills');
    }
    
    // Add domain specific strengths
    const domainSpecificStrengths: Record<string, string[]> = {
      'software-development': [
        'Technical problem-solving ability',
        'Understanding of programming concepts'
      ],
      'ai-engineering': [
        'Machine learning concepts',
        'Model evaluation knowledge'
      ],
      'graphic-design': [
        'Creative process description',
        'Visual design understanding'
      ],
      'freelancing': [
        'Client management approach',
        'Business acumen'
      ],
      'teaching': [
        'Student-centric approach',
        'Educational methodology'
      ],
      'product-management': [
        'User-focused perspective',
        'Feature prioritization skills'
      ],
      'team-leadership': [
        'People management ability',
        'Team motivation techniques'
      ]
    };
    
    // Add up to 2 domain-specific strengths
    const domainStrengths = domainSpecificStrengths[domain] || [];
    strengths.push(...domainStrengths.slice(0, 2));
    
    // Return a maximum of 3 strengths
    return strengths.slice(0, 3);
  };
  
  // Generate improvement areas based on scores
  const generateImprovements = (scores: AnswerScores[]) => {
    const avgConfidence = scores.reduce((sum, s) => sum + s.confidenceScore, 0) / scores.length;
    const avgTechnical = scores.reduce((sum, s) => sum + s.technicalScore, 0) / scores.length;
    const avgCommunication = scores.reduce((sum, s) => sum + s.communicationScore, 0) / scores.length;
    const avgCodeQuality = scores.reduce((sum, s) => sum + (s.codeQualityScore || 0), 0) / scores.length;
    const avgProblemSolving = scores.reduce((sum, s) => sum + (s.problemSolvingScore || 0), 0) / scores.length;
    
    const improvements: string[] = [];
    
    if (avgConfidence < 65) {
      improvements.push('Build more confidence in your answers');
    }
    
    if (avgTechnical < 65) {
      improvements.push('Deepen technical knowledge in key areas');
    }
    
    if (avgCommunication < 65) {
      improvements.push('Work on clearer communication of concepts');
    }
    
    if (avgCodeQuality < 65) {
      improvements.push('Focus on code quality principles');
    }
    
    if (avgProblemSolving < 65) {
      improvements.push('Strengthen problem-solving approach');
    }
    
    // Add domain specific improvement areas
    const domainSpecificImprovements: Record<string, string[]> = {
      'software-development': [
        'Practice explaining complex algorithms',
        'Discuss code complexity and trade-offs'
      ],
      'ai-engineering': [
        'Go deeper on implementation details',
        'Discuss model evaluation metrics'
      ],
      'graphic-design': [
        'Articulate design decisions more clearly',
        'Discuss client collaboration process'
      ],
      'freelancing': [
        'Provide specific pricing strategies',
        'Explain contract management process'
      ],
      'teaching': [
        'Describe assessment methodology',
        'Explain technology integration in teaching'
      ],
      'product-management': [
        'Elaborate on user research methods',
        'Discuss metrics for feature success'
      ],
      'team-leadership': [
        'Provide specific examples of delegation',
        'Describe methods for handling underperformers'
      ]
    };
    
    // Add up to 2 domain-specific improvements
    const domainImprovements = domainSpecificImprovements[domain] || [];
    improvements.push(...domainImprovements.slice(0, 2));
    
    // Return a maximum of 3 improvements
    return improvements.slice(0, 3);
  };

  // Current question helper
  const currentQuestion = session?.questions[currentQuestionIndex];

  // Helper function to shuffle an array
  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Monitor domain changes
  useEffect(() => {
    // If there's an active session and the domain doesn't match, reset it
    if (session && session.domain !== domain) {
      console.log(`Domain changed from ${session.domain} to ${domain}, resetting session`);
      setSession(null);
      setCurrentQuestionIndex(0);
      setIsInterviewComplete(false);
    }
  }, [domain, session]);

  // Initial setup
  useEffect(() => {
    if (!domains.find(d => d.id === domain)) {
      setDomain('software-development');
    }
  }, [domain]);

  // Helper function to calculate average of an array of numbers
  const average = (arr: number[]): number => {
    if (arr.length === 0) return 0;
    return arr.reduce((sum, val) => sum + val, 0) / arr.length;
  };

  // Generate feedback from session scores
  const generateFeedback = (sessionToComplete: InterviewSession) => {
    if (!sessionToComplete) return null;
    
    // Extract scores from answers
    const scores = Object.values(sessionToComplete.answers).map(a => a.scores);
    
    // Check if we have scores to analyze
    if (scores.length === 0) return null;
    
    const domain = sessionToComplete.domain;
    
    // Calculate average scores based on domain-specific criteria
    const feedback: InterviewSession['feedback'] = {
      confidenceScore: Math.round(average(scores.map(s => s.confidenceScore))),
      problemSolvingScore: Math.round(average(scores.map(s => s.problemSolvingScore))),
      strengths: generateStrengths(scores),
      improvements: generateImprovements(scores)
    };
    
    // Add domain-specific scores
    if (domain !== 'graphic-design') {
      feedback.technicalScore = Math.round(average(scores.map(s => s.technicalScore)));
      feedback.communicationScore = Math.round(average(scores.map(s => s.communicationScore)));
    }
    
    if (domain === 'software-development' || domain === 'ai-engineering' || domain === 'product-management') {
      feedback.codeQualityScore = Math.round(average(scores.map(s => s.codeQualityScore)));
    }
    
    if (domain === 'team-leadership') {
      feedback.managementScore = Math.round(average(scores.map(s => s.managementScore || 0)));
    }
    
    // Calculate overall score based on domain
    let relevantScores = [];
    
    // Common scores for all domains
    relevantScores.push(feedback.confidenceScore);
    relevantScores.push(feedback.problemSolvingScore);
    
    // Domain-specific scores
    if (domain !== 'graphic-design') {
      relevantScores.push(feedback.technicalScore);
      relevantScores.push(feedback.communicationScore);
    }
    
    if (domain === 'software-development' || domain === 'ai-engineering' || domain === 'product-management') {
      relevantScores.push(feedback.codeQualityScore);
    }
    
    if (domain === 'team-leadership' && feedback.managementScore) {
      relevantScores.push(feedback.managementScore);
    }
    
    feedback.overallScore = Math.round(average(relevantScores));
    
    return feedback;
  };

  // Function to explicitly move to the next question
  const goToNextQuestion = () => {
    if (session && currentQuestionIndex < session.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  return {
    domain,
    changeDomain,
    difficultyLevel,
    session,
    startNewSession,
    currentQuestion: session?.questions[currentQuestionIndex],
    currentQuestionIndex,
    recordAnswer,
    goToNextQuestion,
    progress: session ? {
      total: session.questions.length,
      completed: Object.keys(session.answers).length
    } : null,
    isInterviewComplete,
    setIsInterviewComplete,
    getSessionHistory
  };
}
