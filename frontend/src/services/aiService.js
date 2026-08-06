// aiService.js
// Connects to our secure Vercel Serverless Function backend.

export const aiService = {
  /**
   * Sends a message to our secure backend and streams the response.
   * @param {Array} messageHistory The full chat history array [{role: 'user'|'assistant', content: string}]
   * @param {string} systemPrompt The system prompt defining the tool's behavior
   * @param {Function} onToken Callback function to stream text back
   */
  async sendMessageStream(messageHistory, systemPrompt, onToken) {
    try {
      const messages = [
        { role: 'system', content: systemPrompt },
        ...messageHistory.map(msg => ({
          role: msg.role,
          content: msg.content
        }))
      ];

      // We now call our own secure backend instead of the Groq API directly!
      // This means the API key is completely removed from the frontend code.
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ messages })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Backend Error: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let fullResponse = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ') && line !== 'data: [DONE]') {
            try {
              const data = JSON.parse(line.slice(6));
              const token = data.choices[0]?.delta?.content || "";
              if (token) {
                fullResponse += token;
                onToken(token);
              }
            } catch (e) {
              console.warn("Error parsing stream chunk", e, line);
            }
          }
        }
      }

      return fullResponse;
    } catch (error) {
      console.error("AI Service Error:", error);
      throw error;
    }
  },

  async generateUsageStats() {
    return {
      chatsToday: 15,
      tokensUsed: 12450,
      filesUploaded: 5,
      timeSaved: '3.2 hrs',
      favoriteTool: 'AI Tutor'
    };
  }
};
