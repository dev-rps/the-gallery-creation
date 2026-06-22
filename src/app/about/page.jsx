"use client";

import Image from 'next/image';
import { timeline, photographerInfo } from '@/lib/data';
import { motion } from 'framer-motion';

const CameraIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-4 text-[#C9A96E]">
    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
    <circle cx="12" cy="13" r="3" />
  </svg>
);

const FilmIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-4 text-[#C9A96E]">
    <rect width="20" height="20" x="2" y="2" rx="2.18" ry="2.18" />
    <path d="M7 2v20" />
    <path d="M17 2v20" />
    <path d="M2 12h20" />
    <path d="M2 7h5" />
    <path d="M2 17h5" />
    <path d="M17 17h5" />
    <path d="M17 7h5" />
  </svg>
);

export default function AboutPage() {
  return (
    <div className="w-full bg-transparent text-cream relative">
      {/* Split Biography Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-b border-gold/10 relative overflow-hidden">
        {/* Background Watermark */}
        <div className="absolute left-10 top-10 font-serif font-black italic text-[120px] md:text-[180px] text-cream/[0.02] pointer-events-none select-none z-0">
          legacy
        </div>
        {/* Left Side: Two logos stacked vertically */}
        <div className="lg:col-span-5 flex flex-col bg-transparent border-r border-gold/10 relative z-10">
          {/* Logo 1 (top) */}
          <div className="flex-1 flex flex-col items-center justify-center p-12 border-b border-[#C9A96E]/30 min-h-[35vh]">
            <CameraIcon />
            <h2 className="font-serif text-2xl md:text-3xl font-bold tracking-widest text-[#C9A96E] text-center mt-4">
              THE GALLERY CREATION
            </h2>
          </div>
          
          {/* Logo 2 (bottom) */}
          <div className="flex-1 flex flex-col items-center justify-center p-12 min-h-[35vh]">
            <FilmIcon />
            <h2 className="font-serif text-2xl md:text-3xl font-bold tracking-widest text-[#C9A96E] text-center mt-4">
              SHOOT INSIGHTS
            </h2>
          </div>
        </div>

        {/* Right Side: Two story blocks stacked vertically */}
        <div className="lg:col-span-7 flex flex-col bg-transparent">
          {/* Story 1 (top) */}
          <div className="flex-1 flex flex-col justify-center p-8 md:p-16 lg:p-24 border-b border-gold/10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="pl-6 border-l border-[#C9A96E]"
            >
              <h3 className="font-serif text-2xl font-bold text-cream mb-6 tracking-wide">
                The Gallery Creation
              </h3>
              <div className="space-y-6 text-cream/80 text-sm md:text-base font-light leading-relaxed">
                <p>
                  We Don&apos;t Just Capture Weddings. We Preserve Feelings.
                </p>
                <p>
                  Every smile, every tear, every stolen glance tells a story worth remembering. At The Gallery Creation, we transform fleeting moments into timeless memories through authentic photography and cinematic storytelling.
                </p>
                <p>
                  For over a decade, we&apos;ve had the privilege of documenting love stories across Kolkata, Howrah, and beyond. Our approach blends candid emotions, artistic vision, and meticulous attention to detail, ensuring every frame feels as genuine as the moment itself.
                </p>
                <p>
                  Because years from now, your photographs shouldn&apos;t just remind you what happened—they should remind you exactly how it felt.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Story 2 (bottom) */}
          <div className="flex-1 flex flex-col justify-center p-8 md:p-16 lg:p-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="pl-6 border-l border-[#C9A96E]"
            >
              <h3 className="font-serif text-2xl font-bold text-cream mb-6 tracking-wide">
                Shoot Insights
              </h3>
              <div className="space-y-6 text-cream/80 text-sm md:text-base font-light leading-relaxed">
                <p>
                  Shoot Insights is our cinematic storytelling division, dedicated to creating wedding films and instant reels that capture the energy, emotions, and unforgettable moments of your celebration.
                </p>
                <p>
                  From heartfelt vows and joyful laughter to breathtaking drone shots and vibrant dance floors, we craft films that feel immersive, emotional, and uniquely yours.
                </p>
                <p>
                  More than a wedding video, we create a story you&apos;ll revisit for years and still feel every emotion all over again.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Meet the Founders Section */}
      <section className="py-24 bg-transparent border-b border-gold/10 relative overflow-hidden">
        {/* Background Watermark */}
        <div className="absolute right-10 bottom-10 font-serif font-black italic text-[120px] md:text-[180px] text-cream/[0.02] pointer-events-none select-none z-0">
          founders
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-gold uppercase tracking-[0.3em] text-xs font-semibold block mb-2">
              The Creative Minds
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-wide">
              Meet the Founders
            </h2>
            <div className="w-16 h-[1px] bg-gold mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Founder 1: Raju Das */}
            <div className="bg-card-bg border border-cream/5 rounded-sm overflow-hidden flex flex-col group shadow-xl">
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-section-bg">
                <Image
                  src="/raju.jpg"
                  alt="Raju Das - Co-Founder"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-charcoal/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-8 text-center bg-card-bg border-t border-gold/10">
                <h3 className="font-serif text-xl font-bold text-cream tracking-wide">Raju Das</h3>
                <p className="text-xs uppercase tracking-widest text-gold mt-1 font-semibold">Co-founder &amp; Director of Storytelling</p>
                <p className="text-sm text-cream/70 mt-4 leading-relaxed font-light">
                  Raju has an eye for transforming fleeting moments into timeless works of art. With a passion for light, composition, and emotion, he captures weddings with a blend of elegance and authenticity, creating photographs that remain meaningful for generations.
                </p>
              </div>
            </div>

            {/* Founder 2: Kuushaal Debnaath */}
            <div className="bg-card-bg border border-cream/5 rounded-sm overflow-hidden flex flex-col group shadow-xl">
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-section-bg">
                <Image
                  src="/kuushal.jpg"
                  alt="Kuushaal Debnaath - Co-Founder"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-charcoal/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-8 text-center bg-card-bg border-t border-gold/10">
                <h3 className="font-serif text-xl font-bold text-cream tracking-wide">Kuushaal Debnaath</h3>
                <p className="text-xs uppercase tracking-widest text-gold mt-1 font-semibold">Co-Founder &amp; Creative Director</p>
                <p className="text-sm text-cream/70 mt-4 leading-relaxed font-light">
                  Kuushaal specializes in documenting genuine emotions and unscripted moments through a cinematic lens. His storytelling approach focuses on preserving the laughter, tears, and intimate connections that make every celebration uniquely unforgettable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-transparent relative overflow-hidden">
        {/* Background Watermark */}
        <div className="absolute left-10 top-1/2 -translate-y-1/2 font-serif font-black italic text-[120px] md:text-[180px] text-cream/[0.02] pointer-events-none select-none z-0">
          journey
        </div>
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="text-gold uppercase tracking-[0.3em] text-xs font-semibold block mb-2">
              Our Journey
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-wide">
              Career Timeline
            </h2>
            <div className="w-16 h-[1px] bg-gold mx-auto mt-4" />
          </div>

          {/* Timeline Milestones */}
          <div className="relative border-l border-gold/20 ml-4 md:ml-32 space-y-12">
            {timeline.map((item, idx) => (
              <div key={idx} className="relative pl-8 md:pl-12">
                {/* Timeline Dot */}
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-charcoal border border-gold flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                </div>

                {/* Left Offset Year on desktop */}
                <div className="hidden md:block absolute -left-36 top-0 w-24 text-right font-serif text-lg font-bold text-gold">
                  {item.year}
                </div>

                {/* Year tag for mobile */}
                <div className="md:hidden inline-block font-serif text-sm font-bold text-gold mb-1">
                  {item.year}
                </div>

                {/* Milestone Detail */}
                <h3 className="font-serif text-lg md:text-xl font-semibold text-cream mb-2 tracking-wide">
                  {item.title}
                </h3>
                <p className="text-sm text-cream/75 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
