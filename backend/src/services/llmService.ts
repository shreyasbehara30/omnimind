import OpenAI from 'openai';
import dotenv from 'dotenv';
import { PRODUCTS } from '../data/products';

dotenv.config();

// Initialize OpenAI client (configured for Groq)
const apiKey = process.env.GROQ_API_KEY || process.env.OPENAI_API_KEY;
const openai = apiKey ? new OpenAI({
  apiKey,
  baseURL: process.env.GROQ_API_KEY ? 'https://api.groq.com/openai/v1' : undefined
}) : null;

export const generateResponse = async (
  history: { role: 'user' | 'assistant' | 'system'; content: string }[],
  context: any
): Promise<{ content: string; action?: any }> => {

  if (!openai) {
    console.warn("API Key missing. Using mock response.");
    return mockResponse(history);
  }

  const systemPrompt = `
You are OmniMind, a highly advanced Retail Agentic AI.
You have three internal personas:
1. Sales Agent: Enthusiastic, recommends products, upsells.
2. Support Agent: Empathetic, handles returns and issues.
3. Delivery Agent: Efficient, tracks orders.

Current User Context:
- Cart: ${JSON.stringify(context.cart)}
- Last Action: ${context.lastAction}
- Mood: ${context.mood || 'Neutral'}

Available Products:
${JSON.stringify(PRODUCTS.map(p => ({ id: p.id, name: p.name, price: p.price })))}

Your goal is to assist the user. Detect their intent and respond accordingly.
If the user wants to buy something, suggest products from the list.
If the user asks about an order, simulate a tracking check.
If the user is unhappy, be empathetic.

Output your response in JSON format:
{
  "content": "The text response to the user",
  "mood_detected": "Happy/Neutral/Angry",
  "suggested_products": ["p1", "p2"] (optional IDs),
  "action": "track_order" | "refund" | "none" (optional)
}
`;

  try {
    const completion = await openai.chat.completions.create({
      model: process.env.GROQ_API_KEY ? "llama3-70b-8192" : "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        ...history.map(h => ({ role: h.role, content: h.content }))
      ],
      response_format: { type: "json_object" }
    });

    const responseContent = completion.choices[0].message.content;
    if (!responseContent) throw new Error("No response from OpenAI");

    const parsed = JSON.parse(responseContent);
    return {
      content: parsed.content,
      action: parsed
    };

  } catch (error) {
    console.error("LLM Error:", error);
    return { content: "I'm having trouble connecting to my brain right now. How can I help you manually?" };
  }
};

const mockResponse = (history: any[]): { content: string; action?: any } => {
  const lastMsg = history[history.length - 1].content.toLowerCase();

  if (lastMsg.includes('hello') || lastMsg.includes('hi')) {
    return { content: "Welcome to OmniMind! I'm your personal retail assistant. How can I help you today?" };
  }
  if (lastMsg.includes('product') || lastMsg.includes('buy')) {
    return {
      content: "We have some great items! Check out the NeonVerse Smart Glasses or the CyberPunk Jacket.",
      action: { suggested_products: ['p1', 'p3'] }
    };
  }
  if (lastMsg.includes('track') || lastMsg.includes('order')) {
    return { content: "I can help with that. Your order #OM-1234 is currently out for delivery!" };
  }

  return { content: "I see. Tell me more about that." };
};
