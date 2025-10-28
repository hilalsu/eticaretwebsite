import React from 'react';
import { translations } from '../../../i18n';

export default function BlogPage({ params }: { params: { lang: string } }) {
  const t = translations[params.lang as keyof typeof translations] || translations['tr'];
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Blog</h1>
      <p>Burada güncel haberler ve makaleler yayınlanacaktır.</p>
    </main>
  );
} 