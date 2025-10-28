"use client";
import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../../store/userSlice';
import { useRouter } from 'next/navigation';
import { UserRole } from '../../../types/roles';

export default function RegisterPage({ params }: { params: Promise<{ lang: string }> }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [role, setRole] = React.useState(UserRole.Customer);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [lang, setLang] = React.useState('tr');
  const [rememberMe, setRememberMe] = React.useState(false);

  React.useEffect(() => {
    params.then(p => setLang(p.lang || 'tr'));
  }, [params]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userData = { id: Date.now().toString(), name, email, role };
    dispatch(login(userData));
    if (rememberMe) {
      localStorage.setItem('user', JSON.stringify(userData));
    } else {
      localStorage.removeItem('user');
    }
    if (role === UserRole.StoreOwner) router.push(`/${lang}/store`);
    else router.push(`/${lang}/user`);
  };

  return (
    <main className="p-8 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-4">Kayıt Ol</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input className="border p-2 rounded" type="text" placeholder="Ad Soyad" value={name} onChange={e => setName(e.target.value)} required />
        <input className="border p-2 rounded" type="email" placeholder="E-posta" value={email} onChange={e => setEmail(e.target.value)} required />
        <input className="border p-2 rounded" type="password" placeholder="Şifre" value={password} onChange={e => setPassword(e.target.value)} required />
        <select className="border p-2 rounded" value={role} onChange={e => setRole(e.target.value as UserRole)} required>
          <option value={UserRole.Customer}>Müşteri</option>
          <option value={UserRole.StoreOwner}>Mağaza Sahibi</option>
        </select>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} />
          Beni Hatırla
        </label>
        <button className="bg-green-600 text-white p-2 rounded" type="submit">Kayıt Ol</button>
      </form>
    </main>
  );
} 