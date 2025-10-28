'use client';

import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { store } from '../store';
import UserRoleSwitcher from '../components/UserRoleSwitcher';
import { login } from '../store/userSlice';

function AutoLogin({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        dispatch(login(JSON.parse(user)));
      } catch {}
    }
  }, [dispatch]);
  return <>{children}</>;
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AutoLogin>
        <UserRoleSwitcher />
        {children}
      </AutoLogin>
    </Provider>
  );
} 