/**
 * Courses API Service
 * 
 * Mock service layer to interact with Django backend in the future.
 */

const BASE_URL = '/api/v1/courses';

export const coursesApi = {
  
  async getSummary() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          enrolled: 6,
          completed: 12,
          hoursLearned: 145.5,
          averageGrade: 'A-'
        });
      }, 500);
    });
  },

  async getCourses(filters = {}) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            title: 'Advanced Data Structures in Python',
            instructor: 'Dr. Emily Carter',
            instructorAvatar: 'https://ui-avatars.com/api/?name=Emily+Carter&background=2563EB&color=fff',
            category: 'Computer Science',
            progress: 75,
            totalLectures: 42,
            completedLectures: 31,
            nextTopic: 'Graph Algorithms & Traversal',
            status: 'In Progress',
            thumbnailColor: 'from-blue-500 to-cyan-400'
          },
          {
            id: 2,
            title: 'Quantum Mechanics Fundamentals',
            instructor: 'Prof. James Wilson',
            instructorAvatar: 'https://ui-avatars.com/api/?name=James+Wilson&background=8B5CF6&color=fff',
            category: 'Physics',
            progress: 30,
            totalLectures: 28,
            completedLectures: 8,
            nextTopic: 'Schrödinger Equation',
            status: 'In Progress',
            thumbnailColor: 'from-purple-500 to-pink-500'
          },
          {
            id: 3,
            title: 'Modern UI/UX Design Principles',
            instructor: 'Sarah Johnson',
            instructorAvatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=F59E0B&color=fff',
            category: 'Design',
            progress: 100,
            totalLectures: 15,
            completedLectures: 15,
            nextTopic: null,
            status: 'Completed',
            thumbnailColor: 'from-orange-400 to-rose-400'
          },
          {
            id: 4,
            title: 'Linear Algebra & Matrices',
            instructor: 'Dr. David Lee',
            instructorAvatar: 'https://ui-avatars.com/api/?name=David+Lee&background=10B981&color=fff',
            category: 'Mathematics',
            progress: 10,
            totalLectures: 30,
            completedLectures: 3,
            nextTopic: 'Eigenvalues and Eigenvectors',
            status: 'In Progress',
            thumbnailColor: 'from-emerald-400 to-teal-500'
          },
          {
            id: 5,
            title: 'Introduction to Cloud Computing',
            instructor: 'Michael Brown',
            instructorAvatar: 'https://ui-avatars.com/api/?name=Michael+Brown&background=3B82F6&color=fff',
            category: 'Computer Science',
            progress: 0,
            totalLectures: 24,
            completedLectures: 0,
            nextTopic: 'AWS vs Azure Overview',
            status: 'Not Started',
            thumbnailColor: 'from-gray-700 to-gray-900'
          },
          {
            id: 6,
            title: 'Organic Chemistry II',
            instructor: 'Dr. Rebecca Smith',
            instructorAvatar: 'https://ui-avatars.com/api/?name=Rebecca+Smith&background=EF4444&color=fff',
            category: 'Chemistry',
            progress: 55,
            totalLectures: 35,
            completedLectures: 19,
            nextTopic: 'Aromatic Compounds',
            status: 'In Progress',
            thumbnailColor: 'from-red-500 to-orange-500'
          }
        ]);
      }, 600);
    });
  }

};

export default coursesApi;
