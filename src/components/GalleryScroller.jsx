"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { getCloudinaryUrl } from '@/lib/cloudinary';

// Fisher-Yates shuffle
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Pick N random unique items from array
function pickRandom(arr, n) {
  return shuffle(arr).slice(0, Math.min(n, arr.length));
}

export default function GalleryScroller({ weddingPhotos, preWeddingPhotos, portraitsPhotos }) {
  // Initial state derived on first render (client-only shuffle)
  const [rows, setRows] = useState(() => {
    const r1 = pickRandom(weddingPhotos, 10);
    const r2 = pickRandom(preWeddingPhotos, 10);
    const r3 = pickRandom(portraitsPhotos, 10);
    return {
      row1: [...r1, ...r1],
      row2: [...r2, ...r2],
      row3: [...r3, ...r3],
    };
  });

  // Fade state for smooth refresh animation
  const [fading, setFading] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    // Reshuffle every 20 seconds with a brief fade transition
    intervalRef.current = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        const r1 = pickRandom(weddingPhotos, 10);
        const r2 = pickRandom(preWeddingPhotos, 10);
        const r3 = pickRandom(portraitsPhotos, 10);
        setRows({
          row1: [...r1, ...r1],
          row2: [...r2, ...r2],
          row3: [...r3, ...r3],
        });
        setFading(false);
      }, 500);
    }, 20000);

    return () => clearInterval(intervalRef.current);
  }, [weddingPhotos, preWeddingPhotos, portraitsPhotos]);

  return (
    <div
      className="floating-gallery-wrapper flex flex-col gap-4 mb-16"
      style={{
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.5s ease',
      }}
    >
      {/* Row 1 — scrolls left, slower */}
      <div className="overflow-hidden w-full">
        <div className="floating-row-track track-left-slow">
          {rows.row1.map((image, idx) => (
            <div key={`row1-${image.id}-${idx}`} className="floating-image-card">
              <Image
                src={getCloudinaryUrl(image.src, 400)}
                alt={image.alt}
                fill
                loading="eager"
                sizes="320px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls right */}
      <div className="overflow-hidden w-full">
        <div className="floating-row-track track-right">
          {rows.row2.map((image, idx) => (
            <div key={`row2-${image.id}-${idx}`} className="floating-image-card">
              <Image
                src={getCloudinaryUrl(image.src, 400)}
                alt={image.alt}
                fill
                loading="eager"
                sizes="320px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Row 3 — scrolls left, faster */}
      <div className="overflow-hidden w-full">
        <div className="floating-row-track track-left-fast">
          {rows.row3.map((image, idx) => (
            <div key={`row3-${image.id}-${idx}`} className="floating-image-card">
              <Image
                src={getCloudinaryUrl(image.src, 400)}
                alt={image.alt}
                fill
                loading="eager"
                sizes="320px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
