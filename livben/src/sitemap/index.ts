// Basit otomatik sitemap fonksiyonu
export interface SitemapEntry {
  loc: string;
  lastmod?: string;
  changefreq?: string;
  priority?: number;
}

export function generateSitemap(entries: SitemapEntry[]): string {
  const urlset = entries.map(entry => `    <url>\n      <loc>${entry.loc}</loc>\n      ${entry.lastmod ? `<lastmod>${entry.lastmod}</lastmod>` : ''}\n      ${entry.changefreq ? `<changefreq>${entry.changefreq}</changefreq>` : ''}\n      ${entry.priority ? `<priority>${entry.priority}</priority>` : ''}\n    </url>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlset}\n</urlset>`;
} 