import type { NextApiRequest, NextApiResponse } from 'next';

let messages: any[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return res.status(200).json(messages);
  }
  if (req.method === 'POST') {
    const { name, email, text } = req.body;
    const message = {
      id: Date.now(),
      name,
      email,
      text,
      date: new Date().toISOString(),
    };
    messages.push(message);
    return res.status(201).json(message);
  }
  res.status(405).json({ error: 'Method not allowed' });
} 