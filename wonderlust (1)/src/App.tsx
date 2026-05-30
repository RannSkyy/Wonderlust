/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Globe, Instagram, Twitter, Facebook, Heart, Sparkles, MapPin, Calendar, CheckCircle, ArrowUp } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import TourGrid from './components/TourGrid';
import NarrativeSection from './components/NarrativeSection';
import ContactForm from './components/ContactForm';
import InquiryDashboard from './components/InquiryDashboard';
import { BookingInquiry, NavTab } from './types';
import { TRANSLATIONS } from './utils';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('explore');
  const [searchFilter, setSearchFilter] = useState<{ destination: string; rooms: number; people: number } | null>(null);
  const [inquiries, setInquiries] = useState<BookingInquiry[]>([]);
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [selectedDestinationName, setSelectedDestinationName] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Load language state from localStorage with English fallback
  const [lang, setLang] = useState<'en' | 'id'>(() => {
    try {
      const saved = localStorage.getItem('wonderlust_lang');
      return saved === 'id' ? 'id' : 'en';
    } catch (e) {
      return 'en';
    }
  });

  // Track and persist language selection
  useEffect(() => {
    try {
      localStorage.setItem('wonderlust_lang', lang);
    } catch (e) {
      console.error('Failed to save language choice:', e);
    }
  }, [lang]);

  // Load inquiries from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('wonderlust_inquiries');
      if (stored) {
        setInquiries(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load local storage inquiries:', e);
    }
  }, []);

  // Monitor scroll for top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNewInquiry = (newInq: BookingInquiry) => {
    const updated = [newInq, ...inquiries];
    setInquiries(updated);
    try {
      localStorage.setItem('wonderlust_inquiries', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to write local storage:', e);
    }
  };

  const handleRemoveInquiry = (id: string) => {
    const updated = inquiries.filter(item => item.id !== id);
    setInquiries(updated);
    try {
      localStorage.setItem('wonderlust_inquiries', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to delete inquiry from storage:', e);
    }
  };

  const handleExploreClick = () => {
    const targetEl = document.getElementById('packages');
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleInquireNow = (destName: string) => {
    setSelectedDestinationName(destName);
    
    // Smooth scroll down to contact form Section
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubscribed(true);
    setNewsletterEmail('');
    setTimeout(() => {
      setNewsletterSubscribed(false);
    }, 4000);
  };

  const t = TRANSLATIONS[lang];

  return (
    <div className="min-h-screen bg-[#2F4232] text-[#FAF8F2] selection:bg-[#EADBC8] selection:text-[#2F4232] relative pb-1">
      
      {/* Decorative subtle texture overlays */}
      <div className="absolute inset-x-0 top-0 h-[800px] pointer-events-none opacity-5 bg-[radial-gradient(#FAF8F2_1px,transparent_1px)] [background-size:16px_16px] z-0" />
      
      {/* Header bar component */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenInquiryDashboard={() => setDashboardOpen(true)}
        inquiryCount={inquiries.length}
        lang={lang}
        setLang={setLang}
      />

      {/* Main core structures */}
      <main className="relative z-10">
        
        {/* HERO SECTION */}
        <Hero 
          onExploreClick={handleExploreClick}
          lang={lang}
        />

        {/* TOUR CARD CATALOGUE GRID */}
        <TourGrid 
          onInquireNow={handleInquireNow}
          searchFilter={searchFilter}
          lang={lang}
        />

        {/* NARRATIVE EXPERIENCES BRIDGES */}
        <NarrativeSection 
          onExploreClick={handleExploreClick}
          lang={lang}
        />

        {/* CONTACT INQUIRIES CONCIERGE FORM */}
        <ContactForm 
          initialDestinationName={selectedDestinationName}
          onNewInquiry={handleNewInquiry}
          lang={lang}
        />

        {/* Elite luxury statistics banner */}
        <section className="border-y border-white/10 py-16 bg-[#233326]/50">
          <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="space-y-1"
            >
              <h4 className="font-serif text-4xl sm:text-5xl font-bold text-[#EADBC8]">14+</h4>
              <p className="text-[10px] font-mono tracking-widest text-[#FAF8F2]/60 uppercase">{t.heritage}</p>
            </motion.div>

            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="space-y-1"
            >
              <h4 className="font-serif text-4xl sm:text-5xl font-bold text-[#EADBC8]">98%</h4>
              <p className="text-[10px] font-mono tracking-widest text-[#FAF8F2]/60 uppercase">{t.rating}</p>
            </motion.div>

            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="space-y-1"
            >
              <h4 className="font-serif text-4xl sm:text-5xl font-bold text-[#EADBC8]">120k</h4>
              <p className="text-[10px] font-mono tracking-widest text-[#FAF8F2]/60 uppercase">{t.trips}</p>
            </motion.div>

            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="space-y-1"
            >
              <h4 className="font-serif text-4xl sm:text-5xl font-bold text-[#EADBC8]">24Hrs</h4>
              <p className="text-[10px] font-mono tracking-widest text-[#FAF8F2]/60 uppercase">{t.vipSupport}</p>
            </motion.div>

          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-[#1A251C] border-t border-white/10 text-white/70 pt-16 pb-12 px-6 md:px-12 relative z-10 text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-white/10">
          
          {/* Brand & Mission column */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center space-x-2">
              <Compass className="w-5 h-5 text-[#EADBC8]" />
              <span className="font-serif text-xl tracking-widest text-[#FAF8F2] font-bold">WONDERLUST</span>
            </div>
            <p className="text-white/60 leading-relaxed max-w-sm">
              {t.footerDesc}
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a href="#" className="p-2 sm:p-2.5 bg-white/5 border border-white/10 hover:border-[#EADBC8] hover:text-[#EADBC8] rounded-full transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 sm:p-2.5 bg-white/5 border border-white/10 hover:border-[#EADBC8] hover:text-[#EADBC8] rounded-full transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 sm:p-2.5 bg-white/5 border border-white/10 hover:border-[#EADBC8] hover:text-[#EADBC8] rounded-full transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-2 space-y-3">
            <h5 className="font-serif text-sm tracking-widest uppercase font-bold text-[#FAF8F2]">{t.explore}</h5>
            <ul className="space-y-2 text-white/50">
              <li><a href="#explore" className="hover:text-[#EADBC8] transition-colors">{lang === 'id' ? 'Hero Utama' : 'Hero Catalog'}</a></li>
              <li><a href="#packages" className="hover:text-[#EADBC8] transition-colors">{lang === 'id' ? 'Paket Keajaiban' : 'Wenders Packages'}</a></li>
              <li><a href="#popular" className="hover:text-[#EADBC8] transition-colors">{lang === 'id' ? 'Kolase Testimoni' : 'Testimonials Collage'}</a></li>
              <li><a href="#contact" className="hover:text-[#EADBC8] transition-colors">{lang === 'id' ? 'Meja Layanan' : 'Concierge Desk'}</a></li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h5 className="font-serif text-sm tracking-widest uppercase font-bold text-[#FAF8F2]">{lang === 'id' ? 'Aliansi' : 'Alliance'}</h5>
            <ul className="space-y-2 text-white/50">
              <li><a href="#" className="hover:text-[#EADBC8] transition-colors">{lang === 'id' ? 'Mitra Global' : 'Global Partners'}</a></li>
              <li><a href="#" className="hover:text-[#EADBC8] transition-colors">{lang === 'id' ? 'Karir' : 'Careers'}</a></li>
              <li><a href="#" className="hover:text-[#EADBC8] transition-colors">{lang === 'id' ? 'Kampanye Eko-Keberlanjutan' : 'Eco-Sustain Campaign'}</a></li>
              <li><a href="#" className="hover:text-[#EADBC8] transition-colors">{lang === 'id' ? 'Sewa Kapal Pesiar Mewah' : 'Luxury Yacht Charters'}</a></li>
            </ul>
          </div>

          {/* Newsletter signup column */}
          <div className="md:col-span-4 space-y-4">
            <h5 className="font-serif text-sm tracking-widest uppercase font-bold text-[#FAF8F2]">{t.journal}</h5>
            <p className="text-white/60 leading-relaxed">
              {t.journalDesc}
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <input 
                required
                type="email" 
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder={lang === 'id' ? 'Masukkan alamat email...' : 'Enter email address...'}
                className="flex-grow bg-white/5 focus:bg-white/10 border border-white/10 focus:border-[#EADBC8]/40 rounded-xl px-4 py-2 text-white text-xs focus:outline-none transition-all placeholder:text-[#FAF8F2]/30"
              />
              <button 
                type="submit"
                className="bg-[#FAF8F2] hover:bg-[#EADBC8] text-[#1D2B20] text-xs font-bold font-sans uppercase px-4 py-2 rounded-xl transition-all cursor-pointer shadow"
              >
                {t.join}
              </button>
            </form>

            <AnimatePresence>
              {newsletterSubscribed && (
                <motion.p 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="text-emerald-400 font-mono text-[10px] uppercase font-bold"
                >
                  {t.subscribed}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Under privacy strips */}
        <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between text-white/40 text-xs gap-4">
          <div>
            &copy; {new Date().getFullYear()} {t.allRights}
          </div>
          <div className="flex items-center space-x-6">
            <a href="#" className="hover:text-[#FAF8F2] transition-colors">{t.privacy}</a>
            <a href="#" className="hover:text-[#FAF8F2] transition-colors">{t.terms}</a>
            <a href="#" className="hover:text-[#FAF8F2] transition-colors">{t.compliance}</a>
          </div>
        </div>
      </footer>

      {/* SLIDE OUT RESERVATIONS LOGS ACCOUNT DASHBOARD DRAWER */}
      <AnimatePresence>
        {dashboardOpen && (
          <InquiryDashboard 
            isOpen={dashboardOpen}
            onClose={() => setDashboardOpen(false)}
            inquiries={inquiries}
            onRemoveInquiry={handleRemoveInquiry}
            lang={lang}
          />
        )}
      </AnimatePresence>

      {/* FLOAT SCROLL TO THE TOP TRIGGER */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-40 p-3 bg-[#FAF8F2]/90 hover:bg-[#FAF8F2] border border-[#2F4232]/25 text-[#2F4232] rounded-full shadow-lg hover:shadow-xl cursor-pointer hover:scale-105 transition-all"
            title={lang === 'id' ? 'Kembali ke atas' : 'Scroll back to Top'}
          >
            <ArrowUp className="w-5 h-5 stroke-[2.5px]" />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
