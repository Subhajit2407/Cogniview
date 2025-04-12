import React from 'react';
import { BookOpen, GraduationCap, ExternalLink } from 'lucide-react';

interface TerminalEducatorProps {
  question: string;
  userAnswer: string;
  domain: string;
  level: string;
  scores: {
    overallScore: number;
    confidenceScore?: number;
    technicalScore?: number;
    communicationScore?: number;
    problemSolvingScore?: number;
    codeQualityScore?: number;
    managementScore?: number;
  };
}

/**
 * TerminalEducator component provides detailed educational feedback when 
 * users give incorrect or incomplete answers during the interview
 */
export const TerminalEducator: React.FC<TerminalEducatorProps> = ({
  question,
  userAnswer,
  domain,
  level,
  scores
}) => {
  // Extract the core question without "Question X:" prefix
  const cleanQuestion = question.replace(/^Question \d+: /i, '');
  
  // Get educational content based on domain and level
  const educationalContent = getEducationalContent(cleanQuestion, domain, level);
  
  // Get resources based on domain and level
  const resources = getResources(domain, level);
  
  // Determine if the answer was good, needs improvement, or poor
  const performanceLevel = 
    scores.overallScore >= 80 ? 'good' :
    scores.overallScore >= 60 ? 'needs-improvement' :
    'poor';
  
  return (
    <div className="mt-4 bg-[#0D1117] border border-[#21262D] rounded-lg overflow-hidden shadow-lg">
      <div className="bg-[#161B22] p-3 flex items-center border-b border-[#21262D]">
        <GraduationCap className="text-[#FFE066] mr-2" size={18} />
        <h3 className="text-[#F0F6FC] text-sm font-['JetBrains Mono'] font-medium">Educational Insight</h3>
      </div>
      
      <div className="p-4">
        {performanceLevel === 'poor' && (
          <div className="mb-4 text-[#FF5A5A] text-sm pb-3 border-b border-[#21262D]">
            Your answer has significant gaps. Let's review the key concepts:
          </div>
        )}
        
        {performanceLevel === 'needs-improvement' && (
          <div className="mb-4 text-[#FFE066] text-sm pb-3 border-b border-[#21262D]">
            Your answer covers some points, but could be improved. Here's what to focus on:
          </div>
        )}
        
        {performanceLevel === 'good' && (
          <div className="mb-4 text-[#4CAF50] text-sm pb-3 border-b border-[#21262D]">
            Good answer! Here are some additional points to consider for mastery:
          </div>
        )}
        
        <div className="text-[#F0F6FC] text-sm mb-4 leading-relaxed">
          {educationalContent.explanation}
        </div>
        
        {educationalContent.keyPoints.length > 0 && (
          <div className="mt-3 mb-4">
            <h4 className="text-[#FFE066] text-xs font-['JetBrains Mono'] mb-2">Key Points:</h4>
            <ul className="list-disc pl-5 text-xs text-[#F0F6FC]/80 space-y-1">
              {educationalContent.keyPoints.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </div>
        )}
        
        {resources.length > 0 && (
          <div className="mt-4 pt-3 border-t border-[#21262D]">
            <h4 className="text-[#FFE066] text-xs font-['JetBrains Mono'] mb-2 flex items-center">
              <BookOpen size={12} className="mr-1" />
              Learning Resources:
            </h4>
            <ul className="list-disc pl-5 text-xs text-[#F0F6FC]/80 space-y-1">
              {resources.map((resource, idx) => (
                <li key={idx} className="flex items-start">
                  <ExternalLink size={10} className="mr-1 mt-1 text-[#7D4CDB]" />
                  <span>{resource}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Provides educational content based on the question, domain and difficulty level
 */
function getEducationalContent(question: string, domain: string, level: string): { 
  explanation: string;
  keyPoints: string[];
} {
  // Lookup for common questions
  const educationalContent: Record<string, Record<string, {
    explanation: string;
    keyPoints: string[];
  }>> = {
    "What is an array?": {
      'beginner': {
        explanation: "An array is a basic data structure that stores multiple items of the same type in a single variable. Think of it like a row of boxes, each with its own number (index) starting from 0. Arrays are fundamental in programming and allow us to work with collections of data efficiently.",
        keyPoints: [
          "Elements are stored in contiguous memory locations",
          "Access is done using numeric indices starting from 0",
          "Arrays have a fixed size in many languages (though some offer dynamic arrays)",
          "Good for storing and accessing ordered collections of data"
        ]
      },
      'intermediate': {
        explanation: "Arrays provide O(1) constant-time access to elements when you know the index, making them efficient for lookups. However, operations like insertion or deletion in the middle require shifting elements, resulting in O(n) time complexity. Different programming languages implement arrays with various features - some are fixed-size (like in C), while others are dynamic (like ArrayList in Java or Lists in Python).",
        keyPoints: [
          "Time complexity: O(1) for access, O(n) for insertion/deletion in the middle",
          "Array bounds checking is important to avoid memory access violations",
          "Multi-dimensional arrays represent tables or matrices (array of arrays)",
          "Common operations: traversal, searching, sorting, merging"
        ]
      },
      'expert': {
        explanation: "When designing systems with arrays, consider memory locality and cache performance. Arrays offer spatial locality which improves CPU cache utilization. For performance-critical applications, consider specialized array types like circular buffers for queues, sparse arrays for space efficiency with mostly empty arrays, or memory-mapped arrays for large datasets. Arrays also enable vectorized operations in modern CPUs through SIMD instructions.",
        keyPoints: [
          "Memory alignment impacts performance due to CPU cache line optimization",
          "Specialized variants: circular arrays, sparse arrays, memory-mapped arrays",
          "In-place algorithms can reduce memory overhead for array operations",
          "Advanced use cases: sliding windows, two-pointer techniques, prefix sums"
        ]
      }
    },
    
    "What is debugging?": {
      'beginner': {
        explanation: "Debugging is the process of finding and fixing errors or 'bugs' in your code. When a program doesn't work as expected, debugging helps you identify what's going wrong and where. Basic debugging often starts with simple print statements to see values at different points in your code.",
        keyPoints: [
          "Common techniques include print/console statements and using a debugger",
          "Look for syntax errors, logic errors, and runtime errors",
          "Debugging is a methodical process of isolating the problem",
          "Most development environments include built-in debugging tools"
        ]
      },
      'intermediate': {
        explanation: "Effective debugging requires a systematic approach. First reproduce the issue consistently, then isolate the problem area by tracing execution flow and examining variable states. Modern IDEs provide debugging tools like breakpoints, watches, and call stack analysis. For more complex bugs, logging frameworks can help track execution in production environments.",
        keyPoints: [
          "Use conditional breakpoints for bugs that occur in loops or specific conditions",
          "Watch expressions help monitor variable changes during execution",
          "Stack traces provide the execution path that led to an error",
          "Unit tests can help isolate and verify fixes for specific bugs"
        ]
      },
      'expert': {
        explanation: "Advanced debugging often involves complex environments and intermittent issues. Techniques like remote debugging allow inspecting applications running in production or on different machines. Memory profilers help identify leaks and corruption. Thread analyzers detect race conditions and deadlocks in concurrent code. For hard-to-reproduce bugs, consider time-travel debugging that records execution for later analysis.",
        keyPoints: [
          "Post-mortem debugging uses crash dumps to analyze failures after they occur",
          "Distributed tracing helps debug issues across microservices",
          "Performance profiling identifies bottlenecks and optimization opportunities",
          "Root cause analysis techniques like 5-whys help prevent recurrence"
        ]
      }
    }
  };
  
  // Check if we have content for this specific question and level
  if (educationalContent[question]?.[level]) {
    return educationalContent[question][level];
  }
  
  // Domain-specific generic educational content
  const domainContent: Record<string, Record<string, {
    explanation: string;
    keyPoints: string[];
  }>> = {
    'software-development': {
      'beginner': {
        explanation: "Software development requires understanding fundamental programming concepts and problem-solving techniques. Focus on mastering the basics of data structures, algorithms, and coding patterns in your chosen language.",
        keyPoints: [
          "Practice writing clean, readable code with good variable naming",
          "Break down problems into smaller, manageable parts",
          "Learn to use version control systems like Git",
          "Test your code thoroughly to ensure it works as expected"
        ]
      },
      'intermediate': {
        explanation: "At the intermediate level, software developers should focus on code quality, design patterns, and system architecture. Understanding how components interact and considering performance implications becomes increasingly important.",
        keyPoints: [
          "Apply appropriate design patterns to solve common problems",
          "Consider time and space complexity in your solutions",
          "Write comprehensive unit tests to ensure code reliability",
          "Practice code reviews to improve quality and learn from others"
        ]
      },
      'expert': {
        explanation: "Expert software developers must consider system-wide concerns like scalability, maintainability, and resilience. Deep knowledge of architectural patterns, distributed systems, and performance optimization techniques is expected.",
        keyPoints: [
          "Design for scale, considering factors like load balancing and caching",
          "Implement advanced error handling and failure recovery mechanisms",
          "Optimize for both performance and resource utilization",
          "Consider security implications at all levels of the system"
        ]
      }
    },
    'ai-engineering': {
      'beginner': {
        explanation: "AI engineering combines programming skills with understanding of machine learning concepts. Focus on learning the fundamentals of data processing, model training, and evaluation metrics.",
        keyPoints: [
          "Learn the basics of data cleaning and preprocessing",
          "Understand the differences between supervised and unsupervised learning",
          "Practice implementing simple models like linear regression or decision trees",
          "Focus on model evaluation and understanding performance metrics"
        ]
      },
      'intermediate': {
        explanation: "Intermediate AI engineers should focus on more complex models, feature engineering, and model optimization techniques. Understanding the trade-offs between different approaches becomes important.",
        keyPoints: [
          "Implement more complex models like neural networks and ensemble methods",
          "Apply feature engineering techniques to improve model performance",
          "Consider bias-variance trade-offs and regularization methods",
          "Learn model deployment and monitoring practices"
        ]
      },
      'expert': {
        explanation: "Expert AI engineers need deep understanding of state-of-the-art techniques, distributed training, and production-level ML systems. Focus on research implementation, custom algorithms, and addressing ethical concerns.",
        keyPoints: [
          "Design end-to-end ML pipelines for large-scale applications",
          "Implement custom loss functions and optimization algorithms",
          "Address fairness, interpretability, and robustness in models",
          "Consider computational efficiency and resource constraints"
        ]
      }
    },
    'ux-design': {
      'beginner': {
        explanation: "User Experience design requires understanding both user needs and business goals. At this level, focus on learning the fundamentals of user research methods, usability principles, and basic design tools.",
        keyPoints: [
          "Learn how to conduct user interviews and usability testing",
          "Practice creating wireframes and low-fidelity prototypes",
          "Understand basic principles of information architecture",
          "Develop empathy for different user types and their needs"
        ]
      },
      'intermediate': {
        explanation: "Intermediate UX designers should focus on translating research into effective design solutions, iterative design processes, and measuring success through appropriate metrics. Understanding more complex design patterns and interaction models becomes important.",
        keyPoints: [
          "Create and use personas, journey maps, and user flows effectively",
          "Apply interaction design patterns appropriately to different contexts",
          "Balance quantitative and qualitative data in your design decisions",
          "Develop skills in communicating design decisions to stakeholders"
        ]
      },
      'expert': {
        explanation: "Expert UX designers must consider system-wide considerations like design systems, cross-platform experiences, and organizational UX strategy. Deep understanding of complex user behaviors, accessibility standards, and emerging technologies is expected.",
        keyPoints: [
          "Lead design thinking processes across teams and projects",
          "Develop comprehensive design systems and governance models",
          "Connect UX metrics to business outcomes and ROI",
          "Integrate ethical considerations into all design decisions"
        ]
      }
    }
  };
  
  // Return domain and level specific content or fallback
  return domainContent[domain]?.[level] || {
    explanation: "To excel in interviews, demonstrate both theoretical knowledge and practical experience. Structure your answers with clear definitions, examples, and real-world applications.",
    keyPoints: [
      "Begin with a clear definition of the concept",
      "Provide concrete examples from your experience",
      "Discuss challenges and how to overcome them",
      "Connect your answer to broader industry practices"
    ]
  };
}

/**
 * Provides learning resources based on domain and difficulty level
 */
function getResources(domain: string, level: string): string[] {
  const domainResources: Record<string, Record<string, string[]>> = {
    'software-development': {
      'beginner': [
        "\"Clean Code\" by Robert C. Martin for code quality fundamentals",
        "\"Data Structures and Algorithms in [Your Language]\" tutorials",
        "Official documentation for your primary programming language"
      ],
      'intermediate': [
        "\"Design Patterns: Elements of Reusable Object-Oriented Software\" by Gang of Four",
        "\"Refactoring: Improving the Design of Existing Code\" by Martin Fowler",
        "\"Effective Java/JavaScript/Python\" depending on your language"
      ],
      'expert': [
        "\"System Design Interview\" resources for architectural knowledge",
        "\"Designing Data-Intensive Applications\" by Martin Kleppmann",
        "\"Programming Pearls\" by Jon Bentley for optimization techniques"
      ]
    },
    'ai-engineering': {
      'beginner': [
        "Andrew Ng's Machine Learning course on Coursera",
        "\"Hands-On Machine Learning with Scikit-Learn and TensorFlow\"",
        "Kaggle tutorials and competitions for practical experience"
      ],
      'intermediate': [
        "\"Deep Learning\" by Ian Goodfellow",
        "Fast.ai courses for practical deep learning implementation",
        "MLOps resources on model deployment and monitoring"
      ],
      'expert': [
        "Research papers from conferences like NeurIPS, ICML, and ICLR",
        "\"Reinforcement Learning: An Introduction\" by Sutton and Barto",
        "\"Machine Learning Design Patterns\" for production systems"
      ]
    },
    'graphic-design': {
      'beginner': [
        "\"The Non-Designer's Design Book\" by Robin Williams",
        "Coursera's Graphic Design Specialization by CalArts",
        "Adobe software tutorials for technical skills"
      ],
      'intermediate': [
        "\"Don't Make Me Think\" by Steve Krug for UX principles",
        "\"Grid Systems in Graphic Design\" by Josef Müller-Brockmann",
        "Behance and Dribbble for design inspiration and trends"
      ],
      'expert': [
        "\"Designing Brand Identity\" by Alina Wheeler",
        "DesignBetter.co resources on design systems",
        "Nielsen Norman Group articles on advanced UX research"
      ]
    },
    'ux-design': {
      'beginner': [
        "Nielsen Norman Group's beginner UX articles and videos",
        "\"Don't Make Me Think\" by Steve Krug for usability principles",
        "Figma or Sketch tutorials for wireframing and prototyping basics"
      ],
      'intermediate': [
        "\"About Face: The Essentials of Interaction Design\" by Alan Cooper",
        "UsabilityHub and similar platforms for remote usability testing practice",
        "Google's Material Design and Apple's Human Interface Guidelines for design systems"
      ],
      'expert': [
        "\"Measuring the User Experience\" by Tullis and Albert for UX metrics",
        "Design Leadership resources from InVision and DesignBetter.co",
        "Advanced courses on information architecture and service design"
      ]
    }
  };
  
  return domainResources[domain]?.[level] || [
    "Practice answering interview questions with clear structure and examples",
    "Review industry best practices in your specific field",
    "Prepare concrete examples from your experience to demonstrate skills"
  ];
}

export default TerminalEducator; 