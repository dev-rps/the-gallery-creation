import Link from 'next/link';
import Hero from '@/components/Hero';
import AnimatedCounter from '@/components/AnimatedCounter';
import Gallery from '@/components/gallery/Gallery';
import ServiceCard from '@/components/ServiceCard';
import TestimonialCard from '@/components/TestimonialCard';
import { services, testimonials, photographerInfo } from '@/lib/data';

export const metadata = {
  title: 'Lumière Studio | Luxury Wedding & Event Photography',
  description: 'Welcome to Lumière Studio. Captured by Arjun Mehta, we specialize in high-end, luxury wedding photography and fine-art portraits.',
};

export default function Home() {
  // Stat rows targets
  const stats = photographerInfo.stats;

  // Services snapshot (first 3)
  const servicesSnapshot = services.slice(0, 3);

  // Testimonials snapshot (first 3)
  const testimonialsSnapshot = testimonials.slice(0, 3);

  return (
    <div className="w-full bg-charcoal text-cream overflow-x-hidden">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Stats Row */}
      <section className="py-16 bg-charcoal border-y border-gold/10 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
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
      </section>

      {/* 3. Portfolio Preview Section */}
      <section className="py-24 bg-[#1f1f1f] relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-baseline justify-between mb-16">
            <div>
              <span className="text-gold uppercase tracking-[0.3em] text-xs font-semibold block mb-2">
                Our Work
              </span>
              <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-wide">
                Captured Moments
              </h2>
            </div>
            <Link
              href="/portfolio"
              className="text-xs uppercase tracking-widest text-gold border-b border-gold/30 hover:border-gold pb-1 transition-all duration-300 font-semibold mt-4 md:mt-0"
            >
              View Full Portfolio
            </Link>
          </div>

          {/* Limits to 6 images on home page */}
          <Gallery limit={6} />
        </div>
      </section>

      {/* 4. Services Snapshot Section */}
      <section className="py-24 bg-charcoal relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-gold uppercase tracking-[0.3em] text-xs font-semibold block mb-2">
              Our Offerings
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-wide mb-6">
              Photography Services
            </h2>
            <p className="text-sm text-cream/70 leading-relaxed font-light">
              Crafting premium visual memories through editorial styling, top-tier cinematography, and elite composition.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {servicesSnapshot.map((service) => (
              <ServiceCard
                key={service.id}
                id={service.id}
                name={service.name}
                description={service.description}
                price={service.price}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/services"
              className="inline-block px-8 py-4 border border-gold/30 hover:border-gold text-gold font-semibold tracking-widest text-xs uppercase transition-all duration-300 rounded-sm"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Testimonials Section */}
      <section className="py-24 bg-[#1f1f1f] relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-gold uppercase tracking-[0.3em] text-xs font-semibold block mb-2">
              Testimonials
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-wide mb-6">
              Love Stories
            </h2>
            <p className="text-sm text-cream/70 leading-relaxed font-light">
              Don&apos;t just take our word for it. Read the notes of gratitude and joy sent to us by couples we had the honour of documenting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonialsSnapshot.map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                name={testimonial.name}
                location={testimonial.location}
                stars={testimonial.stars}
                text={testimonial.text}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/testimonials"
              className="text-xs uppercase tracking-widest text-gold border-b border-gold/30 hover:border-gold pb-1 transition-all duration-300 font-semibold"
            >
              Read More Love Stories
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Bottom CTA Banner */}
      <section className="py-24 bg-gradient-to-br from-[#2c2214] to-charcoal border-t border-gold/10 relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold tracking-wide text-cream mb-6">
            Ready to Tell Your Story?
          </h2>
          <p className="text-cream/80 max-w-xl mx-auto text-sm md:text-base font-light mb-10 leading-relaxed">
            Let&apos;s design a customized visual session that captures the authentic emotion and elegance of your big milestones. Contact us today.
          </p>
          <Link
            href="/contact"
            className="inline-block px-10 py-4 bg-gold hover:bg-[#b59459] text-charcoal font-semibold tracking-widest text-xs uppercase transition-all duration-300 rounded-sm hover:shadow-lg hover:shadow-gold/20"
          >
            Book a Session
          </Link>
        </div>
      </section>
    </div>
  );
}
