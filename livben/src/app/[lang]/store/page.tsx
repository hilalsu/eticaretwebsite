'use client';

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { translations } from '../../../i18n';
import { UserRole } from '../../../types/roles';

export default function StorePage({ params }: { params: { lang: string } }) {
  const t = translations[params.lang as keyof typeof translations] || translations['tr'];
  const userRole = useSelector((state: RootState) => state.user.role);
  const allowedRoles = [UserRole.StoreOwner, UserRole.Admin];

  const [products, setProducts] = useState<string[]>(['Kamera', 'Tablet']);
  const [newProduct, setNewProduct] = useState('');
  const [articles, setArticles] = useState<string[]>(['E-Ticaret İpuçları']);
  const [newArticle, setNewArticle] = useState('');
  const [offers, setOffers] = useState<any[]>([]);
  const [offersLoading, setOffersLoading] = useState(false);
  const [offersError, setOffersError] = useState<string | null>(null);
  const [packageActive, setPackageActive] = useState(true);
  const [packageExpire, setPackageExpire] = useState<Date>(() => {
    const now = new Date();
    now.setFullYear(now.getFullYear() + 1);
    return now;
  });
  const [packageMessage, setPackageMessage] = useState('');
  const [showcaseApps, setShowcaseApps] = useState<{ product: string; status: 'pending' | 'approved' }[]>([]);
  const [showcaseProduct, setShowcaseProduct] = useState('');
  const [showcaseMsg, setShowcaseMsg] = useState('');

  const buyPackage = () => {
    const now = new Date();
    now.setFullYear(now.getFullYear() + 1);
    setPackageExpire(now);
    setPackageActive(true);
    setPackageMessage('Paket başarıyla satın alındı!');
    setTimeout(() => setPackageMessage(''), 3000);
  };

  useEffect(() => {
    if (packageExpire < new Date()) {
      setPackageActive(false);
    }
  }, [packageExpire]);

  // Teklifleri çek
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

  const handleShowcaseApply = () => {
    if (!showcaseProduct) return;
    setShowcaseApps([...showcaseApps, { product: showcaseProduct, status: 'pending' }]);
    setShowcaseMsg('Vitrin başvurunuz alındı, admin onayı bekliyor.');
    setTimeout(() => setShowcaseMsg(''), 3000);
    setShowcaseProduct('');
  };

  if (!allowedRoles.includes(userRole)) {
    return (
      <main className="p-8">
        <h1 className="text-2xl font-bold mb-4">{t.storeTitle}</h1>
        <p style={{ color: 'red' }}>Bu sayfayı sadece mağaza sahipleri ve adminler görebilir.</p>
      </main>
    );
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">{t.storeTitle}</h1>
      <p>{t.storeWelcome}</p>
      <section className="mb-6">
        <h2 className="text-xl font-bold mb-2">Paket Durumu</h2>
        <div className="mb-2">
          {packageActive ? (
            <span className="text-green-600 font-semibold">Aktif</span>
          ) : (
            <span className="text-red-600 font-semibold">Süresi Doldu</span>
          )}
          {' '}| Bitiş Tarihi: {packageExpire.toLocaleDateString()}
        </div>
        {!packageActive && (
          <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={buyPackage}>Paket Satın Al</button>
        )}
        {packageMessage && <div className="text-green-600 mt-2">{packageMessage}</div>}
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-bold mb-2">Ürünlerim</h2>
        <ul>
          {products.map((p, i) => <li key={i}>{p}</li>)}
        </ul>
        <input value={newProduct} onChange={e => setNewProduct(e.target.value)} placeholder="Yeni ürün adı" style={{marginRight:8}} disabled={!packageActive} />
        <button onClick={() => { if(newProduct.length>2 && packageActive){ setProducts([newProduct, ...products]); setNewProduct(''); } }} disabled={!packageActive}>Ekle</button>
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-bold mb-2">Ürünlerime Gelen Teklifler</h2>
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
      <section>
        <h2 className="text-xl font-bold mb-2">Makalelerim</h2>
        <ul>
          {articles.map((a, i) => <li key={i}>{a}</li>)}
        </ul>
        <input value={newArticle} onChange={e => setNewArticle(e.target.value)} placeholder="Yeni makale başlığı" style={{marginRight:8}} />
        <button onClick={() => { if(newArticle.length>2){ setArticles([newArticle, ...articles]); setNewArticle(''); } }}>Ekle</button>
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-bold mb-2">Vitrin Başvurusu</h2>
        <div className="flex gap-2 mb-2">
          <select value={showcaseProduct} onChange={e => setShowcaseProduct(e.target.value)} className="border p-2 rounded">
            <option value="">Ürün seçin</option>
            {products.map((p, i) => <option key={i} value={p}>{p}</option>)}
          </select>
          <button className="bg-yellow-500 text-white px-4 py-2 rounded" onClick={handleShowcaseApply} disabled={!showcaseProduct}>Vitrin Başvurusu Yap</button>
        </div>
        {showcaseMsg && <div className="text-green-600 mb-2">{showcaseMsg}</div>}
        <ul>
          {showcaseApps.map((app, i) => (
            <li key={i}>{app.product} - <span className={app.status === 'approved' ? 'text-green-600' : 'text-yellow-600'}>{app.status === 'approved' ? 'Onaylandı' : 'Onay Bekliyor'}</span></li>
          ))}
        </ul>
      </section>
    </main>
  );
} 