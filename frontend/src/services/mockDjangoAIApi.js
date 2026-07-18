// mockDjangoAIApi.js
// This simulates the Django REST framework endpoints for AI features.
// In the future, this will connect to Django views which in turn use Gemini / OpenRouter APIs.

export const aiApi = {
  // Chat Assistant
  async sendChatMessage(prompt, history = []) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          text: `Here is a simulated AI response to: "${prompt}". \n\nThis would normally stream from the Gemini API via our Django backend. It supports **markdown** and \`inline code\`.\n\n\`\`\`python\ndef hello_world():\n    print("Hello from AI Studio!")\n\`\`\``,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          role: 'ai'
        });
      }, 1500); // Simulate API latency
    });
  },

  // Code Assistant
  async generateCode(prompt, language) {
    return new Promise((resolve) => {
      setTimeout(() => {
        let codeSnippet = '';
        if (language === 'python') {
          codeSnippet = `def example_function():\n    # Generated Python code for: ${prompt}\n    return "Optimized and ready!"`;
        } else if (language === 'javascript') {
          codeSnippet = `const exampleFunction = () => {\n    // Generated JS code for: ${prompt}\n    return "Optimized and ready!";\n};`;
        } else {
          codeSnippet = `// Generated ${language} code for: ${prompt}`;
        }

        resolve({
          code: codeSnippet,
          explanation: `Here is the optimal solution in ${language}. It runs in O(1) time and is fully typed.`,
        });
      }, 2000);
    });
  },

  // Resume Analyzer
  async analyzeResume(file) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          atsScore: 78,
          improvements: [
            "Use more actionable verbs (e.g., 'Spearheaded' instead of 'Did')",
            "Quantify your achievements with exact numbers",
            "Missing keyword: 'React'",
            "Format is clean but lacks a professional summary"
          ],
          keywordsToInclude: ["Python", "Django REST", "Docker", "Agile", "TypeScript"],
          summary: "Your resume shows strong foundational skills but needs more metric-driven bullet points to pass automated ATS filters at top tech companies."
        });
      }, 3000); // Simulate PDF parsing and AI analysis
    });
  },

  // Quiz Generator
  async generateQuiz(topic, difficulty, count) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const questions = Array.from({ length: count }).map((_, i) => ({
          id: i,
          question: `Sample ${difficulty} question about ${topic} (Q${i + 1})`,
          options: ['Option A', 'Option B', 'Option C', 'Option D'],
          correctAnswer: 1, // Index of correct option
          explanation: `Option B is correct because it directly addresses the core concept of ${topic}.`
        }));
        resolve({ questions });
      }, 2500);
    });
  },

  // Notes Summarizer
  async summarizeNotes(textOrFile) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          summary: "This document covers the fundamental principles of the subject, highlighting three main theories and their practical applications in modern industry.",
          keyPoints: [
            "Theory A emphasizes structural integrity.",
            "Theory B introduces dynamic scaling.",
            "Always validate inputs before processing."
          ],
          flashcards: [
            { front: "What is Theory A?", back: "The principle of structural integrity." },
            { front: "What does Theory B introduce?", back: "Dynamic scaling." }
          ]
        });
      }, 2500);
    });
  },

  // Study Planner
  async generateStudyPlan(subject, daysToExam) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const plan = [];
        for (let i = 1; i <= Math.min(daysToExam, 7); i++) {
          plan.push({
            day: i,
            title: `Day ${i}: Focus on Core Concepts`,
            tasks: [
              `Read Chapter ${i} of the ${subject} textbook`,
              "Complete practice problem set",
              "Review flashcards"
            ]
          });
        }
        resolve({
          plan,
          advice: "Stick to this schedule consistently. Make sure to take breaks using the Pomodoro technique."
        });
      }, 2000);
    });
  },

  // Usage Stats (Insights)
  async getUsageStats() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          totalTokens: 45200,
          savedSnippets: 12,
          quizzesTaken: 5,
          resumesAnalyzed: 2,
          recentOutputs: [
            { type: 'code', title: 'Python Django Auth Snippet', date: '2 hours ago' },
            { type: 'resume', title: 'ATS Analysis Result', date: 'Yesterday' },
            { type: 'quiz', title: 'React Hooks MCQ', date: '2 days ago' }
          ]
        });
      }, 500);
    });
  }
};
