// aiService.js
// Connects to the Groq API directly

export const aiService = {
  /**
   * Sends a message to the Groq API and streams the response.
   * @param {Array} messageHistory The full chat history array [{role: 'user'|'assistant', content: string}]
   * @param {string} systemPrompt The system prompt defining the tool's behavior
   * @param {Function} onToken Callback function to stream text back
   */
  async sendMessageStream(messageHistory, systemPrompt, onToken) {
    // Uses the API key configured in Vercel Environment Variables
    const apiKey = import.meta.env.VITE_GROQ_API_KEY;
    
    if (!apiKey) {
      throw new Error("VITE_GROQ_API_KEY is not defined in the environment variables.");
    }

    try {
      const messages = [
        { role: 'system', content: systemPrompt },
        ...messageHistory.map(msg => ({
          role: msg.role,
          content: msg.content
        }))
      ];

      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant", // Fast, standard model
          messages: messages,
          temperature: 0.7,
          stream: true
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Groq API Error: ${response.status} - ${errorText}`);
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
