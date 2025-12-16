'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles, ShoppingBag, ArrowRight } from 'lucide-react';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/cart';
import toast from 'react-hot-toast';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { addToCart } = useCart();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleAction = (action: any) => {
    console.log("Executing Action:", action);

    if (action.type === 'NAVIGATE') {
      router.push(action.payload.url);
    }

    if (action.type === 'SCROLL') {
      const element = document.getElementById(action.payload.id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Add a highlight effect
        element.classList.add('ring-2', 'ring-electric-400', 'ring-offset-4', 'ring-offset-black');
        setTimeout(() => {
          element.classList.remove('ring-2', 'ring-electric-400', 'ring-offset-4', 'ring-offset-black');
        }, 2000);
      }
    }

    if (action.type === 'UPDATE_CART') {
      console.log("Adding to cart:", action.payload);
      addToCart({
        id: action.payload.product.id,
        name: action.payload.product.name,
        price: action.payload.product.price,
        image: action.payload.product.image
      });
      toast.success(`Added ${action.payload.product.name} to cart!`);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const res = await api.chat(userMsg, sessionId);
      if (res.sessionId) setSessionId(res.sessionId);

      setMessages(prev => [...prev, { role: 'assistant', content: res.message }]);

      if (res.action && Array.isArray(res.action)) {
        res.action.forEach((act: any) => handleAction(act));
      } else if (res.action) {
        handleAction(res.action);
      }

    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', content: "I'm having trouble connecting. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] w-full bg-transparent font-sans">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto py-4 space-y-6 pr-2 custom-scrollbar mb-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-0 animate-in fade-in duration-700">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-electric-500/20 to-neon-purple/20 flex items-center justify-center relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-electric-500 to-neon-purple blur-xl opacity-30 animate-pulse" />
              <Bot className="w-10 h-10 text-white relative z-10" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Hi, I'm Omni.</h3>
              <p className="text-gray-400 max-w-xs mx-auto">I can help you find products, compare prices, and manage your cart.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-2 max-w-sm">
              {['Best headphones?', 'Show me laptops', 'Add Sony XM5 to cart'].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setInput(suggestion)}
                  className="px-4 py-2 rounded-full glass hover:bg-white/10 text-xs text-gray-300 transition-all border border-white/5 hover:border-electric-500/50"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        <AnimatePresence mode="popLayout">
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
              className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-lg ${msg.role === 'user'
                ? 'bg-gradient-to-br from-gray-700 to-gray-900 border border-white/10'
                : 'bg-gradient-to-tr from-electric-500 to-neon-purple shadow-electric'
                }`}>
                {msg.role === 'user' ? <User size={18} /> : <Bot size={18} />}
              </div>

              <div className={`p-4 rounded-3xl max-w-[85%] text-sm leading-relaxed shadow-xl backdrop-blur-sm ${msg.role === 'user'
                ? 'bg-white/10 text-white rounded-tr-sm border border-white/5'
                : 'glass-strong text-gray-100 rounded-tl-sm border-white/10'
                }`}>
                {msg.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-electric-500 to-neon-purple flex items-center justify-center shadow-electric">
              <Bot size={18} />
            </div>
            <div className="glass-strong p-4 rounded-3xl rounded-tl-sm border border-white/10 flex items-center gap-1.5">
              <span className="w-2 h-2 bg-electric-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 bg-neon-purple rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 bg-neon-pink rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="pt-2 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent -top-10 pointer-events-none" />
        <div className="flex gap-3 relative z-10">
          <div className="flex-1 relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-electric-500 to-neon-purple rounded-2xl opacity-20 group-hover:opacity-40 transition duration-500 blur-sm" />
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask Omni..."
              className="relative w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-electric-500/50 focus:ring-1 focus:ring-electric-500/20 transition-all shadow-inner"
            />
          </div>
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="px-6 rounded-2xl bg-gradient-to-r from-electric-500 to-neon-purple hover:from-electric-400 hover:to-neon-purple/90 disabled:opacity-50 disabled:cursor-not-allowed text-white shadow-electric hover:shadow-neon-lg active:scale-95 transition-all flex items-center justify-center group"
          >
            <Send size={20} className={`transform transition-transform ${isLoading ? 'opacity-0' : 'group-hover:translate-x-1 group-hover:-translate-y-1'}`} />
            {isLoading && <div className="absolute inset-0 flex items-center justify-center"><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /></div>}
          </button>
        </div>
      </div>
    </div>
  );
}
