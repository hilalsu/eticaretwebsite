import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store';
import { UserRole } from '../../../../../types/roles';

const exampleStores = [
  { id: 1, name: 'TeknoShop', owner: 'Ayşe Kaya', email: 'ayse@store.com', status: 'Aktif' },
  { id: 2, name: 'ModaDükkan', owner: 'Ali Yılmaz', email: 'ali@store.com', status: 'Pasif' },
];

export default function AdminStoresPage() {
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
      <h1 className="text-2xl font-bold mb-4">Mağaza Yönetimi</h1>
      <table className="w-full border mt-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Mağaza Adı</th>
            <th className="p-2 border">Sahibi</th>
            <th className="p-2 border">E-posta</th>
            <th className="p-2 border">Durum</th>
            <th className="p-2 border">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {exampleStores.map((store) => (
            <tr key={store.id} className="border-b">
              <td className="p-2 border">{store.name}</td>
              <td className="p-2 border">{store.owner}</td>
              <td className="p-2 border">{store.email}</td>
              <td className="p-2 border">{store.status}</td>
              <td className="p-2 border flex gap-2">
                <button className="bg-blue-500 text-white px-2 py-1 rounded">Düzenle</button>
                <button className="bg-red-500 text-white px-2 py-1 rounded">Sil</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
} 