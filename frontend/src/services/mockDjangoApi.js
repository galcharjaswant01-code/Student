// Simulated Django REST Framework API Service
// This service mimics the exact structure and behavior expected from a Django backend.

const mockAssignmentsDB = [
  {
    id: 'A-101',
    title: 'Advanced Quantum Mechanics Final Report',
    subject: 'Physics',
    description: 'Detailed analysis of wave-function collapse in multi-particle systems. Include mathematical proofs and diagrams.',
    instructions: '1. Format as PDF.\n2. Minimum 10 pages.\n3. Include references in APA format.',
    dueDate: '2025-06-05T23:59:00Z',
    status: 'In Progress', // Not Started, In Progress, Submitted, Under Review, Graded, Overdue
    priority: 'High',
    marks: null,
    maxMarks: 100,
    teacher: {
      name: 'Dr. James Wilson',
      email: 'j.wilson@university.edu',
      avatar: 'https://ui-avatars.com/api/?name=James+Wilson&background=0D8ABC&color=fff'
    },
    attachedResources: [
      { name: 'Quantum_Mechanics_Guidelines.pdf', type: 'PDF', size: '2.4 MB' },
      { name: 'Dataset_Beta.csv', type: 'CSV', size: '1.1 MB' }
    ],
    submission: null,
    feedback: null
  },
  {
    id: 'A-102',
    title: 'Data Structures Implementation',
    subject: 'Computer Science',
    description: 'Implement a balanced AVL tree and a Red-Black tree in Python. Compare their insertion and deletion performance.',
    instructions: 'Submit a ZIP file containing your Python scripts and a brief PDF report.',
    dueDate: '2025-05-28T23:59:00Z',
    status: 'Graded',
    priority: 'Medium',
    marks: 92,
    maxMarks: 100,
    teacher: {
      name: 'Prof. Michael Brown',
      email: 'm.brown@university.edu',
      avatar: 'https://ui-avatars.com/api/?name=Michael+Brown&background=10B981&color=fff'
    },
    attachedResources: [
      { name: 'starter_code.zip', type: 'ZIP', size: '50 KB' }
    ],
    submission: {
      submittedAt: '2025-05-26T14:30:00Z',
      files: [{ name: 'avl_rb_trees.zip', type: 'ZIP', size: '120 KB' }]
    },
    feedback: {
      gradedAt: '2025-05-29T10:15:00Z',
      comments: 'Excellent implementation! Your performance comparison was very thorough.',
      improvementSuggestions: 'Consider adding edge case tests for extremely unbalanced initial inputs.',
      reviewedFiles: [{ name: 'annotated_report.pdf', type: 'PDF', size: '1.5 MB' }]
    }
  },
  {
    id: 'A-103',
    title: 'Literary Analysis: The Great Gatsby',
    subject: 'English',
    description: 'Analyze the theme of the American Dream as portrayed by F. Scott Fitzgerald.',
    instructions: 'Write a 1500-word essay. Submit as DOCX.',
    dueDate: '2025-06-12T23:59:00Z',
    status: 'Not Started',
    priority: 'Medium',
    marks: null,
    maxMarks: 50,
    teacher: {
      name: 'Ms. Sarah Johnson',
      email: 's.johnson@university.edu',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=F59E0B&color=fff'
    },
    attachedResources: [],
    submission: null,
    feedback: null
  },
  {
    id: 'A-104',
    title: 'Calculus III Midterm Assignment',
    subject: 'Mathematics',
    description: 'Solve the provided problems on multiple integrals and vector fields.',
    instructions: 'Show all your work. Scan your handwritten notes into a single PDF.',
    dueDate: '2025-05-25T23:59:00Z',
    status: 'Overdue',
    priority: 'Critical',
    marks: null,
    maxMarks: 100,
    teacher: {
      name: 'Dr. Emily Carter',
      email: 'e.carter@university.edu',
      avatar: 'https://ui-avatars.com/api/?name=Emily+Carter&background=EF4444&color=fff'
    },
    attachedResources: [
      { name: 'Calculus_Problems.pdf', type: 'PDF', size: '500 KB' }
    ],
    submission: null,
    feedback: null
  },
  {
    id: 'A-105',
    title: 'Organic Chemistry Lab Report',
    subject: 'Chemistry',
    description: 'Synthesis of Aspirin laboratory report including yield calculations and IR spectra analysis.',
    instructions: 'Submit report as DOCX and raw data as Excel.',
    dueDate: '2025-06-02T17:00:00Z',
    status: 'Submitted',
    priority: 'High',
    marks: null,
    maxMarks: 80,
    teacher: {
      name: 'Dr. David Lee',
      email: 'd.lee@university.edu',
      avatar: 'https://ui-avatars.com/api/?name=David+Lee&background=8B5CF6&color=fff'
    },
    attachedResources: [],
    submission: {
      submittedAt: '2025-05-30T09:45:00Z',
      files: [
        { name: 'Lab_Report_Aspirin.docx', type: 'DOCX', size: '1.2 MB' },
        { name: 'Yield_Data.xlsx', type: 'XLSX', size: '45 KB' }
      ]
    },
    feedback: null
  }
];

