"use client";
import React from 'react';
import ApiDemo from '../../components/ApiDemo';
import { translations } from '../../i18n';

export default function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const [lang, setLang] = React.useState('tr');
  React.useEffect(() => {
    params.then(p => setLang(p.lang || 'tr'));
  }, [params]);
  const t = translations[lang as keyof typeof translations] || translations['tr'];
  return (
    <main className="p-8" style={{textAlign:'center'}}>
      <div style={{fontSize:'3rem',marginBottom:'1rem'}}>🌐</div>
      <h1 className="text-3xl font-bold mb-4" style={{fontSize:'2.5rem',color:'#4af',letterSpacing:'0.03em'}}>{t.homeTitle}</h1>
      <p style={{fontSize:'1.2rem',color:'#aaa',marginBottom:'2rem'}}>{t.homeDescription}</p>
      <ApiDemo />
      <ul className="mt-4 list-disc list-inside" style={{textAlign:'left',maxWidth:400,margin:'2rem auto'}}>
        <li>{t.adminTitle}: /{lang}/admin</li>
        <li>{t.userTitle}: /{lang}/user</li>
        <li>{t.storeTitle}: /{lang}/store</li>
      </ul>
    </main>
  );
} 