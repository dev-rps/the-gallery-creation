"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { navLinks } from '@/lib/data';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close drawer helper
  const closeDrawer = () => setIsOpen(false);

  const isHomePage = pathname === '/';
  const useLightText = isHomePage && !scrolled;

  const triggerColorClass = useLightText ? 'text-[#F9F7F3] hover:text-[#C9A96E]' : 'text-cream hover:text-gold';

  const navContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 h-20 flex items-center ${
          scrolled ? 'backdrop-blur-md' : ''
        }`}
        style={{
          transition: 'box-shadow 0.3s ease, background 0.3s ease',
          background: scrolled ? 'rgba(26, 26, 26, 0.95)' : 'transparent',
          boxShadow: scrolled ? '0 1px 0 rgba(201, 169, 110, 0.15)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between w-full h-full">
          <Link href="/" onClick={closeDrawer} className="flex flex-col justify-center items-start gap-[2px]">
            <span
              className="font-sans text-sm md:text-base tracking-[0.22em] font-black uppercase leading-none"
              style={{
                color: scrolled ? '#C9A96E' : '#2A2724',
              }}
            >
              THE GALLERY CREATION
            </span>
            <span
              className="font-sans text-[10px] uppercase tracking-[0.18em] leading-none font-medium text-[#C9A96E]"
            >
              &amp; SHOOT INSIGHTS
            </span>
          </Link>

          {/* Desktop Navigation */}
          <motion.nav
            variants={navContainerVariants}
            initial="hidden"
            animate="visible"
            className="hidden md:flex items-center space-x-8 h-full"
            onMouseLeave={() => setHoveredLink(null)}
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const linkColorClass = scrolled
                ? (isActive ? 'text-gold' : 'text-[#F9F7F3]/80 hover:text-gold')
                : (isActive ? 'text-[#C9A96E]' : 'text-[#2A2724] hover:text-[#C9A96E]');

              const showUnderline = hoveredLink ? hoveredLink === link.href : isActive;

              return (
                <motion.div key={link.name} variants={navItemVariants} className="h-full flex items-center">
                  <Link
                    href={link.href}
                    onMouseEnter={() => setHoveredLink(link.href)}
                    className={`relative py-1 text-sm tracking-widest uppercase transition-colors duration-200 ${linkColorClass} flex items-center h-full`}
                  >
                    {link.name}
                    {showUnderline && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C9A96E]"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </motion.nav>

          {/* Mobile Hamburger Trigger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden ${triggerColorClass} transition-colors focus:outline-none`}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Dark semi-transparent backdrop overlay */}
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 0.6 },
                exit: { opacity: 0 }
              }}
              onClick={closeDrawer}
              className="fixed inset-0 bg-black z-45"
            />

            {/* Slide-in drawer container */}
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: { x: "100%" },
                visible: { x: 0 },
                exit: { x: "100%" }
              }}
              transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-4/5 max-w-sm bg-charcoal border-l border-gold/10 p-8 flex flex-col justify-between shadow-2xl z-50"
            >
              <div>
                <div className="flex justify-between items-center mb-12">
                  <div className="flex flex-col justify-center items-start gap-[2px]">
                    <span className="font-sans text-sm tracking-[0.22em] text-gold font-black uppercase leading-none">THE GALLERY CREATION</span>
                    <span className="font-sans text-[10px] uppercase tracking-[0.18em] text-[#C9A96E] font-medium leading-none">&amp; SHOOT INSIGHTS</span>
                  </div>
                  <button
                    onClick={closeDrawer}
                    className="text-cream hover:text-gold transition-colors focus:outline-none"
                    aria-label="Close menu"
                  >
                    <X size={28} />
                  </button>
                </div>

                <nav className="flex flex-col space-y-6">
                  {navLinks.map((link, index) => {
                    const isActive = pathname === link.href;
                    return (
                      <motion.div
                        key={link.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          href={link.href}
                          onClick={closeDrawer}
                          className={`text-lg tracking-widest uppercase block py-2 border-b border-cream/5 ${
                            isActive ? 'text-gold font-semibold' : 'text-cream/80 hover:text-gold'
                          }`}
                        >
                          {link.name}
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>
              </div>

              <div className="text-center text-xs text-cream/40 border-t border-cream/5 pt-6">
                <p>© {new Date().getFullYear()} The Gallery Creation & Shoot Insights.</p>
                <p className="mt-1">Timeless memories, treasured forever.</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