// Simulated delay function
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const assignmentAPI = {
  // Get paginated list of assignments
  getAssignments: async (page = 1, pageSize = 10, filters = {}) => {
    await delay(600); // Simulate network latency

    let filteredData = [...mockAssignmentsDB];
    
    if (filters.status && filters.status !== 'All') {
      filteredData = filteredData.filter(a => a.status === filters.status);
    }
    
    if (filters.subject && filters.subject !== 'All') {
      filteredData = filteredData.filter(a => a.subject === filters.subject);
    }
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredData = filteredData.filter(a => 
        a.title.toLowerCase().includes(searchLower) || 
        a.subject.toLowerCase().includes(searchLower)
      );
    }

    // Sort by due date (default behavior)
    filteredData.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

    const totalCount = filteredData.length;
    const startIndex = (page - 1) * pageSize;
    const paginatedData = filteredData.slice(startIndex, startIndex + pageSize);

    // Django-style paginated response
    return {
      count: totalCount,
      next: totalCount > startIndex + pageSize ? `http://api.example.com/assignments/?page=${page + 1}` : null,
      previous: page > 1 ? `http://api.example.com/assignments/?page=${page - 1}` : null,
      results: paginatedData
    };
  },

  // Get single assignment details
  getAssignmentDetails: async (assignmentId) => {
    await delay(400);
    const assignment = mockAssignmentsDB.find(a => a.id === assignmentId);
    if (!assignment) throw new Error('Assignment not found (404)');
    return assignment;
  },

  // Submit an assignment (Handles file upload simulation)
  submitAssignment: async (assignmentId, formData) => {
    await delay(1500); // Simulate file upload time
    
    const assignmentIndex = mockAssignmentsDB.findIndex(a => a.id === assignmentId);
    if (assignmentIndex === -1) throw new Error('Assignment not found');

    // Simulate extracting files from formData
    const files = formData.getAll('files').map(file => ({
      name: file.name,
      type: file.name.split('.').pop().toUpperCase(),
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`
    }));

    mockAssignmentsDB[assignmentIndex] = {
      ...mockAssignmentsDB[assignmentIndex],
      status: 'Submitted',
      submission: {
        submittedAt: new Date().toISOString(),
        files: files.length > 0 ? files : [{ name: 'mock_submission.pdf', type: 'PDF', size: '1.2 MB' }]
      }
    };

    return mockAssignmentsDB[assignmentIndex];
  },

  // Get Analytics & Stats
  getAssignmentStats: async () => {
    await delay(500);
    const total = mockAssignmentsDB.length;
    const submitted = mockAssignmentsDB.filter(a => ['Submitted', 'Under Review', 'Graded'].includes(a.status)).length;
    const pending = mockAssignmentsDB.filter(a => ['Not Started', 'In Progress'].includes(a.status)).length;
    const overdue = mockAssignmentsDB.filter(a => a.status === 'Overdue').length;
    const completionRate = total === 0 ? 0 : Math.round((submitted / total) * 100);

    return {
      total,
      submitted,
      pending,
      overdue,
      completionRate,
      subjectPerformance: [
        { subject: 'Computer Science', score: 92 },
        { subject: 'Physics', score: 85 },
        { subject: 'Mathematics', score: 78 }
      ],
      submissionTrends: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        data: [12, 15, 10, 18, 22] // Mock trend data
      }
    };
  }
};
