'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { translations } from '../../../i18n';
import { UserRole } from '../../../types/roles';

const orders = [
  { id: 1, product: 'Akıllı Telefon', date: '2024-06-01', status: 'Teslim Edildi' },
  { id: 2, product: 'Laptop', date: '2024-05-20', status: 'Kargoda' },
];

export default function UserPage({ params }: { params: Promise<{ lang: string }> }) {
  const [lang, setLang] = React.useState('tr');
  React.useEffect(() => {
    params.then(p => setLang(p.lang || 'tr'));
  }, [params]);
  const t = translations[lang as keyof typeof translations] || translations['tr'];
  const user = useSelector((state: RootState) => state.user);
  const allowedRoles = [UserRole.Customer, UserRole.StoreOwner, UserRole.Admin];

  if (!allowedRoles.includes(user.role)) {
    return (
      <main className="p-8">
        <h1 className="text-2xl font-bold mb-4">{t.userTitle}</h1>
        <p style={{ color: 'red' }}>Bu sayfayı sadece giriş yapmış kullanıcılar görebilir.</p>
      </main>
    );
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">{t.userTitle}</h1>
      <p>{t.userWelcome}</p>
      <section className="mb-6">
        <h2 className="text-xl font-bold mb-2">Profil Bilgileri</h2>
        <ul>
          <li><b>Ad:</b> {user.name || '-'}</li>
          <li><b>E-posta:</b> {user.email || '-'}</li>
          <li><b>Rol:</b> {user.role}</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-bold mb-2">Sipariş Geçmişi</h2>
        <ul>
          {orders.map(o => (
            <li key={o.id}>{o.product} - {o.date} - {o.status}</li>
          ))}
        </ul>
      </section>
    </main>
  );
} 