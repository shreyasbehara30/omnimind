import { Router } from 'express';
import { OmniMind } from '../agents/OmniMind';

const router = Router();
const omniMind = new OmniMind();

router.post('/chat', async (req, res) => {
    try {
        const { userId, message } = req.body;

        if (!userId || !message) {
            res.status(400).json({ error: 'Missing userId or message' });
            return;
        }

        const response = await omniMind.processMessage(userId, message);
        res.json(response);
    } catch (error) {
        console.error('Error processing AI message:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
