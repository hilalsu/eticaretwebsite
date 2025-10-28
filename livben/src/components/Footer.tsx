import React from 'react';

export default function Footer() {
  return (
    <footer style={{
      width: '100%',
      background: 'linear-gradient(90deg, #232526 0%, #414345 100%)',
      color: '#fff',
      padding: '1.5rem 0 1rem 0',
      marginTop: '2rem',
      textAlign: 'center',
      fontSize: '1rem',
      borderTop: '1px solid #222',
    }}>
      <div style={{marginBottom:'0.5rem'}}>
        <a href="/tr/about" style={{color:'#4af',margin:'0 1rem'}}>Hakkında</a>
        <a href="/tr/contact" style={{color:'#4af',margin:'0 1rem'}}>İletişim</a>
        <a href="/tr/faq" style={{color:'#4af',margin:'0 1rem'}}>SSS</a>
        <a href="/tr/blog" style={{color:'#4af',margin:'0 1rem'}}>Blog</a>
      </div>
      <div style={{marginBottom:'0.5rem'}}>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{margin:'0 0.5rem'}} aria-label="Twitter">🐦</a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{margin:'0 0.5rem'}} aria-label="Facebook">📘</a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{margin:'0 0.5rem'}} aria-label="Instagram">📸</a>
      </div>
      <div style={{fontSize:'0.95rem',color:'#aaa'}}>© {new Date().getFullYear()} Livben. Tüm hakları saklıdır.</div>
    </footer>
  );
} 