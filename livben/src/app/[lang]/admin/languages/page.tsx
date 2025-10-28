import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store';
import { UserRole } from '../../../../../types/roles';
import { SUPPORTED_LANGUAGES } from '../../../../../i18n';

const exampleKeys = ['products_title', 'products_loading', 'products_error', 'products_empty'];

export default function AdminLanguagesPage() {
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
      <h1 className="text-2xl font-bold mb-4">Dil Yönetimi</h1>
      <h2 className="font-semibold mb-2">Desteklenen Diller</h2>
      <ul className="mb-6 flex flex-wrap gap-2">
        {SUPPORTED_LANGUAGES.map(lang => (
          <li key={lang} className="bg-gray-200 px-2 py-1 rounded text-sm">{lang.toUpperCase()}</li>
        ))}
      </ul>
      <h2 className="font-semibold mb-2">Çeviri Anahtarları</h2>
      <table className="w-full border mt-2">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Anahtar</th>
            <th className="p-2 border">Düzenle</th>
          </tr>
        </thead>
        <tbody>
          {exampleKeys.map(key => (
            <tr key={key} className="border-b">
              <td className="p-2 border">{key}</td>
              <td className="p-2 border">
                <button className="bg-blue-500 text-white px-2 py-1 rounded">Düzenle</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
} 