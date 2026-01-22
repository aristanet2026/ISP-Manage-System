
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';

export const GeminiAssistant: React.FC = () => {
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', text: string}[]>([
    {role: 'assistant', text: "Hello! I'm your ISP-Core AI assistant. I can help you with MikroTik configurations, FreeRADIUS troubleshooting, or network planning. How can I help today?"}
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, {role: 'user', text: userMessage}]);
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMessage,
        config: {
          systemInstruction: `You are an expert ISP Network Administrator specialized in MikroTik RouterOS and FreeRADIUS. 
          Provide technical, concise, and helpful advice. Use code blocks for MikroTik CLI commands or RADIUS configurations.
          Current context: Managing a billing system with 1,000+ users.`,
        },
      });

      setMessages(prev => [...prev, {role: 'assistant', text: response.text || "I'm sorry, I couldn't process that request."}]);
    } catch (error) {
      setMessages(prev => [...prev, {role: 'assistant', text: "Error connecting to AI engine. Please check your network."}]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col h-[calc(100vh-12rem)]">
      <div className="p-6 border-b border-slate-100 flex items-center gap-3">
        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
          <i className="fa-solid fa-robot"></i>
        </div>
        <div>
          <h3 className="font-bold text-slate-800">NetBot Assistant</h3>
          <p className="text-xs text-slate-500">Powered by Gemini Pro</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6" ref={scrollRef}>
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl p-4 ${
              m.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-tr-none' 
                : 'bg-slate-50 text-slate-800 rounded-tl-none border border-slate-100'
            }`}>
              <p className="whitespace-pre-wrap text-sm leading-relaxed">{m.text}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl rounded-tl-none flex gap-2">
              <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-100"></span>
              <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-200"></span>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 border-t border-slate-100">
        <div className="flex gap-4">
          <input 
            type="text" 
            placeholder="Ask anything (e.g., 'How to configure OSPF on MikroTik?' or 'Troubleshoot RADIUS timeout')"
            className="flex-1 px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button 
            onClick={handleSend}
            disabled={loading}
            className="bg-indigo-600 text-white w-14 h-14 rounded-2xl flex items-center justify-center hover:bg-indigo-700 shadow-lg shadow-indigo-200 disabled:opacity-50 transition-all"
          >
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
