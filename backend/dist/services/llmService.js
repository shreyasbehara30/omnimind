"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateResponse = void 0;
const openai_1 = __importDefault(require("openai"));
const dotenv_1 = __importDefault(require("dotenv"));
const products_1 = require("../data/products");
dotenv_1.default.config();
// Initialize OpenAI client (configured for Groq)
const apiKey = process.env.GROQ_API_KEY || process.env.OPENAI_API_KEY;
const openai = apiKey ? new openai_1.default({
    apiKey,
    baseURL: process.env.GROQ_API_KEY ? 'https://api.groq.com/openai/v1' : undefined
}) : null;
const generateResponse = (history, context) => __awaiter(void 0, void 0, void 0, function* () {
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
${JSON.stringify(products_1.PRODUCTS.map(p => ({ id: p.id, name: p.name, price: p.price })))}

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
        const completion = yield openai.chat.completions.create({
            model: process.env.GROQ_API_KEY ? "llama3-70b-8192" : "gpt-4o",
            messages: [
                { role: "system", content: systemPrompt },
                ...history.map(h => ({ role: h.role, content: h.content }))
            ],
            response_format: { type: "json_object" }
        });
        const responseContent = completion.choices[0].message.content;
        if (!responseContent)
            throw new Error("No response from OpenAI");
        const parsed = JSON.parse(responseContent);
        return {
            content: parsed.content,
            action: parsed
        };
    }
    catch (error) {
        console.error("LLM Error:", error);
        return { content: "I'm having trouble connecting to my brain right now. How can I help you manually?" };
    }
});
exports.generateResponse = generateResponse;
const mockResponse = (history) => {
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
