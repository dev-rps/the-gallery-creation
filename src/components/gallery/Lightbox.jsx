"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Lightbox({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
  setLightboxIndex
}) {
  const currentImage = images[currentIndex];
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    // Disable background scroll when open
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose, onPrev, onNext]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      onNext();
    } else if (isRightSwipe) {
      onPrev();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  if (!currentImage) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm">
        {/* Backdrop Close Click */}
        <div className="absolute inset-0 cursor-zoom-out" onClick={onClose} />

        {/* Top Controls: Counter & Close */}
        <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-cream z-20">
          <span className="font-mono text-xs uppercase tracking-widest bg-charcoal/60 backdrop-blur-md py-1.5 px-3 rounded-sm border border-cream/5">
            {currentIndex + 1} / {images.length}
          </span>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-charcoal/60 backdrop-blur-md flex items-center justify-center hover:bg-gold hover:text-charcoal hover:scale-105 transition-all duration-300 border border-cream/5"
            aria-label="Close lightbox"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Left */}
        <button
          onClick={onPrev}
          className="absolute left-6 w-12 h-12 rounded-full bg-charcoal/60 backdrop-blur-md flex items-center justify-center text-cream hover:bg-gold hover:text-charcoal hover:scale-105 transition-all duration-300 border border-cream/5 z-20 hidden md:flex"
          aria-label="Previous image"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Main Image Container */}
        <motion.div
          key={currentImage.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="relative max-w-[90vw] max-h-[80vh] w-full h-full flex items-center justify-center z-10"
        >
          <div className="relative w-full h-full max-w-[1200px] max-h-[75vh] select-none">
            <Image
              src={currentImage.src}
              alt={currentImage.alt}
              fill
              sizes="(max-width: 1200px) 100vw, 1200px"
              priority
              className="object-contain"
            />
          </div>
        </motion.div>

        {/* Navigation Right */}
        <button
          onClick={onNext}
          className="absolute right-6 w-12 h-12 rounded-full bg-charcoal/60 backdrop-blur-md flex items-center justify-center text-cream hover:bg-gold hover:text-charcoal hover:scale-105 transition-all duration-300 border border-cream/5 z-20 hidden md:flex"
          aria-label="Next image"
        >
          <ChevronRight size={24} />
        </button>

        {/* Slide indicators for touch users */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 md:hidden flex gap-1 z-25">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setLightboxIndex(idx)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                idx === currentIndex ? 'bg-gold w-4' : 'bg-cream/20'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </AnimatePresence>
  );
}
