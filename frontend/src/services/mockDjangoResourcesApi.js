// mockDjangoResourcesApi.js
// Simulates Django REST Framework endpoints for the Learning Resources Module

const MOCK_DELAY = 600;
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const mockResourcesData = [
  {
    id: 'RES-001',
    title: 'HTML & CSS Crash Course',
    type: 'video',
    category: 'Web Development',
    subject: 'HTML/CSS',
    duration: '1h 30m',
    downloads: 5000,
    rating: 4.8,
    isBookmarked: false,
    thumbnail: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?ixlib=rb-4.0.3&w=400&q=80',
    videoUrl: 'https://www.youtube.com/embed/mU6anWqZJcc',
    relatedCourseId: 'C-001',
    uploadDate: '2026-01-10',
    author: 'Web Dev Mastery'
  },
  {
    id: 'RES-002',
    title: 'JavaScript Full Course for Beginners',
    type: 'video',
    category: 'Web Development',
    subject: 'JavaScript',
    duration: '3h 15m',
    downloads: 4200,
    rating: 4.9,
    isBookmarked: true,
    thumbnail: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-4.0.3&w=400&q=80',
    videoUrl: 'https://www.youtube.com/embed/jS4aFq5-91M',
    relatedCourseId: 'C-002',
    uploadDate: '2026-02-15',
    author: 'Code Master'
  },
  {
    id: 'RES-003',
    title: 'React.js Tutorial - Next Level',
    type: 'video',
    category: 'Web Development',
    subject: 'React',
    duration: '2h 45m',
    downloads: 3800,
    rating: 4.9,
    isBookmarked: true,
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&w=400&q=80',
    videoUrl: 'https://www.youtube.com/embed/bMknfKXIFA8',
    relatedCourseId: 'C-003',
    uploadDate: '2026-03-20',
    author: 'React Channel'
  },
  {
    id: 'RES-004',
    title: 'Node.js & Express Basics',
    type: 'video',
    category: 'Web Development',
    subject: 'Node.js',
    duration: '1h 50m',
    downloads: 2900,
    rating: 4.7,
    isBookmarked: false,
    thumbnail: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-4.0.3&w=400&q=80',
    videoUrl: 'https://www.youtube.com/embed/Oe421EPjeBE',
    relatedCourseId: 'C-004',
    uploadDate: '2026-04-10',
    author: 'Backend Pro'
  },
  {
    id: 'RES-005',
    title: 'Full Stack Web Development Architecture',
    type: 'video',
    category: 'Web Development',
    subject: 'Architecture',
    duration: '1h 10m',
    downloads: 1500,
    rating: 4.6,
    isBookmarked: false,
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&w=400&q=80',
    videoUrl: 'https://www.youtube.com/embed/nu_pCVPKzTk',
    relatedCourseId: 'C-005',
    uploadDate: '2026-05-05',
    author: 'Web Dev Mastery'
  },
  {
    id: 'RES-006',
    title: 'Operating Systems Crash Course',
    type: 'video',
    category: 'Computer Science Core',
    subject: 'Operating Systems',
    duration: '2h 00m',
    downloads: 3100,
    rating: 4.8,
    isBookmarked: false,
    thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&w=400&q=80',
    videoUrl: 'https://www.youtube.com/embed/vBURTt97EkA',
    relatedCourseId: 'C-006',
    uploadDate: '2026-06-15',
    author: 'CS Channel'
  },
  {
    id: 'RES-007',
    title: 'Data Structures & Algorithms Full Course',
    type: 'video',
    category: 'Computer Science Core',
    subject: 'Algorithms',
    duration: '4h 30m',
    downloads: 7200,
    rating: 4.9,
    isBookmarked: true,
    thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?ixlib=rb-4.0.3&w=400&q=80',
    videoUrl: 'https://www.youtube.com/embed/8hly31xKli0',
    relatedCourseId: 'C-007',
    uploadDate: '2026-07-01',
    author: 'Code Master'
  },
  {
    id: 'RES-008',
    title: 'Computer Networks Fundamentals',
    type: 'video',
    category: 'Computer Science Core',
    subject: 'Networking',
    duration: '1h 45m',
    downloads: 2400,
    rating: 4.7,
    isBookmarked: false,
    thumbnail: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&w=400&q=80',
    videoUrl: 'https://www.youtube.com/embed/qiQR5rTSshw',
    relatedCourseId: 'C-008',
    uploadDate: '2026-07-10',
    author: 'Network Pro'
  },
  {
    id: 'RES-009',
    title: 'Database Management Systems (DBMS)',
    type: 'video',
    category: 'Computer Science Core',
    subject: 'Databases',
    duration: '2h 15m',
    downloads: 3800,
    rating: 4.8,
    isBookmarked: true,
    thumbnail: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&w=400&q=80',
    videoUrl: 'https://www.youtube.com/embed/HXV3zeQKqGY',
    relatedCourseId: 'C-009',
    uploadDate: '2026-07-20',
    author: 'CS Channel'
  },
  {
    id: 'RES-010',
    title: 'Computer Architecture and Organization',
    type: 'video',
    category: 'Computer Science Core',
    subject: 'Architecture',
    duration: '3h 10m',
    downloads: 1900,
    rating: 4.6,
    isBookmarked: false,
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&w=400&q=80',
    videoUrl: 'https://www.youtube.com/embed/HEEnLZV2wGI',
    relatedCourseId: 'C-010',
    uploadDate: '2026-08-01',
    author: 'Tech Academy'
  },
  {
    id: 'RES-011',
    title: 'Python for Beginners - Full Course',
    type: 'video',
    category: 'Programming',
    subject: 'Python',
    duration: '4h 15m',
    downloads: 12500,
    rating: 4.9,
    isBookmarked: true,
    thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bfce8?ixlib=rb-4.0.3&w=400&q=80',
    videoUrl: 'https://www.youtube.com/embed/rfscVS0vtbw',
    relatedCourseId: 'C-011',
    uploadDate: '2026-08-10',
    author: 'freeCodeCamp.org'
  },
  {
    id: 'RES-012',
    title: 'Java Tutorial for Beginners',
    type: 'video',
    category: 'Programming',
    subject: 'Java',
    duration: '2h 30m',
    downloads: 8400,
    rating: 4.8,
    isBookmarked: false,
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&w=400&q=80',
    videoUrl: 'https://www.youtube.com/embed/eIrMbAQSU34',
    relatedCourseId: 'C-012',
    uploadDate: '2026-08-12',
    author: 'freeCodeCamp.org'
  },
  {
    id: 'RES-013',
    title: 'C++ Programming Course',
    type: 'video',
    category: 'Programming',
    subject: 'C++',
    duration: '4h 00m',
    downloads: 9100,
    rating: 4.7,
    isBookmarked: false,
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&w=400&q=80',
    videoUrl: 'https://www.youtube.com/embed/vLnPwxZdW4Y',
    relatedCourseId: 'C-013',
    uploadDate: '2026-08-15',
    author: 'freeCodeCamp.org'
  },
  {
    id: 'RES-014',
    title: 'Rust Programming Full Course',
    type: 'video',
    category: 'Programming',
    subject: 'Rust',
    duration: '3h 45m',
    downloads: 6700,
    rating: 4.9,
    isBookmarked: true,
    thumbnail: 'https://images.unsplash.com/photo-1623282033815-40b05d96c903?ixlib=rb-4.0.3&w=400&q=80',
    videoUrl: 'https://www.youtube.com/embed/zF34dRivLOw',
    relatedCourseId: 'C-014',
    uploadDate: '2026-08-18',
    author: 'freeCodeCamp.org'
  },
  {
    id: 'RES-015',
    title: 'Go Programming Tutorial',
    type: 'video',
    category: 'Programming',
    subject: 'Go',
    duration: '2h 20m',
    downloads: 5300,
    rating: 4.8,
    isBookmarked: false,
    thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?ixlib=rb-4.0.3&w=400&q=80',
    videoUrl: 'https://www.youtube.com/embed/YS4e4q9oBaU',
    relatedCourseId: 'C-015',
    uploadDate: '2026-08-20',
    author: 'freeCodeCamp.org'
  },
  {
    id: 'RES-016',
    title: 'Machine Learning for Everybody - Full Course',
    type: 'video',
    category: 'AI & Machine Learning',
    subject: 'Machine Learning',
    duration: '3h 45m',
    downloads: 14500,
    rating: 4.9,
    isBookmarked: true,
    thumbnail: 'https://images.unsplash.com/photo-1527474305487-b87b222841cc?ixlib=rb-4.0.3&w=400&q=80',
    videoUrl: 'https://www.youtube.com/embed/i_LwzRVP7bg',
    relatedCourseId: 'C-016',
    uploadDate: '2026-08-25',
    author: 'freeCodeCamp.org'
  },
  {
    id: 'RES-017',
    title: 'Deep Learning Crash Course for Beginners',
    type: 'video',
    category: 'AI & Machine Learning',
    subject: 'Deep Learning',
    duration: '2h 10m',
    downloads: 9800,
    rating: 4.8,
    isBookmarked: false,
    thumbnail: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-4.0.3&w=400&q=80',
    videoUrl: 'https://www.youtube.com/embed/VyWAvY2CF9c',
    relatedCourseId: 'C-017',
    uploadDate: '2026-08-26',
    author: 'freeCodeCamp.org'
  },
  {
    id: 'RES-018',
    title: 'Neural Networks from Scratch in Python',
    type: 'video',
    category: 'AI & Machine Learning',
    subject: 'Neural Networks',
    duration: '6h 30m',
    downloads: 18200,
    rating: 4.9,
    isBookmarked: true,
    thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?ixlib=rb-4.0.3&w=400&q=80',
    videoUrl: 'https://www.youtube.com/embed/Wo5dMEP_BbI',
    relatedCourseId: 'C-018',
    uploadDate: '2026-08-27',
    author: 'freeCodeCamp.org'
  },
  {
    id: 'RES-019',
    title: 'Natural Language Processing (NLP) Tutorial',
    type: 'video',
    category: 'AI & Machine Learning',
    subject: 'NLP',
    duration: '4h 15m',
    downloads: 7500,
    rating: 4.7,
    isBookmarked: false,
    thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&w=400&q=80',
    videoUrl: 'https://www.youtube.com/embed/xvqsFTUsOmc',
    relatedCourseId: 'C-019',
    uploadDate: '2026-08-28',
    author: 'freeCodeCamp.org'
  },
  {
    id: 'RES-020',
    title: 'Computer Vision with Python',
    type: 'video',
    category: 'AI & Machine Learning',
    subject: 'Computer Vision',
    duration: '5h 00m',
    downloads: 8900,
    rating: 4.8,
    isBookmarked: false,
    thumbnail: 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?ixlib=rb-4.0.3&w=400&q=80',
    videoUrl: 'https://www.youtube.com/embed/oXlwWbU8l2o',
    relatedCourseId: 'C-020',
    uploadDate: '2026-08-29',
    author: 'freeCodeCamp.org'
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

  getResourceById: async (id) => {
    await delay(200);
    const resource = mockResourcesData.find(r => r.id === id);
    if (!resource) throw new Error('Resource not found');
    return resource;
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
