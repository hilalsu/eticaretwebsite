import React, { useState } from 'react';
import QuestionBox from '../../../components/QuestionBox';

export default function CommentsPage() {
  const [messages, setMessages] = useState<string[]>([]);
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Yorumlar & Sorular</h1>
      <QuestionBox onSend={msg => setMessages([msg, ...messages])} />
      <ul className="mt-4 list-disc list-inside">
        {messages.map((msg, i) => (
          <li key={i} style={{marginBottom:'0.5rem'}}>{msg} <span style={{fontSize:'0.9rem',color:'#aaa'}}>({new Date().toLocaleString()})</span></li>
        ))}
      </ul>
    </main>
  );
} 