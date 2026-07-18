// mockDjangoCoursesApi.js
// Simulates Django REST Framework endpoints for the Courses Module

const MOCK_DELAY = 600;

// Helper to simulate network latency
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const mockCoursesData = [
  {
    id: 'C-001',
    title: 'Advanced Data Structures & Algorithms',
    instructor: 'Dr. Sarah Jenkins',
    category: 'Computer Science',
    thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    progress: 75,
    status: 'In Progress',
    totalLectures: 42,
    completedLectures: 31,
    estimatedDuration: '12 weeks',
    description: 'Master complex data structures, algorithmic design paradigms, and computational complexity analysis essential for software engineering interviews.',
    learningObjectives: [
      'Understand and implement Red-Black Trees and B-Trees',
      'Master dynamic programming and memoization techniques',
      'Analyze space and time complexity using Big O notation',
      'Solve advanced graph traversal algorithms'
    ],
    skillsGained: ['Problem Solving', 'Algorithm Design', 'Optimization', 'Python'],
    syllabus: [
      { id: 'm1', title: 'Module 1: Advanced Trees', duration: '2h 15m', completed: true },
      { id: 'm2', title: 'Module 2: Graph Theory', duration: '3h 45m', completed: true },
      { id: 'm3', title: 'Module 3: Dynamic Programming', duration: '4h 20m', completed: false },
      { id: 'm4', title: 'Module 4: NP-Completeness', duration: '2h 30m', completed: false }
    ],
    lessons: [
      { id: 'l1', title: 'Introduction to Red-Black Trees', videoUrl: 'https://www.youtube.com/embed/qvZGUFHWChY', duration: '45:00', type: 'video' },
      { id: 'l2', title: 'Graph Traversal (BFS & DFS)', videoUrl: 'https://www.youtube.com/embed/pcKY4hjDrxk', duration: '52:10', type: 'video' }
    ]
  },
  {
    id: 'C-002',
    title: 'Full Stack Web Development with React & Django',
    instructor: 'Prof. Marcus Chen',
    category: 'Web Development',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    progress: 30,
    status: 'In Progress',
    totalLectures: 65,
    completedLectures: 19,
    estimatedDuration: '16 weeks',
    description: 'Learn to build scalable, secure, and performant web applications using React on the frontend and Django REST Framework on the backend.',
    learningObjectives: [
      'Build responsive UI with React and Tailwind CSS',
      'Create robust RESTful APIs using Django',
      'Implement JWT Authentication',
      'Deploy applications using Docker and AWS'
    ],
    skillsGained: ['React', 'Django', 'REST APIs', 'PostgreSQL'],
    syllabus: [
      { id: 'm1', title: 'React Fundamentals', duration: '5h', completed: true },
      { id: 'm2', title: 'Django Backend Setup', duration: '4h', completed: false },
      { id: 'm3', title: 'API Integration', duration: '6h', completed: false }
    ],
    lessons: [
      { id: 'l1', title: 'React State Management', videoUrl: 'https://www.youtube.com/embed/35lXWvCuM8o', duration: '22:15', type: 'video' }
    ]
  },
  {
    id: 'C-003',
    title: 'Machine Learning Fundamentals',
    instructor: 'Dr. Elena Rostova',
    category: 'AI & Machine Learning',
    thumbnail: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    progress: 100,
    status: 'Completed',
    totalLectures: 28,
    completedLectures: 28,
    estimatedDuration: '8 weeks',
    description: 'A comprehensive introduction to machine learning concepts, algorithms, and practical implementation using Python and Scikit-Learn.',
    learningObjectives: [
      'Understand supervised and unsupervised learning',
      'Implement regression and classification models',
      'Evaluate model performance using cross-validation',
      'Build basic neural networks'
    ],
    skillsGained: ['Python', 'Scikit-Learn', 'Data Analysis', 'Math'],
    syllabus: [
      { id: 'm1', title: 'Linear Regression', duration: '2h', completed: true },
      { id: 'm2', title: 'Classification Models', duration: '3h', completed: true }
    ],
    lessons: [
      { id: 'l1', title: 'Intro to ML', videoUrl: 'https://www.youtube.com/embed/GwIoAwogjWU', duration: '15:00', type: 'video' }
    ]
  },
  {
    id: 'C-004',
    title: 'Cloud Computing Architecture',
    instructor: 'James Wilson',
    category: 'Computer Science Core',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    progress: 0,
    status: 'Not Started',
    totalLectures: 35,
    completedLectures: 0,
    estimatedDuration: '10 weeks',
    description: 'Design and deploy highly available, scalable, and secure cloud architectures on AWS.',
    learningObjectives: [
      'Understand core AWS services (EC2, S3, RDS)',
      'Design fault-tolerant architectures',
      'Implement security best practices',
      'Manage costs and optimize performance'
    ],
    skillsGained: ['AWS', 'System Design', 'DevOps'],
    syllabus: [
      { id: 'm1', title: 'Cloud Fundamentals', duration: '1h', completed: false },
      { id: 'm2', title: 'Compute Services', duration: '4h', completed: false }
    ],
    lessons: []
  }
];

const mockAnalytics = {
  totalEnrolled: 8,
  activeCourses: 3,
  completedCourses: 4,
  pendingCourses: 1,
  learningHours: 142,
  overallProgress: 68,
  weeklyActivity: [
    { day: 'Mon', hours: 2.5 },
    { day: 'Tue', hours: 3.0 },
    { day: 'Wed', hours: 1.5 },
    { day: 'Thu', hours: 4.0 },
    { day: 'Fri', hours: 2.0 },
    { day: 'Sat', hours: 0.5 },
    { day: 'Sun', hours: 5.0 }
  ]
};

const mockLearningPaths = [
  {
    id: 'path-1',
    title: 'Software Engineering Career Path',
    level: 'Intermediate',
    progress: 45,
    milestones: [
      { id: 'ms1', title: 'Programming Fundamentals', status: 'completed' },
      { id: 'ms2', title: 'Data Structures & Algorithms', status: 'in-progress', currentCourse: 'Advanced Data Structures & Algorithms' },
      { id: 'ms3', title: 'System Design', status: 'locked' },
      { id: 'ms4', title: 'Interview Preparation', status: 'locked' }
    ]
  }
];

export const coursesAPI = {
  getCourses: async (page = 1, limit = 10, filters = {}) => {
    await delay(MOCK_DELAY);
    
    let filteredData = [...mockCoursesData];
    
    if (filters.status && filters.status !== 'All Statuses') {
      filteredData = filteredData.filter(c => c.status === filters.status);
    }
    
    if (filters.category && filters.category !== 'All Categories') {
      filteredData = filteredData.filter(c => c.category === filters.category);
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredData = filteredData.filter(c => 
        c.title.toLowerCase().includes(searchLower) || 
        c.instructor.toLowerCase().includes(searchLower)
      );
    }

    // Pagination slice
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

  getCourseDetails: async (courseId) => {
    await delay(MOCK_DELAY);
    const course = mockCoursesData.find(c => c.id === courseId);
    if (!course) throw new Error('Course not found');
    return course;
  },

  getAnalytics: async () => {
    await delay(MOCK_DELAY);
    return mockAnalytics;
  },

  getLearningPaths: async () => {
    await delay(MOCK_DELAY);
    return mockLearningPaths;
  },

  updateProgress: async (courseId, lessonId, progress) => {
    await delay(300); // Quick response for progress updates
    return { success: true, courseId, lessonId, progress };
  }
};
