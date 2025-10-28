'use client';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { SUPPORTED_LANGUAGES } from '../i18n';
import Link from 'next/link';
import { FaStore, FaUserCircle, FaUserShield, FaSignInAlt, FaUserPlus, FaSignOutAlt } from 'react-icons/fa';
import { logout } from '../store/userSlice';

export default function Header({ lang, onLangChange }: { lang: string, onLangChange: (l: string) => void }) {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const buttonClass = "inline-block px-[1.2rem] py-[0.4rem] rounded-[0.7rem] bg-[#232526] text-white text-[1rem] mx-[0.2rem] no-underline cursor-pointer shadow-md transition hover:bg-[#4af] hover:text-[#181a1b] focus:outline-none focus:ring-2 focus:ring-[#4af] focus:ring-offset-2";
  return (
    <header className="backdrop-blur-md bg-gradient-to-r from-[#232526cc] to-[#414345cc] shadow-lg w-full sticky top-0 z-10">
      <div className="flex items-center gap-4 ml-8 py-2">
        <span className="flex items-center font-bold text-[1.7rem] tracking-wide text-white drop-shadow-lg">
          <FaStore className="mr-2 text-[#4af] text-[2rem]" /> Livben
        </span>
        <Link href={`/${lang}/home`} className="text-[1.1rem] text-[#4af] no-underline font-semibold hover:underline transition">E-Ticaret</Link>
      </div>
      <div className="flex items-center gap-4 mr-8 flex-wrap">
        <select value={lang} onChange={e => onLangChange(e.target.value)} className="px-4 py-2 rounded-lg border-none text-[1rem] bg-[#232526] text-white focus:ring-2 focus:ring-[#4af]">
          {SUPPORTED_LANGUAGES.slice(0,3).map(l => (
            <option key={l} value={l}>{l.toUpperCase()}</option>
          ))}
        </select>
        {/* Panel ve Auth Butonları */}
        {user.role === 'guest' && (
          <>
            <Link href={`/${lang}/login`} className={buttonClass}><FaSignInAlt className="inline mr-2 mb-1" />Giriş</Link>
            <Link href={`/${lang}/register`} className={buttonClass}><FaUserPlus className="inline mr-2 mb-1" />Kaydol</Link>
          </>
        )}
        {user.role !== 'guest' && (
          <>
            {user.role === 'admin' && (
              <Link href={`/${lang}/admin`} className={buttonClass}><FaUserShield className="inline mr-2 mb-1" />Admin Paneli</Link>
            )}
            {user.role === 'customer' && (
              <Link href={`/${lang}/user`} className={buttonClass}><FaUserCircle className="inline mr-2 mb-1" />Kullanıcı Paneli</Link>
            )}
            {user.role === 'storeOwner' && (
              <Link href={`/${lang}/store`} className={buttonClass}><FaStore className="inline mr-2 mb-1" />Mağaza Paneli</Link>
            )}
            <button className={buttonClass} onClick={() => dispatch(logout())}><FaSignOutAlt className="inline mr-2 mb-1" />Çıkış</button>
          </>
        )}
        <span className="flex items-center gap-2 bg-[#333a] px-4 py-2 rounded-2xl shadow text-[1rem] font-medium ml-2">
          <FaUserCircle className="text-[#4af] text-[1.3rem]" />
          <b>{user.name || 'Misafir'}</b> <span className="text-[#aaa] text-[0.95rem]">({user.role})</span>
        </span>
      </div>
    </header>
  );
} 