import './globals.css';
import { isRtl } from '../i18n';
import React from 'react';
import ClientShell from './ClientShell';

export const metadata = {
  title: 'Livben - Çok Dilli E-Ticaret',
  description: 'SSR, çok dilli, kullanıcı rolleri ve modern e-ticaret platformu.',
};

export default function RootLayout({ children, params }: { children: React.ReactNode, params: { lang?: string } }) {
  const lang = params?.lang || 'tr';
  const dir = isRtl(lang) ? 'rtl' : 'ltr';
  return (
    <html lang={lang} dir={dir}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body style={{margin:0,padding:0,background:'#181a1b',minHeight:'100vh',display:'flex',flexDirection:'column'}}>
        <ClientShell lang={lang}>{children}</ClientShell>
      </body>
    </html>
  );
} 