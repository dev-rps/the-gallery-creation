import AnimatedCounter from '@/components/AnimatedCounter';
import { photographerInfo } from '@/lib/data';
import { Star, ExternalLink } from 'lucide-react';
import Image from 'next/image';

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
            Client Testimonials
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-wide mb-6">
            Cherished Memories, Honest Words
          </h1>
          <div className="w-16 h-[1px] bg-gold mx-auto mb-6" />
          <p className="text-sm md:text-base text-cream/70 leading-relaxed font-light">
            From the first consultation to the final delivery, we&apos;re honored to be part of our couples&apos; journey. Read their verified stories and see why families trust us to capture life&apos;s most important celebrations.
          </p>
        </div>

        {/* Verified Reviews Platform Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 relative z-10">
          
          {/* Card 1: Google Reviews */}
          <div className="bg-card-bg border border-gold/10 p-8 rounded-sm flex flex-col justify-between group shadow-xl min-h-[360px]">
            <div className="flex flex-col">
              <span className="text-gold uppercase tracking-[0.2em] text-[10px] font-semibold block mb-3">Google Business</span>
              <h3 className="font-serif text-2xl font-bold text-cream mb-4">5.0 ★ Rated Reviews</h3>
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-[#C9A96E] text-[#C9A96E]" />
                ))}
              </div>
              <p className="text-xs text-cream/70 leading-relaxed font-light mb-6">
                Read certified client stories and check our outstanding ratings left by our amazing couples directly on Google Business Reviews.
              </p>
            </div>
            <a
              href="https://maps.app.goo.gl/72RfANH9arShYVKk7?g_st=ac"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 bg-gold hover:bg-[#b59459] text-charcoal font-semibold tracking-widest text-xs uppercase transition-all duration-300 rounded-sm hover:shadow-lg hover:shadow-gold/15"
            >
              <span>View Google Reviews</span>
              <ExternalLink size={12} className="stroke-[2.5px]" />
            </a>
          </div>

          {/* Card 2: Facebook Recommendations */}
          <div className="bg-card-bg border border-gold/10 p-8 rounded-sm flex flex-col justify-between group shadow-xl min-h-[360px]">
            <div className="flex flex-col">
              <span className="text-gold uppercase tracking-[0.2em] text-[10px] font-semibold block mb-3">Facebook Community</span>
              <h3 className="font-serif text-2xl font-bold text-cream mb-4">Highly Recommended</h3>
              <div className="flex items-center gap-2 mb-4 bg-gold/5 border border-gold/10 px-3 py-1.5 w-fit rounded-full">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-gold">100% Recommended</span>
              </div>
              <p className="text-xs text-cream/70 leading-relaxed font-light mb-6">
                Explore detailed testimonials, feedback, and client recommendations shared directly by our couples on our official Facebook profile.
              </p>
            </div>
            <a
              href="https://www.facebook.com/profile.php?id=100067777243992"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 bg-transparent border border-gold hover:bg-gold text-gold hover:text-charcoal font-semibold tracking-widest text-xs uppercase transition-all duration-300 rounded-sm hover:shadow-lg hover:shadow-gold/15"
            >
              <span>Read Facebook Reviews</span>
              <ExternalLink size={12} className="stroke-[2.5px]" />
            </a>
          </div>

          {/* Card 3: Instagram Stories */}
          <div className="bg-card-bg border border-gold/10 p-8 rounded-sm flex flex-col justify-between group shadow-xl min-h-[360px]">
            <div className="flex flex-col">
              <span className="text-gold uppercase tracking-[0.2em] text-[10px] font-semibold block mb-3">Instagram Highlight</span>
              <h3 className="font-serif text-2xl font-bold text-cream mb-4">Behind The Scenes</h3>
              <div className="flex items-center gap-2 mb-4 bg-gold/5 border border-gold/10 px-3 py-1.5 w-fit rounded-full">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-gold">Couple Highlights</span>
              </div>
              <p className="text-xs text-cream/70 leading-relaxed font-light mb-6">
                Watch behind-the-scenes reels, live couple stories, client reactions, and daily sneak peeks of wedding celebrations on our feed.
              </p>
            </div>
            <a
              href="https://www.instagram.com/thegallerycreation?igsh=bGozeWt1eTA1aXRw"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 bg-transparent border border-gold hover:bg-gold text-gold hover:text-charcoal font-semibold tracking-widest text-xs uppercase transition-all duration-300 rounded-sm hover:shadow-lg hover:shadow-gold/15"
            >
              <span>Follow @thegallerycreation</span>
              <ExternalLink size={12} className="stroke-[2.5px]" />
            </a>
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
