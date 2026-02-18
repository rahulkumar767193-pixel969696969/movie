
import React, { useState, useEffect } from 'react';
import { User, UserRole } from '../types';

interface NavbarProps {
  user: User;
  onSearch: (q: string) => void;
  onShowAI: () => void;
  onSwitchTab: (tab: 'home' | 'admin') => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onSearch, onShowAI, onSwitchTab }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 px-6 md:px-12 py-5 flex items-center justify-between ${isScrolled ? 'bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/10 py-4 shadow-2xl' : 'bg-transparent'}`}>
      <div className="flex items-center space-x-12">
        <h1 
          className="text-3xl font-black text-red-600 tracking-tighter cursor-pointer transform hover:scale-110 active:scale-95 transition-all duration-300" 
          onClick={() => onSwitchTab('home')}
        >
          CINEAI
        </h1>
        <ul className="hidden lg:flex space-x-8 text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">
          <li className="hover:text-white cursor-pointer transition-colors relative group" onClick={() => onSwitchTab('home')}>
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all group-hover:w-full"></span>
          </li>
          <li className="hover:text-white cursor-pointer transition-colors relative group">
            TV Shows
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all group-hover:w-full"></span>
          </li>
          <li className="hover:text-white cursor-pointer transition-colors relative group">
            Movies
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all group-hover:w-full"></span>
          </li>
          {user.role === UserRole.ADMIN && (
            <li className="text-red-500 font-black cursor-pointer animate-pulse" onClick={() => onSwitchTab('admin')}>Dashboard</li>
          )}
        </ul>
      </div>

      <div className="flex items-center space-x-6">
        <div className="relative group hidden md:block">
          <input 
            type="text" 
            placeholder="Search catalog..." 
            className="bg-white/5 border border-white/10 px-6 py-2 rounded-full text-xs font-bold focus:outline-none focus:border-red-600 focus:bg-white/10 transition-all w-40 focus:w-72 placeholder:text-gray-600"
            onChange={(e) => onSearch(e.target.value)}
          />
          <svg className="absolute right-4 top-2.5 w-4 h-4 text-gray-600 group-focus-within:text-red-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
        </div>
        
        <button 
          onClick={onShowAI}
          className="flex items-center space-x-2 bg-gradient-to-r from-red-600 via-orange-600 to-red-600 bg-[length:200%_auto] hover:bg-right px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all duration-500 shadow-lg shadow-red-900/20"
        >
          <span className="animate-bounce">✨</span>
          <span>Ask CineScout</span>
        </button>

        <div className="flex items-center space-x-4 cursor-pointer group p-1 pr-3 rounded-full hover:bg-white/5 transition-all">
          <img src={user.avatar} className="w-9 h-9 rounded-full ring-2 ring-white/10 group-hover:ring-red-600 transition-all" alt="Avatar" />
          <span className="text-[10px] font-black uppercase tracking-widest hidden lg:inline group-hover:text-red-500 transition-colors">{user.name}</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
