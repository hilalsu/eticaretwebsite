'use client';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchExampleData } from '../store/apiSlice';

export default function ApiDemo() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector((state: RootState) => state.api);

  return (
    <div className="p-4 bg-gray-200 rounded mb-4">
      <button
        onClick={() => dispatch(fetchExampleData())}
        className="px-4 py-2 bg-blue-600 text-white rounded"
        disabled={loading}
      >
        API Çağrısı Yap
      </button>
      {loading && <p>Yükleniyor...</p>}
      {error && <p style={{ color: 'red' }}>Hata: {error}</p>}
      {data && <p style={{ color: 'green' }}>Sonuç: {data.message}</p>}
    </div>
  );
} 