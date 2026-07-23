"use client";

import { useState, useEffect, useReducer, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence, useMotionValue, animate } from 'framer-motion';
import { navLinks } from '@/lib/data';

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────
const MENU_ITEMS = [
  { name: 'Home',         href: '/' },
  { name: 'Portfolio',    href: '/portfolio' },
  { name: 'Services',     href: '/services' },
  { name: 'About',        href: '/about' },
  { name: 'Testimonials', href: '/testimonials' },
  { name: 'Contact',      href: '/contact' },
];
const TOTAL    = MENU_ITEMS.length;   // 6
const ITEM_GAP = 61.5;               // px per slot

// Infinite loop: 7× repetition. LOOP_OFFSET = centre of the pool.
// After every drag, we snap back to the middle group so boundaries
// are never reached in normal usage.
const ALL_ITEMS   = MENU_ITEMS;
const LOOP_OFFSET = 0;

// Linear distance between two real indices (for opacity/scale falloff)
function linearDist(a, b) {
  return Math.abs(a - b);
}

function getDrumStyle(absOffset) {
  if (absOffset === 0) return {
    fontSize: 30, letterSpacing: '0.06em',
    color: '#C9A96E', opacity: 1, scale: 1.0,
    fontFamily: 'var(--font-playwrite)', fontStyle: 'italic', fontWeight: 400,
  };
  if (absOffset === 1) return {
    fontSize: 18, letterSpacing: '0.06em',
    color: '#F9F7F3', opacity: 0.5, scale: 0.75,
    fontFamily: 'var(--font-jakarta)', fontStyle: 'normal', fontWeight: 400,
  };
  return {
    fontSize: 16, letterSpacing: '0.05em',
    color: '#F9F7F3', opacity: 0.2, scale: 0.6,
    fontFamily: 'var(--font-jakarta)', fontStyle: 'normal', fontWeight: 400,
  };
}

