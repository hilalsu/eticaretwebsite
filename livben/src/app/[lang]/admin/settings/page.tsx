import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store';
import { UserRole } from '../../../../../types/roles';

const defaultSettings = {
  contactEmail: 'info@livben.com',
  ssrEnabled: true,
  defaultLanguage: 'tr',
  paymentEnabled: true,
};

export default function AdminSettingsPage() {
  const userRole = useSelector((state: RootState) => state.user.role);
  const [settings, setSettings] = useState(defaultSettings);

  if (userRole !== UserRole.Admin) {
    return (
      <main className="p-8">
        <h1 className="text-2xl font-bold mb-4">Erişim Engellendi</h1>
        <p>Bu sayfayı yalnızca admin kullanıcılar görebilir.</p>
      </main>
    );
  }

  return (
    <main className="p-8 max-w-lg">
      <h1 className="text-2xl font-bold mb-4">Site Ayarları</h1>
      <form className="flex flex-col gap-4">
        <label>
          İletişim E-posta:
          <input
            className="border p-2 rounded w-full"
            type="email"
            value={settings.contactEmail}
            onChange={e => setSettings(s => ({ ...s, contactEmail: e.target.value }))}
          />
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={settings.ssrEnabled}
            onChange={e => setSettings(s => ({ ...s, ssrEnabled: e.target.checked }))}
          />
          SSR Aktif
        </label>
        <label>
          Varsayılan Dil:
          <select
            className="border p-2 rounded w-full"
            value={settings.defaultLanguage}
            onChange={e => setSettings(s => ({ ...s, defaultLanguage: e.target.value }))}
          >
            <option value="tr">Türkçe</option>
            <option value="en">English</option>
            <option value="ar">العربية</option>
          </select>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={settings.paymentEnabled}
            onChange={e => setSettings(s => ({ ...s, paymentEnabled: e.target.checked }))}
          />
          Ödeme Aktif
        </label>
        <button type="submit" className="bg-blue-600 text-white p-2 rounded mt-2">Kaydet</button>
      </form>
    </main>
  );
} 