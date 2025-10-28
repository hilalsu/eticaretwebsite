'use client';
import React from 'react';
export default function ProductDetailPage({ params }: { params: { productSlugId: string } }) {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Ürün Detayı</h1>
      <p>Ürün: {params.productSlugId}</p>
      {/* Burada ürün detayları gösterilebilir */}
    </main>
  );
} 