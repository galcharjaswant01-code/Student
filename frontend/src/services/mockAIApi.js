// mockAIApi.js
// Simulates an AI backend service for the AI Studio.

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const MOCK_RESPONSES = [
  "That's a great question! Based on the concepts we've covered, the core idea is to break the problem down into smaller, manageable pieces.",
  "Here is a brief summary of the topic:\n\n1. **First Point**: This is crucial for understanding the foundation.\n2. **Second Point**: Building on the first, we apply the theorem.\n\nDoes that make sense?",
  "Let's look at a code example to clarify this:\n\n```javascript\nfunction calculateGrade(score) {\n  if (score >= 90) return 'A';\n  if (score >= 80) return 'B';\n  return 'C';\n}\n```\n\nNotice how the conditions are evaluated sequentially.",
  "I can certainly help you generate a study plan. Could you tell me how many hours a week you have available?",
  "Based on your recent quiz scores, I recommend reviewing the chapter on Data Structures again. Specifically, focus on Hash Maps and Trees."
];

export const mockAIApi = {
  /**
   * Simulates sending a message to the AI and getting a response.
   * @param {string} message The user's message
   * @param {string} toolId The ID of the specific AI tool being used (e.g., 'tutor', 'essay')
   * @param {Function} onToken Callback function to simulate streaming text
   */
  async sendMessageStream(message, toolId, onToken) {
    await delay(600); // Initial network latency

    let fullResponse = "";
    
    // Pick a response based on the message content or just random
    if (message.toLowerCase().includes('code') || message.toLowerCase().includes('javascript')) {
      fullResponse = MOCK_RESPONSES[2];
    } else if (message.toLowerCase().includes('plan')) {
      fullResponse = MOCK_RESPONSES[3];
    } else if (message.toLowerCase().includes('summary') || message.toLowerCase().includes('summarize')) {
      fullResponse = MOCK_RESPONSES[1];
    } else {
      fullResponse = MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)];
    }

    // Simulate streaming
    const chunkSize = 3;
    let i = 0;
    while (i < fullResponse.length) {
      const chunk = fullResponse.substring(i, i + chunkSize);
      onToken(chunk);
      i += chunkSize;
      await delay(Math.random() * 30 + 10); // Random delay between 10-40ms per chunk
    }

    return fullResponse;
  },

  async generateUsageStats() {
    await delay(300);
    return {
      chatsToday: 12,
      tokensUsed: 4520,
      filesUploaded: 3,
      timeSaved: '2.5 hrs',
      favoriteTool: 'AI Tutor'
    };
  }
};
