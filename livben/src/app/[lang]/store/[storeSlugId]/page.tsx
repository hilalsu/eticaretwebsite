'use client';
import React from 'react';
export default function StoreDetailPage({ params }: { params: { storeSlugId: string } }) {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Mağaza Detayı</h1>
      <p>Mağaza: {params.storeSlugId}</p>
      {/* Burada mağaza detayları ve ürünleri listelenebilir */}
    </main>
  );
} 