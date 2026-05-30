import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock } from 'lucide-react';
import { BookingInquiry } from '../types';
import { DESTINATIONS } from '../data';
import { TRANSLATIONS } from '../utils';

interface ContactFormProps {
  initialDestinationName?: string;
  onNewInquiry: (inquiry: BookingInquiry) => void;
  lang: 'en' | 'id';
}

export default function ContactForm({ 
  initialDestinationName = '', 
  onNewInquiry,
  lang
}: ContactFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [destination, setDestination] = useState(initialDestinationName || 'Luxury Overwater Villas');
  const [message, setMessage] = useState('');
  const [date, setDate] = useState('2026-06-15');
  const [rooms, setRooms] = useState(2);
  const [people, setPeople] = useState(4);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const t = TRANSLATIONS[lang];

  // Sync with prop when selected from tour card
  React.useEffect(() => {
    if (initialDestinationName) {
      setDestination(initialDestinationName);
    }
  }, [initialDestinationName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);

    // Simulate luxury API network latency
    setTimeout(() => {
      const newInquiry: BookingInquiry = {
        id: `inq-${Date.now()}`,
        name,
        email,
        destination,
        rooms,
        people,
        message,
        date,
        status: 'Received',
        createdAt: new Date().toLocaleDateString(undefined, {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
      };

      onNewInquiry(newInquiry);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Reset fields
      setName('');
      setEmail('');
      setMessage('');
      
      // Clear success screen after a couple seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="px-6 py-12 md:px-12 md:py-24 max-w-7xl mx-auto scroll-mt-20">
      
      {/* Decorative Blur */}
      <div className="absolute -bottom-10 left-10 w-[300px] h-[300px] bg-[#EADBC8]/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-[#243427] p-8 sm:p-12 md:p-16 rounded-[40px] border border-white/5 shadow-2xl relative overflow-hidden">
        
        {/* Subtle pattern layer */}
        <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        {/* Left Information sheet columns (5/12 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-8 relative z-10">
          
          <div className="space-y-4">
            <span className="text-[10px] sm:text-xs font-mono text-[#EADBC8] tracking-widest uppercase font-bold px-3 py-1 bg-white/5 border border-white/10 rounded-full w-fit">
              {t.expertAdvice}
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-semibold tracking-tight text-[#FAF8F2] leading-none">
              {t.conciergeTitle}
            </h2>
            <p className="font-sans text-sm sm:text-base text-white/70 leading-relaxed max-w-md pt-2">
              {t.conciergeText}
            </p>
          </div>

          <div className="space-y-6 pt-6">
            
            {/* Address */}
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-white/5 border border-white/10 rounded-2xl text-[#EADBC8]">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-white/50">
                  {t.headquarters}
                </h4>
                <p className="text-sm font-semibold text-[#FAF8F2] mt-0.5">
                  108 Marina Luxury Court, Suite 12A, Bali, Indonesia
                </p>
              </div>
            </div>

            {/* Support Hotline */}
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-white/5 border border-white/10 rounded-2xl text-[#EADBC8]">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-white/50">
                  {t.hotline}
                </h4>
                <p className="text-sm font-semibold text-[#FAF8F2] mt-0.5 font-mono">
                  +62 (361) 880-WNDR (24-Hour VIP)
                </p>
              </div>
            </div>

            {/* Direct Assistance */}
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-white/5 border border-white/10 rounded-2xl text-[#EADBC8]">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-white/50">
                  {t.directAssistance}
                </h4>
                <p className="text-sm font-semibold hover:text-[#EADBC8] text-[#FAF8F2] transition-colors mt-0.5">
                  concierge@wonderlust.luxury
                </p>
              </div>
            </div>

          </div>

          <div className="pt-6 border-t border-white/5">
            <p className="text-[10px] font-mono text-white/40 leading-relaxed uppercase tracking-wider">
              {t.secureTerms}
            </p>
          </div>

        </div>

        {/* Form elements sheet columns (7/12 cols) */}
        <div id="contact-form-card" className="lg:col-span-7 relative z-10 bg-black/15 p-6 sm:p-8 rounded-[30px] border border-white/5">
          
          <AnimatePresence mode="wait">
            {!submitSuccess ? (
              <motion.form 
                key="contact-form-body"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name Input */}
                  <div>
                    <label className="block text-[10px] font-sans tracking-widest text-[#FAF8F2]/60 uppercase mb-2 font-semibold">
                      {t.fullName}
                    </label>
                    <input
                      required
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jonathan Mercer"
                      className="w-full bg-white/5 focus:bg-white/10 border border-white/10 focus:border-[#EADBC8]/40 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all placeholder:text-[#FAF8F2]/20"
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block text-[10px] font-sans tracking-widest text-[#FAF8F2]/60 uppercase mb-2 font-semibold">
                      {t.luxuryEmail}
                    </label>
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="j.mercer@gmail.com"
                      className="w-full bg-white/5 focus:bg-white/10 border border-white/10 focus:border-[#EADBC8]/40 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all placeholder:text-[#FAF8F2]/20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Destination Dropdown selection */}
                  <div>
                    <label className="block text-[10px] font-sans tracking-widest text-[#FAF8F2]/60 uppercase mb-2 font-semibold">
                      {t.desiredSpot}
                    </label>
                    <select
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="w-full bg-[#1C291E] border border-white/10 focus:border-[#EADBC8]/40 rounded-xl px-4 py-3 text-sm text-[#FAF8F2]/90 focus:outline-none transition-all"
                    >
                      {DESTINATIONS.map((d) => {
                        const nameStr = lang === 'id' ? d.nameId || d.name : d.name;
                        const countryStr = lang === 'id' ? d.countryId || d.country : d.country;
                        return (
                          <option key={d.id} value={d.name}>
                            {nameStr} ({countryStr})
                          </option>
                        );
                      })}
                      <option value="Custom Expedition">
                        {lang === 'id' ? 'Ekspedisi Safari Kustom' : 'Custom Safari Expedition'}
                      </option>
                    </select>
                  </div>

                  {/* Travel Date */}
                  <div>
                    <label className="block text-[10px] font-sans tracking-widest text-[#FAF8F2]/60 uppercase mb-2 font-semibold">
                      {t.preferredDate}
                    </label>
                    <input
                      required
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-[#1C291E] border border-white/10 focus:border-[#EADBC8]/40 rounded-xl px-4 py-3 text-sm text-[#FAF8F2]/90 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  {/* Rooms specification */}
                  <div>
                    <label className="block text-[10px] font-sans tracking-widest text-[#FAF8F2]/60 uppercase mb-1 font-semibold">
                      {t.roomsRequired}
                    </label>
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => setRooms(Math.max(1, rooms - 1))}
                        className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center font-bold text-xs"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-sm font-semibold">{rooms}</span>
                      <button
                        type="button"
                        onClick={() => setRooms(Math.min(10, rooms + 1))}
                        className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center font-bold text-xs"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* People specification */}
                  <div>
                    <label className="block text-[10px] font-sans tracking-widest text-[#FAF8F2]/60 uppercase mb-1 font-semibold">
                      {t.adventurers}
                    </label>
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => setPeople(Math.max(1, people - 1))}
                        className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center font-bold text-xs"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-sm font-semibold">{people}</span>
                      <button
                        type="button"
                        onClick={() => setPeople(Math.min(20, people + 1))}
                        className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center font-bold text-xs"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Core message text form */}
                <div>
                  <label className="block text-[10px] font-sans tracking-widest text-[#FAF8F2]/60 uppercase mb-2 font-semibold">
                    {t.specialReq}
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t.specialPlaceholder}
                    className="w-full bg-white/5 focus:bg-white/10 border border-white/10 focus:border-[#EADBC8]/40 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all placeholder:text-[#FAF8F2]/30 resize-none"
                  />
                </div>

                {/* Submit button with spinner loading feedback */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-[#FAF8F2] hover:bg-[#EADBC8] text-[#2F4232] font-semibold tracking-widest uppercase text-xs sm:text-sm shadow-xl shadow-black/20 flex items-center justify-center space-x-2 group cursor-pointer transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="flex items-center space-x-2 animate-pulse">
                      <Clock className="w-4 h-4 animate-spin text-[#2F4232]" />
                      <span>{t.submitting}</span>
                    </span>
                  ) : (
                    <>
                      <Send className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      <span>{t.submitBtn}</span>
                    </>
                  )}
                </button>

              </motion.form>
            ) : (
              /* High-quality success state representation */
              <motion.div
                key="contact-success-state"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center justify-center text-center py-12 p-4 space-y-6"
              >
                <div className="w-16 h-16 bg-[#FAF8F2]/10 border border-white/10 rounded-full flex items-center justify-center text-[#EADBC8] mb-2 animate-bounce">
                  <CheckCircle2 className="w-8 h-8 stroke-[2.5px]" />
                </div>
                
                <h3 className="font-serif text-2xl sm:text-3xl font-semibold tracking-wide text-[#FAF8F2]">
                  {t.successTitle}
                </h3>
                
                <p className="text-sm text-[#FAF8F2]/75 leading-relaxed max-w-md">
                  {t.successText}
                </p>

                <div className="bg-white/5 border border-white/5 p-4 rounded-2xl max-w-sm w-full text-left font-mono text-[10px] text-white/50 uppercase space-y-2">
                  <div className="flex justify-between">
                    <span>{t.voucherId}</span>
                    <span className="text-[#EADBC8] font-bold">WNDR-INQ-{Math.floor(Math.random() * 900000 + 100000)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t.activeStatus}</span>
                    <span className="text-emerald-400 font-bold">{t.waitingRep}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSubmitSuccess(false)}
                  className="px-6 py-2.5 bg-white/5 border border-white/10 text-xs tracking-widest text-[#FAF8F2] hover:bg-white/10 rounded-xl uppercase transition-colors"
                >
                  {t.sendAnother}
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>

    </section>
  );
}
