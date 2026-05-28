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

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-charcoal/80 backdrop-blur-md border-b border-gold/10 py-4 shadow-lg'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" onClick={closeDrawer} className="flex flex-col">
            <span className="font-serif text-xl tracking-widest text-gold font-bold leading-tight">THE GALLERY CREATION</span>
            <span className="text-[9px] uppercase tracking-[0.2em] text-cream/75 mt-0.5">&amp; SHOOT INSIGHTS</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative py-1 text-sm tracking-widest uppercase transition-colors duration-200 ${
                    isActive ? 'text-gold' : 'text-cream/80 hover:text-gold'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 w-full h-[1px] bg-gold"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Hamburger Trigger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-cream hover:text-gold transition-colors focus:outline-none"
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
                  <div className="flex flex-col">
                    <span className="font-serif text-lg tracking-widest text-gold font-bold leading-tight">THE GALLERY CREATION</span>
                    <span className="text-[8px] uppercase tracking-[0.2em] text-cream/75 mt-0.5">&amp; SHOOT INSIGHTS</span>
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
