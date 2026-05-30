import React from 'react';
import { motion } from 'motion/react';
import { Star, ArrowRight } from 'lucide-react';
import { IMAGES } from '../data';
import { TRANSLATIONS } from '../utils';

interface HeroProps {
  onExploreClick: () => void;
  lang: 'en' | 'id';
}

export default function Hero({ onExploreClick, lang }: HeroProps) {
  const t = TRANSLATIONS[lang];

  return (
    <section id="explore" className="relative px-6 py-8 md:px-12 md:py-16 max-w-7xl mx-auto overflow-hidden">
      
      {/* Decorative background light spots */}
      <div className="absolute top-10 left-1/4 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main headings & secondary paragraph block */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
        
        {/* Playfair Typography Headline Block */}
        <div className="lg:col-span-8 flex flex-col space-y-1">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap items-center gap-x-4 lg:gap-x-6 text-[44px] sm:text-[60px] md:text-[80px] lg:text-[100px] leading-none font-serif tracking-tight text-[#FAF8F2]"
          >
            <span>{t.exploreDream}</span>
            
            {/* Visual Capsule/Pill embedded inside heading */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              className="inline-block relative w-[130px] sm:w-[180px] md:w-[220px] lg:w-[260px] h-[45px] sm:h-[65px] md:h-[80px] lg:h-[95px] rounded-full overflow-hidden shadow-xl border border-white/25 align-middle mx-2 cursor-pointer self-center"
            >
              <img
                src={IMAGES.surf}
                alt="Paddleboards on shallow turquoise wave"
                className="w-full h-full object-cover select-none brightness-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </motion.div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[40px] sm:text-[58px] md:text-[76px] lg:text-[94px] leading-none font-serif tracking-tight text-[#FAF8F2]"
          >
            {t.dreamDiscover}
          </motion.h1>
        </div>

        {/* Small Intro narrative block on the top right */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="lg:col-span-4"
        >
          <div className="border-l-2 border-[#FAF8F2]/30 pl-4 py-1">
            <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-[#EADBC8] mb-2">
              {t.adventureCalls}
            </h4>
            <p className="font-sans text-xs leading-relaxed text-[#FAF8F2]/80 uppercase tracking-wider">
              {t.introText}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Massive main showcase banner image card with superimposed headline text */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative w-full rounded-[24px] sm:rounded-[36px] overflow-hidden shadow-2xl border border-white/10 group cursor-pointer aspect-[16/9]"
      >
        {/* Full background image */}
        <img
          src={IMAGES.hero}
          alt="Paradise island wooden pier in Koh Phi Phi Thailand"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-10000 group-hover:scale-105 brightness-95"
          referrerPolicy="no-referrer"
        />

        {/* Vignette Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/40 pointer-events-none" />
        
        {/* Left Side Superimposed Content */}
        <div className="absolute top-[12%] bottom-[12%] left-[6%] md:left-[8%] flex flex-col justify-between z-10 text-white max-w-[85%] md:max-w-[50%] select-none">
          
          {/* Subtle crown badge */}
          <div className="flex items-center space-x-2 bg-black/30 backdrop-blur-md rounded-full w-fit px-3 py-1 border border-white/10">
            <Star className="w-3.5 h-3.5 text-[#EADBC8] fill-[#EADBC8]" />
            <span className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-white/90">
              {t.featuredVacation}
            </span>
          </div>

          <div className="flex flex-col space-y-2 lg:space-y-4">
            <h2 className="font-serif italic text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#FAF8F2] opacity-85 leading-none">
              {t.exploreThWithUs}
            </h2>
            
            {/* THAILAND with underlines and display style */}
            <h2 className="font-serif font-bold text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-normal text-[#FAF8F2] leading-none flex items-center relative py-1">
              <span className="relative inline-block border-b-4 border-[#FAF8F2] pb-1 sm:pb-3">
                THAILAND
              </span>
            </h2>

            <h2 className="font-serif italic text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#FAF8F2] opacity-85 leading-none">
              {t.withUs}
            </h2>
          </div>

          {/* Active quick click handler inside the photo */}
          <div 
            onClick={(e) => {
              e.stopPropagation();
              onExploreClick();
            }}
            className="flex items-center space-x-2 text-[#FAF8F2] group/link text-xs sm:text-sm font-sans tracking-widest uppercase hover:text-[#EADBC8] transition-colors"
          >
            <span>{t.discoverLocal}</span>
            <ArrowRight className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Small water reflection highlights */}
        <div className="absolute top-4 right-6 text-white/50 text-[10px] font-mono select-none tracking-widest hidden sm:block">
          8° 26' 48'' N / 98° 30' 31'' E
        </div>
      </motion.div>

    </section>
  );
}
