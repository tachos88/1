
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../../types';
import { ChatService } from '../../services/chatService';

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'model', text: 'Hallo! Ik ben je FLO8 Coach. Hoe gaat het vandaag met je doelen?', timestamp: new Date().toISOString() }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: input, timestamp: new Date().toISOString() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await ChatService.sendMessage(messages, input);
      const modelMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'model', text: response, timestamp: new Date().toISOString() };
      setMessages(prev => [...prev, modelMsg]);
    } catch (err) {
      setMessages(prev => [...prev, { id: 'err', role: 'model', text: 'Er ging iets mis. Probeer het later opnieuw.', timestamp: new Date().toISOString() }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-stone-50">
      <div className="bg-white border-b border-stone-200 p-4 sticky top-0 z-10">
        <h1 className="text-lg font-bold text-center">Lifestyle Coach</h1>
      </div>

      <div className="flex-grow overflow-y-auto p-6 space-y-6">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-2xl shadow-sm ${m.role === 'user' ? 'bg-teal-600 text-white rounded-br-none' : 'bg-white text-stone-800 rounded-bl-none border border-stone-100'}`}>
              <p className="whitespace-pre-wrap">{m.text}</p>
              <p className={`text-[10px] mt-2 opacity-60 ${m.role === 'user' ? 'text-right' : 'text-left'}`}>
                {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-100 flex gap-1">
              <span className="w-2 h-2 bg-stone-300 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-stone-300 rounded-full animate-bounce delay-75"></span>
              <span className="w-2 h-2 bg-stone-300 rounded-full animate-bounce delay-150"></span>
            </div>
          </div>
        )}
        <div ref={scrollRef}></div>
      </div>

      <form onSubmit={handleSend} className="p-4 bg-white border-t border-stone-200 flex gap-2">
        <input
          type="text"
          className="flex-grow p-4 rounded-xl border border-stone-200 focus:ring-2 focus:ring-teal-500 outline-none"
          placeholder="Stel een vraag..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-teal-600 text-white p-4 rounded-xl font-bold disabled:opacity-50"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default ChatPage;