function drumReducer(state, action) {
  switch (action.type) {
    case 'NEXT': 
      return { index: Math.min(state.index + 1, TOTAL - 1) };
    case 'PREV': 
      return { index: Math.max(state.index - 1, 0) };
    case 'SET':  
      return { index: Math.max(0, Math.min(action.index, TOTAL - 1)) };
    default:     
      return state;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Overlay variants
// ─────────────────────────────────────────────────────────────────────────────
const overlayVariants = {
  open:   { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
  closed: { opacity: 0, y: -16, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } },
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

  const [highlightedIndex, setHighlightedIndex] = useState(0); // real 0-5
  const [isDragging, setIsDragging]             = useState(false);

  // THE KEY PATTERN: one MotionValue drives y; standalone animate() does spring snaps.
  // drag="y" modifies this same MotionValue — no useAnimation conflict.
  const y = useMotionValue(0); // start at Home (y=0)
  const springRef    = useRef(null);  // cancel in-flight springs
  const fromDragRef  = useRef(false); // prevent double-snap on dragEnd → drum.index

  const wheelLock  = useRef(false);
  const overlayRef = useRef(null);

  // ── Scroll detection ──────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Body scroll lock ──────────────────────────────────────────────────────
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width    = '100%';
      document.body.style.top      = `-${scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width    = '';
      document.body.style.top      = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width    = '';
      document.body.style.top      = '';
    };
  }, [isOpen]);

  // ── Reset to real-item-0 when menu opens ─────────────────────────────────
  useEffect(() => {
    if (isOpen) {
      if (springRef.current) { springRef.current.stop(); springRef.current = null; }
      y.set(0);
      dispatchDrum({ type: 'SET', index: 0 });
      setHighlightedIndex(0);
    }
  }, [isOpen, y]);

  // ── Spring snap helper ────────────────────────────────────────────────────
  const snapTo = useCallback((targetY) => {
    if (springRef.current) springRef.current.stop();
    springRef.current = animate(y, targetY, {
      type:      'spring',
      stiffness: 320,
      damping:   32,
      mass:      0.8,
      onComplete: () => { springRef.current = null; },
    });
  }, [y]);

  // ── drum.index → snap (wheel / keyboard / click only; drag bypasses this) ─
  useEffect(() => {
    if (fromDragRef.current) return; // drag already called snapTo
    snapTo(-drum.index * ITEM_GAP);
    setHighlightedIndex(drum.index);
  }, [drum.index, snapTo]);

  // ── Keyboard navigation ───────────────────────────────────────────────────
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === 'ArrowDown') { e.preventDefault(); dispatchDrum({ type: 'NEXT' }); }
      if (e.key === 'ArrowUp')   { e.preventDefault(); dispatchDrum({ type: 'PREV' }); }
      if (e.key === 'Escape')    { closeMenu(); }
      if (e.key === 'Enter')     { router.push(MENU_ITEMS[drum.index].href); closeMenu(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, drum.index, router]);

  // ── Non-passive wheel ─────────────────────────────────────────────────────
  const handleWheel = useCallback((e) => {
    e.preventDefault();
    if (wheelLock.current) return;
    wheelLock.current = true;
    dispatchDrum({ type: e.deltaY > 0 ? 'NEXT' : 'PREV' });
    setTimeout(() => { wheelLock.current = false; }, 180);
  }, []);

  useEffect(() => {
    const el = overlayRef.current;
    if (!el) return;
    if (isOpen) el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [isOpen, handleWheel]);

  // ── Menu helpers ──────────────────────────────────────────────────────────
  const openMenu  = () => { setIsOpen(true);  window.dispatchEvent(new CustomEvent('menuOpen'));  };
  const closeMenu = () => { setIsOpen(false); window.dispatchEvent(new CustomEvent('menuClose')); };

  const hamburgerColor = (scrolled || isOpen) ? '#F9F7F3' : '#2A2724';
  const isGoldMode     = scrolled || isOpen;

  // ── Desktop nav variants ──────────────────────────────────────────────────
  const navContainerVariants = {
    hidden:  { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  };
  const navItemVariants = {
    hidden:  { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  };

  return (
    <>
      {/* ══════════════════════════════════════════════════════════════
          HEADER
      ══════════════════════════════════════════════════════════════ */}
      <header
        className={`fixed top-0 left-0 w-full h-20 flex items-center ${scrolled ? 'backdrop-blur-lg' : ''}`}
        style={{
          zIndex: isOpen ? 99999 : 40,
          transition: 'background-color 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s cubic-bezier(0.16,1,0.3,1)',
          background: isOpen ? 'transparent' : scrolled ? 'rgba(34,30,26,0.78)' : 'transparent',
          boxShadow: (!isOpen && scrolled) ? '0 1px 0 rgba(201,169,110,0.18)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between w-full h-full">

          {/* Logo */}
          <Link href="/" onClick={closeMenu} className="flex flex-col justify-center items-start gap-[3px]"
            style={{ overflow: 'visible', position: 'relative', zIndex: 99999 }}>
            <div className="relative" style={{ overflow: 'visible', display: 'block' }}>
              <span style={{
                fontFamily: 'var(--font-playwrite)', fontStyle: 'italic', fontWeight: 400,
                fontSize: 'clamp(1.25rem,3.5vw,1.85rem)', letterSpacing: '0.04em', lineHeight: 1.4,
                paddingBottom: '6px', display: 'block', overflow: 'visible',
                background: 'linear-gradient(135deg,#5C3A10 0%,#9B6210 35%,#C47B0A 50%,#9B6210 65%,#5C3A10 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                opacity: isGoldMode ? 0 : 1, transition: 'opacity 0.3s ease', willChange: 'opacity',
              }}>The Gallery Creation</span>
              <span style={{
                position: 'absolute', top: 0, left: 0, width: '100%', overflow: 'visible',
                fontFamily: 'var(--font-playwrite)', fontStyle: 'italic', fontWeight: 400,
                fontSize: 'clamp(1.25rem,3.5vw,1.85rem)', letterSpacing: '0.04em', lineHeight: 1.4,
                paddingBottom: '6px', display: 'block', pointerEvents: 'none',
                background: 'linear-gradient(135deg,#C9A96E 0%,#F5E090 30%,#EDD470 50%,#F5E090 70%,#C9A96E 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                opacity: isGoldMode ? 1 : 0, transition: 'opacity 0.3s ease', willChange: 'opacity',
              }}>The Gallery Creation</span>
            </div>
            <span className="text-[12px] uppercase font-semibold tracking-[0.32em]" style={{
              fontFamily: 'var(--font-jakarta)', color: '#C9A96E',
              marginTop: '-2px', paddingLeft: '2px', display: 'block', lineHeight: 1,
            }}>&amp; Shoot Insights</span>
          </Link>

          {/* Desktop nav */}
          <motion.nav variants={navContainerVariants} initial="hidden" animate="visible"
            className="hidden md:flex items-center space-x-8 h-full" onMouseLeave={() => setHoveredLink(null)}>
            <span className="hidden md:block text-xs select-none" style={{ color: '#C9A96E', opacity: 0.6 }} aria-hidden="true">✦</span>
            {navLinks.map((link) => {
              const isActive  = pathname === link.href;
              const isHovered = hoveredLink === link.href;
              const linkColor = scrolled
                ? (isActive || isHovered ? '#C9A96E' : 'rgba(249,247,243,0.8)')
                : (isActive || isHovered ? '#C9A96E' : '#2A2724');
              const showUnderline = hoveredLink ? isHovered : isActive;
              return (
                <motion.div key={link.name} variants={navItemVariants} className="h-full flex items-center">
                  <Link href={link.href} onMouseEnter={() => setHoveredLink(link.href)}
                    className="relative py-1 flex items-center h-full"
                    style={{ fontFamily: 'var(--font-playfair),serif', fontWeight: 400, fontStyle: 'italic',
                      fontSize: '16px', letterSpacing: isHovered ? '0.10em' : '0.06em',
                      transition: 'letter-spacing 300ms ease, color 300ms ease', color: linkColor }}>
                    {link.name}
                    {showUnderline && (
                      <motion.span layoutId="nav-underline"
                        className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#C9A96E]"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }} />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </motion.nav>

          {/* Hamburger */}
          <button id="mobile-menu-toggle" onClick={() => isOpen ? closeMenu() : openMenu()}
            className="md:hidden focus:outline-none flex flex-col justify-center items-center w-8 h-8"
            style={{ gap: '6px', zIndex: 99999 }} aria-label="Toggle menu" aria-expanded={isOpen}>
            <motion.span className="block"
              style={{ height: '3px', width: '24px', backgroundColor: hamburgerColor, borderRadius: '2px', transformOrigin: 'center' }}
              animate={isOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }} />
            <motion.span className="block"
              style={{ height: '3px', width: '24px', backgroundColor: hamburgerColor, borderRadius: '2px' }}
              animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }} />
            <motion.span className="block"
              style={{ height: '3px', width: '24px', backgroundColor: hamburgerColor, borderRadius: '2px', transformOrigin: 'center' }}
              animate={isOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }} />
          </button>
        </div>
      </header>

      {/* ══════════════════════════════════════════════════════════════
          MOBILE DRUM OVERLAY
      ══════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isOpen && (
          <motion.div ref={overlayRef} key="drum-overlay"
            variants={overlayVariants} initial="closed" animate="open" exit="closed"
            className="fixed inset-0 flex flex-col md:hidden pt-20"
            style={{
              zIndex: 9998,
              background: 'rgba(10,10,10,0.98)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              willChange: 'transform, opacity',
            }}
          >
            {/* Top separator */}
            <div style={{ height: '1px', margin: '14px 24px 0',
              background: 'linear-gradient(90deg,transparent,rgba(201,169,110,0.35),transparent)' }} />

            {/* ── Infinite Drum Carousel ──────────────────────────────────
                HOW IT WORKS
                ─────────────
                • ALL_ITEMS is MENU_ITEMS repeated 7×  (42 total)
                • LOOP_OFFSET = 18  →  ALL_ITEMS[18] == MENU_ITEMS[0]
                • y MotionValue starts at  −18 × ITEM_GAP  (real-Home centred)
                • drag="y" on the motion.div modifies y directly (correct pattern)
                • On drag end  → round to nearest slot → snap to equivalent slot
                  inside the middle group  (LOOP_OFFSET + realIndex)
                • The snap always resets us to the safe centre of the pool,
                  so boundary rubber-band is never reached in practice.
                • Wrap appearance: item i renders using circular distance from
                  highlightedIndex so items seamlessly "continue" past 0↔5.
            ────────────────────────────────────────────────────────── */}
            <div className="flex-1 flex items-center justify-center overflow-hidden">
              <div
                className="relative overflow-hidden"
                style={{ height: `${ITEM_GAP * 5}px`, width: '100%' }}
                aria-label="Navigation menu" role="listbox"
              >
                <motion.div
                  drag="y"
                  dragConstraints={{
                    top:    -(TOTAL - 1) * ITEM_GAP,
                    bottom: 0,
                  }}
                  dragElastic={0.10}
                  dragMomentum={false}
                  style={{
                    position: 'absolute',
                    top: `${2 * ITEM_GAP}px`,
                    left: 0,
                    right: 0,
                    y,                      // ← MotionValue owns y
                    touchAction: 'none',
                    cursor: isDragging ? 'grabbing' : 'grab',
                  }}
                  onDragStart={() => {
                    setIsDragging(true);
                    if (springRef.current) { springRef.current.stop(); springRef.current = null; }
                  }}
                  onDrag={() => {
                    // Update highlighted item live while dragging
                    const currentY = y.get();
                    const rawIdx   = -currentY / ITEM_GAP;
                    const clampedIdx = Math.max(0, 
                      Math.min(TOTAL - 1, Math.round(rawIdx)));
                    setHighlightedIndex(clampedIdx);
                  }}
                  onDragEnd={(_, info) => {
                    setIsDragging(false);
                    const currentY  = y.get();
                    const projected = currentY + info.velocity.y * 0.10; // velocity throw
                    const rawIdx    = -projected / ITEM_GAP;
                    // Clamp — no wrapping, hard stop at 0 and TOTAL-1
                    const clampedIdx = Math.max(0, 
                      Math.min(TOTAL - 1, Math.round(rawIdx)));
                    const targetY   = -clampedIdx * ITEM_GAP;

                    setHighlightedIndex(clampedIdx);

                    // Flag so drum.index effect knows drag already handled the snap
                    fromDragRef.current = true;
                    dispatchDrum({ type: 'SET', index: clampedIdx });
                    snapTo(targetY);
                    // Clear flag after effects have fired
                    setTimeout(() => { fromDragRef.current = false; }, 0);
                  }}
                >
                  {ALL_ITEMS.map((item, i) => {
                    const realI     = i;
                    const absOffset = linearDist(realI, highlightedIndex);
                    const s         = getDrumStyle(absOffset);
                    // visible = within 2 real-item-positions of the highlighted target.
                    // IMPORTANT: use linearDist(highlightedIndex) — NOT y.get() —
                    // so items stay visible throughout the spring animation, not just
                    // when the physical y position has already caught up.
                    const visible = linearDist(realI, highlightedIndex) <= 2;

                    return (
                      <div
                        key={`${item.href}-${i}`}
                        role="option"
                        aria-selected={realI === drum.index}
                        style={{
                          height: `${ITEM_GAP}px`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '100%',
                          pointerEvents: visible ? 'auto' : 'none',
                        }}
                      >
                        <Link
                          href={item.href}
                          style={{
                            background: 'none', border: 'none', outline: 'none',
                            cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            width: '100%', padding: 0,
                            opacity: visible ? s.opacity : 0,
                            transform: `scale(${s.scale})`,
                            transition: 'opacity 0.22s ease, transform 0.22s ease',
                          }}
                          onClick={() => {
                            dispatchDrum({ type: 'SET', index: realI });
                            closeMenu();
                          }}
                        >
                          <span style={{
                            fontFamily: s.fontFamily, fontSize: `${s.fontSize}px`,
                            color: s.color, letterSpacing: s.letterSpacing,
                            fontStyle: s.fontStyle, fontWeight: s.fontWeight,
                            textTransform: 'uppercase', userSelect: 'none',
                            pointerEvents: 'none', display: 'block',
                            whiteSpace: 'nowrap', textAlign: 'center', width: '100%',
                          }}>
                            {item.name}
                          </span>
                        </Link>
                      </div>
                    );
                  })}
                </motion.div>

                {/* Centre highlight lines */}
                <div className="absolute pointer-events-none"
                  style={{ top: `${2 * ITEM_GAP}px`, left: '10%', right: '10%', height: `${ITEM_GAP}px` }}>
                  <div style={{ position: 'absolute', top: 0,    left: 0, right: 0, height: '1px', background: 'rgba(201,169,110,0.18)' }} />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'rgba(201,169,110,0.18)' }} />
                </div>
              </div>
            </div>

            {/* Bottom separator */}
            <div style={{ height: '1px', margin: '0 24px',
              background: 'linear-gradient(90deg,transparent,rgba(201,169,110,0.35),transparent)' }} />

            {/* Social + phone */}
            <motion.div className="flex flex-col items-center gap-3 px-6 py-6"
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4, ease: 'easeOut' }}>
              <div className="flex gap-3">
                <a href="https://www.instagram.com/thegallerycreation?igsh=bGozeWt1eTA1aXRw" target="_blank" rel="noopener noreferrer"
                  className="flex items-center space-x-2 rounded-lg px-4 py-2 text-white transition-all duration-300 hover:scale-105 hover:opacity-90 text-sm font-medium"
                  style={{ background: 'linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                  <span>Instagram</span>
                </a>
                <a href="https://www.facebook.com/profile.php?id=100067777243992" target="_blank" rel="noopener noreferrer"
                  className="flex items-center space-x-2 rounded-lg px-4 py-2 text-white transition-all duration-300 hover:scale-105 hover:opacity-90 text-sm font-medium bg-[#1877F2]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                  <span>Facebook</span>
                </a>
              </div>
              <p style={{ fontFamily: 'var(--font-jakarta)', color: '#F9F7F3', fontSize: '11px', opacity: 0.45, letterSpacing: '0.08em' }}>
                +91 9163961246 &nbsp;·&nbsp; +91 8240677269
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
