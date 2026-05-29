"use client";

import { useState } from 'react';
import Image from 'next/image';
import { ZoomIn } from 'lucide-react';

export default function GalleryGrid({ images, onImageClick }) {
  return (
    <div className="masonry w-full">
      {images.map((image, index) => (
        <GalleryItem
          key={image.id}
          image={image}
          index={index}
          onClick={() => onImageClick(index)}
        />
      ))}
    </div>
  );
}

function GalleryItem({ image, index, onClick }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      onClick={onClick}
      className="masonry-item group relative overflow-hidden bg-card-bg cursor-pointer rounded-sm border border-cream/5"
      style={{ aspectRatio: `${image.width} / ${image.height}` }}
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
        className={`object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
          isLoading ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
        }`}
      />

      {/* Hover Overlay with Zoom Icon */}
      <div className="absolute inset-0 bg-charcoal/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
        <div className="w-12 h-12 rounded-full border border-gold/40 flex items-center justify-center bg-charcoal/80 text-gold transform scale-75 group-hover:scale-100 transition-all duration-300 hover:bg-gold hover:text-charcoal">
          <ZoomIn size={20} />
        </div>
      </div>
    </div>
  );
}
