/**
 * Messages API Service
 * 
 * Mock service layer to interact with Django backend for the Messaging platform.
 */

export const messagesApi = {
  
  async getConversations() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 'g1',
            type: 'group',
            name: 'CS301 Study Group',
            avatar: null,
            lastMessage: 'Anyone finished the assignment yet?',
            timestamp: '10:42 AM',
            unread: 3,
            online: true,
          },
          {
            id: 'd1',
            type: 'direct',
            name: 'Dr. Emily Carter',
            avatar: 'https://ui-avatars.com/api/?name=Emily+Carter&background=2563EB&color=fff',
            lastMessage: 'Your project proposal looks great. Proceed.',
            timestamp: 'Yesterday',
            unread: 0,
            online: true,
          },
          {
            id: 'd2',
            type: 'direct',
            name: 'Alex Johnson',
            avatar: 'https://ui-avatars.com/api/?name=Alex+Johnson&background=10B981&color=fff',
            lastMessage: 'Can you send me the notes from last lecture?',
            timestamp: 'Yesterday',
            unread: 0,
            online: false,
          },
          {
            id: 'g2',
            type: 'group',
            name: 'Hackathon Team Alpha',
            avatar: null,
            lastMessage: 'Let\'s meet at 5 PM to discuss the UI.',
            timestamp: 'Mon',
            unread: 12,
            online: true,
          },
          {
            id: 'd3',
            type: 'direct',
            name: 'Prof. James Wilson',
            avatar: 'https://ui-avatars.com/api/?name=James+Wilson&background=8B5CF6&color=fff',
            lastMessage: 'Please review chapter 4 before class.',
            timestamp: 'May 20',
            unread: 0,
            online: false,
          }
        ]);
      }, 300);
    });
  },

  async getMessages(conversationId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mocking chat history based on ID
        if (conversationId === 'd1') {
          resolve([
            { id: 1, senderId: 'me', text: 'Hi Dr. Carter, I have uploaded my project proposal for review.', timestamp: '10:00 AM', isMe: true },
            { id: 2, senderId: 'd1', text: 'Thanks. I will take a look at it this afternoon.', timestamp: '10:15 AM', isMe: false, senderName: 'Dr. Emily Carter', avatar: 'https://ui-avatars.com/api/?name=Emily+Carter&background=2563EB&color=fff' },
            { id: 3, senderId: 'd1', text: 'Your project proposal looks great. Proceed.', timestamp: 'Yesterday', isMe: false, senderName: 'Dr. Emily Carter', avatar: 'https://ui-avatars.com/api/?name=Emily+Carter&background=2563EB&color=fff' },
          ]);
        } else if (conversationId === 'g1') {
          resolve([
            { id: 1, senderId: 'userA', text: 'Are we still on for the study session?', timestamp: '9:00 AM', isMe: false, senderName: 'Sarah', avatar: 'https://ui-avatars.com/api/?name=Sarah&background=F59E0B&color=fff' },
            { id: 2, senderId: 'userB', text: 'Yes, library at 3 PM.', timestamp: '9:05 AM', isMe: false, senderName: 'Mike', avatar: 'https://ui-avatars.com/api/?name=Mike&background=3B82F6&color=fff' },
            { id: 3, senderId: 'me', text: 'I\'ll be there. Bringing snacks.', timestamp: '9:10 AM', isMe: true },
            { id: 4, senderId: 'userC', text: 'Anyone finished the assignment yet?', timestamp: '10:42 AM', isMe: false, senderName: 'Alex', avatar: 'https://ui-avatars.com/api/?name=Alex&background=10B981&color=fff' },
          ]);
        } else {
          resolve([
            { id: 1, senderId: 'other', text: 'Hello! This is a mocked conversation.', timestamp: '12:00 PM', isMe: false, senderName: 'User', avatar: 'https://ui-avatars.com/api/?name=User&background=6B7280&color=fff' }
          ]);
        }
      }, 300);
    });
  }

};

export default messagesApi;
