import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Content-Type', 'application/xml');
  const host = req.headers.host || 'localhost:3000';
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>https://${host}/tr/blog/yeni-urunler-2024.html</loc></url>\n  <url><loc>https://${host}/tr/blog/indirimli-hafta.html</loc></url>\n</urlset>`;
  res.status(200).send(xml);
} 