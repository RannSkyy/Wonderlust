import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Compass, Globe, Sparkles } from 'lucide-react';
import { NavTab } from '../types';
import { TRANSLATIONS } from '../utils';

interface HeaderProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  onOpenInquiryDashboard: () => void;
  inquiryCount: number;
  lang: 'en' | 'id';
  setLang: (lang: 'en' | 'id') => void;
}

export default function Header({ 
  activeTab, 
  setActiveTab, 
  onOpenInquiryDashboard,
  inquiryCount,
  lang,
  setLang
}: HeaderProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const t = TRANSLATIONS[lang];

  const menuItems = [
    { id: 'explore', label: t.explore },
    { id: 'packages', label: t.packages },
    { id: 'popular', label: t.popular },
    { id: 'contact', label: t.contact },
  ];

  const handleTabClick = (tabId: NavTab) => {
    setActiveTab(tabId);
    setIsMobileOpen(false);
    
    // Smooth scroll to target sections if they exist
    const element = document.getElementById(tabId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const toggleLanguage = () => {
    setLang(lang === 'en' ? 'id' : 'en');
  };

  return (
    <header className="sticky top-0 z-50 bg-[#2F4232]/90 backdrop-blur-md border-b border-white/10 px-6 py-4 md:px-12 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          className="flex items-center space-x-2 cursor-pointer group"
          onClick={() => handleTabClick('explore')}
        >
          <Compass className="w-6 h-6 text-[#FBF9F1] group-hover:rotate-45 transition-transform duration-500" />
          <span className="font-serif text-2xl tracking-widest text-[#FBF9F1] font-bold">
            Wonderlust
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 px-6 py-2 bg-white/5 rounded-full border border-white/5">
          {menuItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => handleTabClick(item.id as NavTab)}
                className={`relative px-3 py-1 font-sans text-sm tracking-wide transition-colors duration-300 ${
                  isActive ? 'text-[#FBF9F1] font-semibold' : 'text-[#FBF9F1]/60 hover:text-[#FBF9F1]'
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#FAF8F2]"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  >
                    <div className="w-1.5 h-1.5 bg-[#FAF8F2] rounded-full absolute -top-[2px] left-1/2 -translate-x-1/2" />
                  </motion.div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="hidden md:flex items-center space-x-4">
          
          {/* Language & Currency Toggle */}
          <button
            onClick={toggleLanguage}
            className="flex items-center space-x-1.5 px-3 py-1.5 border border-white/15 bg-white/5 hover:bg-white/10 rounded-full text-xs font-mono text-[#FAF8F2] transition-all cursor-pointer shadow-inner"
            title={lang === 'en' ? 'Ubah ke Bahasa Indonesia / Rupiah' : 'Switch to English / USD'}
          >
            <Globe className="w-3.5 h-3.5 text-[#EADBC8]" />
            <span className="font-bold">{lang === 'en' ? 'EN | USD' : 'ID | IDR'}</span>
          </button>

          {inquiryCount > 0 && (
            <button
              onClick={onOpenInquiryDashboard}
              className="relative flex items-center space-x-1.5 px-4 py-2 bg-white/10 rounded-full border border-white/10 text-xs font-sans hover:bg-white/20 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#EADBC8] animate-pulse" />
              <span>{t.inquiries} ({inquiryCount})</span>
              <span className="absolute -top-1.5 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EADBC8] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#EADBC8]"></span>
              </span>
            </button>
          )}

          <button 
            onClick={() => handleTabClick('contact')}
            className="text-sm font-medium hover:text-[#EADBC8] transition-colors"
          >
            {t.login}
          </button>
          
          <button 
            onClick={() => handleTabClick('contact')}
            className="px-5 py-2 text-sm font-medium bg-[#FAF8F2] text-[#2F4232] rounded-full hover:bg-[#EADBC8] transition-all duration-300 shadow-md shadow-black/10 hover:shadow-black/20 transform hover:-translate-y-0.5"
          >
            {t.register}
          </button>
        </div>

        {/* Mobile Toggle Buttons */}
        <div className="md:hidden flex items-center space-x-3">
          
          {/* Quick Lang trigger */}
          <button
            onClick={toggleLanguage}
            className="p-2 border border-white/15 bg-white/5 rounded-full text-xs font-mono text-[#FAF8F2] flex items-center justify-center cursor-pointer"
          >
            <Globe className="w-4 h-4 text-[#EADBC8]" />
            <span className="ml-1 font-bold text-[10px]">{lang === 'en' ? 'EN' : 'ID'}</span>
          </button>

          {inquiryCount > 0 && (
            <button
              onClick={onOpenInquiryDashboard}
              className="p-2 bg-white/10 rounded-full border border-white/10 text-[#EADBC8] relative"
            >
              <Sparkles className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-[9px] text-white w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {inquiryCount}
              </span>
            </button>
          )}
          
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="p-2 bg-white/10 rounded-full text-[#FBF9F1] hover:bg-white/20 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden mt-4 bg-black/15 rounded-2xl border border-white/10"
          >
            <div className="flex flex-col space-y-3 p-5">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id as NavTab)}
                  className={`w-full text-left py-2 px-3 rounded-lg font-sans text-base tracking-wide transition-colors ${
                    activeTab === item.id 
                      ? 'bg-white/10 text-[#FAF8F2] font-semibold' 
                      : 'text-[#FBF9F1]/70 hover:text-[#FBF9F1] hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              <div className="h-[1px] bg-white/10 my-1" />
              
              {/* Mobile Language Button under separator */}
              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-xs text-[#FAF8F2]/60 font-sans">{lang === 'en' ? 'Language / Currency' : 'Bahasa / Mata Uang'}</span>
                <button
                  onClick={toggleLanguage}
                  className="flex items-center space-x-1.5 px-3 py-1 bg-white/10 border border-white/10 rounded-full text-xs font-mono text-[#FAF8F2]"
                >
                  <Globe className="w-3.5 h-3.5 text-[#EADBC8]" />
                  <span className="font-bold">{lang === 'en' ? 'EN / USD ($)' : 'ID / IDR (Rp)'}</span>
                </button>
              </div>

              <div className="h-[1px] bg-white/10 my-1" />

              <div className="flex items-center space-x-3 justify-between pt-2">
                <button 
                  onClick={() => handleTabClick('contact')}
                  className="w-1/2 py-2 text-center text-sm border border-white/10 rounded-full font-medium"
                >
                  {t.login}
                </button>
                <button 
                  onClick={() => handleTabClick('contact')}
                  className="w-1/2 py-2 text-center text-sm bg-[#FAF8F2] text-[#2F4232] rounded-full font-medium shadow-sm hover:bg-[#EADBC8]"
                >
                  {t.register}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
