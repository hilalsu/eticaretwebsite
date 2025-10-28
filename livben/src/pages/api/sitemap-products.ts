import type { NextApiRequest, NextApiResponse } from 'next';
import { NextApiRequest as Req, NextApiResponse as Res } from 'next';

// Import or copy the products array from products API
let products = [
  { id: 1, name: 'Ürün 1', price: 199, image: '/images/product1.jpg', approved: true, currency: 'TRY' },
  { id: 2, name: 'Ürün 2', price: 299, image: '/images/product2.jpg', approved: true, currency: 'TRY' },
  { id: 3, name: 'Ürün 3', price: 399, image: '/images/product3.jpg', approved: false, currency: 'TRY' },
];

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-ğüşöçıİĞÜŞÖÇ]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function handler(req: Req, res: Res) {
  res.setHeader('Content-Type', 'application/xml');
  const host = req.headers.host || 'localhost:3000';
  const urls = products
    .filter(p => p.approved)
    .map(p =>
      `<url><loc>https://${host}/tr/product/${slugify(p.name)}-${p.id}.html</loc></url>`
    )
    .join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;
  res.status(200).send(xml);
} 