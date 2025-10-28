import React from 'react';
import { translations } from '../../../i18n';

export default function AboutPage({ params }: { params: { lang: string } }) {
  const t = translations[params.lang as keyof typeof translations] || translations['tr'];
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">{t.homeTitle}</h1>
      <p>Bu proje, çok dilli e-ticaret deneyimi sunmak için Next.js ile geliştirilmiştir.</p>
      <p>Demo: <a href="https://sashapoulain.github.io/ucotuz/" target="_blank" rel="noopener noreferrer" style={{color:'#4af'}}>ucotuz demo</a></p>
    </main>
  );
} 