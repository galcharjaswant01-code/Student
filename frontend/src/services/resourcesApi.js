/**
 * Resources API Service
 * 
 * Mock service layer to interact with Django backend for Learning Resources.
 */

export const resourcesApi = {
  
  async getStats() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          totalDocuments: 124,
          videoHours: 48,
          aiSuggestions: 12,
          practiceScores: '85%'
        });
      }, 300);
    });
  },

  async getVideos() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, title: 'Understanding Neural Networks', duration: '14:20', subject: 'Computer Science', thumbnailColor: 'from-blue-500 to-cyan-400' },
          { id: 2, title: 'Calculus: Derivatives', duration: '22:15', subject: 'Mathematics', thumbnailColor: 'from-purple-500 to-indigo-500' },
          { id: 3, title: 'Modern History Overview', duration: '18:40', subject: 'History', thumbnailColor: 'from-orange-400 to-red-400' },
        ]);
      }, 400);
    });
  },

  async getDocuments() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, title: 'Chapter 4: Thermodynamics.pdf', type: 'PDF', size: '2.4 MB', date: 'Today' },
          { id: 2, title: 'Essay Guidelines 2026.docx', type: 'DOCX', size: '1.1 MB', date: 'Yesterday' },
          { id: 3, title: 'Dataset_Analysis.csv', type: 'CSV', size: '4.8 MB', date: 'May 20' },
          { id: 4, title: 'React Cheatsheet.pdf', type: 'PDF', size: '850 KB', date: 'May 18' },
        ]);
      }, 400);
    });
  },

  async getRecommendations() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, text: 'Review Chapter 4 before your upcoming Physics quiz.', priority: 'high' },
          { id: 2, text: 'You struggled with Graph Traversal. Try this interactive coding practice.', priority: 'medium' },
        ]);
      }, 500);
    });
  }

};

export default resourcesApi;
