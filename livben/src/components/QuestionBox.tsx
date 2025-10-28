'use client';
import React, { useState } from 'react';

export default function QuestionBox({ onSend }: { onSend?: (msg: string) => void }) {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSend = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      // Simüle API
      await new Promise((res) => setTimeout(res, 1000));
      if (value.length < 3) throw new Error('En az 3 karakter girin!');
      setSuccess(true);
      setValue('');
      onSend?.(value);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-gray-800 rounded mb-4" style={{maxWidth:400}}>
      <textarea
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Sorunuzu, teklifinizi veya cevabınızı yazın..."
        rows={3}
        style={{width:'100%',fontSize:'1rem',padding:'0.5rem',borderRadius:'0.25rem'}}
        disabled={loading}
      />
      <button
        onClick={handleSend}
        disabled={loading}
        style={{marginTop:'0.5rem',padding:'0.5rem 1.5rem',background:'#4af',color:'#111',border:'none',borderRadius:'0.25rem',fontWeight:600,fontSize:'1rem'}}
      >
        Gönder
      </button>
      {loading && <p>Gönderiliyor...</p>}
      {error && <p style={{color:'red'}}>{error}</p>}
      {success && <p style={{color:'limegreen'}}>Başarıyla gönderildi!</p>}
    </div>
  );
} 