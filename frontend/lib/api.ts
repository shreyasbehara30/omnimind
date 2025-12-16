const API_URL = 'http://localhost:3001/api';

export const api = {
  async chat(message: string, sessionId?: string) {
    const res = await fetch(`${API_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, sessionId }),
    });
    return res.json();
  },

  async getHistory(sessionId: string) {
    const res = await fetch(`${API_URL}/history/${sessionId}`);
    return res.json();
  },

  async getProducts(query?: string) {
    const url = query ? `${API_URL}/products?q=${query}` : `${API_URL}/products`;
    const res = await fetch(url);
    return res.json();
  }
};
