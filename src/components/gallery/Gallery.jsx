"use client";

import { useState } from 'react';
import GalleryGrid from './GalleryGrid';
import Lightbox from './Lightbox';
import { portfolioImages } from '@/lib/data';

const filters = ['Pre-Wedding', 'Portraits', 'Story Telling', 'Film', 'Reels'];

// Maps display labels to their actual data category values
const filterCategoryMap = {
  'Story Telling': 'wedding',
};

export default function Gallery({ limit = null }) {
  const [activeFilter, setActiveFilter] = useState('Pre-Wedding');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [visibleCount, setVisibleCount] = useState(18);

  // Filter logic — resolve label to actual category key
  const filteredImages = portfolioImages.filter((img) => {
    const categoryKey = filterCategoryMap[activeFilter] || activeFilter;
    return img.category.toLowerCase() === categoryKey.toLowerCase();
  });

  // Optional limit for homepage preview (e.g. 6 items) or visibleCount pagination limit
  const displayedImages = limit ? filteredImages.slice(0, limit) : filteredImages.slice(0, visibleCount);

  const showLoadMore = !limit && filteredImages.length > visibleCount;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 12);
  };

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
                setVisibleCount(18); // Reset count on filter change
              }}
              className={`px-6 py-2.5 text-xs uppercase tracking-widest transition-all duration-300 rounded-sm ${
                isActive
                  ? 'bg-gold text-charcoal font-semibold shadow-md'
                  : 'bg-card-bg border border-cream/5 text-cream/70 hover:text-gold hover:border-gold/30'
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>

      {/* Gallery Grid */}
      <GalleryGrid images={displayedImages} onImageClick={handleImageClick} activeCategory={activeFilter} />

      {/* Load More Button */}
      {showLoadMore && (
        <div className="flex justify-center items-center mt-12">
          <button
            onClick={handleLoadMore}
            className="px-8 py-3.5 bg-card-bg border border-cream/10 text-cream/75 hover:text-gold hover:border-gold/40 font-semibold tracking-widest text-xs uppercase transition-all duration-300 rounded-xl shadow-md hover:scale-[1.01]"
          >
            Load More Images
          </button>
        </div>
      )}

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
