// mockDjangoResourcesApi.js
// Simulates Django REST Framework endpoints for the Learning Resources Module

const MOCK_DELAY = 600;
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const mockResourcesData = [
  {
    id: 'RES-001',
    title: 'Advanced Data Structures Cheatsheet',
    type: 'pdf',
    category: 'Computer Science Core',
    subject: 'Data Structures',
    size: '1.2 MB',
    downloads: 1420,
    rating: 4.8,
    isBookmarked: true,
    thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?ixlib=rb-4.0.3&w=400&q=80',
    relatedCourseId: 'C-001',
    uploadDate: '2026-05-10',
    author: 'Dr. Sarah Jenkins'
  },
  {
    id: 'RES-002',
    title: 'React Fundamentals Notes',
    type: 'notes',
    category: 'Web Development',
    subject: 'React',
    size: '450 KB',
    downloads: 890,
    rating: 4.5,
    isBookmarked: false,
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&w=400&q=80',
    relatedCourseId: 'C-002',
    uploadDate: '2026-05-15',
    author: 'Prof. Marcus Chen'
  },
  {
    id: 'RES-003',
    title: 'Dynamic Programming Masterclass',
    type: 'video',
    category: 'Programming',
    subject: 'Algorithms',
    duration: '1h 45m',
    downloads: 3200,
    rating: 4.9,
    isBookmarked: true,
    thumbnail: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&w=400&q=80',
    videoUrl: 'https://www.youtube.com/embed/oBt53YbR9Kk',
    relatedCourseId: 'C-001',
    uploadDate: '2026-04-20',
    author: 'Tech Academy'
  },
  {
    id: 'RES-004',
    title: 'Django REST Framework Boilerplate',
    type: 'code',
    category: 'Web Development',
    subject: 'Django',
    size: '15 MB',
    downloads: 650,
    rating: 4.7,
    isBookmarked: false,
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&w=400&q=80',
    githubUrl: 'https://github.com/example/django-boilerplate',
    relatedCourseId: 'C-002',
    uploadDate: '2026-05-25',
    author: 'Prof. Marcus Chen'
  },
  {
    id: 'RES-005',
    title: 'Machine Learning Mathematics Guide',
    type: 'ebook',
    category: 'AI & Machine Learning',
    subject: 'Mathematics',
    size: '8.4 MB',
    downloads: 2100,
    rating: 4.9,
    isBookmarked: false,
    thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?ixlib=rb-4.0.3&w=400&q=80',
    relatedCourseId: 'C-003',
    uploadDate: '2026-03-12',
    author: 'Dr. Elena Rostova'
  }
];

const mockAnalytics = {
  totalResources: 1542,
  downloadedResources: 342,
  savedResources: 45,
  recentlyViewed: 12,
  categoryBreakdown: [
    { name: 'Web Dev', value: 35 },
    { name: 'Core CS', value: 25 },
    { name: 'AI/ML', value: 20 },
    { name: 'Programming', value: 20 }
  ]
};

const mockCSLearningPaths = [
  {
    id: 'PATH-WEB-001',
    title: 'Full Stack Web Development',
    category: 'Web Development',
    progress: 45,
    modules: [
      { id: 'M1', title: 'HTML & CSS Fundamentals', status: 'completed' },
      { id: 'M2', title: 'JavaScript Essentials', status: 'completed' },
      { id: 'M3', title: 'React Frontend Framework', status: 'in-progress' },
      { id: 'M4', title: 'Node.js & Express Backend', status: 'locked' },
    ]
  },
  {
    id: 'PATH-CORE-001',
    title: 'Computer Science Core Fundamentals',
    category: 'Core Subjects',
    progress: 10,
    modules: [
      { id: 'M1', title: 'Data Structures', status: 'in-progress' },
      { id: 'M2', title: 'Algorithms & Complexity', status: 'locked' },
      { id: 'M3', title: 'Operating Systems', status: 'locked' },
      { id: 'M4', title: 'Database Management Systems', status: 'locked' },
    ]
  }
];

const mockAIRecommendations = [
  {
    id: 'REC-001',
    title: 'Review System Design Concepts',
    reason: 'You spent 3 hours on Operating Systems yesterday. Exploring System Design will strengthen your understanding of distributed architectures.',
    resourceId: 'RES-005',
    actionText: 'Read E-book'
  },
  {
    id: 'REC-002',
    title: 'Practice Dynamic Programming',
    reason: 'Your algorithm assessments show a slight weakness in DP optimization problems.',
    resourceId: 'RES-003',
    actionText: 'Watch Video'
  }
];

export const resourcesAPI = {
  getResources: async (page = 1, limit = 10, filters = {}) => {
    await delay(MOCK_DELAY);
    
    let filteredData = [...mockResourcesData];
    
    if (filters.category && filters.category !== 'All') {
      filteredData = filteredData.filter(r => r.category === filters.category);
    }
    
    if (filters.type && filters.type !== 'All Types') {
      filteredData = filteredData.filter(r => r.type === filters.type);
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredData = filteredData.filter(r => 
        r.title.toLowerCase().includes(searchLower) || 
        r.subject.toLowerCase().includes(searchLower)
      );
    }

    const start = (page - 1) * limit;
    const end = start + limit;
    const results = filteredData.slice(start, end);

    return {
      count: filteredData.length,
      next: end < filteredData.length ? `?page=${page + 1}` : null,
      previous: page > 1 ? `?page=${page - 1}` : null,
      results: results
    };
  },

  getAnalytics: async () => {
    await delay(MOCK_DELAY);
    return mockAnalytics;
  },

  toggleBookmark: async (resourceId) => {
    await delay(300);
    const resource = mockResourcesData.find(r => r.id === resourceId);
    if (resource) {
      resource.isBookmarked = !resource.isBookmarked;
      return { success: true, isBookmarked: resource.isBookmarked };
    }
    throw new Error('Resource not found');
  },

  downloadResource: async (resourceId) => {
    await delay(800);
    // Simulate updating backend tracking
    const resource = mockResourcesData.find(r => r.id === resourceId);
    if (resource) {
      resource.downloads += 1;
    }
    return { success: true, url: `/api/downloads/${resourceId}` };
  },

  getCSLearningPaths: async () => {
    await delay(MOCK_DELAY);
    return mockCSLearningPaths;
  },

  getAIRecommendations: async () => {
    await delay(MOCK_DELAY);
    return mockAIRecommendations;
  },

  trackReadingProgress: async (resourceId, page, totalPages) => {
    await delay(300);
    const progress = Math.round((page / totalPages) * 100);
    return { success: true, resourceId, progress };
  },

  trackVideoProgress: async (resourceId, currentTime) => {
    // Fire and forget tracking endpoint
    return { success: true, resourceId, currentTime };
  }
};
