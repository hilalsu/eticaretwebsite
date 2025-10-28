import React from 'react';
import { translations } from '../../../i18n';

export default function ContactPage({ params }: { params: { lang: string } }) {
  const t = translations[params.lang as keyof typeof translations] || translations['tr'];
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">İletişim</h1>
      <p>Her türlü soru ve öneriniz için bize ulaşabilirsiniz.</p>
      <ul className="mt-4 list-disc list-inside">
        <li>E-posta: info@livben.com</li>
        <li>Telefon: +90 555 555 55 55</li>
      </ul>
    </main>
  );
} 