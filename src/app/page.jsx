import Link from 'next/link';
import Image from 'next/image';
import Hero from '@/components/Hero';
import AnimatedCounter from '@/components/AnimatedCounter';
import ServiceCard from '@/components/ServiceCard';
import TestimonialCard from '@/components/TestimonialCard';
import { services, testimonials, photographerInfo, portfolioImages } from '@/lib/data';

export const metadata = {
  title: 'The Gallery Creation & Shoot Insights | Premium Wedding & Event Photography',
  description: 'Welcome to The Gallery Creation & Shoot Insights. Captured by Raju Das & Kuushaal Debnaath, we specialize in high-end, luxury wedding photography and fine-art portraits.',
};

export default function Home() {
  // Stat rows targets
  const stats = photographerInfo.stats;

  // Services snapshot (first 3)
  const servicesSnapshot = services.slice(0, 3);

  // Testimonials snapshot (first 3)
  const testimonialsSnapshot = testimonials.slice(0, 3);

  // Filter standard photo images (exclude videos & reels)
  const photos = portfolioImages.filter(img => !img.isVideo && !img.isReel);

  // Distribute images for Row 1, Row 2, Row 3
  const row1Base = photos.slice(0, 5);
  const row2Base = [photos[5], photos[6], photos[7], photos[8], photos[0]];
  const row3Base = [photos[9], photos[10], photos[11], photos[1], photos[2]];

  // Duplicate rows for seamless loop
  const row1 = [...row1Base, ...row1Base];
  const row2 = [...row2Base, ...row2Base];
  const row3 = [...row3Base, ...row3Base];

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
      <section className="py-24 bg-transparent overflow-hidden relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-baseline mb-16">
            <span className="text-gold uppercase tracking-[0.3em] text-xs font-semibold block mb-2">
              Our Work
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-wide">
              Captured Moments
            </h2>
          </div>

          {/* 3-Row Floating Gallery Wrapper */}
          <div className="floating-gallery-wrapper flex flex-col gap-4 mb-16">
            {/* Row 1 (scrollLeft 35s) */}
            <div className="overflow-hidden w-full">
              <div 
                className="floating-row-track track-left-slow"
                onMouseEnter={undefined}
                onMouseLeave={undefined}
              >
                {row1.map((image, idx) => (
                  <div key={`row1-${image.id}-${idx}`} className="floating-image-card">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      loading="eager"
                      sizes="320px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Row 2 (scrollRight 40s) */}
            <div className="overflow-hidden w-full">
              <div 
                className="floating-row-track track-right"
                onMouseEnter={undefined}
                onMouseLeave={undefined}
              >
                {row2.map((image, idx) => (
                  <div key={`row2-${image.id}-${idx}`} className="floating-image-card">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      loading="eager"
                      sizes="320px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Row 3 (scrollLeft 30s) */}
            <div className="overflow-hidden w-full">
              <div 
                className="floating-row-track track-left-fast"
                onMouseEnter={undefined}
                onMouseLeave={undefined}
              >
                {row3.map((image, idx) => (
                  <div key={`row3-${image.id}-${idx}`} className="floating-image-card">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      loading="eager"
                      sizes="320px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/portfolio"
              className="inline-block text-xs uppercase tracking-widest text-gold border-b border-gold/30 hover:border-gold pb-1 transition-all duration-300 font-semibold"
            >
              View Full Portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Services Snapshot Section */}
      <section className="py-24 bg-charcoal relative z-10 overflow-hidden">
        {/* Background Watermark */}
        <div className="absolute right-[-40px] top-[20px] font-serif font-black italic text-[120px] md:text-[160px] text-cream/[0.02] pointer-events-none select-none z-0">
          artistry
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
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
      <section className="py-24 bg-section-bg relative z-10 overflow-hidden">
        {/* Background Watermark */}
        <div className="absolute left-[-20px] bottom-[20px] font-serif font-black italic text-[120px] md:text-[160px] text-cream/[0.02] pointer-events-none select-none z-0">
          devotion
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
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
            {testimonialsSnapshot.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                name={testimonial.name}
                location={testimonial.location}
                stars={testimonial.stars}
                text={testimonial.text}
                index={index}
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
      <section className="py-24 bg-gradient-to-br from-card-bg to-charcoal border-y border-gold/20 relative z-10">
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
