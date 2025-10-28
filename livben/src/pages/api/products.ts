import type { NextApiRequest, NextApiResponse } from 'next';

let products = [
  { id: 1, name: 'Ürün 1', price: 199, image: '/images/product1.jpg', approved: true, currency: 'TRY' },
  { id: 2, name: 'Ürün 2', price: 299, image: '/images/product2.jpg', approved: true, currency: 'TRY' },
  { id: 3, name: 'Ürün 3', price: 399, image: '/images/product3.jpg', approved: false, currency: 'TRY' },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    if (req.query.pending) {
      // Onay bekleyen ürünler
      return res.status(200).json(products.filter(p => !p.approved));
    }
    return res.status(200).json(products.filter(p => p.approved));
  }
  if (req.method === 'POST') {
    const { name, price, image, currency } = req.body;
    const newProduct = {
      id: Date.now(),
      name,
      price,
      image,
      approved: false,
      currency: currency || 'TRY',
    };
    products.push(newProduct);
    return res.status(201).json(newProduct);
  }
  if (req.method === 'PUT') {
    const { id, name, price, image, currency } = req.body;
    products = products.map(p => p.id === id ? { ...p, name, price, image, currency: currency || p.currency } : p);
    return res.status(200).json(products.find(p => p.id === id));
  }
  if (req.method === 'DELETE') {
    const { id } = req.body;
    products = products.filter(p => p.id !== id);
    return res.status(204).end();
  }
  if (req.method === 'PATCH') {
    const { id, action } = req.body;
    if (action === 'approve') {
      products = products.map(p => p.id === id ? { ...p, approved: true } : p);
      return res.status(200).json(products.find(p => p.id === id));
    }
    if (action === 'reject') {
      products = products.filter(p => p.id !== id);
      return res.status(204).end();
    }
  }
  res.status(405).json({ error: 'Method not allowed' });
} 