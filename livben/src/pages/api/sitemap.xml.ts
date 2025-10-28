import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Content-Type', 'application/xml');
  const host = req.headers.host || 'localhost:3000';
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <sitemap><loc>https://${host}/api/sitemap-products</loc></sitemap>\n  <sitemap><loc>https://${host}/api/sitemap-blog</loc></sitemap>\n  <sitemap><loc>https://${host}/api/sitemap-faq</loc></sitemap>\n</sitemapindex>`;
  res.status(200).send(xml);
} 