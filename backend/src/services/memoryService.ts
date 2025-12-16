import { PRODUCTS, Product } from '../data/products';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface Session {
  id: string;
  history: Message[];
  context: {
    lastAction?: string;
    cart: string[]; // Product IDs
    mood?: string;
  };
}

const sessions: Record<string, Session> = {};

export const getSession = (sessionId: string): Session => {
  if (!sessions[sessionId]) {
    sessions[sessionId] = {
      id: sessionId,
      history: [],
      context: { cart: [] }
    };
  }
  return sessions[sessionId];
};

export const addMessage = (sessionId: string, message: Message) => {
  const session = getSession(sessionId);
  session.history.push(message);
};

export const updateContext = (sessionId: string, update: Partial<Session['context']>) => {
  const session = getSession(sessionId);
  session.context = { ...session.context, ...update };
};

export const getProductById = (id: string): Product | undefined => {
  return PRODUCTS.find(p => p.id === id);
};

export const searchProducts = (query: string): Product[] => {
  const lowerQuery = query.toLowerCase();
  return PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(lowerQuery) ||
    (p.description?.toLowerCase() || '').includes(lowerQuery) ||
    p.category.toLowerCase().includes(lowerQuery)
  );
};
