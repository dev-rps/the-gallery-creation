"use client";

import { useState } from 'react';
import GalleryGrid from './GalleryGrid';
import Lightbox from './Lightbox';
import { portfolioImages } from '@/lib/data';

const filters = ['All', 'Wedding', 'Pre-Wedding', 'Events', 'Portraits'];

export default function Gallery({ limit = null }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Filter logic
  const filteredImages = portfolioImages.filter((img) => {
    if (activeFilter === 'All') return true;
    return img.category.toLowerCase() === activeFilter.toLowerCase();
  });

  // Optional limit for homepage preview (e.g. 6 items)
  const displayedImages = limit ? filteredImages.slice(0, limit) : filteredImages;

  const handleImageClick = (index) => {
    setLightboxIndex(index);
  };

  const handleClose = () => {
    setLightboxIndex(null);
  };

  const handlePrev = () => {
    setLightboxIndex((prev) => (prev === 0 ? displayedImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setLightboxIndex((prev) => (prev === displayedImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full">
      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 mb-12">
        {filters.map((filter) => {
          const isActive = activeFilter === filter;
          return (
            <button
              key={filter}
              onClick={() => {
                setActiveFilter(filter);
                setLightboxIndex(null); // Reset lightbox when filter changes
              }}
              className={`px-6 py-2.5 text-xs uppercase tracking-widest transition-all duration-300 rounded-sm ${
                isActive
                  ? 'bg-gold text-charcoal font-semibold shadow-md'
                  : 'bg-[#222222] border border-cream/5 text-cream/70 hover:text-gold hover:border-gold/30'
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>

      {/* Gallery Grid */}
      <GalleryGrid images={displayedImages} onImageClick={handleImageClick} />

      {/* Lightbox Overlay */}
      {lightboxIndex !== null && lightboxIndex >= 0 && (
        <Lightbox
          images={displayedImages}
          currentIndex={lightboxIndex}
          onClose={handleClose}
          onPrev={handlePrev}
          onNext={handleNext}
          setLightboxIndex={setLightboxIndex}
        />
      )}
    </div>
  );
}
