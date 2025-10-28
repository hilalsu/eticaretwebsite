import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { login, logout } from '../store/userSlice';
import { UserRole } from '../types/roles';

const users = [
  { id: '1', name: 'Ziyaretçi', email: '', role: UserRole.Guest },
  { id: '2', name: 'Üye', email: 'user@example.com', role: UserRole.Customer },
  { id: '3', name: 'Mağaza Sahibi', email: 'store@example.com', role: UserRole.StoreOwner },
  { id: '4', name: 'Admin', email: 'admin@example.com', role: UserRole.Admin },
];

export default function UserRoleSwitcher() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);

  return (
    <div className="flex items-center gap-4 p-4 bg-gray-100 rounded mb-4">
      <span>Aktif Kullanıcı: <b>{user.name || 'Yok'}</b> ({user.role})</span>
      <select
        value={user.role}
        onChange={e => {
          const selected = users.find(u => u.role === e.target.value);
          if (selected) {
            dispatch(login(selected));
          }
        }}
        className="border p-1 rounded"
      >
        {users.map(u => (
          <option key={u.role} value={u.role}>{u.name}</option>
        ))}
      </select>
      <button
        className="ml-2 px-3 py-1 bg-red-500 text-white rounded"
        onClick={() => dispatch(logout())}
      >
        Çıkış Yap
      </button>
    </div>
  );
} 