import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { addMessage, getSession, updateContext, searchProducts } from '../services/memoryService';
import { PRODUCTS } from '../data/products';
import { generateResponse } from '../services/llmService';

export const chat = async (req: Request, res: Response) => {
  try {
    const { message, sessionId } = req.body;
    const currentSessionId = sessionId || uuidv4();

    // 1. Update Memory
    addMessage(currentSessionId, { role: 'user', content: message });

    // 2. Get Context
    const session = getSession(currentSessionId);

    // 3. Generate Response (Agent Orchestration)
    const response = await generateResponse(session.history, session.context);

    // 4. Update Memory with Assistant Response
    addMessage(currentSessionId, { role: 'assistant', content: response.content });

    // 5. Handle Side Effects (Context Updates)
    if (response.action) {
      if (response.action.mood_detected) {
        updateContext(currentSessionId, { mood: response.action.mood_detected });
      }
      // Handle other actions like adding to cart if implemented
    }

    res.json({
      sessionId: currentSessionId,
      message: response.content,
      action: response.action
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getHistory = (req: Request, res: Response) => {
  const { sessionId } = req.params;
  const session = getSession(sessionId);
  res.json(session.history);
};

export const getProducts = (req: Request, res: Response) => {
  const { q } = req.query;
  if (q && typeof q === 'string') {
    res.json(searchProducts(q));
  } else {
    res.json(PRODUCTS);
  }
};
