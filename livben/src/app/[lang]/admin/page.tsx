'use client';

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { translations } from '../../../i18n';
import { UserRole } from '../../../types/roles';

const pendingArticles = [
  { id: 1, title: 'E-Ticarette Güvenlik' },
];
const pendingComments = [
  { id: 1, text: 'Bu ürün stokta var mı?' },
];
const pendingFaqs = [
  { id: 1, question: 'Kargo kaç günde gelir?' },
];

export default function AdminPage({ params }: { params: { lang: string } }) {
  const t = translations[params.lang as keyof typeof translations] || translations['tr'];
  const userRole = useSelector((state: RootState) => state.user.role);
  const [pendingProducts, setPendingProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [approved, setApproved] = useState<number[]>([]);
  const [rejected, setRejected] = useState<number[]>([]);
  const [logs, setLogs] = useState<any[]>([]);
  const [logsLoading, setLogsLoading] = useState(false);
  const [logsError, setLogsError] = useState<string | null>(null);
  const [offers, setOffers] = useState<any[]>([]);
  const [offersLoading, setOffersLoading] = useState(false);
  const [offersError, setOffersError] = useState<string | null>(null);
  // Demo: Vitrin başvuruları (local state)
  const [showcaseApps, setShowcaseApps] = useState<{
    id: number;
    product: string;
    status: 'pending' | 'approved' | 'rejected';
  }[]>([
    { id: 1, product: 'Kamera', status: 'pending' },
    { id: 2, product: 'Tablet', status: 'pending' },
  ]);
  const [messages, setMessages] = useState<any[]>([]);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [messagesError, setMessagesError] = useState<string | null>(null);
  // Demo: Kullanıcılar
  const [users, setUsers] = useState([
    { id: 1, name: 'Ali Yılmaz', email: 'ali@example.com', role: 'Customer' },
    { id: 2, name: 'Ayşe Kaya', email: 'ayse@example.com', role: 'StoreOwner' },
    { id: 3, name: 'Admin', email: 'admin@example.com', role: 'Admin' },
  ]);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Customer' });
  // Demo: Mağazalar
  const [stores, setStores] = useState([
    { id: 1, name: 'TeknoShop', owner: 'Ayşe Kaya' },
    { id: 2, name: 'ModaDükkan', owner: 'Ali Yılmaz' },
  ]);
  const [newStore, setNewStore] = useState({ name: '', owner: '' });
  // Demo: Kategoriler
  const [categories, setCategories] = useState(['Elektronik', 'Moda', 'Ev']);
  const [newCategory, setNewCategory] = useState('');
  // Demo: Diller
  const [languages, setLanguages] = useState(['tr', 'en', 'ar', 'de', 'fr', 'ru']);
  const [newLanguage, setNewLanguage] = useState('');
  // Demo: Site ayarları
  const [siteSettings, setSiteSettings] = useState({ contact: '', about: '', ssr: '' });

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch('/api/products?pending=1')
      .then(res => {
        if (!res.ok) throw new Error('Onay bekleyen ürünler yüklenemedi');
        return res.json();
      })
      .then(data => setPendingProducts(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setLogsLoading(true);
    setLogsError(null);
    fetch('/api/logs')
      .then(res => {
        if (!res.ok) throw new Error('Loglar yüklenemedi');
        return res.json();
      })
      .then(data => setLogs(data))
      .catch(err => setLogsError(err.message))
      .finally(() => setLogsLoading(false));
  }, []);

  useEffect(() => {
    setOffersLoading(true);
    setOffersError(null);
    fetch('/api/offers')
      .then(res => {
        if (!res.ok) throw new Error('Teklifler yüklenemedi');
        return res.json();
      })
      .then(data => setOffers(data))
      .catch(err => setOffersError(err.message))
      .finally(() => setOffersLoading(false));
  }, []);

  useEffect(() => {
    setMessagesLoading(true);
    setMessagesError(null);
    fetch('/api/messages')
      .then(res => {
        if (!res.ok) throw new Error('Mesajlar yüklenemedi');
        return res.json();
      })
      .then(data => setMessages(data))
      .catch(err => setMessagesError(err.message))
      .finally(() => setMessagesLoading(false));
  }, []);

  const handleApprove = async (id: number) => {
    setActionLoading(id);
    setActionError(null);
    try {
      const product = pendingProducts.find(p => p.id === id);
      const res = await fetch('/api/products', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, action: 'approve' }),
      });
      if (!res.ok) throw new Error('Onaylama başarısız');
      await fetch('/api/logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'product_approve',
          message: `Ürün onaylandı: ${product?.name}`,
          user: 'admin_user',
        }),
      });
      setApproved([...approved, id]);
      setPendingProducts(pendingProducts.filter(p => p.id !== id));
    } catch (err: any) {
      setActionError(err.message);
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (id: number) => {
    setActionLoading(id);
    setActionError(null);
    try {
      const product = pendingProducts.find(p => p.id === id);
      const res = await fetch('/api/products', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, action: 'reject' }),
      });
      if (!res.ok) throw new Error('Reddetme başarısız');
      await fetch('/api/logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'product_reject',
          message: `Ürün reddedildi: ${product?.name}`,
          user: 'admin_user',
        }),
      });
      setRejected([...rejected, id]);
      setPendingProducts(pendingProducts.filter(p => p.id !== id));
    } catch (err: any) {
      setActionError(err.message);
    } finally {
      setActionLoading(null);
    }
  };

  const handleShowcaseApprove = (id: number) => {
    setShowcaseApps(apps => apps.map(app => app.id === id ? { ...app, status: 'approved' } : app));
  };

  const handleShowcaseReject = (id: number) => {
    setShowcaseApps(apps => apps.map(app => app.id === id ? { ...app, status: 'rejected' } : app));
  };

  if (userRole !== UserRole.Admin) {
    return (
      <main className="p-8">
        <h1 className="text-2xl font-bold mb-4">{t.adminTitle}</h1>
        <p style={{ color: 'red' }}>Bu sayfayı sadece adminler görebilir.</p>
      </main>
    );
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">{t.adminTitle}</h1>
      <p>{t.adminWelcome}</p>
      <section className="mb-6">
        <h2 className="text-xl font-bold mb-2">Onay Bekleyen Ürünler</h2>
        {loading && <div>Yükleniyor...</div>}
        {error && <div className="text-red-500">{error}</div>}
        {actionError && <div className="text-red-500">{actionError}</div>}
        <ul>
          {pendingProducts.map(p => (
            <li key={p.id} style={{marginBottom:'0.5rem'}}>
              {p.name}
              {approved.includes(p.id) && <span style={{color:'limegreen',marginLeft:8}}>Onaylandı</span>}
              {rejected.includes(p.id) && <span style={{color:'red',marginLeft:8}}>Reddedildi</span>}
              {!approved.includes(p.id) && !rejected.includes(p.id) && (
                <>
                  <button onClick={() => handleApprove(p.id)} style={{marginLeft:8}} disabled={actionLoading === p.id}>
                    {actionLoading === p.id ? 'Onaylanıyor...' : 'Onayla'}
                  </button>
                  <button onClick={() => handleReject(p.id)} style={{marginLeft:8}} disabled={actionLoading === p.id}>
                    {actionLoading === p.id ? 'Reddediliyor...' : 'Reddet'}
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-bold mb-2">Onay Bekleyen Makaleler</h2>
        <ul>
          {pendingArticles.map(a => (
            <li key={a.id}>{a.title}</li>
          ))}
        </ul>
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-bold mb-2">Onay Bekleyen Yorumlar</h2>
        <ul>
          {pendingComments.map(c => (
            <li key={c.id}>{c.text}</li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-bold mb-2">Onay Bekleyen SSS</h2>
        <ul>
          {pendingFaqs.map(f => (
            <li key={f.id}>{f.question}</li>
          ))}
        </ul>
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-bold mb-2">Log Kayıtları</h2>
        {logsLoading && <div>Yükleniyor...</div>}
        {logsError && <div className="text-red-500">{logsError}</div>}
        <ul>
          {logs.map(log => (
            <li key={log.id} className="mb-2">
              <span className="font-mono text-xs text-gray-400">{new Date(log.date).toLocaleString()} | </span>
              <span className="font-semibold">{log.user}</span> | 
              <span className="text-blue-700">{log.type}</span> | 
              <span>{log.message}</span>
            </li>
          ))}
        </ul>
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-bold mb-2">Teklifler</h2>
        {offersLoading && <div>Yükleniyor...</div>}
        {offersError && <div className="text-red-500">{offersError}</div>}
        <ul>
          {offers.map(offer => (
            <li key={offer.id} className="mb-2">
              <span className="font-mono text-xs text-gray-400">{new Date(offer.date).toLocaleString()} | </span>
              <span className="font-semibold">{offer.name}</span> | 
              <span>{offer.email}</span> | 
              <span>Ürün ID: {offer.productId}</span> | 
              <span className="text-blue-700">{offer.offerPrice} TL</span> | 
              <span>{offer.message}</span> | 
              <span className="text-xs">Durum: {offer.status}</span>
            </li>
          ))}
        </ul>
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-bold mb-2">Vitrin Başvuruları</h2>
        <ul>
          {showcaseApps.map(app => (
            <li key={app.id} className="mb-2">
              <span className="font-semibold">{app.product}</span> - 
              <span className={app.status === 'approved' ? 'text-green-600' : app.status === 'rejected' ? 'text-red-600' : 'text-yellow-600'}>
                {app.status === 'approved' ? 'Onaylandı' : app.status === 'rejected' ? 'Reddedildi' : 'Onay Bekliyor'}
              </span>
              {app.status === 'pending' && (
                <>
                  <button className="ml-4 bg-green-600 text-white px-2 py-1 rounded" onClick={() => handleShowcaseApprove(app.id)}>Onayla</button>
                  <button className="ml-2 bg-red-600 text-white px-2 py-1 rounded" onClick={() => handleShowcaseReject(app.id)}>Reddet</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-bold mb-2">Mesajlar</h2>
        {messagesLoading && <div>Yükleniyor...</div>}
        {messagesError && <div className="text-red-500">{messagesError}</div>}
        <ul>
          {messages.map(msg => (
            <li key={msg.id} className="mb-2">
              <span className="font-mono text-xs text-gray-400">{new Date(msg.date).toLocaleString()} | </span>
              <span className="font-semibold">{msg.name}</span> | 
              <span>{msg.email}</span> | 
              <span>{msg.text}</span>
            </li>
          ))}
        </ul>
      </section>
      {/* Kullanıcı Yönetimi */}
      <section className="mb-6">
        <h2 className="text-xl font-bold mb-2">Kullanıcılar</h2>
        <form className="flex gap-2 mb-2" onSubmit={e => { e.preventDefault(); setUsers([...users, { ...newUser, id: Date.now() }]); setNewUser({ name: '', email: '', role: 'Customer' }); }}>
          <input className="border p-2 rounded" placeholder="Ad Soyad" value={newUser.name} onChange={e => setNewUser(u => ({ ...u, name: e.target.value }))} required />
          <input className="border p-2 rounded" placeholder="E-posta" value={newUser.email} onChange={e => setNewUser(u => ({ ...u, email: e.target.value }))} required />
          <select className="border p-2 rounded" value={newUser.role} onChange={e => setNewUser(u => ({ ...u, role: e.target.value }))}>
            <option value="Customer">Müşteri</option>
            <option value="StoreOwner">Mağaza Sahibi</option>
            <option value="Admin">Admin</option>
          </select>
          <button className="bg-green-600 text-white px-4 rounded" type="submit">Ekle</button>
        </form>
        <ul>
          {users.map(u => (
            <li key={u.id} className="mb-1">
              {u.name} ({u.email}) - {u.role}
              <button className="ml-2 text-red-600" onClick={() => setUsers(users.filter(x => x.id !== u.id))}>Sil</button>
            </li>
          ))}
        </ul>
      </section>
      {/* Mağaza Yönetimi */}
      <section className="mb-6">
        <h2 className="text-xl font-bold mb-2">Mağazalar</h2>
        <form className="flex gap-2 mb-2" onSubmit={e => { e.preventDefault(); setStores([...stores, { ...newStore, id: Date.now() }]); setNewStore({ name: '', owner: '' }); }}>
          <input className="border p-2 rounded" placeholder="Mağaza Adı" value={newStore.name} onChange={e => setNewStore(s => ({ ...s, name: e.target.value }))} required />
          <input className="border p-2 rounded" placeholder="Sahibi" value={newStore.owner} onChange={e => setNewStore(s => ({ ...s, owner: e.target.value }))} required />
          <button className="bg-green-600 text-white px-4 rounded" type="submit">Ekle</button>
        </form>
        <ul>
          {stores.map(s => (
            <li key={s.id} className="mb-1">
              {s.name} (Sahibi: {s.owner})
              <button className="ml-2 text-red-600" onClick={() => setStores(stores.filter(x => x.id !== s.id))}>Sil</button>
            </li>
          ))}
        </ul>
      </section>
      {/* Kategori Yönetimi */}
      <section className="mb-6">
        <h2 className="text-xl font-bold mb-2">Kategoriler</h2>
        <form className="flex gap-2 mb-2" onSubmit={e => { e.preventDefault(); if(newCategory.length>1){ setCategories([newCategory, ...categories]); setNewCategory(''); } }}>
          <input className="border p-2 rounded" placeholder="Kategori Adı" value={newCategory} onChange={e => setNewCategory(e.target.value)} required />
          <button className="bg-green-600 text-white px-4 rounded" type="submit">Ekle</button>
        </form>
        <ul>
          {categories.map((c, i) => (
            <li key={i}>{c} <button className="ml-2 text-red-600" onClick={() => setCategories(categories.filter((_, j) => j !== i))}>Sil</button></li>
          ))}
        </ul>
      </section>
      {/* Dil Yönetimi */}
      <section className="mb-6">
        <h2 className="text-xl font-bold mb-2">Diller</h2>
        <form className="flex gap-2 mb-2" onSubmit={e => { e.preventDefault(); if(newLanguage.length>1){ setLanguages([newLanguage, ...languages]); setNewLanguage(''); } }}>
          <input className="border p-2 rounded" placeholder="Dil Kodu (ör: es)" value={newLanguage} onChange={e => setNewLanguage(e.target.value)} required />
          <button className="bg-green-600 text-white px-4 rounded" type="submit">Ekle</button>
        </form>
        <ul>
          {languages.map((l, i) => (
            <li key={i}>{l} <button className="ml-2 text-red-600" onClick={() => setLanguages(languages.filter((_, j) => j !== i))}>Sil</button></li>
          ))}
        </ul>
      </section>
      {/* Site Ayarları */}
      <section className="mb-6">
        <h2 className="text-xl font-bold mb-2">Site Ayarları</h2>
        <form className="flex flex-col gap-2 max-w-md" onSubmit={e => { e.preventDefault(); alert('Ayarlar kaydedildi (demo)'); }}>
          <input className="border p-2 rounded" placeholder="İletişim Bilgisi" value={siteSettings.contact} onChange={e => setSiteSettings(s => ({ ...s, contact: e.target.value }))} />
          <input className="border p-2 rounded" placeholder="Hakkımızda" value={siteSettings.about} onChange={e => setSiteSettings(s => ({ ...s, about: e.target.value }))} />
          <input className="border p-2 rounded" placeholder="SSR Bilgisi" value={siteSettings.ssr} onChange={e => setSiteSettings(s => ({ ...s, ssr: e.target.value }))} />
          <button className="bg-blue-600 text-white px-4 rounded" type="submit">Kaydet</button>
        </form>
      </section>
    </main>
  );
} 