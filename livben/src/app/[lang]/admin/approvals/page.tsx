import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store';
import { UserRole } from '../../../../../types/roles';

const exampleData = {
  products: [
    { id: 1, name: 'Ürün 1' },
    { id: 2, name: 'Ürün 2' },
  ],
  comments: [
    { id: 1, text: 'Harika ürün!' },
    { id: 2, text: 'Teşekkürler.' },
  ],
  articles: [
    { id: 1, title: 'Makale 1' },
    { id: 2, title: 'Makale 2' },
  ],
  faqs: [
    { id: 1, question: 'Kargo kaç günde gelir?' },
    { id: 2, question: 'İade nasıl yapılır?' },
  ],
};

export default function AdminApprovalsPage() {
  const userRole = useSelector((state: RootState) => state.user.role);
  if (userRole !== UserRole.Admin) {
    return (
      <main className="p-8">
        <h1 className="text-2xl font-bold mb-4">Erişim Engellendi</h1>
        <p>Bu sayfayı yalnızca admin kullanıcılar görebilir.</p>
      </main>
    );
  }
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Onay Bekleyenler</h1>
      <section className="mb-6">
        <h2 className="font-semibold mb-2">Ürünler</h2>
        <ul>
          {exampleData.products.map((p) => (
            <li key={p.id} className="mb-1 flex items-center gap-2">
              {p.name}
              <button className="bg-green-500 text-white px-2 py-1 rounded">Onayla</button>
              <button className="bg-red-500 text-white px-2 py-1 rounded">Reddet</button>
            </li>
          ))}
        </ul>
      </section>
      <section className="mb-6">
        <h2 className="font-semibold mb-2">Yorumlar</h2>
        <ul>
          {exampleData.comments.map((c) => (
            <li key={c.id} className="mb-1 flex items-center gap-2">
              {c.text}
              <button className="bg-green-500 text-white px-2 py-1 rounded">Onayla</button>
              <button className="bg-red-500 text-white px-2 py-1 rounded">Reddet</button>
            </li>
          ))}
        </ul>
      </section>
      <section className="mb-6">
        <h2 className="font-semibold mb-2">Makaleler</h2>
        <ul>
          {exampleData.articles.map((a) => (
            <li key={a.id} className="mb-1 flex items-center gap-2">
              {a.title}
              <button className="bg-green-500 text-white px-2 py-1 rounded">Onayla</button>
              <button className="bg-red-500 text-white px-2 py-1 rounded">Reddet</button>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="font-semibold mb-2">SSS</h2>
        <ul>
          {exampleData.faqs.map((f) => (
            <li key={f.id} className="mb-1 flex items-center gap-2">
              {f.question}
              <button className="bg-green-500 text-white px-2 py-1 rounded">Onayla</button>
              <button className="bg-red-500 text-white px-2 py-1 rounded">Reddet</button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
} 