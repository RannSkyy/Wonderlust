import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Clock, ArrowRight, X, Heart, Shield, Landmark, MapPin } from 'lucide-react';
import { DESTINATIONS } from '../data';
import { Destination } from '../types';
import { formatPrice, TRANSLATIONS } from '../utils';

interface TourGridProps {
  onInquireNow: (destName: string) => void;
  searchFilter: { destination: string; rooms: number; people: number } | null;
  lang: 'en' | 'id';
}

export default function TourGrid({ onInquireNow, searchFilter, lang }: TourGridProps) {
  const [selectedDest, setSelectedDest] = useState<Destination | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const t = TRANSLATIONS[lang];

  // Robust, multilingual search filter
  const filteredTours = DESTINATIONS.filter((tour) => {
    if (!searchFilter) return true;
    const term = searchFilter.destination.toLowerCase();
    const nameEn = tour.name.toLowerCase();
    const nameId = (tour.nameId || '').toLowerCase();
    const countryEn = tour.country.toLowerCase();
    const countryId = (tour.countryId || '').toLowerCase();

    return (
      nameEn.includes(term) ||
      nameId.includes(term) ||
      countryEn.includes(term) ||
      countryId.includes(term)
    );
  });

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  return (
    <section id="packages" className="px-6 py-12 md:px-12 md:py-20 max-w-7xl mx-auto scroll-mt-20">
      
      {/* Intro visual header */}
      <div className="flex flex-col md:flex-row items-baseline justify-between mb-12 border-b border-white/10 pb-6">
        <div>
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold tracking-tight text-[#FAF8F2] mb-3">
            {t.wonders}
          </h2>
          <p className="font-sans text-sm text-[#FAF8F2]/60 uppercase tracking-widest max-w-md">
            {t.unveiling}
          </p>
        </div>
        
        <div className="mt-4 md:mt-0 text-xs font-mono text-[#EADBC8] tracking-widest uppercase">
          {t.curatedArchives} ({filteredTours.length} {lang === 'id' ? 'TAMPILAN' : 'RELEASES'})
        </div>
      </div>

      {filteredTours.length === 0 ? (
        <div className="bg-white/5 border border-white/10 rounded-3xl p-16 text-center max-w-lg mx-auto">
          <MapPin className="w-12 h-12 text-[#EADBC8] mx-auto mb-4 animate-bounce" />
          <h3 className="font-serif text-2xl font-bold mb-2">{t.noMatches}</h3>
          <p className="text-sm text-white/60 mb-6">
            {t.noMatchesDesc.replace('{term}', searchFilter?.destination || '')}
          </p>
          <button 
            type="button"
            onClick={() => onInquireNow('Custom Expedition')}
            className="px-6 py-3 bg-[#FAF8F2] hover:bg-[#EADBC8] text-[#2F4232] rounded-full font-serif font-bold text-sm transition-colors cursor-pointer"
          >
            {t.designCustom}
          </button>
        </div>
      ) : (
        /* Dynamic responsive Grid of premium cards */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredTours.map((tour, index) => {
            const isFav = favorites.includes(tour.id);
            const displayCountry = lang === 'id' ? tour.countryId || tour.country : tour.country;
            const displayName = lang === 'id' ? tour.nameId || tour.name : tour.name;
            const displayDescription = lang === 'id' ? tour.descriptionId || tour.description : tour.description;

            return (
              <motion.div
                key={tour.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setSelectedDest(tour)}
                className="group cursor-pointer bg-[#243427] hover:bg-[#2B3E2F] rounded-[20px] overflow-hidden border border-white/5 hover:border-white/20 hover:shadow-2xl hover:shadow-black/30 transition-all duration-500 flex flex-col h-full transform hover:-translate-y-1"
              >
                
                {/* Visual Banner Media Container */}
                <div className="relative overflow-hidden aspect-square">
                  <img
                    src={tour.image}
                    alt={displayName}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-95"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Rating / Heart Pill Badge Overlays */}
                  <div className="absolute top-4 left-4 flex space-x-1.5">
                    <div className="flex items-center space-x-1 bg-[#FAF8F2]/95 backdrop-blur-md text-[#1d2b20] text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-md">
                      <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                      <span>{tour.rating.toFixed(1)}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => toggleFavorite(tour.id, e)}
                    className="absolute top-4 right-4 p-2 bg-black/45 hover:bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-[#FAF8F2] hover:text-red-400 transition-colors cursor-pointer z-10"
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>

                  {/* Dark mask overlay showing duration on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1d2b20]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div className="flex items-center space-x-1 text-xs font-serif text-[#FAF8F2]/90">
                      <Clock className="w-3.5 h-3.5 text-[#EADBC8]" />
                      <span>
                        {tour.durationDays} {t.days} / {tour.durationDays - 1} {lang === 'id' ? 'Malam Termasuk' : 'Nights Included'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Editorial Description Fields */}
                <div className="p-5 flex flex-col flex-grow justify-between">
                  <div>
                    <div className="text-[10px] font-sans font-bold text-[#EADBC8] tracking-widest uppercase mb-1">
                      {displayCountry}
                    </div>
                    
                    <h3 className="font-serif text-xl font-bold tracking-tight text-[#FAF8F2] mb-2 group-hover:text-[#EADBC8] transition-colors leading-snug">
                      {displayName}
                    </h3>
                    
                    <p className="text-xs text-[#FAF8F2]/75 line-clamp-2 leading-relaxed mb-4">
                      {displayDescription}
                    </p>
                  </div>

                  {/* Booking details price strip */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
                    <div>
                      <div className="text-[9px] font-mono tracking-wider text-white/40 uppercase">
                        {t.fareRates}
                      </div>
                      <div className="text-sm font-sans font-bold text-[#FAF8F2]">
                        {formatPrice(tour.pricePerPerson, lang)}{' '}
                        <span className="text-[10px] font-normal text-white/50">/{lang === 'id' ? 'Orang' : 'Person'}</span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-full bg-white/5 border border-white/10 text-[#FAF8F2] group-hover:bg-[#FAF8F2] group-hover:text-[#2F4232] transition-colors duration-300">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>

                </div>

              </motion.div>
            );
          })}
        </div>
      )}

      {/* Immersive detailed modal pop-up overlay */}
      <AnimatePresence>
        {selectedDest && (
          <>
            {/* Backdrop Layer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDest(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 cursor-pointer"
            />

            {/* Modal Card Content layout */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 cursor-default">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 40 }}
                transition={{ type: 'spring', duration: 0.5 }}
                className="bg-[#243427] border border-white/10 rounded-[32px] w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row relative text-[#FAF8F2]"
              >
                
                {/* Close Button Trigger */}
                <button
                  type="button"
                  onClick={() => setSelectedDest(null)}
                  className="absolute top-4 right-4 z-20 p-2.5 bg-black/60 backdrop-blur-md hover:bg-black/80 text-white rounded-full transition-colors border border-white/10 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Left side visual column (Image) */}
                <div className="w-full md:w-1/2 relative min-h-[250px] md:min-h-full">
                  <img
                    src={selectedDest.image}
                    alt={lang === 'id' ? selectedDest.nameId || selectedDest.name : selectedDest.name}
                    className="absolute inset-0 w-full h-full object-cover brightness-95"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                  
                  {/* Highlight rating on card */}
                  <div className="absolute bottom-6 left-6 text-white z-10">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#EADBC8]">
                      {lang === 'id' ? selectedDest.countryId || selectedDest.country : selectedDest.country}
                    </span>
                    <h4 className="font-serif text-3xl font-bold tracking-tight mt-1">
                      {lang === 'id' ? selectedDest.nameId || selectedDest.name : selectedDest.name}
                    </h4>
                  </div>
                </div>

                {/* Right side narrative data sheet */}
                <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center space-x-1 mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-3.5 h-3.5 ${
                            i < Math.floor(selectedDest.rating) 
                              ? 'text-amber-400 fill-amber-400' 
                              : 'text-white/20'
                          }`} 
                        />
                      ))}
                      <span className="text-xs text-white/60 ml-2 font-semibold font-mono">
                        {selectedDest.rating.toFixed(1)} ({selectedDest.reviewsCount} {lang === 'id' ? 'ulasan' : 'reviews'})
                      </span>
                    </div>

                    <p className="text-sm text-[#FAF8F2]/80 leading-relaxed mb-6 font-sans">
                      {lang === 'id' ? selectedDest.descriptionId || selectedDest.description : selectedDest.description} 
                      {' '}
                      {lang === 'id' 
                        ? 'Seluruh pemesanan akomodasi mewah kelas atas, transportasi pagi hari, sesi safari berpemandu pribadi, dan izin masuk khusus tercakup secara komparatif.' 
                        : 'All high-end accommodation bookings, morning transfers, private guided safari sessions, and selective entry permits are comprehensively covered.'}
                    </p>

                    {/* Features grid */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      <div className="flex items-center space-x-2 text-xs text-white/70 bg-white/5 border border-white/5 p-2 rounded-xl">
                        <Clock className="w-3.5 h-3.5 text-[#EADBC8]" />
                        <span>{selectedDest.durationDays} {lang === 'id' ? 'Hari Tinggal' : 'Days Stay'}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-white/70 bg-white/5 border border-white/5 p-2 rounded-xl">
                        <Shield className="w-3.5 h-3.5 text-[#EADBC8]" />
                        <span>{t.premiumInsurance}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-white/70 bg-white/5 border border-[#FAF8F2]/10 p-2 rounded-xl col-span-2">
                        <Landmark className="w-3.5 h-3.5 text-[#EADBC8]" />
                        <span>{t.privateConcierge}</span>
                      </div>
                    </div>
                  </div>

                  {/* Pricing footer column */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                        {t.totalRate}
                      </div>
                      <div className="text-lg sm:text-xl font-bold font-sans text-[#FAF8F2]">
                        {formatPrice(selectedDest.pricePerPerson, lang)}
                        <span className="text-xs font-normal text-white/50">/{lang === 'id' ? 'Orang' : 'Person'}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        onInquireNow(selectedDest.name);
                        setSelectedDest(null);
                      }}
                      className="px-5 py-2.5 sm:px-6 sm:py-3 bg-[#FAF8F2] hover:bg-[#EADBC8] text-[#1D2B20] text-xs font-bold uppercase tracking-widest rounded-full transition-colors flex items-center space-x-2 cursor-pointer shadow-lg shadow-black/25"
                    >
                      <span>{t.inquireNow}</span>
                      <ArrowRight className="w-3.5 h-3.5 stroke-[2.5px]" />
                    </button>
                  </div>

                </div>

              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

    </section>
  );
}
