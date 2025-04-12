/**
 * Answer Verification Service - Handles verification of answer correctness using internet API
 */

// Types
interface VerificationResponse {
  isCorrect: boolean;
  confidenceScore: number;
  verifiedFacts: string[];
  corrections: string[];
  relevantSources: string[];
}

interface VerificationRequest {
  question: string;
  answer: string;
  domain: string;
}

// Mock API endpoint for now
const API_ENDPOINT = "https://api.cogniview.ai/verify";

/**
 * Verifies answer correctness by checking against internet sources
 * @param question The interview question
 * @param answer The user's answer
 * @param domain The career domain (e.g., 'software-development')
 * @returns Promise with verification results
 */
export const verifyAnswer = async (
  question: string, 
  answer: string, 
  domain: string
): Promise<VerificationResponse> => {
  try {
    // In a production app, this would be a real API call
    // For now, we'll simulate the API response
    
    // Remove "Question X:" prefix if present
    const cleanQuestion = question.replace(/^Question \d+: /i, '');
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Generate mock response based on answer characteristics
    return generateMockVerification(cleanQuestion, answer, domain);
    
    // In production, this would be:
    /*
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question: cleanQuestion,
        answer,
        domain,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
    */
  } catch (error) {
    console.error('Answer verification error:', error);
    // Return fallback response if verification fails
    return {
      isCorrect: answer.length > 100, // Simple fallback heuristic
      confidenceScore: 50,
      verifiedFacts: [],
      corrections: [],
      relevantSources: []
    };
  }
};

/**
 * Generates a mock verification response based on answer characteristics
 * In a real implementation, this would be replaced by actual API calls
 */
const generateMockVerification = (
  question: string,
  answer: string,
  domain: string
): VerificationResponse => {
  // Check answer length - longer answers tend to have more content
  const length = answer.length;
  
  // Calculate a base correctness score based on length
  let correctnessScore = 0;
  if (length < 50) correctnessScore = 30;
  else if (length < 100) correctnessScore = 50;
  else if (length < 200) correctnessScore = 70;
  else correctnessScore = 85;
  
  // Check for domain-specific keywords
  const domainKeywords: Record<string, string[]> = {
    'software-development': ['code', 'programming', 'algorithm', 'function', 'variable', 'class', 'object', 'framework', 'API'],
    'ai-engineering': ['model', 'data', 'training', 'algorithm', 'machine learning', 'neural network', 'prediction', 'feature'],
    'ux-design': ['user', 'design', 'interface', 'experience', 'testing', 'prototype', 'wireframe', 'research'],
    'default': ['process', 'approach', 'strategy', 'experience', 'skill', 'technique', 'method'],
  };
  
  // Get relevant keywords for the domain
  const keywords = domainKeywords[domain] || domainKeywords['default'];
  
  // Count how many domain keywords are in the answer
  const keywordCount = keywords.filter(keyword => 
    answer.toLowerCase().includes(keyword.toLowerCase())
  ).length;
  
  // Adjust correctness score based on keywords
  correctnessScore += keywordCount * 5;
  
  // Cap the score at 95 (never perfect)
  correctnessScore = Math.min(95, correctnessScore);
  
  // Determine if the answer is considered correct overall
  const isCorrect = correctnessScore > 65;
  
  // Generate verified facts based on the answer
  const verifiedFacts = [];
  if (length > 30) {
    // Extract sentences from the answer that could be verified facts
    const sentences = answer.split(/[.!?]/).filter(s => s.trim().length > 10);
    const factCount = Math.min(sentences.length, 3);
    
    for (let i = 0; i < factCount; i++) {
      verifiedFacts.push(sentences[i].trim());
    }
  }
  
  // Generate potential corrections for incorrect answers
  const corrections = [];
  if (!isCorrect) {
    corrections.push("Consider including specific examples to strengthen your answer.");
    corrections.push("Your answer could benefit from more technical terminology.");
    if (length < 100) {
      corrections.push("Your answer is too brief for an interview setting.");
    }
  }
  
  // Mock relevant sources
  const relevantSources = [
    "Professionals in the field typically reference these concepts in interviews",
    "Industry best practices emphasize these points",
    "Recent studies support these conclusions"
  ];
  
  return {
    isCorrect,
    confidenceScore: correctnessScore,
    verifiedFacts,
    corrections,
    relevantSources
  };
};

/**
 * Analyzes answer length and provides feedback specific to interview contexts
 */
export const analyzeAnswerLength = (answer: string): {
  assessment: 'too_short' | 'too_long' | 'appropriate';
  feedback: string;
} => {
  const length = answer.trim().length;
  
  // Standard interview answer length guidelines
  if (length < 50) {
    return {
      assessment: 'too_short',
      feedback: 'Your answer is too brief for an interview. Aim for 2-3 minutes of speaking time with specific examples.'
    };
  } else if (length > 1000) {
    return {
      assessment: 'too_long',
      feedback: 'Your answer is quite lengthy. In interviews, aim for concise responses (2-3 minutes) to respect the interviewer\'s time.'
    };
  } else {
    return {
      assessment: 'appropriate',
      feedback: 'Your answer length is appropriate for an interview setting.'
    };
  }
}; 