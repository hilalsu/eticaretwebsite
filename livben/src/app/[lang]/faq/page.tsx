import React from 'react';
import { translations } from '../../../i18n';

export default function FaqPage({ params }: { params: { lang: string } }) {
  const t = translations[params.lang as keyof typeof translations] || translations['tr'];
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Sıkça Sorulan Sorular</h1>
      <ul className="mt-4 list-disc list-inside">
        <li>Bu site Next.js ile SSR olarak geliştirilmiştir.</li>
        <li>Çok dilli destek ve kullanıcı rolleri mevcuttur.</li>
        <li>Responsive ve temiz kod prensipleri uygulanmıştır.</li>
      </ul>
    </main>
  );
} 