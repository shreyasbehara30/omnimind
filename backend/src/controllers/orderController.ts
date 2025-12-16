import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { AuthRequest } from '../middleware/auth';
import { orders, Order } from '../models/User';
import { PRODUCTS } from '../data/products';

export const createOrder = (req: AuthRequest, res: Response) => {
  try {
    const { items } = req.body;
    const userId = req.user!.id;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Items are required' });
    }

    let total = 0;
    for (const item of items) {
      const product = PRODUCTS.find(p => p.id === item.productId);
      if (!product) {
        return res.status(404).json({ error: `Product ${item.productId} not found` });
      }
      total += product.price * item.quantity;
    }

    const newOrder: Order = {
      id: uuidv4(),
      userId,
      items,
      total,
      status: 'pending',
      createdAt: new Date()
    };

    orders.push(newOrder);

    res.status(201).json(newOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Order creation failed' });
  }
};

export const getOrders = (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const userOrders = orders.filter(o => o.userId === userId);
  res.json(userOrders);
};

export const getOrderById = (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const userId = req.user!.id;

  const order = orders.find(o => o.id === id && o.userId === userId);
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }

  res.json(order);
};
