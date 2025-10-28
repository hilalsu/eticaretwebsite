"use client";
import React, { useEffect, useState } from "react";
import Link from 'next/link';

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  currency: string;
  approved: boolean;
};

const currencyRates = {
  TRY: 1,
  USD: 1 / 32,
  EUR: 1 / 35,
};
const currencySymbols = {
  TRY: '₺',
  USD: '$',
  EUR: '€',
};

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-ğüşöçıİĞÜŞÖÇ]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [deleteLoading, setDeleteLoading] = useState<number | null>(null);
  const [offerModal, setOfferModal] = useState<{ open: boolean; product: Product | null }>({ open: false, product: null });
  const [offerName, setOfferName] = useState('');
  const [offerEmail, setOfferEmail] = useState('');
  const [offerPrice, setOfferPrice] = useState('');
  const [offerMessage, setOfferMessage] = useState('');
  const [offerLoading, setOfferLoading] = useState(false);
  const [offerError, setOfferError] = useState<string | null>(null);
  const [offerSuccess, setOfferSuccess] = useState<string | null>(null);
  const [addCurrency, setAddCurrency] = useState<'TRY' | 'USD' | 'EUR'>('TRY');
  const [displayCurrency, setDisplayCurrency] = useState<'TRY' | 'USD' | 'EUR'>('TRY');
  // Canlı destek/mesaj kutusu
  const [supportOpen, setSupportOpen] = useState(false);
  const [supportName, setSupportName] = useState('');
  const [supportEmail, setSupportEmail] = useState('');
  const [supportText, setSupportText] = useState('');
  const [supportLoading, setSupportLoading] = useState(false);
  const [supportError, setSupportError] = useState<string | null>(null);
  const [supportSuccess, setSupportSuccess] = useState<string | null>(null);

  const fetchProducts = () => {
    setLoading(true);
    setError(null);
    fetch("/api/products")
      .then((res) => {
        if (!res.ok) throw new Error('Ürünler yüklenemedi');
        return res.json();
      })
      .then((data) => setProducts(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddLoading(true);
    setAddError(null);
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, price: Number(price), image, currency: addCurrency }),
      });
      if (!res.ok) throw new Error('Ürün eklenemedi');
      await fetch('/api/logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'product_add',
          message: `Ürün eklendi: ${name}`,
          user: 'demo_user',
        }),
      });
      setName('');
      setPrice('');
      setImage('');
      setAddCurrency('TRY');
      fetchProducts();
    } catch (err: any) {
      setAddError(err.message);
    } finally {
      setAddLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    setDeleteLoading(id);
    try {
      const product = products.find(p => p.id === id);
      const res = await fetch('/api/products', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error('Ürün silinemedi');
      await fetch('/api/logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'product_delete',
          message: `Ürün silindi: ${product?.name}`,
          user: 'demo_user',
        }),
      });
      fetchProducts();
    } catch (err) {
      alert('Ürün silinemedi!');
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleOfferSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!offerModal.product) return;
    setOfferLoading(true);
    setOfferError(null);
    setOfferSuccess(null);
    try {
      const res = await fetch('/api/offers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: offerModal.product.id,
          name: offerName,
          email: offerEmail,
          offerPrice: Number(offerPrice),
          message: offerMessage,
        }),
      });
      if (!res.ok) throw new Error('Teklif gönderilemedi');
      await fetch('/api/logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'offer_create',
          message: `Teklif verildi: ${offerModal.product.name} (${offerPrice} TL)`,
          user: offerName || 'anonim',
        }),
      });
      setOfferSuccess('Teklifiniz iletildi!');
      setOfferName('');
      setOfferEmail('');
      setOfferPrice('');
      setOfferMessage('');
    } catch (err: any) {
      setOfferError(err.message);
    } finally {
      setOfferLoading(false);
    }
  };

  const handleSupportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSupportLoading(true);
    setSupportError(null);
    setSupportSuccess(null);
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: supportName, email: supportEmail, text: supportText }),
      });
      if (!res.ok) throw new Error('Mesaj gönderilemedi');
      setSupportSuccess('Mesajınız iletildi!');
      setSupportName('');
      setSupportEmail('');
      setSupportText('');
      setTimeout(() => { setSupportOpen(false); setSupportSuccess(null); }, 2000);
    } catch (err: any) {
      setSupportError(err.message);
    } finally {
      setSupportLoading(false);
    }
  };

  // Demo: Vitrin ürünleri (onaylı ilk 2 ürün)
  const showcaseProducts = products.filter(p => p.approved).slice(0, 2);

  return (
    <main className="p-8">
      {/* Vitrin Ürünleri */}
      {showcaseProducts.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-yellow-400">Vitrin Ürünleri</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {showcaseProducts.map(product => (
              <div key={product.id} className="border-2 border-yellow-400 p-4 rounded shadow-lg bg-yellow-50">
                <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-2 rounded" loading="lazy" />
                <h2 className="text-lg font-semibold">
                  <Link href={`/tr/product/${slugify(product.name)}-${product.id}.html`} className="text-blue-400 hover:underline" aria-label={`Ürün detayı: ${product.name}`}>
                    {product.name}
                  </Link>
                </h2>
                <p className="text-green-700 font-bold">
                  {(
                    product.currency === displayCurrency
                      ? product.price
                      : Math.round(product.price / currencyRates[product.currency] * currencyRates[displayCurrency])
                  ).toLocaleString()} {currencySymbols[displayCurrency]}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
        <h1 className="text-2xl font-bold">Ürünler</h1>
        <div>
          <label className="mr-2 font-semibold">Para Birimi:</label>
          <select value={displayCurrency} onChange={e => setDisplayCurrency(e.target.value as any)} className="border p-2 rounded">
            <option value="TRY">TL</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>
      </div>
      <form className="flex flex-col md:flex-row gap-2 mb-6" onSubmit={handleAdd}>
        <input className="border p-2 rounded flex-1" type="text" placeholder="Ürün Adı" value={name} onChange={e => setName(e.target.value)} required />
        <input className="border p-2 rounded w-32" type="number" placeholder="Fiyat" value={price} onChange={e => setPrice(e.target.value)} required />
        <input className="border p-2 rounded flex-1" type="text" placeholder="Görsel URL" value={image} onChange={e => setImage(e.target.value)} required />
        <select className="border p-2 rounded w-24" value={addCurrency} onChange={e => setAddCurrency(e.target.value as any)} required>
          <option value="TRY">TL</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>
        <button className="bg-green-600 text-white p-2 rounded min-w-[100px]" type="submit" disabled={addLoading}>{addLoading ? 'Ekleniyor...' : 'Ekle'}</button>
      </form>
      {addError && <div className="text-red-500 mb-4">{addError}</div>}
      {loading && <div className="text-center text-lg">Yükleniyor...</div>}
      {error && <div className="text-center text-red-500 font-bold">{error}</div>}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product.id} className="border p-4 rounded">
              <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-2" />
              <h2 className="text-lg font-semibold">
                <Link href={`/tr/product/${slugify(product.name)}-${product.id}.html`} className="text-blue-400 hover:underline" aria-label={`Ürün detayı: ${product.name}`}>
                  {product.name}
                </Link>
              </h2>
              <p className="text-green-700 font-bold">
                {(
                  product.currency === displayCurrency
                    ? product.price
                    : Math.round(product.price / currencyRates[product.currency] * currencyRates[displayCurrency])
                ).toLocaleString()} {currencySymbols[displayCurrency]}
              </p>
              <button className="bg-red-600 text-white px-3 py-1 rounded mt-2" onClick={() => handleDelete(product.id)} disabled={deleteLoading === product.id} aria-label={`Ürünü sil: ${product.name}`}>
                {deleteLoading === product.id ? 'Siliniyor...' : 'Sil'}
              </button>
              <button className="bg-blue-600 text-white px-3 py-1 rounded mt-2 ml-2" onClick={() => setOfferModal({ open: true, product })} aria-label={`Teklif ver: ${product.name}`}>
                Teklif Ver
              </button>
            </div>
          ))}
        </div>
      )}
      {offerModal.open && offerModal.product && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white text-black rounded-lg p-6 w-full max-w-md relative">
            <button className="absolute top-2 right-2 text-xl" onClick={() => setOfferModal({ open: false, product: null })}>&times;</button>
            <h2 className="text-xl font-bold mb-2">Teklif Ver: {offerModal.product.name}</h2>
            <form className="flex flex-col gap-2" onSubmit={handleOfferSubmit}>
              <input className="border p-2 rounded" type="text" placeholder="Adınız" value={offerName} onChange={e => setOfferName(e.target.value)} required />
              <input className="border p-2 rounded" type="email" placeholder="E-posta" value={offerEmail} onChange={e => setOfferEmail(e.target.value)} required />
              <input className="border p-2 rounded" type="number" placeholder="Teklif Fiyatı" value={offerPrice} onChange={e => setOfferPrice(e.target.value)} required />
              <textarea className="border p-2 rounded" placeholder="Mesajınız (isteğe bağlı)" value={offerMessage} onChange={e => setOfferMessage(e.target.value)} />
              <button className="bg-blue-600 text-white p-2 rounded mt-2" type="submit" disabled={offerLoading}>{offerLoading ? 'Gönderiliyor...' : 'Teklif Gönder'}</button>
            </form>
            {offerError && <div className="text-red-500 mt-2">{offerError}</div>}
            {offerSuccess && <div className="text-green-600 mt-2">{offerSuccess}</div>}
          </div>
        </div>
      )}
      {/* Canlı Destek Butonu */}
      <button
        className="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full shadow-lg p-4 z-50 hover:bg-blue-700"
        style={{fontSize:'1.5rem'}}
        onClick={() => setSupportOpen(true)}
        aria-label="Canlı Destek"
      >
        💬
      </button>
      {/* Canlı Destek Modal */}
      {supportOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white text-black rounded-lg p-6 w-full max-w-md relative">
            <button className="absolute top-2 right-2 text-xl" onClick={() => setSupportOpen(false)}>&times;</button>
            <h2 className="text-xl font-bold mb-2">Canlı Destek</h2>
            <form className="flex flex-col gap-2" onSubmit={handleSupportSubmit}>
              <input className="border p-2 rounded" type="text" placeholder="Adınız" value={supportName} onChange={e => setSupportName(e.target.value)} required />
              <input className="border p-2 rounded" type="email" placeholder="E-posta" value={supportEmail} onChange={e => setSupportEmail(e.target.value)} required />
              <textarea className="border p-2 rounded" placeholder="Mesajınız" value={supportText} onChange={e => setSupportText(e.target.value)} required />
              <button className="bg-blue-600 text-white p-2 rounded mt-2" type="submit" disabled={supportLoading}>{supportLoading ? 'Gönderiliyor...' : 'Gönder'}</button>
            </form>
            {supportError && <div className="text-red-500 mt-2">{supportError}</div>}
            {supportSuccess && <div className="text-green-600 mt-2">{supportSuccess}</div>}
          </div>
        </div>
      )}
    </main>
  );
} 