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
    <div className="w-full bg-charcoal text-cream">
      {/* Split Biography Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-b border-gold/10">
        {/* Left Side: Two logos stacked vertically */}
        <div className="lg:col-span-5 flex flex-col bg-charcoal border-r border-gold/10">
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
        <div className="lg:col-span-7 flex flex-col bg-charcoal">
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
                  We believe that photography is more than just framing a shot; it&apos;s about holding onto a feeling. For the past 10 years, our cameras have been extensions of our hearts, helping us capture the quiet glances, grand celebrations, and emotional milestones that define our lives.
                </p>
                <p>
                  Growing up in the culturally rich streets of Kolkata and Howrah, we were always drawn to how light dances across local structures and how festive rituals bring communities together in a burst of colors. This city taught us to find beauty in details, which eventually inspired the inception of The Gallery Creation.
                </p>
                <p>
                  For us, every wedding is a completely blank canvas. We approach each couple not just as clients, but as collaborators in creating a visual heritage. Our style blends editorial aesthetics with candid photojournalism, giving you photographs that feel like cinema and print quality that lasts for generations.
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
                  Shoot Insights is our premier cinematic branch. We capture behind-the-scenes magic, highlight reels, and detailed documentary video production. We believe in visual motion that takes your breath away and captures the dynamic energy of your milestones.
                </p>
                <p>
                  Our video work focuses on the cinematic cadence of weddings and events. With custom sound design, color grading, and direction, we turn spontaneous laughter and high-energy dances into a film you can watch over and over.
                </p>
                <p>
                  From drone shots of grand venues to close-ups of silent tears, our cinematic reels bring out the depth of the event. We tell your wedding story through a lens of premium film and documentary-style videography.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Meet the Founders Section */}
      <section className="py-24 bg-charcoal border-b border-gold/10">
        <div className="max-w-7xl mx-auto px-6">
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
                <p className="text-xs uppercase tracking-widest text-gold mt-1 font-semibold">Co-Founder &amp; Principal Photographer</p>
                <p className="text-sm text-cream/70 mt-4 leading-relaxed font-light">
                  Raju specializes in capturing the grandeur and editorial fine-art moments of weddings, using light and scale to create breathtaking compositions.
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
                  Kuushaal focuses on candid storytelling and cinematic photojournalism, capturing the intimate, raw emotions and spontaneous love stories of your milestones.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-section-bg">
        <div className="max-w-4xl mx-auto px-6">
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
