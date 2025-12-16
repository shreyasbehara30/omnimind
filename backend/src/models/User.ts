export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: 'customer' | 'admin';
  createdAt: Date;
}

export interface Order {
  id: string;
  userId: string;
  items: { productId: string; quantity: number }[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
}

// In-memory storage (replace with database in production)
export const users: User[] = [];
export const orders: Order[] = [];
