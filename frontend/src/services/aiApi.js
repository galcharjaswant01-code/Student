import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api/v1` : 'http://localhost:8000/api/v1';


// We'll store the active conversation ID here in memory for now.
// A better approach would be to manage it in React state, but this works as a drop-in replacement.
let currentConversationId = null;

const getAuthHeaders = () => {
  const token = localStorage.getItem('access_token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const aiApi = {
  // Chat Assistant
  async sendChatMessage(prompt, history = []) {
    try {
      if (!currentConversationId) {
        // Create a new conversation first
        const createRes = await axios.post(`${API_URL}/ai-studio/conversations/`, { title: 'New Chat' }, getAuthHeaders());
        currentConversationId = createRes.data.id;
      }
      
      const response = await axios.post(
        `${API_URL}/ai-studio/conversations/${currentConversationId}/chat/`,
        { message: prompt },
        getAuthHeaders()
      );
      
      return {
        text: response.data.response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        role: 'ai',
      };
    } catch (error) {
      console.error('AI Chat Error:', error);
      return {
        text: "Sorry, I couldn't process your request at this time. Please try again.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        role: 'ai',
      };
    }
  },

  // Code Assistant
  async generateCode(prompt, language) {
    try {
      const response = await axios.post(
        `${API_URL}/ai-studio/code/`,
        { prompt, language },
        getAuthHeaders()
      );
      return {
        code: response.data.code || '',
        explanation: response.data.explanation || response.data.error || 'No explanation provided.',
      };
    } catch (error) {
      console.error('Code Gen Error:', error);
      return {
        code: '',
        explanation: 'Failed to generate code.',
      };
    }
  },

  // Resume Analyzer
  async analyzeResume(file) {
    try {
      const formData = new FormData();
      formData.append('resume', file);
      
      const response = await axios.post(
        `${API_URL}/ai-studio/resume/`,
        formData,
        {
          headers: {
            ...getAuthHeaders().headers,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data.analysis_result || response.data;
    } catch (error) {
      console.error('Resume Analysis Error:', error);
      throw error;
    }
  },

  // Quiz Generator
  async generateQuiz(topic, difficulty, count) {
    try {
      const response = await axios.post(
        `${API_URL}/ai-studio/quiz/`,
        { topic, difficulty, count },
        getAuthHeaders()
      );
      return { questions: response.data.questions || [] };
    } catch (error) {
      console.error('Quiz Gen Error:', error);
      return { questions: [] };
    }
  },

  // Notes Summarizer
  async summarizeNotes(textOrFile) {
    try {
      const response = await axios.post(
        `${API_URL}/ai-studio/summarize/`,
        { text: textOrFile },
        getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      console.error('Notes Summarizer Error:', error);
      throw error;
    }
  },

  // Study Planner
  async generateStudyPlan(subject, daysToExam) {
    try {
      const response = await axios.post(
        `${API_URL}/ai-studio/study-planner/`,
        { subject, days: daysToExam },
        getAuthHeaders()
      );
      return {
        plan: response.data.plan || [],
        advice: response.data.advice || "Here is your plan.",
      };
    } catch (error) {
      console.error('Study Plan Error:', error);
      throw error;
    }
  },

  // Usage Stats (Insights)
  async getUsageStats() {
    try {
      const response = await axios.get(`${API_URL}/ai-studio/stats/`, getAuthHeaders());
      return response.data;
    } catch (error) {
      console.error('Usage Stats Error:', error);
      return {
        totalTokens: 0,
        savedSnippets: 0,
        quizzesTaken: 0,
        resumesAnalyzed: 0,
        recentOutputs: []
      };
    }
  },

  // Smart Search
  async smartSearch(query) {
    try {
      const response = await axios.get(`${API_URL}/ai-studio/search/?q=${encodeURIComponent(query)}`, getAuthHeaders());
      return response.data;
    } catch (error) {
      console.error('Smart Search Error:', error);
      throw error;
    }
  }
};
