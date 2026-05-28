import TestimonialCard from '@/components/TestimonialCard';
import AnimatedCounter from '@/components/AnimatedCounter';
import { testimonials, photographerInfo } from '@/lib/data';
import { Play } from 'lucide-react';

export const metadata = {
  title: 'Client Love Stories',
  description: 'Read detailed client reviews and testimonials from weddings and events captured by Raju Das & Kuushaal Debnaath.',
};

export default function TestimonialsPage() {
  const stats = photographerInfo.stats;

  return (
    <div className="w-full bg-charcoal text-cream py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Page Hero */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-gold uppercase tracking-[0.4em] text-xs font-semibold block mb-3">
            Client Gratitude
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-wide mb-6">
            Love Stories
          </h1>
          <div className="w-16 h-[1px] bg-gold mx-auto mb-6" />
          <p className="text-sm md:text-base text-cream/70 leading-relaxed font-light">
            Read the heartfelt stories of love and joy shared by couples we had the absolute privilege of documenting. Each quote represents a unique celebration that we turned into a visual masterpiece.
          </p>
        </div>

        {/* Testimonials Grid (min 6) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              name={testimonial.name}
              location={testimonial.location}
              stars={testimonial.stars}
              text={testimonial.text}
            />
          ))}
        </div>

        {/* Video Testimonials Showcase Mockup */}
        <div className="mb-28">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-gold uppercase tracking-[0.3em] text-xs font-semibold block mb-2">
              Cinema
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold tracking-wide">
              Video Testimonials
            </h2>
            <p className="text-xs text-cream/50 uppercase tracking-widest mt-2">
              Watch couples relive their wedding days
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Video Placeholder 1 */}
            <div className="group relative aspect-video bg-[#222222] border border-cream/5 flex items-center justify-center rounded-sm overflow-hidden shadow-xl cursor-pointer">
              {/* Fake backdrop with nice dark gradient */}
              <div className="absolute inset-0 bg-gradient-to-tr from-charcoal via-charcoal/80 to-gold/10" />
              {/* Info Overlay */}
              <div className="absolute bottom-4 left-4 z-10">
                <p className="font-serif text-sm font-semibold text-cream">Rohan &amp; Sneha&apos;s Highlight</p>
                <p className="text-[10px] uppercase tracking-wider text-gold">Umaid Bhawan Palace, Jodhpur</p>
              </div>
              {/* Play Button Overlay */}
              <div className="relative z-10 w-14 h-14 rounded-full border border-gold/40 flex items-center justify-center bg-charcoal/60 text-gold group-hover:bg-gold group-hover:text-charcoal group-hover:scale-110 transition-all duration-300 shadow-md">
                <Play size={20} className="fill-current ml-1" />
              </div>
            </div>

            {/* Video Placeholder 2 */}
            <div className="group relative aspect-video bg-[#222222] border border-cream/5 flex items-center justify-center rounded-sm overflow-hidden shadow-xl cursor-pointer">
              {/* Fake backdrop with nice dark gradient */}
              <div className="absolute inset-0 bg-gradient-to-tr from-charcoal via-charcoal/80 to-gold/10" />
              {/* Info Overlay */}
              <div className="absolute bottom-4 left-4 z-10">
                <p className="font-serif text-sm font-semibold text-cream">Kabir &amp; Divya&apos;s Journey</p>
                <p className="text-[10px] uppercase tracking-wider text-gold">JW Marriott, Kolkata</p>
              </div>
              {/* Play Button Overlay */}
              <div className="relative z-10 w-14 h-14 rounded-full border border-gold/40 flex items-center justify-center bg-charcoal/60 text-gold group-hover:bg-gold group-hover:text-charcoal group-hover:scale-110 transition-all duration-300 shadow-md">
                <Play size={20} className="fill-current ml-1" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Row Repeated */}
        <div className="border-t border-gold/10 pt-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="font-serif text-xl md:text-2xl text-gold font-bold tracking-wide">
              Our Journey in Numbers
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <AnimatedCounter
                key={idx}
                target={stat.target}
                suffix={stat.suffix}
                label={stat.label}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
