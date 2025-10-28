import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../../store/userSlice';
import { useRouter } from 'next/navigation';
import { UserRole } from '../../../types/roles';

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [rememberMe, setRememberMe] = React.useState(false);

  // Demo: Sahte kullanıcı kontrolü (gerçek projede API ile yapılır)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo: Her giriş başarılı kabul edilir
    const userData = {
      id: Date.now().toString(),
      name: 'Demo Kullanıcı',
      email,
      role: UserRole.Customer,
    };
    dispatch(login(userData));
    if (rememberMe) {
      localStorage.setItem('user', JSON.stringify(userData));
    } else {
      localStorage.removeItem('user');
    }
    router.push('/');
  };

  return (
    <main className="p-8 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-4">Giriş Yap</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input className="border p-2 rounded" type="email" placeholder="E-posta" value={email} onChange={e => setEmail(e.target.value)} required />
        <input className="border p-2 rounded" type="password" placeholder="Şifre" value={password} onChange={e => setPassword(e.target.value)} required />
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} />
          Beni Hatırla
        </label>
        <button className="bg-blue-600 text-white p-2 rounded" type="submit">Giriş</button>
      </form>
    </main>
  );
} 