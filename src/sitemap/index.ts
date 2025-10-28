import fs from 'fs';
import path from 'path';

export function generateSitemap(urls: string[], type: string = 'default') {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((url) => `<url><loc>${url}</loc></url>`) 
    .join('\n')}\n</urlset>`;
  fs.writeFileSync(path.join(process.cwd(), `public/sitemap-${type}.xml`), xml);
}

export function generateProductsSitemap(products: { id: number, slug: string }[], languages: string[]) {
  const urls = products.flatMap(product =>
    languages.map(lang => `https://livben.com/${lang}/product/${product.slug}-${product.id}.html`)
  );
  generateSitemap(urls, 'products');
}

export function generateBlogSitemap(posts: { id: number, slug: string }[], languages: string[]) {
  const urls = posts.flatMap(post =>
    languages.map(lang => `https://livben.com/${lang}/blog/${post.slug}-${post.id}.html`)
  );
  generateSitemap(urls, 'blog');
}

export function generateFaqSitemap(faqs: { id: number, slug: string }[], languages: string[]) {
  const urls = faqs.flatMap(faq =>
    languages.map(lang => `https://livben.com/${lang}/faq/${faq.slug}-${faq.id}.html`)
  );
  generateSitemap(urls, 'faq');
}

export function generateImagesSitemap(images: { url: string }[]) {
  const urls = images.map(img => img.url);
  generateSitemap(urls, 'images');
}
// Kullanım: generateProductsSitemap([{id:1,slug:'urun-adi'}], ['tr','en']) 