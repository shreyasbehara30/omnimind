'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
    id: string;
    role: 'user' | 'agent';
    content: string;
    timestamp: Date;
    safeAction?: any; // To store pending Safe UI Action for approval
}

interface SafeActionData {
    version: string;
    intent: string;
    description: string;
    actions: any[];
}

import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useCart } from '@/lib/cart';

export function ChatWidget() {
    const router = useRouter();
    const { addToCart } = useCart();
    const [userId, setUserId] = useState<string>('guest-user');
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'agent',
            content: 'Hi! I\'m Omni, your personal shopping assistant. How can I help you today?',
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isOpen]);

    useEffect(() => {
        const handleOpenChat = () => setIsOpen(true);
        window.addEventListener('open-chat', handleOpenChat);

        // Fetch User
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setUserId(user.id);
            }
        };
        getUser();

        return () => window.removeEventListener('open-chat', handleOpenChat);
    }, []);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        try {
            // Call Backend API
            const res = await fetch('http://localhost:3001/api/ai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: userId, message: userMsg.content })
            });

            const data = await res.json();

            const agentMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'agent',
                content: data.content || "I'm having trouble connecting to my brain right now.",
                timestamp: new Date()
            };

            // Check for Safe Action
            const safeAction = data.actions?.find((a: any) => a.type === 'SAFE_UI_ACTION');
            if (safeAction) {
                agentMsg.safeAction = safeAction.payload;
            }

            setMessages(prev => [...prev, agentMsg]);

            // Handle Standard Actions (Compatibility)
            if (data.actions && Array.isArray(data.actions)) {
                data.actions.forEach((action: any) => {
                    if (action.type === 'SAFE_UI_ACTION') return; // Handled separately via message UI
                    if (action.type === 'NAVIGATE') {
                        router.push(action.payload.url);
                    }

                    if (action.type === 'SCROLL') {
                        const attemptScroll = (attemptsLeft: number) => {
                            if (action.payload.target === 'top') {
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            } else if (action.payload.target === 'bottom') {
                                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                            } else if (action.payload.target === 'product_id') {
                                const element = document.getElementById(`product-${action.payload.id}`);
                                if (element) {
                                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                    // Add a highlight effect
                                    element.style.transition = 'box-shadow 0.5s';
                                    element.style.boxShadow = '0 0 0 4px rgba(99, 102, 241, 0.5)';
                                    setTimeout(() => { element.style.boxShadow = ''; }, 2000);
                                } else if (attemptsLeft > 0) {
                                    setTimeout(() => attemptScroll(attemptsLeft - 1), 200);
                                }
                            }
                        };
                        // Start trying after a short delay to allow nav to start
                        setTimeout(() => attemptScroll(10), 500);
                    }

                    if (action.type === 'UPDATE_CART') {
                        // Use CartContext to update cart
                        if (action.payload && action.payload.product) {
                            addToCart({
                                id: action.payload.product.id || 'unknown',
                                name: action.payload.product.name,
                                price: action.payload.product.price,
                                image: action.payload.product.image || '/placeholder.png'
                            });
                            // console.log('Added to cart:', action.payload);
                        }
                    }
                });
            }

        } catch (error) {
            console.error('Chat error:', error);
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                role: 'agent',
                content: "Sorry, I seem to be offline. Please try again later.",
                timestamp: new Date()
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="mb-4 w-[380px] shadow-2xl"
                    >
                        <Card className="border-primary/20 bg-background/95 backdrop-blur-md">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                                <div className="flex items-center gap-2">
                                    <div className="relative">
                                        <div className="absolute -inset-0.5 animate-pulse rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 blur opacity-75"></div>
                                        <Avatar className="relative h-10 w-10 border-2 border-background">
                                            <AvatarImage src="/omni-avatar.png" />
                                            <AvatarFallback className="bg-primary text-primary-foreground">OM</AvatarFallback>
                                        </Avatar>
                                    </div>
                                    <div>
                                        <CardTitle className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
                                            OmniMind
                                        </CardTitle>
                                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                                            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                                            Online
                                        </p>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                                    <X className="h-4 w-4" />
                                </Button>
                            </CardHeader>
                            <CardContent className="p-0">
                                <ScrollArea className="h-[400px] p-4">
                                    <div className="flex flex-col gap-4">
                                        {messages.map((msg) => (
                                            <div
                                                key={msg.id}
                                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                            >
                                                <div
                                                    className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${msg.role === 'user'
                                                        ? 'bg-primary text-primary-foreground rounded-tr-none'
                                                        : 'bg-muted text-foreground rounded-tl-none'
                                                        }`}
                                                >
                                                    {msg.content}

                                                    {msg.safeAction && (
                                                        <div className="mt-3 bg-background/50 rounded-lg p-3 border border-border/50">
                                                            <div className="flex items-center gap-2 mb-2">
                                                                <div className="bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 text-xs px-2 py-0.5 rounded border border-yellow-500/20 font-mono">
                                                                    SAFE ACTION REQUEST
                                                                </div>
                                                            </div>
                                                            <p className="text-xs font-semibold mb-1">{msg.safeAction.intent}</p>
                                                            <p className="text-xs text-muted-foreground mb-3">{msg.safeAction.description}</p>

                                                            <div className="space-y-2 mb-3">
                                                                {msg.safeAction.actions.map((act: any, idx: number) => (
                                                                    <div key={idx} className="text-[10px] font-mono bg-black/5 p-1.5 rounded text-left">
                                                                        <span className="text-primary font-bold">{act.type}</span> {act.target.value} <span className="text-muted-foreground">{act.value ? `"${act.value}"` : ''}</span>
                                                                    </div>
                                                                ))}
                                                            </div>

                                                            <div className="flex gap-2">
                                                                <Button
                                                                    size="sm"
                                                                    variant="outline"
                                                                    onClick={() => {
                                                                        setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, safeAction: null, content: m.content + "\n\n[Action Denied]" } : m));
                                                                    }}
                                                                    className="h-7 text-xs flex-1 bg-red-500/10 hover:bg-red-500/20 text-red-600 border-red-200"
                                                                >
                                                                    Deny
                                                                </Button>
                                                                <Button
                                                                    size="sm"
                                                                    onClick={() => {
                                                                        // Execute Actions
                                                                        msg.safeAction.actions.forEach((act: any) => {
                                                                            console.log('Executing Safe Action:', act);
                                                                            if (act.type === 'open_url') {
                                                                                if (act.target.value.startsWith('/')) {
                                                                                    router.push(act.target.value);
                                                                                } else {
                                                                                    window.open(act.target.value, '_blank');
                                                                                }
                                                                            }
                                                                            if (act.type === 'click') {
                                                                                const el = document.querySelector(act.target.value);
                                                                                if (el && el instanceof HTMLElement) el.click();
                                                                            }
                                                                            if (act.type === 'type') {
                                                                                const el = document.querySelector(act.target.value);
                                                                                if (el && el instanceof HTMLInputElement) el.value = act.value;
                                                                            }
                                                                            if (act.type === 'add_to_cart') {
                                                                                // Parse value which should be JSON string of product or productId
                                                                                try {
                                                                                    const product = JSON.parse(act.value);
                                                                                    addToCart({
                                                                                        id: product.id || 'unknown',
                                                                                        name: product.name || 'Product',
                                                                                        price: product.price || 0,
                                                                                        image: product.image || '/placeholder.png'
                                                                                    });
                                                                                } catch (e) {
                                                                                    console.error("Failed to add to cart from safe action", e);
                                                                                }
                                                                            }
                                                                            if (act.type === 'wait') {
                                                                                // console.log waits
                                                                            }
                                                                        });
                                                                        setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, safeAction: null, content: m.content + "\n\n[Action Executed]" } : m));
                                                                    }}
                                                                    className="h-7 text-xs flex-1 bg-green-600 hover:bg-green-700 text-white"
                                                                >
                                                                    Allow
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    )}

                                                </div>
                                            </div>
                                        ))}
                                        {isLoading && (
                                            <div className="flex justify-start">
                                                <div className="bg-muted rounded-2xl rounded-tl-none px-4 py-2 flex items-center gap-1">
                                                    <span className="h-1.5 w-1.5 rounded-full bg-foreground/50 animate-bounce [animation-delay:-0.3s]"></span>
                                                    <span className="h-1.5 w-1.5 rounded-full bg-foreground/50 animate-bounce [animation-delay:-0.15s]"></span>
                                                    <span className="h-1.5 w-1.5 rounded-full bg-foreground/50 animate-bounce"></span>
                                                </div>
                                            </div>
                                        )}
                                        <div ref={scrollRef} />
                                    </div>
                                </ScrollArea>
                            </CardContent>
                            <CardFooter className="p-3 pt-0">
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        handleSend();
                                    }}
                                    className="flex w-full gap-2"
                                >
                                    <Input
                                        placeholder="Ask me anything..."
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        className="flex-1"
                                    />
                                    <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                                        <Send className="h-4 w-4" />
                                    </Button>
                                </form>
                            </CardFooter>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>

            <Button
                onClick={() => setIsOpen(!isOpen)}
                size="lg"
                className={`shadow-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 ${isOpen ? 'h-14 w-14 rounded-full' : 'h-14 rounded-full px-6'}`}
            >
                {isOpen ? (
                    <X className="h-6 w-6" />
                ) : (
                    <div className="flex items-center gap-2">
                        <Sparkles className="h-6 w-6" />
                        <span className="font-medium text-lg hidden md:inline">Chat with me</span>
                    </div>
                )}
            </Button>
        </div>
    );
}
