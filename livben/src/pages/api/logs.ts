import type { NextApiRequest, NextApiResponse } from 'next';

let logs: any[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return res.status(200).json(logs);
  }
  if (req.method === 'POST') {
    const { type, message, user, ip } = req.body;
    const log = {
      id: Date.now(),
      type,
      message,
      user,
      date: new Date().toISOString(),
      ip: ip || req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '',
    };
    logs.push(log);
    return res.status(201).json(log);
  }
  res.status(405).json({ error: 'Method not allowed' });
} 