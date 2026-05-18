import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Sparkles, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Hello! I'm your ZenHealth Assistant. How can I help you support your wellness journey today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setError(null);
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: userMessage,
          history: messages.map(m => ({ 
            role: m.role, 
            parts: [{ text: m.text }] 
          }))
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get response');
      }

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'model', text: data.text }]);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] bg-white rounded-3xl border border-[#E1E3E5] overflow-hidden shadow-sm">
      {/* Header */}
      <div className="px-6 py-4 border-b border-[#E1E3E5] flex items-center justify-between bg-white relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#2D6A4F] flex items-center justify-center text-white">
            <Sparkles size={20} />
          </div>
          <div>
            <h3 className="font-bold text-[#111827]">Zen AI Coach</h3>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-[#64748B]">Always active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth"
      >
        <AnimatePresence initial={false}>
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "flex items-start gap-4 max-w-[85%]",
                m.role === 'user' ? "ml-auto flex-row-reverse" : ""
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm",
                m.role === 'user' ? "bg-white border border-[#E1E3E5]" : "bg-[#2D6A4F] text-white"
              )}>
                {m.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className={cn(
                "px-5 py-3 rounded-2xl text-sm leading-relaxed",
                m.role === 'user' 
                  ? "bg-[#2D6A4F] text-white rounded-tr-none shadow-md shadow-[#2D6A4F]/10" 
                  : "bg-[#F3F4F6] text-[#1F2937] rounded-tl-none markdown-body"
              )}>
                <ReactMarkdown>{m.text}</ReactMarkdown>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-start gap-4"
          >
            <div className="w-8 h-8 rounded-full bg-[#2D6A4F] flex items-center justify-center text-white shadow-sm">
              <Bot size={16} />
            </div>
            <div className="bg-[#F3F4F6] px-5 py-3 rounded-2xl rounded-tl-none">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-[#94A3B8] rounded-full animate-bounce [animation-delay:-0.3s]" />
                <div className="w-1.5 h-1.5 bg-[#94A3B8] rounded-full animate-bounce [animation-delay:-0.15s]" />
                <div className="w-1.5 h-1.5 bg-[#94A3B8] rounded-full animate-bounce" />
              </div>
            </div>
          </motion.div>
        )}

        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-50 text-red-600 rounded-xl border border-red-100 text-sm">
            <AlertCircle size={16} />
            {error}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-6 bg-white border-t border-[#E1E3E5]">
        <div className="relative group max-w-4xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask anything about your wellness..."
            className="w-full pl-6 pr-14 py-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]/20 focus:border-[#2D6A4F] transition-all group-hover:border-[#CBD5E1]"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-1.5 bottom-1.5 px-4 bg-[#2D6A4F] text-white rounded-xl hover:bg-[#1B4332] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
        <p className="text-[10px] text-center text-[#94A3B8] mt-3 uppercase tracking-widest font-semibold">
          Powered by Gemini AI • zenhealth.ai
        </p>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
