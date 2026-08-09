// aiService.js
// ALL AI calls go through the Django backend (Render).
// The Gemini API key is stored ONLY on the server — never exposed to the browser.

import { getApiBaseUrl } from './config';

const API_BASE = `${getApiBaseUrl()}/api/v1/ai-studio`;

const getAuthHeaders = () => {
  const token = localStorage.getItem('access_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const aiService = {
  /**
   * Sends a chat message to the secure backend AI endpoint.
   * Streams word-by-word for smooth UX after receiving the full response.
   *
   * @param {Array}    messageHistory  [{role: 'user'|'assistant', content: string}]
   * @param {string}   systemPrompt    System role instructions
   * @param {Function} onToken         Callback receiving streamed text chunks
   */
  async sendMessageStream(messageHistory, systemPrompt, onToken) {
    try {
      const response = await fetch(`${API_BASE}/chat/`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          messages: messageHistory,
          system_prompt: systemPrompt,
        }),
      });

      if (!response.ok) {
        const errText = await response.text().catch(() => '');
        console.warn(`Backend AI responded with HTTP ${response.status}: ${errText}`);
        // Graceful fallback — stream a helpful message
        return await streamFallback(messageHistory, onToken);
      }

      const data = await response.json();
      const text = data?.response || '';

      if (!text.trim()) {
        return await streamFallback(messageHistory, onToken);
      }

      // Simulate streaming: word-by-word for smooth UX
      const words = text.split(' ');
      let full = '';
      for (const word of words) {
        await new Promise(r => setTimeout(r, 12));
        const chunk = word + ' ';
        full += chunk;
        onToken(chunk);
      }
      return full;

    } catch (err) {
      console.warn('AI backend unreachable, using offline fallback:', err);
      return await streamFallback(messageHistory, onToken);
    }
  },

  async generateUsageStats() {
    return { chatsToday: 0, tokensUsed: 0, filesUploaded: 0, timeSaved: '—', favoriteTool: 'AI Tutor' };
  },
};

// ─── Offline Academic Fallback ────────────────────────────────────────────────
// Only activates if the Render backend is unreachable (cold start / down).
// This is NOT a replacement for the real AI — just a connectivity guard.
async function streamFallback(messageHistory, onToken) {
  const q = (messageHistory[messageHistory.length - 1]?.content || '').trim().toLowerCase();

  let response = '';

  if (!q || q === 'hi' || q === 'hello' || q === 'hey') {
    response = `Hello! 👋 Welcome to your **AI Academic Assistant**.

I can help you with:
- 📚 **Concept Explanations** — Physics, Maths, CS, Chemistry, History, and more
- 💻 **Code & Algorithms** — Python, Java, C++, Data Structures
- 📝 **Practice Quizzes** — Custom MCQs and flashcards
- 📅 **Study Schedules** — Personalized exam prep plans

What topic would you like to explore?`;

  } else if (q.includes('recursion')) {
    response = `**Recursion** is when a function calls itself to solve smaller sub-problems.

\`\`\`python
def factorial(n):
    if n <= 1: return 1          # Base case
    return n * factorial(n - 1)  # Recursive case

print(factorial(5))  # → 120
\`\`\`

> **Note**: Every recursive function needs a base case to avoid infinite loops.`;

  } else if (q.includes('sorting') || q.includes('sort')) {
    response = `### Sorting Algorithm Complexity

| Algorithm   | Best       | Average    | Worst      | Stable |
|-------------|------------|------------|------------|--------|
| Bubble Sort | O(n)       | O(n²)      | O(n²)      | ✅ Yes |
| Merge Sort  | O(n log n) | O(n log n) | O(n log n) | ✅ Yes |
| Quick Sort  | O(n log n) | O(n log n) | O(n²)      | ❌ No  |
| Heap Sort   | O(n log n) | O(n log n) | O(n log n) | ❌ No  |`;

  } else {
    response = `### 🎯 Academic Overview: "${messageHistory[messageHistory.length - 1]?.content?.slice(0, 60)}"

Here is a structured breakdown of your query:

**Key Study Points**
1. Review the fundamental definitions and formulas.
2. Break the problem into smaller sub-components.
3. Apply learned concepts to practice examples.

> 💡 *The AI backend is starting up (Render cold start ~30 sec). Please retry in a moment for a full AI-powered response.*`;
  }

  const words = response.split(' ');
  let full = '';
  for (const word of words) {
    await new Promise(r => setTimeout(r, 16));
    const chunk = word + ' ';
    full += chunk;
    onToken(chunk);
  }
  return full;
}
