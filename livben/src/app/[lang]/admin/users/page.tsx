import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store';
import { UserRole } from '../../../../../types/roles';

const exampleUsers = [
  { id: 1, name: 'Ali Yılmaz', email: 'ali@example.com', role: UserRole.Customer },
  { id: 2, name: 'Ayşe Kaya', email: 'ayse@example.com', role: UserRole.StoreOwner },
  { id: 3, name: 'Admin', email: 'admin@example.com', role: UserRole.Admin },
];

export default function AdminUsersPage() {
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
      <h1 className="text-2xl font-bold mb-4">Kullanıcı Yönetimi</h1>
      <table className="w-full border mt-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Ad Soyad</th>
            <th className="p-2 border">E-posta</th>
            <th className="p-2 border">Rol</th>
            <th className="p-2 border">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {exampleUsers.map((user) => (
            <tr key={user.id} className="border-b">
              <td className="p-2 border">{user.name}</td>
              <td className="p-2 border">{user.email}</td>
              <td className="p-2 border">{user.role}</td>
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