"use client";

import { useState, useEffect } from 'react';
import { MessageCircle, Phone, Play, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WhatsAppButton() {
  const [hoveredButton, setHoveredButton] = useState(null); // 'video' | 'call' | 'whatsapp' | null
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [videoError, setVideoError] = useState(false);

  let whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919163961246';
  if (!whatsappNumber || whatsappNumber === '910000000000' || whatsappNumber.includes('000000') || whatsappNumber.includes('XXXX')) {
    whatsappNumber = '919163961246';
  }

  const openVideoModal = () => {
    setVideoError(false);
    setIsVideoOpen(true);
  };

  const closeVideoModal = () => {
    setIsVideoOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeVideoModal();
      }
    };
    if (isVideoOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVideoOpen]);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 select-none">
        
        {/* 1. Video Button (Top) */}
        <div className="relative flex items-center">
          <AnimatePresence>
            {hoveredButton === 'video' && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="absolute right-16 bg-charcoal border border-gold/20 text-[#2A2724] text-xs py-2 px-3 rounded-lg shadow-xl tracking-wider uppercase font-serif whitespace-nowrap"
              >
                Watch Our Work
              </motion.div>
            )}
          </AnimatePresence>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => setHoveredButton('video')}
            onMouseLeave={() => setHoveredButton(null)}
            onClick={openVideoModal}
            className="flex items-center justify-center w-[52px] h-[52px] bg-[#1a1a1a] text-gold rounded-full shadow-2xl border border-gold transition-all duration-200 focus:outline-none overflow-hidden relative"
            aria-label="Watch Video Preview"
          >
            <video
              src="/demo-video.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Subtle semi-transparent overlay and small play icon */}
            <div className="absolute inset-0 bg-black/40 hover:bg-black/20 transition-colors duration-200 flex items-center justify-center z-10 text-gold">
              <Play size={14} className="fill-gold text-gold" />
            </div>
          </motion.button>
        </div>

        {/* 2. Call Button (Middle) */}
        <div className="relative flex items-center">
          <AnimatePresence>
            {hoveredButton === 'call' && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="absolute right-16 bg-charcoal border border-gold/20 text-[#2A2724] text-xs py-2 px-3 rounded-lg shadow-xl tracking-wider uppercase font-serif whitespace-nowrap"
              >
                Call Us
              </motion.div>
            )}
          </AnimatePresence>
          <motion.a
            href={`tel:+${whatsappNumber}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => setHoveredButton('call')}
            onMouseLeave={() => setHoveredButton(null)}
            className="flex items-center justify-center w-[52px] h-[52px] bg-[#1a73e8] text-white rounded-full shadow-2xl transition-all duration-200"
            aria-label="Call Us"
          >
            <Phone size={20} className="fill-white text-white" />
          </motion.a>
        </div>

        {/* 3. WhatsApp Button (Bottom) */}
        <div className="relative flex items-center">
          <AnimatePresence>
            {hoveredButton === 'whatsapp' && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="absolute right-16 bg-charcoal border border-gold/20 text-[#2A2724] text-xs py-2 px-3 rounded-lg shadow-xl tracking-wider uppercase font-serif whitespace-nowrap"
              >
                Chat with us
              </motion.div>
            )}
          </AnimatePresence>
          <motion.a
            href={`https://wa.me/${whatsappNumber}?text=Hello!%20I%20visited%20your%20website%20and%20would%20like%20to%20inquire%20about%20booking%20a%20photography%20session.`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => setHoveredButton('whatsapp')}
            onMouseLeave={() => setHoveredButton(null)}
            className="relative flex items-center justify-center w-[52px] h-[52px] bg-[#25D366] text-white rounded-full shadow-2xl transition-all duration-200"
            aria-label="Chat on WhatsApp"
          >
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-pulse-ring pointer-events-none" />
            <MessageCircle size={24} className="relative z-10 fill-white text-white" />
          </motion.a>
        </div>

      </div>

      {/* Video Preview Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4"
            onClick={closeVideoModal}
          >
            <div
              className="relative w-full max-w-[800px] pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                onClick={closeVideoModal}
                whileHover={{ scale: 1.1 }}
                className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/25 transition-all duration-200 focus:outline-none"
                aria-label="Close modal"
              >
                <X size={20} className="text-white" />
              </motion.button>

              {/* Video Player Box with Fallback */}
              <div className="rounded-xl overflow-hidden border border-[#C9A96E] bg-[#1a1a1a] aspect-video shadow-2xl flex items-center justify-center">
                {videoError ? (
                  <div className="text-center p-8">
                    <p className="font-serif text-lg md:text-xl text-[#C9A96E] font-semibold tracking-wide">
                      Our showreel is coming soon. Stay tuned.
                    </p>
                  </div>
                ) : (
                  <video
                    src="/demo-video.mp4"
                    controls
                    autoPlay
                    onError={() => setVideoError(true)}
                    className="w-full h-full object-contain"
                  />
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
