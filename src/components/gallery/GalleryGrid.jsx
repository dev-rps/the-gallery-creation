"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Eye, Play, Film } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GalleryGrid({ images, onImageClick }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      <AnimatePresence mode="popLayout">
        {images.map((image, index) => (
          <motion.div
            key={image.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{
              duration: 0.35,
              delay: index * 0.05,
              ease: "easeOut"
            }}
            className="w-full"
          >
            <GalleryItem
              image={image}
              index={index}
              onClick={() => onImageClick(index)}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

function GalleryItem({ image, index, onClick }) {
  const [isLoading, setIsLoading] = useState(true);

  const handleClick = (e) => {
    if (image.isVideo || image.isReel) {
      e.stopPropagation();
      const redirectUrl = image.youtubeUrl || "https://youtube.com/@thegallerycreation";
      window.open(redirectUrl, '_blank', 'noopener,noreferrer');
    } else {
      onClick();
    }
  };

  return (
    <div
      onClick={handleClick}
      className="group relative overflow-hidden bg-card-bg cursor-pointer rounded-xl border border-cream/5 aspect-[3/2] w-full shadow-lg"
    >
      {/* Skeleton Loading Placeholder */}
      {isLoading && (
        <div className="absolute inset-0 bg-card-bg animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-t border-r border-gold/40 animate-spin" />
        </div>
      )}

      {/* Next.js Optimized Image */}
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        onLoad={() => setIsLoading(false)}
        className={`object-cover transition-all duration-500 group-hover:scale-[1.03] ${
          isLoading ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
        }`}
      />

      {/* Play Icon for Film items */}
      {image.isVideo && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className="w-14 h-14 rounded-full bg-black/60 border border-gold/40 flex items-center justify-center text-gold shadow-lg group-hover:scale-110 transition-transform duration-300">
            <Play size={24} className="fill-current ml-1" />
          </div>
        </div>
      )}

      {/* Reel Icon for Reels items */}
      {image.isReel && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className="w-14 h-14 rounded-full bg-black/60 border border-gold/40 flex items-center justify-center text-gold shadow-lg group-hover:scale-110 transition-transform duration-300">
            <Film size={24} />
          </div>
        </div>
      )}

      {/* Hover Overlay with Category Label */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 z-20">
        <div className="text-center">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#C9A96E] font-semibold">
            {image.category}
          </span>
        </div>
      </div>
    </div>
  );
}
