"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, Play } from 'lucide-react';

export default function BottomNavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setMenuOpen(true);
    const handleClose = () => setMenuOpen(false);
    window.addEventListener('menuOpen', handleOpen);
    window.addEventListener('menuClose', handleClose);
    return () => {
      window.removeEventListener('menuOpen', handleOpen);
      window.removeEventListener('menuClose', handleClose);
    };
  }, []);

  let whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919163961246';
  if (!whatsappNumber || whatsappNumber === '910000000000' || whatsappNumber.includes('000000') || whatsappNumber.includes('XXXX')) {
    whatsappNumber = '919163961246';
  }

  let callNumber = process.env.NEXT_PUBLIC_CALL_NUMBER || '918240677269';
  if (!callNumber || callNumber === '910000000000' || callNumber.includes('000000') || callNumber.includes('XXXX')) {
    callNumber = '918240677269';
  }

  const notchPath = "M 32,12 L 142,12 C 152,12 160,0 180,0 C 200,0 208,12 218,12 L 328,12 A 32,32 0 0 1 360,44 A 32,32 0 0 1 328,76 L 32,76 A 32,32 0 0 1 0,44 A 32,32 0 0 1 32,12 Z";

  const triggerVideoModal = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('openVideoModal'));
    }
  };

  return (
    <div
      className="fixed bottom-[20px] left-1/2 w-[calc(100%-40px)] max-w-[360px] z-[9999] md:hidden"
      style={{
        opacity: menuOpen ? 0 : 1,
        transform: menuOpen 
          ? 'translateY(120px) translateX(-50%)' 
          : 'translateY(0) translateX(-50%)',
        pointerEvents: menuOpen ? 'none' : 'auto',
        transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)'
      }}
    >
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', delay: 0.5, duration: 0.4, stiffness: 100, damping: 15 }}
        className="w-full h-[64px] flex items-center justify-around px-2 select-none relative"
      >
      {/* SVG Background with notch */}
      <div className="absolute inset-0 -top-[12px] w-full h-[76px] -z-10 overflow-visible" style={{
        filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.35)) drop-shadow(0 2px 8px rgba(0,0,0,0.25))',
      }}>
        <svg className="w-full h-full overflow-visible" viewBox="0 0 360 76" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d={notchPath} fill="rgba(20, 18, 16, 0.85)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
        </svg>
      </div>

      {/* Backdrop blur element */}
      <div className="absolute inset-0 rounded-[32px] -z-20 pointer-events-none" style={{
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
      }} />

      {/* Glossy top sheen with notch gap in the middle */}
      <div className="absolute top-0 left-[10%] w-[80%] h-[1px] rounded-full pointer-events-none" style={{
        background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.25) 30%, rgba(255,255,255,0) 45%, rgba(255,255,255,0) 55%, rgba(255,255,255,0.25) 70%, rgba(255,255,255,0) 100%)'
      }} />

      {/* Left button (Call) */}
      <a
        href={`tel:+${callNumber}`}
        className="flex flex-col items-center justify-center w-11 h-11 rounded-full text-[#F9F7F3] hover:text-[#C9A96E] active:text-[#C9A96E] transition-colors duration-200"
      >
        <motion.div
          whileTap={{ scale: 0.88 }}
          className="flex flex-col items-center justify-center"
        >
          <Phone size={22} className="stroke-current" />
          <span className="text-[9px] tracking-wider text-[#F9F7F3]/60 mt-0.5">Call</span>
        </motion.div>
      </a>

      {/* Center button (Video Preview) */}
      <motion.button
        whileTap={{ scale: 0.92 }}
        onClick={triggerVideoModal}
        className="bottom-bar-center-btn flex items-center justify-center w-14 h-14 bg-gradient-to-br from-[#C9A96E] to-[#B8965A] rounded-full border-3 border-white/15 -mt-7 focus:outline-none z-10"
        style={{
          borderWidth: '3px',
          borderColor: 'rgba(255,255,255,0.15)',
          zIndex: 10,
        }}
        aria-label="Watch Video Preview"
      >
        <Play size={24} className="fill-white text-white ml-0.5" />
      </motion.button>

      {/* Right button (WhatsApp) */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=Hello!%20I%20visited%20your%20website%20and%20would%20like%20to%20inquire%20about%20photography%20session.`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center justify-center w-11 h-11 rounded-full text-[#25D366]"
      >
        <motion.div
          whileTap={{ scale: 0.88 }}
          className="flex flex-col items-center justify-center"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-[#25D366]">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.705 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          <span className="text-[9px] tracking-wider text-[#F9F7F3]/60 mt-0.5">Chat</span>
        </motion.div>
      </a>
      </motion.div>
    </div>
  );
}
