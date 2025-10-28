import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../../../store';
import { fetchProductsStart, fetchProductsSuccess, fetchProductsFailure } from '../../../../store/productsSlice';
import { translate } from '../../../../i18n/translate';
import PaymentDemo from '../../../../components/PaymentDemo';
import { formatCurrency, Currency } from '../../../../utils/currency';

const currencies = ['TRY', 'USD', 'EUR'];

const products = [
  { id: 254521, name: 'Akıllı Telefon', price: 19999, currency: 'TRY' as Currency },
  { id: 513842, name: 'Laptop', price: 1200, currency: 'EUR' as Currency },
  { id: 123456, name: 'Headphones', price: 300, currency: 'USD' as Currency },
];

export default function StoreProductsPage({ params }: { params: { lang: string } }) {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector((state: RootState) => state.products);
  const lang = params?.lang || 'tr';
  const [currency, setCurrency] = useState<Currency>('TRY');

  const [t, setT] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const loadTranslations = async () => {
      const keys = [
        'products_title',
        'products_loading',
        'products_error',
        'products_empty',
      ];
      const translations: { [key: string]: string } = {};
      for (const key of keys) {
        translations[key] = await translate(lang, key);
      }
      setT(translations);
    };
    loadTranslations();
  }, [lang]);

  useEffect(() => {
    dispatch(fetchProductsStart());
    // Simüle API çağrısı
    setTimeout(() => {
      // Başarılı örnek veri
      const products = [
        { id: 1, name: 'Ürün 1', price: 100 },
        { id: 2, name: 'Ürün 2', price: 200 },
      ];
      dispatch(fetchProductsSuccess(products));
      // Hata için şunu kullanabilirsiniz:
      // dispatch(fetchProductsFailure('Ürünler yüklenemedi.'));
    }, 1000);
  }, [dispatch]);

  return (
    <main className="p-8">
      <div className="mb-4 flex gap-2 items-center">
        <label>Para Birimi:</label>
        <select value={currency} onChange={e => setCurrency(e.target.value as Currency)} className="border p-1 rounded">
          {currencies.map(cur => (
            <option key={cur} value={cur}>{cur}</option>
          ))}
        </select>
      </div>
      <PaymentDemo />
      <h1 className="text-2xl font-bold mb-4">{t.products_title || 'Ürünlerim'}</h1>
      {loading && <p>{t.products_loading || 'Yükleniyor...'}</p>}
      {error && <p className="text-red-500">{t.products_error || error}</p>}
      <ul>
        {items.length === 0 && !loading && <li>{t.products_empty || 'Ürün bulunamadı.'}</li>}
        {items.map((product) => (
          <li key={product.id} className="mb-2">
            <a href={`/${params.lang}/magaza-ismi-${product.id}.html`} className="text-blue-500 underline">
              {product.name}
            </a>
            : {formatCurrency(product.price, currency)}
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm text-gray-500">
        SEO uyumlu örnek URL: <b>/{params.lang}/magaza-ismi-{products[0].id}.html</b>
      </p>
    </main>
  );
} 