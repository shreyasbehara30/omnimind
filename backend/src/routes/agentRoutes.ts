import { Router } from 'express';
import { chat, getHistory, getProducts } from '../controllers/agentController';

const router = Router();

router.post('/chat', chat);
router.get('/history/:sessionId', getHistory);
router.get('/products', getProducts);

export default router;
