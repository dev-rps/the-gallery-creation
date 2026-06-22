"use client";

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Lightbox({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
  setLightboxIndex,
}) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Mount guard & mobile detection
  useEffect(() => {
    setMounted(true);
    requestAnimationFrame(() => setVisible(true));
    
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => {
      setVisible(false);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Lock body scroll & keyboard nav
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, onPrev, onNext]);

  const handleTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const d = touchStart - touchEnd;
    if (d > 50) onNext();
    else if (d < -50) onPrev();
    setTouchStart(0);
    setTouchEnd(0);
  };

  const currentImage = images[currentIndex];
  if (!currentImage || !mounted) return null;

  const isYouTube = !!(currentImage.isVideo || currentImage.isReel) && !!currentImage.youtubeId;

  const embedSrc = isYouTube
    ? `https://www.youtube-nocookie.com/embed/${currentImage.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1&enablejsapi=0`
    : null;

  const NavButtons = ({ direction }) => (
    <button
      onClick={(e) => { e.stopPropagation(); direction === 'prev' ? onPrev() : onNext(); }}
      aria-label={direction === 'prev' ? "Previous" : "Next"}
      style={{
        width: 48,
        height: 48,
        borderRadius: '50%',
        background: 'rgba(42,39,36,0.7)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(249,247,243,0.08)',
        color: '#F9F7F3',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background 0.2s, color 0.2s',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.background = '#C9A96E'; e.currentTarget.style.color = '#1a1a1a'; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(42,39,36,0.7)'; e.currentTarget.style.color = '#F9F7F3'; }}
    >
      {direction === 'prev' ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
    </button>
  );

  const modal = (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(0,0,0,0.96)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.2s ease',
        padding: isMobile ? '80px 20px' : 24,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'absolute',
          top: 24,
          left: 24,
          right: 24,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 10,
          color: '#F9F7F3',
        }}
      >
        <span
          style={{
            fontFamily: 'monospace',
            fontSize: '0.7rem',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            background: 'rgba(42,39,36,0.7)',
            backdropFilter: 'blur(8px)',
            padding: '6px 12px',
            borderRadius: '2px',
            border: '1px solid rgba(249,247,243,0.08)',
          }}
        >
          {currentIndex + 1} / {images.length}
        </span>
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: 'rgba(42,39,36,0.7)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(249,247,243,0.08)',
            color: '#F9F7F3',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.2s, color 0.2s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#C9A96E'; e.currentTarget.style.color = '#1a1a1a'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(42,39,36,0.7)'; e.currentTarget.style.color = '#F9F7F3'; }}
        >
          <X size={20} />
        </button>
      </div>

      {!isMobile && (
        <div style={{ position: 'absolute', left: 24, zIndex: 10 }}>
          <NavButtons direction="prev" />
        </div>
      )}

      <div
        key={currentImage.id}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          width: '100%',
          maxWidth: isYouTube ? 960 : 1200,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 20,
        }}
      >
        {isYouTube ? (
          <div
            style={{
              width: '100%',
              aspectRatio: currentImage.isReel ? '9/16' : '16/9',
              maxHeight: '70vh',
              borderRadius: 12,
              overflow: 'hidden',
              boxShadow: '0 8px 60px rgba(0,0,0,0.6)',
              border: '1px solid rgba(201,169,110,0.2)',
              background: '#000',
            }}
          >
            <iframe
              src={embedSrc}
              title={currentImage.alt}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="eager"
              style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
            />
          </div>
        ) : (
          <div style={{ position: 'relative', width: '100%', maxHeight: '75vh', aspectRatio: `${currentImage.width}/${currentImage.height}` }}>
            <Image
              src={currentImage.src}
              alt={currentImage.alt}
              fill
              sizes="(max-width: 1200px) 90vw, 1200px"
              priority
              style={{ objectFit: 'contain' }}
            />
          </div>
        )}

        {isMobile && (
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ display: 'flex', alignItems: 'center', gap: 16 }}
          >
            <NavButtons direction="prev" />
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); setLightboxIndex(idx); }}
                  aria-label={`Go to ${idx + 1}`}
                  style={{
                    width: idx === currentIndex ? 16 : 6,
                    height: 6,
                    borderRadius: 9999,
                    background: idx === currentIndex ? '#C9A96E' : 'rgba(249,247,243,0.3)',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    transition: 'width 0.3s ease, background 0.3s ease',
                  }}
                />
              ))}
            </div>
            <NavButtons direction="next" />
          </div>
        )}
      </div>

      {!isMobile && (
        <div style={{ position: 'absolute', right: 24, zIndex: 10 }}>
          <NavButtons direction="next" />
        </div>
      )}

      {/* Desktop-only dot indicators at bottom */}
      {!isMobile && (
        <div
          style={{
            position: 'absolute',
            bottom: 24,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 6,
            zIndex: 10,
          }}
        >
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => { e.stopPropagation(); setLightboxIndex(idx); }}
              aria-label={`Go to ${idx + 1}`}
              style={{
                width: idx === currentIndex ? 16 : 6,
                height: 6,
                borderRadius: 9999,
                background: idx === currentIndex ? '#C9A96E' : 'rgba(249,247,243,0.2)',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'width 0.3s ease, background 0.3s ease',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );

  return createPortal(modal, document.body);
}
