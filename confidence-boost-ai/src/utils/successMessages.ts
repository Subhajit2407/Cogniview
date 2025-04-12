/**
 * Collection of success/encouraging messages for the interview simulator
 */

export const successMessages = [
  "Great answer!",
  "Excellent response!",
  "Well explained!",
  "That's a solid answer!",
  "Very insightful!",
  "You've clearly done your homework!",
  "Strong reasoning!",
  "That shows depth of understanding!",
  "You're demonstrating expertise!",
  "Thoughtful and detailed!",
  "Impressively thorough!",
  "That would impress an interviewer!",
  "Excellent technical knowledge!",
  "You're showing strong communication skills!",
  "Very professional response!"
];

/**
 * Returns a random success message from the collection
 */
export const getRandomSuccessMessage = (): string => {
  const randomIndex = Math.floor(Math.random() * successMessages.length);
  return successMessages[randomIndex];
};

/**
 * Returns a domain-specific success message
 */
export const getDomainSpecificMessage = (domain: string): string => {
  const domainMessages: Record<string, string[]> = {
    'software-development': [
      "Your coding concepts are spot on!",
      "That's how a senior developer would answer!",
      "Great technical explanation!",
      "You understand the engineering tradeoffs well!",
    ],
    'ai-engineering': [
      "Your ML knowledge is impressive!",
      "Great understanding of AI concepts!",
      "You've explained that algorithm clearly!",
      "Strong grasp of model evaluation!",
    ],
    'ux-design': [
      "Your user-centered thinking is excellent!",
      "Great focus on the user experience!",
      "Strong understanding of design principles!",
      "You've addressed usability concerns well!",
    ],
    'graphic-design': [
      "Your design thinking is excellent!",
      "Great sense of visual hierarchy!",
      "Strong understanding of design elements!",
      "You've explained your creative process well!",
    ],
    'team-leadership': [
      "Your leadership approach is impressive!",
      "Great team management philosophy!",
      "Strong understanding of people dynamics!",
      "You've addressed management challenges well!",
    ],
  };
  
  // Get domain-specific messages or fall back to general ones
  const messages = domainMessages[domain] || successMessages;
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
}; 