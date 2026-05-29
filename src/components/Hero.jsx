"use client";

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

export default function Hero() {
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacityBg = useTransform(scrollY, [0, 800], [1, 0.4]);

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
      {/* Background Image with Parallax */}
      <motion.div
        style={{ y: yBg, opacity: opacityBg }}
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
      >
        <Image
          src="/hero-bg.jpg"
          alt="Cinematic luxury wedding photography background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Dark Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/60" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          <motion.span
            variants={itemVariants}
            className="text-[#C9A96E] uppercase tracking-[0.3em] text-xs md:text-sm mb-4 font-semibold"
          >
            The Gallery Creation &amp; Shoot Insights
          </motion.span>

          {/* Main heading */}
          <motion.h1
            variants={itemVariants}
            className="font-serif text-4xl md:text-6xl lg:text-7xl text-[#F9F7F3] font-bold leading-tight max-w-4xl mb-6 tracking-wide text-balance"
          >
            Every Love Story Deserves to Be <span className="text-[#C9A96E] italic font-normal">Timeless</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-[#F9F7F3]/80 max-w-2xl text-sm md:text-lg lg:text-xl font-light mb-10 tracking-wider leading-relaxed"
          >
            &quot;Timeless memories, treasured forever.&quot; Capturing the raw emotion, grandeur, and silent intimacies of your most precious milestones.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto"
          >
            <Link
              href="/portfolio"
              className="px-8 py-4 bg-[#C9A96E] hover:bg-[#b59459] text-[#1a1a1a] font-semibold tracking-widest text-xs uppercase transition-all duration-300 rounded-sm w-full sm:w-auto hover:shadow-lg hover:shadow-gold/20"
            >
              View Portfolio
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 border border-[#F9F7F3]/20 hover:border-[#C9A96E] hover:text-[#C9A96E] text-[#F9F7F3] font-semibold tracking-widest text-xs uppercase transition-all duration-300 rounded-sm w-full sm:w-auto bg-black/40 backdrop-blur-sm"
            >
              Book a Session
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
