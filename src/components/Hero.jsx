"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Hero() {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#1a1a1a] flex items-center justify-center">
      {/* Background Image with CSS Parallax */}
      <div
        style={{
          backgroundImage: "url('/heropicfinal.jpg')",
        }}
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-scroll md:bg-fixed"
      >
        {/* Dark Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Top Title & Heading Block (Shifted up on mobile to clear the photo background subject) */}
          <div className="flex flex-col items-center relative -top-24 md:-top-10 mb-8 md:mb-0">
            <motion.span
              variants={itemVariants}
              className="text-[#C9A96E] uppercase tracking-[0.3em] text-xs md:text-sm mb-2 md:mb-4 font-semibold text-center"
            >
              The Gallery Creation &amp; Shoot Insights
            </motion.span>

            {/* Main heading */}
            <motion.h1
              variants={itemVariants}
              className="font-serif text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-[#F9F7F3] font-bold leading-tight max-w-4xl mb-2 md:mb-6 tracking-wide text-balance text-center"
            >
              Every frame tells a story. Every story deserves <span className="text-[#C9A96E] italic font-normal">perfection.</span>
            </motion.h1>
          </div>

          {/* Subheading (Kept lower down with clear gap above it on mobile) */}
          <motion.p
            variants={itemVariants}
            className="font-serif text-[#F9F7F3] italic text-lg md:text-xl lg:text-2xl mt-4 md:mt-0 mb-3 block max-w-2xl tracking-wider leading-relaxed"
          >
            &quot;Timeless memories, Treasured forever.&quot;
          </motion.p>
          <motion.p
            variants={itemVariants}
            className="text-[#F9F7F3]/80 max-w-2xl text-sm md:text-lg lg:text-xl font-light mb-10 tracking-wider leading-relaxed"
          >
            No matter how many weddings we&apos;ve filmed, no two love stories have ever been the same.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center items-center w-full"
          >
            <Link
              href="/portfolio"
              className="px-8 py-4 border border-[#F9F7F3]/20 hover:border-[#C9A96E] hover:text-[#C9A96E] text-[#F9F7F3] font-semibold tracking-widest text-xs uppercase transition-all duration-300 rounded-sm w-full sm:w-auto bg-[#1a1a1a]/40 backdrop-blur-sm text-center"
            >
              View Portfolio
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Bottom Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-20">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, repeat: Infinity, repeatType: "reverse", duration: 1 }}
          className="flex flex-col items-center cursor-pointer"
        >
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#F9F7F3]/40 mb-2 font-semibold">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-[#C9A96E] to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
