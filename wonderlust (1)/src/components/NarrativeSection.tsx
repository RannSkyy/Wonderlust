import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Quote, ArrowRight, Sparkles } from 'lucide-react';
import { IMAGES } from '../data';
import { TRANSLATIONS } from '../utils';

interface NarrativeProps {
  onExploreClick: () => void;
  lang: 'en' | 'id';
}

export default function NarrativeSection({ onExploreClick, lang }: NarrativeProps) {
  const t = TRANSLATIONS[lang];

  return (
    <section id="popular" className="px-6 py-12 md:px-12 md:py-24 max-w-7xl mx-auto scroll-mt-20">
      
      {/* Editorial layout block: Collage and Narrative Description */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left column collage (6/12 cols) */}
        <div className="lg:col-span-6 flex flex-col space-y-6">
          
          {/* Sandy foam "Wonderlust" textured pill banner */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-44 sm:h-52 w-full rounded-[30px] overflow-hidden border border-white/10 shadow-lg group"
          >
            {/* Sand shore beach foam background placeholder or texture */}
            <div className="absolute inset-0 bg-[#D4C3A3] flex items-center justify-center">
              {/* Shimmering sand wave visual */}
              <div className="absolute inset-0 opacity-40 mix-blend-overlay bg-[radial-gradient(#FAF8F2_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#2F4232]/30 via-transparent to-[#2F4232]/20 pointer-events-none" />
              
              {/* Dynamic beach ambient overlay */}
              <img
                src={IMAGES.texture}
                alt="Waves ripple"
                className="absolute inset-0 w-full h-full object-cover opacity-30 select-none mix-blend-luminosity scale-110"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Core Brand Title Centered overlay with huge sleek display font */}
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="font-syne font-extrabold text-[#2F4232] text-4xl sm:text-5xl md:text-6xl tracking-[0.2em] uppercase select-none drop-shadow-sm transition-transform duration-700 group-hover:scale-105">
                Wonderlust
              </h2>
            </div>

            {/* Mini beach status tracker */}
            <div className="absolute bottom-3 right-6 flex items-center space-x-1 text-[10px] font-mono text-[#2F4232]/85 uppercase tracking-widest font-bold">
              <span>{lang === 'id' ? 'PASIR & BUIH' : 'SAND & FOAM'}</span>
            </div>
          </motion.div>

          {/* Staggered double column for Bali footprints & Crystal water */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Bali Indonesia footprints card inside the beach */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-[#243427] p-4 rounded-[24px] border border-white/5 flex flex-col justify-between space-y-4 shadow-md group cursor-pointer"
            >
              <div className="relative aspect-video rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-[#A68F6C] flex items-center justify-center font-serif text-3xl italic text-[#FAF8F2] font-semibold select-none group-hover:scale-105 transition-transform duration-500 z-10">
                  {lang === 'id' ? 'Tropis' : 'Tropical'}
                </div>
                {/* Sand footsteps or beach photo overlay */}
                <img
                  src={IMAGES.bali}
                  alt="Bali beach sunset footprints"
                  className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="px-1">
                <span className="text-[10px] font-mono text-[#EADBC8] tracking-wider uppercase font-bold">
                  {lang === 'id' ? 'LIBURAN MUSIM PANAS TERBAIK' : 'BEST SUMMER OUTING'}
                </span>
                <p className="font-serif text-base text-white/90 font-medium tracking-tight mt-0.5">
                  Bali, Indonesia
                </p>
              </div>
            </motion.div>

            {/* Shimmering Pool waves photo card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-[#243427] p-4 rounded-[24px] border border-white/5 flex flex-col justify-between space-y-4 shadow-md group cursor-pointer"
            >
              <div className="relative aspect-video rounded-xl overflow-hidden">
                <img
                  src={IMAGES.texture}
                  alt="Crystal clear pool waves glistening"
                  className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-all duration-700 brightness-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-[#2F4232]/10 pointer-events-none" />
              </div>
              <div className="px-1">
                <span className="text-[10px] font-mono text-[#EADBC8] tracking-wider uppercase font-bold">
                  {lang === 'id' ? 'AIR BERKILAU' : 'GLISTENING WATER'}
                </span>
                <p className="font-serif text-base text-white/90 font-medium tracking-tight mt-0.5">
                  {lang === 'id' ? 'Kolam Terumbu Karang' : 'Ocean Coral Pools'}
                </p>
              </div>
            </motion.div>

          </div>

        </div>

        {/* Right column narrative content (6/12 cols) */}
        <div className="lg:col-span-6 flex flex-col space-y-6">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-2 bg-white/5 border border-white/10 w-fit px-3 py-1 rounded-full mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#EADBC8]" />
              <span className="text-[10px] font-sans font-bold text-white/80 uppercase tracking-widest">
                {t.tourYear}
              </span>
            </div>

            <h3 className="font-serif text-3xl sm:text-5xl font-semibold tracking-tight text-[#FAF8F2] mb-6">
              {t.glimpseBali}
            </h3>

            {/* Core exact reference description paragraph */}
            <div className="relative pl-6 py-1 border-l-2 border-[#EADBC8]">
              <p className="font-sans text-sm sm:text-base text-white/80 leading-relaxed font-light mb-6 tracking-wide text-justify uppercase">
                {t.baliNarrative}
              </p>
            </div>
            
            <p className="text-xs sm:text-sm text-[#FAF8F2]/65 leading-relaxed tracking-wide mb-8">
              {t.moreNarrative}
            </p>

            {/* Call to action with hover slider indicator */}
            <div className="flex flex-wrap gap-4 items-center">
              <button
                type="button"
                onClick={onExploreClick}
                className="px-8 py-4 bg-[#FAF8F2] hover:bg-[#EADBC8] text-[#2F4232] rounded-full text-xs font-bold font-sans tracking-widest uppercase items-center space-x-2 inline-flex group transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer shadow-lg shadow-black/15"
              >
                <span>{t.browseSchedules}</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform stroke-[2.5]" />
              </button>

              <div className="flex items-center -space-x-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div 
                    key={i} 
                    className="w-8 h-8 rounded-full border-2 border-[#2F4232] bg-[#FAF8F2] flex items-center justify-center font-sans text-[10px] font-bold text-[#2F4232] overflow-hidden"
                  >
                    <img 
                      src={`https://picsum.photos/seed/user-${i}/100/100`} 
                      alt="Traveler avatar" 
                      className="w-full h-full object-cover" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
                <div className="pl-4 text-xs font-sans text-white/60 tracking-wider">
                  <span className="text-[#EADBC8] font-bold">1.2k+ {lang === 'id' ? 'Wisatawan' : 'Travelers'}</span> {t.travelersSelected}
                </div>
              </div>
            </div>

          </motion.div>

        </div>

      </div>

    </section>
  );
}
