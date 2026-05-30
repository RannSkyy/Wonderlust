import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Calendar, Users, Home, FileText, Trash2, X, Compass, CheckCircle } from 'lucide-react';
import { BookingInquiry } from '../types';
import { TRANSLATIONS } from '../utils';

interface InquiryDashboardProps {
  inquiries: BookingInquiry[];
  onRemoveInquiry: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
  lang: 'en' | 'id';
}

export default function InquiryDashboard({ 
  inquiries, 
  onRemoveInquiry, 
  isOpen, 
  onClose,
  lang
}: InquiryDashboardProps) {
  const t = TRANSLATIONS[lang];
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      
      {/* Backdrop overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
      />

      {/* Slide out drawer panel structure */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="relative w-full max-w-lg bg-[#1F2B21] border-l border-white/10 h-full shadow-2xl flex flex-col justify-between z-10 text-[#FAF8F2]"
      >
        
        {/* Header toolbar */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#1A251C]">
          <div className="flex items-center space-x-2">
            <Compass className="w-5 h-5 text-[#EADBC8] animate-spin-slow" />
            <span className="font-serif text-xl tracking-wider font-semibold text-[#FAF8F2]">
              {t.inquiryLogs}
            </span>
          </div>
          
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white/5 rounded-full transition-colors font-sans hover:text-[#EADBC8]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Core items scroll area */}
        <div className="flex-grow p-6 overflow-y-auto space-y-6">
          
          <div className="bg-white/5 border border-white/5 p-4 rounded-2xl flex items-center space-x-3.5">
            <div className="p-2.5 bg-[#FAF8F2]/10 rounded-xl text-[#EADBC8]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-white/50 uppercase tracking-widest font-mono">
                {t.conciergeAccount}
              </p>
              <h4 className="text-sm font-semibold text-[#FAF8F2]">
                {t.vipPortal}
              </h4>
            </div>
          </div>

          <h3 className="text-sm font-mono tracking-widest uppercase text-white/40 mb-1 border-b border-white/5 pb-2">
            {t.activeInquiries} ({inquiries.length})
          </h3>

          <AnimatePresence mode="popLayout animate-fade">
            {inquiries.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12 p-4 border border-dashed border-white/10 rounded-2xl bg-black/10"
              >
                <FileText className="w-10 h-10 text-white/20 mx-auto mb-3" />
                <h5 className="font-serif text-base font-semibold mb-1">{t.noVouchers}</h5>
                <p className="text-xs text-white/50 max-w-xs mx-auto">
                  {t.noVouchersDesc}
                </p>
              </motion.div>
            ) : (
              inquiries.map((inq) => (
                <motion.div
                  key={inq.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white/5 hover:bg-white/10 p-5 rounded-2xl border border-white/5 hover:border-white/10 transition-all space-y-3.5 relative group"
                >
                  {/* Voucher Tag Header */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#EADBC8] font-bold uppercase p-1 px-2.5 bg-black/30 rounded-md">
                      WNDR-{inq.id.toUpperCase()}
                    </span>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-[9px] font-mono font-bold text-emerald-400 p-0.5 px-2 bg-emerald-500/10 rounded-full flex items-center space-x-1 uppercase">
                        <CheckCircle className="w-3 h-3 fill-emerald-400 stroke-[#1F2B21]" />
                        <span>{lang === 'id' ? 'Diterima' : inq.status}</span>
                      </span>
                      
                      <button
                        onClick={() => onRemoveInquiry(inq.id)}
                        className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-500/10 text-white/50 hover:text-red-400 rounded-lg transition-all cursor-pointer"
                        title={lang === 'id' ? 'Hapus Log Pertanyaan' : 'Remove Inquiry Record'}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Core destination parameters inside card */}
                  <div>
                    <h4 className="font-serif text-lg font-semibold text-[#FAF8F2]">
                      {inq.destination}
                    </h4>
                    <p className="text-xs text-white/60 italic font-mono mt-0.5">
                      {t.submittedOn} {inq.createdAt}
                    </p>
                  </div>

                  {/* Metadata sheet inline parameters */}
                  <div className="grid grid-cols-3 gap-2 py-2 border-y border-white/5 font-mono text-[10px] text-white/70">
                    <div className="flex items-center space-x-1.5">
                      <Calendar className="w-3 h-3 text-[#EADBC8]" />
                      <span className="truncate">{inq.date}</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <Home className="w-3 h-3 text-[#EADBC8]" />
                      <span>{inq.rooms} {lang === 'id' ? 'Kmr' : 'Rms'}</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <Users className="w-3 h-3 text-[#EADBC8]" />
                      <span>{inq.people} {t.guests}</span>
                    </div>
                  </div>

                  {/* Message body snippet */}
                  <div className="bg-black/10 p-2.5 rounded-lg border border-white/5">
                    <p className="text-xs text-white/70 line-clamp-2 leading-relaxed italic">
                      "{inq.message}"
                    </p>
                  </div>

                </motion.div>
              ))
            )}
          </AnimatePresence>

        </div>

        {/* Footer Support Panel */}
        <div className="p-6 bg-[#1A251C] border-t border-white/10 space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-white/50">
            <span>{t.secureDesk}</span>
            <span className="text-[#EADBC8] font-bold">ONLINE</span>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="w-full py-3 bg-[#FAF8F2] hover:bg-[#EADBC8] text-[#1F2B21] rounded-xl font-bold font-sans text-xs uppercase tracking-widest transition-colors cursor-pointer text-center"
          >
            {t.resumeBrowsing}
          </button>
        </div>

      </motion.div>
    </div>
  );
}
