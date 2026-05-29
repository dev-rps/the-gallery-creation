"use client";

import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);
  let whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919163961246';
  if (!whatsappNumber || whatsappNumber === '910000000000' || whatsappNumber.includes('000000') || whatsappNumber.includes('XXXX')) {
    whatsappNumber = '919163961246';
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center">
      {/* Hover Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="mr-3 bg-charcoal border border-gold/20 text-cream text-xs py-2 px-3 rounded-lg shadow-xl tracking-wider uppercase font-serif"
          >
            Chat with us
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=Hello!%20I%20visited%20your%20website%20and%20would%20like%20to%20inquire%20about%20booking%20a%20photography%20session.`}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-transform duration-200"
        aria-label="Chat on WhatsApp"
      >
        {/* Pulsing ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-pulse-ring" />

        {/* WhatsApp Icon */}
        <MessageCircle size={28} className="relative z-10 fill-white" />
      </a>
    </div>
  );
}
