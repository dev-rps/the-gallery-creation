"use client";

import { useState, useEffect, useReducer, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks } from '@/lib/data';

// ─────────────────────────────────────────────────────────────────────────────
// Drum Carousel — data, reducer, style helper
// ─────────────────────────────────────────────────────────────────────────────
const MENU_ITEMS = [
  { name: 'Home',         href: '/' },
  { name: 'Portfolio',    href: '/portfolio' },
  { name: 'Services',     href: '/services' },
  { name: 'About',        href: '/about' },
  { name: 'Testimonials', href: '/testimonials' },
  { name: 'Contact',      href: '/contact' },
];
const TOTAL    = MENU_ITEMS.length;
const ITEM_GAP = 82; // px per drum slot

function drumReducer(state, action) {
  switch (action.type) {
    case 'NEXT': return { index: (state.index + 1) % TOTAL };
    case 'PREV': return { index: (state.index - 1 + TOTAL) % TOTAL };
    case 'SET':  return { index: ((action.index % TOTAL) + TOTAL) % TOTAL };
    default:     return state;
  }
}

function getDrumStyle(absOffset) {
  if (absOffset === 0) return {
    fontSize: 48, letterSpacing: '0.06em',
    color: '#C9A96E', opacity: 1, scale: 1.0,
    fontFamily: 'var(--font-playwrite)', fontStyle: 'italic', fontWeight: 400,
  };
  if (absOffset === 1) return {
    fontSize: 24, letterSpacing: '0.06em',
    color: '#F9F7F3', opacity: 0.5, scale: 0.75,
    fontFamily: 'var(--font-jakarta)', fontStyle: 'normal', fontWeight: 400,
  };
  return {
    fontSize: 20, letterSpacing: '0.05em',
    color: '#F9F7F3', opacity: 0.2, scale: 0.6,
    fontFamily: 'var(--font-jakarta)', fontStyle: 'normal', fontWeight: 400,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Overlay animation variants (different ease for open vs close)
// ─────────────────────────────────────────────────────────────────────────────
const overlayVariants = {
  open: {
    clipPath: 'circle(150% at calc(100% - 40px) 40px)',
    transition: { duration: 0.45, ease: [0.76, 0, 0.24, 1] },
  },
  closed: {
    clipPath: 'circle(0% at calc(100% - 40px) 40px)',
    transition: { duration: 0.35, ease: [0.24, 1, 0.76, 1] },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────
export default function Navbar() {
  const [isOpen, setIsOpen]           = useState(false);
  const [scrolled, setScrolled]       = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const pathname = usePathname();
  const router   = useRouter();

  const [drum, dispatchDrum] = useReducer(drumReducer, { index: 0 });

  const touchStartY = useRef(null);
  const wheelLock   = useRef(false);
  const overlayRef  = useRef(null);

  // ── Scroll detection ────────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Keyboard navigation ─────────────────────────────────────────────────────
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === 'ArrowDown')  { e.preventDefault(); dispatchDrum({ type: 'NEXT' }); }
      if (e.key === 'ArrowUp')    { e.preventDefault(); dispatchDrum({ type: 'PREV' }); }
      if (e.key === 'Escape')     { setIsOpen(false); }
      if (e.key === 'Enter')      { router.push(MENU_ITEMS[drum.index].href); setIsOpen(false); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, drum.index, router]);

  // ── Non-passive wheel (must be added imperatively) ──────────────────────────
  const handleWheel = useCallback((e) => {
    e.preventDefault();
    if (wheelLock.current) return;
    wheelLock.current = true;
    dispatchDrum({ type: e.deltaY > 0 ? 'NEXT' : 'PREV' });
    setTimeout(() => { wheelLock.current = false; }, 150);
  }, []);

  useEffect(() => {
    const el = overlayRef.current;
    if (!el) return;
    if (isOpen) el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [isOpen, handleWheel]);

  // ── Touch ───────────────────────────────────────────────────────────────────
  const onTouchStart = useCallback((e) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const onTouchEnd = useCallback((e) => {
    if (touchStartY.current === null) return;
    const delta = touchStartY.current - e.changedTouches[0].clientY;
    if (Math.abs(delta) > 30) dispatchDrum({ type: delta > 0 ? 'NEXT' : 'PREV' });
    touchStartY.current = null;
  }, []);

  // ── Helpers ─────────────────────────────────────────────────────────────────
  const openMenu  = () => { dispatchDrum({ type: 'SET', index: 0 }); setIsOpen(true); };
  const closeMenu = () => setIsOpen(false);

  // Hamburger line color: cream when scrolled OR menu is open (dark overlay beneath)
  const hamburgerColor = (scrolled || isOpen) ? '#F9F7F3' : '#2A2724';

  // ── Desktop nav animation variants (unchanged) ──────────────────────────────
  const navContainerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  };
  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  };

  return (
    <>
      {/* ════════════════════════════════════════════════════════════════
          HEADER — z-60 when menu is open so hamburger X floats above overlay
      ════════════════════════════════════════════════════════════════ */}
      <header
        className={`fixed top-0 left-0 w-full h-20 flex items-center ${scrolled ? 'backdrop-blur-md' : ''}`}
        style={{
          zIndex: isOpen ? 60 : 40,
          transition: 'background-color 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          // Transparent when overlay is open (avoid ugly bar on top of dark bg)
          background: isOpen
            ? 'transparent'
            : scrolled ? 'rgba(20, 18, 16, 0.85)' : 'transparent',
          boxShadow: (!isOpen && scrolled) ? '0 1px 0 rgba(201, 169, 110, 0.15)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between w-full h-full">

          {/* ── Logo ─────────────────────────────────────────────────── */}
          <Link
            href="/"
            onClick={closeMenu}
            className="flex flex-col justify-center items-start gap-[3px]"
            style={{
              overflow: 'visible',
              opacity: isOpen ? 0 : 1,
              pointerEvents: isOpen ? 'none' : 'auto',
              transition: 'opacity 0.25s ease',
            }}
          >
            <div className="relative" style={{ overflow: 'visible', display: 'block' }}>
              {/* Unscrolled logo */}
              <span
                style={{
                  fontFamily: 'var(--font-playwrite)',
                  fontStyle: 'italic',
                  fontWeight: 400,
                  fontSize: 'clamp(1.1rem, 3vw, 1.6rem)',
                  letterSpacing: '0.04em',
                  lineHeight: 1.5,
                  paddingBottom: '8px',
                  display: 'block',
                  background: 'linear-gradient(135deg, #5C3A10 0%, #9B6210 35%, #C47B0A 50%, #9B6210 65%, #5C3A10 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  opacity: scrolled ? 0 : 1,
                  transition: 'opacity 0.3s ease',
                  willChange: 'opacity',
                  overflow: 'visible',
                }}
              >
                The Gallery Creation
              </span>
              {/* Scrolled logo */}
              <span
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  fontFamily: 'var(--font-playwrite)',
                  fontStyle: 'italic',
                  fontWeight: 400,
                  fontSize: 'clamp(1.1rem, 3vw, 1.6rem)',
                  letterSpacing: '0.04em',
                  lineHeight: 1.5,
                  paddingBottom: '8px',
                  display: 'block',
                  background: 'linear-gradient(135deg, #C9A96E 0%, #F5E090 30%, #EDD470 50%, #F5E090 70%, #C9A96E 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  opacity: scrolled ? 1 : 0,
                  transition: 'opacity 0.3s ease',
                  willChange: 'opacity',
                  pointerEvents: 'none',
                  overflow: 'visible',
                }}
              >
                The Gallery Creation
              </span>
            </div>
            <span
              className="text-[10.5px] uppercase font-semibold tracking-[0.3em]"
              style={{
                fontFamily: 'var(--font-jakarta)',
                color: scrolled ? '#C4964A' : '#7A5520',
                transition: 'color 0.3s ease',
                marginTop: '-2px',
                paddingLeft: '2px',
                display: 'block',
                lineHeight: 1,
              }}
            >
              &amp; Shoot Insights
            </span>
          </Link>

          {/* ── Desktop Navigation (DO NOT CHANGE) ───────────────────── */}
          <motion.nav
            variants={navContainerVariants}
            initial="hidden"
            animate="visible"
            className="hidden md:flex items-center space-x-8 h-full"
            onMouseLeave={() => setHoveredLink(null)}
          >
            {/* Decorative ornament */}
            <span
              className="hidden md:block text-xs select-none"
              style={{ color: '#C9A96E', opacity: 0.6 }}
              aria-hidden="true"
            >
              ✦
            </span>

            {navLinks.map((link) => {
              const isActive  = pathname === link.href;
              const isHovered = hoveredLink === link.href;
              const linkColor = scrolled
                ? (isActive ? '#C9A96E' : isHovered ? '#C9A96E' : 'rgba(249,247,243,0.8)')
                : (isActive ? '#C9A96E' : isHovered ? '#C9A96E' : '#2A2724');
              const showUnderline = hoveredLink ? hoveredLink === link.href : isActive;

              return (
                <motion.div key={link.name} variants={navItemVariants} className="h-full flex items-center">
                  <Link
                    href={link.href}
                    onMouseEnter={() => setHoveredLink(link.href)}
                    className="relative py-1 flex items-center h-full"
                    style={{
                      fontFamily: 'var(--font-playfair), serif',
                      fontWeight: 400,
                      fontStyle: 'italic',
                      fontSize: '16px',
                      letterSpacing: isHovered ? '0.10em' : '0.06em',
                      transition: 'letter-spacing 300ms ease, color 300ms ease',
                      color: linkColor,
                    }}
                  >
                    {link.name}
                    {showUnderline && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#C9A96E]"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </motion.nav>

          {/* ── Animated Hamburger (mobile only) ─────────────────────── */}
          <button
            id="mobile-menu-toggle"
            onClick={() => isOpen ? closeMenu() : openMenu()}
            className="md:hidden focus:outline-none flex flex-col justify-center items-center w-8 h-8"
            style={{ gap: '6px' }}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {/* Top line */}
            <motion.span
              className="block"
              style={{ height: '3px', width: '24px', backgroundColor: hamburgerColor, borderRadius: '2px', transformOrigin: 'center' }}
              animate={isOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
            />
            {/* Middle line */}
            <motion.span
              className="block"
              style={{ height: '3px', width: '24px', backgroundColor: hamburgerColor, borderRadius: '2px' }}
              animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
            />
            {/* Bottom line */}
            <motion.span
              className="block"
              style={{ height: '3px', width: '24px', backgroundColor: hamburgerColor, borderRadius: '2px', transformOrigin: 'center' }}
              animate={isOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
            />
          </button>
        </div>
      </header>

      {/* ════════════════════════════════════════════════════════════════
          FULL-SCREEN DRUM MENU OVERLAY (mobile only, md:hidden)
      ════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={overlayRef}
            key="drum-overlay"
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 flex flex-col md:hidden"
            style={{
              zIndex: 55, // sits between normal page content and header z-60, above WhatsAppButton z-50
              background: 'linear-gradient(rgba(10, 10, 10, 0.96), rgba(10, 10, 10, 0.96)), url(/hero-bg.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed',
              willChange: 'clip-path',
            }}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >

            {/* ── Top: Studio name label ──────────────────────────────── */}
            <motion.div
              className="flex flex-col justify-center items-start px-6 pt-7"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.35 }}
              style={{ overflow: 'visible' }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-playwrite)',
                  fontStyle: 'italic',
                  fontWeight: 400,
                  fontSize: '16px',
                  letterSpacing: '0.04em',
                  lineHeight: 1.5,
                  paddingBottom: '6px',
                  display: 'block',
                  background: 'linear-gradient(135deg, #C9A96E 0%, #F5E090 30%, #EDD470 50%, #F5E090 70%, #C9A96E 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  overflow: 'visible',
                }}
              >
                The Gallery Creation
              </span>
              <span
                className="text-[10.5px] uppercase font-semibold tracking-[0.3em]"
                style={{
                  fontFamily: 'var(--font-jakarta)',
                  color: '#C4964A',
                  marginTop: '-2px',
                  paddingLeft: '2px',
                  display: 'block',
                  lineHeight: 1,
                }}
              >
                &amp; Shoot Insights
              </span>
            </motion.div>

            {/* ── Top gold separator ──────────────────────────────────── */}
            <div
              style={{
                height: '1px',
                margin: '14px 24px 0',
                background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.35), transparent)',
              }}
            />

            {/* ── Drum Carousel ───────────────────────────────────────── */}
            <div className="flex-1 flex items-center justify-center overflow-hidden">
              {/*
                Container height = 5 slots.
                Each item is positioned absolutely at top: 2*ITEM_GAP (center slot).
                Framer Motion animates y = offset * ITEM_GAP to slot the item correctly.
                Item center = 2*ITEM_GAP + ITEM_GAP/2 = 2.5 * ITEM_GAP = 50% of container. ✓
              */}
              <div
                className="relative w-full"
                style={{ height: `${ITEM_GAP * 5}px` }}
                aria-label="Navigation menu"
                role="listbox"
              >
                {MENU_ITEMS.map((item, i) => {
                  // Circular offset normalised to [-TOTAL/2, TOTAL/2]
                  let offset = i - drum.index;
                  if (offset >  TOTAL / 2) offset -= TOTAL;
                  if (offset < -TOTAL / 2) offset += TOTAL;

                  const absOffset = Math.abs(offset);
                  const s = getDrumStyle(absOffset);
                  const visible = absOffset <= 2;

                  return (
                    <motion.button
                      key={item.href}
                      role="option"
                      aria-selected={offset === 0}
                      // Base position: center slot of drum container
                      className="absolute inset-x-0 flex items-center justify-center"
                      style={{
                        top: `${2 * ITEM_GAP}px`,
                        height: `${ITEM_GAP}px`,
                        willChange: 'transform, opacity',
                        cursor: 'pointer',
                        background: 'none',
                        border: 'none',
                        outline: 'none',
                        pointerEvents: visible ? 'auto' : 'none',
                      }}
                      animate={{
                        y: offset * ITEM_GAP,
                        scale: s.scale,
                        opacity: visible ? s.opacity : 0,
                      }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      onClick={() => {
                        if (offset === 0) {
                          router.push(item.href);
                          closeMenu();
                        } else {
                          // Bring clicked item to center
                          dispatchDrum({ type: 'SET', index: i });
                        }
                      }}
                    >
                      <span
                        style={{
                          fontFamily: s.fontFamily,
                          fontSize: `${s.fontSize}px`,
                          color: s.color,
                          letterSpacing: s.letterSpacing,
                          fontStyle: s.fontStyle,
                          fontWeight: s.fontWeight,
                          textTransform: 'uppercase',
                          userSelect: 'none',
                          pointerEvents: 'none',
                          display: 'block',
                        }}
                      >
                        {item.name}
                      </span>
                    </motion.button>
                  );
                })}

                {/* Subtle center-highlight bracket lines */}
                <div
                  className="absolute inset-x-8 pointer-events-none"
                  style={{ top: `${2 * ITEM_GAP}px`, height: `${ITEM_GAP}px` }}
                >
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'rgba(201,169,110,0.12)' }} />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'rgba(201,169,110,0.12)' }} />
                </div>
              </div>
            </div>

            {/* ── Bottom gold separator ───────────────────────────────── */}
            <div
              style={{
                height: '1px',
                margin: '0 24px',
                background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.35), transparent)',
              }}
            />

            {/* ── Bottom: Social buttons + phone ─────────────────────── */}
            <motion.div
              className="flex flex-col items-center gap-3 px-6 py-6"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4, ease: 'easeOut' }}
            >
              {/* Social buttons */}
              <div className="flex gap-3">
                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 rounded-lg px-4 py-2 text-white transition-all duration-300 hover:scale-105 hover:opacity-90 text-sm font-medium"
                  style={{ background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                  <span>Instagram</span>
                </a>
                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 rounded-lg px-4 py-2 text-white transition-all duration-300 hover:scale-105 hover:opacity-90 text-sm font-medium bg-[#1877F2]"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                  <span>Facebook</span>
                </a>
              </div>

              {/* Phone */}
              <p
                style={{
                  fontFamily: 'var(--font-jakarta)',
                  color: '#F9F7F3',
                  fontSize: '11px',
                  opacity: 0.45,
                  letterSpacing: '0.08em',
                }}
              >
                +91 9163961246 &nbsp;·&nbsp; +91 8240677269
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
