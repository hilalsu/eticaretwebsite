import type { NextApiRequest, NextApiResponse } from 'next';

const products = [
  { id: 1, name: 'Ürün 1', price: 199, image: '/images/product1.jpg' },
  { id: 2, name: 'Ürün 2', price: 299, image: '/images/product2.jpg' },
  { id: 3, name: 'Ürün 3', price: 399, image: '/images/product3.jpg' },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(products);
} 