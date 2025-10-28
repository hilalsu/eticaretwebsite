import { generateProductsSitemap, generateBlogSitemap, generateFaqSitemap, generateImagesSitemap } from '../sitemap';
import { SUPPORTED_LANGUAGES } from '../i18n';

// Örnek veri, gerçek projede DB'den çekilmeli
const products = [
  { id: 1, slug: 'urun-adi' },
  { id: 2, slug: 'product-name' },
];
const posts = [
  { id: 1, slug: 'ilk-blog' },
  { id: 2, slug: 'first-blog' },
];
const faqs = [
  { id: 1, slug: 'soru-1' },
  { id: 2, slug: 'question-1' },
];
const images = [
  { url: 'https://livben.com/images/1.jpg' },
  { url: 'https://livben.com/images/2.jpg' },
];

generateProductsSitemap(products, SUPPORTED_LANGUAGES);
generateBlogSitemap(posts, SUPPORTED_LANGUAGES);
generateFaqSitemap(faqs, SUPPORTED_LANGUAGES);
generateImagesSitemap(images);

console.log('Sitemap updated!'); 