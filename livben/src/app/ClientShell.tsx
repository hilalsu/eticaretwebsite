'use client';

import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { usePathname, useRouter } from 'next/navigation';
import ClientLayout from './ClientLayout';
import { Provider } from 'react-redux';
import { store } from '../store';

export default function ClientShell({ children, lang }: { children: React.ReactNode, lang: string }) {
  const [currentLang, setCurrentLang] = useState(lang);
  const router = useRouter();
  const pathname = usePathname();

  const handleLangChange = (l: string) => {
    setCurrentLang(l);
    if (!pathname) return;
    const newPath = pathname.replace(/^\/[a-z]{2}/, '/' + l);
    router.push(newPath);
  };

  return (
    <Provider store={store}>
      <Header lang={currentLang} onLangChange={handleLangChange} />
      <main style={{flex:1,display:'flex',justifyContent:'center',alignItems:'flex-start',padding:'2rem 0',minHeight:'70vh'}}>
        <div style={{width:'100%',maxWidth:900,background:'#232526',borderRadius:'1.5rem',boxShadow:'0 4px 24px rgba(0,0,0,0.10)',padding:'2.5rem 2rem',margin:'0 1rem'}}>
          <ClientLayout>{children}</ClientLayout>
        </div>
      </main>
      <Footer />
    </Provider>
  );
} 