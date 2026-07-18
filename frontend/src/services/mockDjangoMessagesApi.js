// mockDjangoMessagesApi.js
// Simulates Django REST Framework and Channels (WebSockets) for the Messages Module

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const mockConversations = [
  {
    id: 'd1',
    type: 'direct',
    name: 'Dr. Emily Carter',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&w=150&q=80',
    lastMessage: 'Your project proposal looks great. Proceed.',
    timestamp: '10:42 AM',
    unread: 2,
    online: true,
    role: 'Teacher',
    statusText: 'Reviewing assignments'
  },
  {
    id: 'g1',
    type: 'group',
    name: 'CS301 Study Group',
    avatar: null,
    lastMessage: 'Anyone finished the assignment yet?',
    timestamp: 'Yesterday',
    unread: 5,
    online: true,
    role: 'Group',
    statusText: '3 members online'
  },
  {
    id: 'd2',
    type: 'direct',
    name: 'Alex Johnson',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&w=150&q=80',
    lastMessage: 'Sent an image',
    timestamp: 'Yesterday',
    unread: 0,
    online: false,
    role: 'Student',
    statusText: 'Last seen 2 hours ago'
  },
  {
    id: 'd3',
    type: 'direct',
    name: 'Prof. James Wilson',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&w=150&q=80',
    lastMessage: 'Please review chapter 4 before class.',
    timestamp: 'May 20',
    unread: 0,
    online: true,
    role: 'Teacher',
    statusText: 'Available'
  },
  {
    id: 'd4',
    type: 'direct',
    name: 'Sarah Connor',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&w=150&q=80',
    lastMessage: 'Let\'s catch up after class.',
    timestamp: 'Monday',
    unread: 0,
    online: true,
    role: 'Student',
    statusText: 'Available'
  },
  {
    id: 'g2',
    type: 'group',
    name: 'Frontend Developers',
    avatar: null,
    lastMessage: 'Check out the new React docs!',
    timestamp: 'Tuesday',
    unread: 1,
    online: true,
    role: 'Group',
    statusText: '12 members online'
  },
  {
    id: 'd5',
    type: 'direct',
    name: 'Michael Chen',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&w=150&q=80',
    lastMessage: 'Did you submit the assignment?',
    timestamp: 'Last Week',
    unread: 0,
    online: false,
    role: 'Student',
    statusText: 'Offline'
  },
  {
    id: 'd6',
    type: 'direct',
    name: 'Jessica Williams',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&w=150&q=80',
    lastMessage: 'Thanks for the help!',
    timestamp: 'Last Week',
    unread: 0,
    online: true,
    role: 'Student',
    statusText: 'Available'
  },
  {
    id: 'g3',
    type: 'group',
    name: 'Machine Learning Basics',
    avatar: null,
    lastMessage: 'The matrix multiplication part is tricky.',
    timestamp: 'April 15',
    unread: 0,
    online: false,
    role: 'Group',
    statusText: '0 members online'
  }
];

let mockMessages = {
  'd1': [
    { id: 1, senderId: 'me', text: 'Hi Dr. Carter, I have uploaded my project proposal for review.', timestamp: '10:00 AM', isMe: true, status: 'read' },
    { id: 2, senderId: 'd1', text: 'Thanks. I will take a look at it this afternoon.', timestamp: '10:15 AM', isMe: false, senderName: 'Dr. Emily Carter', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&w=150&q=80', status: 'read' },
    { id: 3, senderId: 'me', file: { name: 'Final_Proposal_v2.pdf', size: '2.4 MB', type: 'pdf' }, timestamp: '11:30 AM', isMe: true, status: 'read' },
    { id: 4, senderId: 'd1', text: 'Your project proposal looks great. Proceed.', timestamp: '10:42 AM', isMe: false, senderName: 'Dr. Emily Carter', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&w=150&q=80', status: 'delivered' },
    { id: 5, senderId: 'd1', text: 'Make sure to focus on the performance metrics we discussed.', timestamp: '10:43 AM', isMe: false, senderName: 'Dr. Emily Carter', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&w=150&q=80', status: 'delivered' },
    { id: 6, senderId: 'me', text: 'Will do! By the way, should I include the edge cases in the main report or as an appendix?', timestamp: '10:50 AM', isMe: true, status: 'read' },
    { id: 7, senderId: 'd1', text: 'An appendix is fine for the edge cases, unless they directly impact the core architecture.', timestamp: '10:55 AM', isMe: false, senderName: 'Dr. Emily Carter', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&w=150&q=80', status: 'delivered' },
    { id: 8, senderId: 'me', text: 'Got it. I will structure it that way.', timestamp: '11:00 AM', isMe: true, status: 'read' },
    { id: 9, senderId: 'd1', text: 'Also, please ensure your citations follow the IEEE format.', timestamp: '11:05 AM', isMe: false, senderName: 'Dr. Emily Carter', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&w=150&q=80', status: 'delivered' },
    { id: 10, senderId: 'me', text: 'I have updated my reference manager to IEEE.', timestamp: '11:10 AM', isMe: true, status: 'read' },
    { id: 11, senderId: 'd1', text: 'Excellent. Keep me posted on your progress.', timestamp: '11:15 AM', isMe: false, senderName: 'Dr. Emily Carter', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&w=150&q=80', status: 'delivered' },
  ]
};

const mockSharedFiles = [
  { id: 'f1', name: 'Final_Proposal_v2.pdf', size: '2.4 MB', type: 'pdf', date: 'Today' },
  { id: 'f2', name: 'Architecture_Diagram.png', size: '1.1 MB', type: 'image', date: 'Yesterday' },
  { id: 'f3', name: 'Research_Notes.docx', size: '850 KB', type: 'docx', date: 'May 20' }
];

const mockAIInsights = {
  summary: "Dr. Carter approved your project proposal. She emphasized the importance of focusing on performance metrics.",
  smartReplies: [
    "Thank you, Dr. Carter! I'll focus on the metrics.",
    "Will do. Do you have any recommended reading for that?",
    "Understood. I'll update the document shortly."
  ]
};

export const messagesApi = {
  getConversations: async () => {
    await delay(400);
    return mockConversations;
  },

  getMessages: async (chatId) => {
    await delay(300);
    return mockMessages[chatId] || [
      { id: 1, senderId: 'other', text: 'Hello! This is the start of your conversation.', timestamp: '12:00 PM', isMe: false }
    ];
  },

  sendMessage: async (chatId, text, file = null) => {
    await delay(500);
    const newMessage = {
      id: Date.now(),
      senderId: 'me',
      text,
      file,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
      status: 'sent'
    };
    
    if (!mockMessages[chatId]) {
      mockMessages[chatId] = [];
    }
    mockMessages[chatId].push(newMessage);

    // Simulate webhook "delivered" after a small delay
    setTimeout(() => {
      newMessage.status = 'delivered';
      // In a real app, this would dispatch via Redux or trigger a re-render
    }, 1500);

    return newMessage;
  },

  getSharedFiles: async (chatId) => {
    await delay(300);
    return mockSharedFiles;
  },

  getAIInsights: async (chatId) => {
    await delay(600);
    return mockAIInsights;
  },

  getDashboardMetrics: async () => {
    await delay(400);
    return {
      totalConversations: 124,
      unreadMessages: 7,
      onlineTeachers: 12,
      onlineStudents: 145,
      recentFiles: 24
    };
  }
};
