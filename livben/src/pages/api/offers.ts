import type { NextApiRequest, NextApiResponse } from 'next';

let offers: any[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return res.status(200).json(offers);
  }
  if (req.method === 'POST') {
    const { productId, name, email, offerPrice, message } = req.body;
    const offer = {
      id: Date.now(),
      productId,
      name,
      email,
      offerPrice,
      message,
      date: new Date().toISOString(),
      status: 'pending',
    };
    offers.push(offer);
    return res.status(201).json(offer);
  }
  res.status(405).json({ error: 'Method not allowed' });
} 