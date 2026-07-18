import React, { useState, useEffect, useRef } from 'react';

import { Users, UserPlus, Server, Copy, Check, LogOut, Send, Zap } from 'lucide-react';
import { puter } from '@heyputer/puter.js';

const StudyRoom = () => {
  const [view, setView] = useState('lobby'); // lobby, hosting, connected
  const [inviteCode, setInviteCode] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMsg, setInputMsg] = useState('');
  const [peerConn, setPeerConn] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleHost = async () => {
    setLoading(true);
    setError('');
    try {
      const conn = await puter.peer.host();
      setInviteCode(conn.id);
      setPeerConn(conn);
      setView('hosting');

      conn.addEventListener('open', () => {
        setMessages((prev) => [...prev, { text: 'A peer has joined the room!', sender: 'system' }]);
      });

      conn.addEventListener('message', (msg) => {
        setMessages((prev) => [...prev, { text: msg.data, sender: 'peer' }]);
      });
      
      conn.addEventListener('close', () => {
        setMessages((prev) => [...prev, { text: 'Peer disconnected.', sender: 'system' }]);
      });
      
    } catch (err) {
      setError('Failed to host session. Ensure Puter.js is loaded.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleJoin = async () => {
    if (!joinCode.trim()) return;
    setLoading(true);
    setError('');
    try {
      const conn = await puter.peer.connect(joinCode);
      setPeerConn(conn);
      setView('connected');

      conn.addEventListener('open', () => {
        setMessages((prev) => [...prev, { text: 'Connected to the host successfully!', sender: 'system' }]);
      });

      conn.addEventListener('message', (msg) => {
        setMessages((prev) => [...prev, { text: msg.data, sender: 'peer' }]);
      });

      conn.addEventListener('close', () => {
        setMessages((prev) => [...prev, { text: 'Host disconnected.', sender: 'system' }]);
        setPeerConn(null);
      });
    } catch (err) {
      setError('Failed to connect. Check the invite code.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = () => {
    if (!inputMsg.trim() || !peerConn) return;
    peerConn.send(inputMsg);
    setMessages((prev) => [...prev, { text: inputMsg, sender: 'me' }]);
    setInputMsg('');
  };

  const copyCode = () => {
    navigator.clipboard.writeText(inviteCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const disconnect = () => {
    if (peerConn) {
      peerConn.close();
      setPeerConn(null);
    }
    setView('lobby');
    setMessages([]);
    setInviteCode('');
    setJoinCode('');
  };

  return (
    <div className="bg-slate-800/30 rounded-sm p-6 border border-slate-700/50 -[0_0_50px_rgba(0,0,0,0.3)] flex flex-col h-full w-full max-h-[calc(100vh-140px)] relative">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6 border-b border-slate-700/50 pb-4 shrink-0">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-sm bg-gradient- bg-indigo-500 flex items-center justify-center -indigo-500/20">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">P2P Study Rooms</h2>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-indigo-400 text-xs font-medium uppercase tracking-wider">Serverless Collaboration</p>
            </div>
          </div>
        </div>
        
        {view !== 'lobby' && (
          <button 
            onClick={disconnect}
            className="flex items-center gap-2 px-4 py-2 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 rounded-sm font-medium text-sm"
          >
            <LogOut className="w-4 h-4" /> Disconnect
          </button>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-0 relative">
        
          
          {/* LOBBY VIEW */}
          {view === 'lobby' && (
            <div 
              key="lobby"
              className="flex-1 flex items-center justify-center p-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl">
                
                {/* Host Card */}
                <div className="bg-slate-900/50 border border-slate-700/50 rounded-sm p-8 flex flex-col items-center text-center hover:bg-slate-900/80">
                  <div className="w-16 h-16 rounded-full bg-indigo-500/20 flex items-center justify-center mb-6">
                    <Server className="w-8 h-8 text-indigo-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Host a Room</h3>
                  <p className="text-slate-400 text-sm mb-8 flex-1">
                    Create a secure peer- connection. Share your invite code with a friend to collaborate in real-time.
                  </p>
                  <button 
                    onClick={handleHost}
                    disabled={loading}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-sm font-bold -indigo-500/25 disabled:opacity-50"
                  >
                    {loading ? 'Starting Host...' : 'Create Room'}
                  </button>
                </div>

                {/* Join Card */}
                <div className="bg-slate-900/50 border border-slate-700/50 rounded-sm p-8 flex flex-col items-center text-center hover:bg-slate-900/80">
                  <div className="w-16 h-16 rounded-full bg-rose-500/20 flex items-center justify-center mb-6">
                    <UserPlus className="w-8 h-8 text-rose-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Join a Room</h3>
                  <p className="text-slate-400 text-sm mb-6">
                    Have an invite code? Enter it below to instantly connect to your peer's room.
                  </p>
                  <div className="w-full space-y-3 mt-auto">
                    <input 
                      type="text" 
                      placeholder="Paste Invite Code..." 
                      value={joinCode}
                      onChange={(e) => setJoinCode(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-sm px-4 py-3 text-center text-white focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                    />
                    <button 
                      onClick={handleJoin}
                      disabled={loading || !joinCode}
                      className="w-full bg-rose-600 hover:bg-rose-700 text-white py-4 rounded-sm font-bold -rose-500/25 disabled:opacity-50"
                    >
                      {loading ? 'Connecting...' : 'Join Room'}
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* HOSTING / CONNECTED VIEW (Chat Interface) */}
          {(view === 'hosting' || view === 'connected') && (
            <div 
              key="chat"
              className="flex-1 flex flex-col min-h-0 bg-slate-900/50 rounded-sm border border-slate-700/50 overflow-hidden"
            >
              
              {/* Connection Status Bar */}
              {view === 'hosting' && (
                <div className="bg-indigo-600/20 border-b border-indigo-500/30 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                    </div>
                    <span className="text-indigo-300 font-medium">Hosting Session</span>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-900 rounded-sm p-1 pl-4 border border-slate-700">
                    <code className="text-white font-mono text-sm tracking-wider">{inviteCode}</code>
                    <button 
                      onClick={copyCode}
                      className="p-2 hover:bg-slate-800 rounded-sm text-slate-400 hover:text-white"
                    >
                      {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
                {messages.length === 0 && (
                  <div className="h-full flex flex-col items-center justify-center text-slate-500 text-center">
                    <Zap className="w-12 h-12 text-slate-700 mb-4" />
                    <p>Room is open and encrypted P2P channel established.<br/>Waiting for messages...</p>
                  </div>
                )}
                
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.sender === 'me' ? 'justify-end' : msg.sender === 'system' ? 'justify-center' : 'justify-start'}`}>
                    {msg.sender === 'system' ? (
                      <div className="bg-slate-800/80 px-4 py-1.5 rounded-full text-xs font-medium text-slate-400 border border-slate-700">
                        {msg.text}
                      </div>
                    ) : (
                      <div className={`max-w-[75%] p-4 rounded-sm ${
                        msg.sender === 'me' 
                          ? 'bg-gradient- bg-indigo-600  text-white rounded-br-sm' 
                          : 'bg-slate-800 border border-slate-700 text-slate-200 rounded-bl-sm'
                      }`}>
                        <div className="whitespace-pre-wrap">{msg.text}</div>
                      </div>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-slate-800 bg-slate-900">
                <div className="flex items-end gap-2 bg-slate-800 rounded-sm p-2 border border-slate-700 focus-within:border-indigo-500">
                  <textarea 
                    value={inputMsg}
                    onChange={(e) => setInputMsg(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                    placeholder="Type a message..."
                    className="flex-1 bg-transparent border-none px-4 py-2 text-white focus:ring-0 resize-none max-h-32 min-h-[44px] custom-scrollbar"
                    rows="1"
                  />
                  <button 
                    onClick={sendMessage}
                    disabled={!inputMsg.trim()}
                    className="p-3 bg-indigo-600 hover:bg-indigo-700 rounded-sm text-white disabled:opacity-50 shrink-0"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>

            </div>
          )}
        

        {error && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-rose-500/90 text-white px-6 py-3 rounded-full text-sm font-medium flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
            {error}
          </div>
        )}
      </div>

    </div>
  );
};

export default StudyRoom;
