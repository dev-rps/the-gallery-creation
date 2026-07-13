import Link from 'next/link';
import Image from 'next/image';
import Hero from '@/components/Hero';
import AnimatedCounter from '@/components/AnimatedCounter';
import ServiceCard from '@/components/ServiceCard';
import TestimonialCard from '@/components/TestimonialCard';
import { services, testimonials, photographerInfo, portfolioImages } from '@/lib/data';
import { getCloudinaryUrl } from '@/lib/cloudinary';

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

  // Filter standard photo images by category (exclude videos & reels)
  const weddingPhotos = portfolioImages.filter(img => img.category === 'wedding');
  const preWeddingPhotos = portfolioImages.filter(img => img.category === 'pre-wedding');
  const portraitsPhotos = portfolioImages.filter(img => img.category === 'portraits');

  // Distribute latest images from each category for Row 1, Row 2, Row 3
  const row1Base = weddingPhotos.slice(0, 8);
  const row2Base = preWeddingPhotos.slice(0, 8);
  const row3Base = portraitsPhotos.slice(0, 8);

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
          <div className="flex flex-col items-center md:flex-row md:items-end justify-between mb-16 gap-6 text-center md:text-left">
            <div className="flex flex-col items-center md:items-baseline">
              <span className="text-gold uppercase tracking-[0.3em] text-xs font-semibold block mb-2">
                Our Work
              </span>
              <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-wide">
                Captured Moments
              </h2>
            </div>
            {/* Logos in portfolio preview */}
            <div className="flex flex-row items-center justify-center gap-4 md:gap-6 bg-cream/[0.02] border border-cream/5 rounded-sm p-4 w-fit">
              <div className="relative w-28 h-10 md:w-32 md:h-12">
                <Image
                  src="/the-gallery-creation.png"
                  alt="The Gallery Creation Logo"
                  fill
                  className="object-contain opacity-80"
                />
              </div>
              <div className="h-6 w-[1px] bg-gold/20" />
              <div className="relative w-28 h-10 md:w-32 md:h-12">
                <Image
                  src="/shoot-insights.png"
                  alt="Shoot Insights Logo"
                  fill
                  className="object-contain opacity-80"
                />
              </div>
            </div>
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
                      src={getCloudinaryUrl(image.src, 400)}
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
                      src={getCloudinaryUrl(image.src, 400)}
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
                      src={getCloudinaryUrl(image.src, 400)}
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
      <section className="py-24 bg-transparent relative z-10 overflow-hidden">
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
              Luxury photography experiences designed to celebrate life’s most meaningful moments. Each session is meticulously curated with bespoke editorial direction, premium styling, and world-class post-production to create timeless, sophisticated imagery.
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
                priceNote={service.priceNote}
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
      <section className="py-24 bg-transparent relative z-10 overflow-hidden">
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
              Verified Love Stories
            </h2>
            <p className="text-sm text-cream/70 leading-relaxed font-light">
              We build customer trust through transparency. Read the stories and ratings left by our amazing couples directly on verified platforms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Google Reviews Trust box */}
            <div className="bg-card-bg/40 border border-gold/10 p-8 rounded-sm flex flex-col justify-between items-center text-center shadow-lg">
              <span className="text-[10px] uppercase font-semibold text-gold tracking-widest mb-3">Google Maps</span>
              <h3 className="font-serif text-xl font-bold text-cream mb-2">5.0 ★ Rated</h3>
              <p className="text-xs text-cream/60 font-light mb-6">Read certified feedback and outstanding ratings left by our clients.</p>
              <a
                href="https://maps.app.goo.gl/72RfANH9arShYVKk7?g_st=ac"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-gold font-semibold uppercase tracking-wider border-b border-gold/30 hover:border-gold pb-0.5 transition-all duration-300"
              >
                <span>Read Google Reviews</span>
                <span className="text-[10px]">↗</span>
              </a>
            </div>

            {/* Facebook Recommend Trust box */}
            <div className="bg-card-bg/40 border border-gold/10 p-8 rounded-sm flex flex-col justify-between items-center text-center shadow-lg">
              <span className="text-[10px] uppercase font-semibold text-gold tracking-widest mb-3">Facebook</span>
              <h3 className="font-serif text-xl font-bold text-cream mb-2">100% Recommended</h3>
              <p className="text-xs text-cream/60 font-light mb-6">Explore the testimonials and notes of gratitude shared on our profile page.</p>
              <a
                href="https://www.facebook.com/profile.php?id=100067777243992"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-gold font-semibold uppercase tracking-wider border-b border-gold/30 hover:border-gold pb-0.5 transition-all duration-300"
              >
                <span>Read Facebook Reviews</span>
                <span className="text-[10px]">↗</span>
              </a>
            </div>

            {/* Instagram Highlight Trust box */}
            <div className="bg-card-bg/40 border border-gold/10 p-8 rounded-sm flex flex-col justify-between items-center text-center shadow-lg">
              <span className="text-[10px] uppercase font-semibold text-gold tracking-widest mb-3">Instagram</span>
              <h3 className="font-serif text-xl font-bold text-cream mb-2">Couple Highlights</h3>
              <p className="text-xs text-cream/60 font-light mb-6">Watch wedding cinematic reels, live updates, and couples highlights.</p>
              <a
                href="https://www.instagram.com/thegallerycreation?igsh=bGozeWt1eTA1aXRw"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-gold font-semibold uppercase tracking-wider border-b border-gold/30 hover:border-gold pb-0.5 transition-all duration-300"
              >
                <span>Follow Couple Stories</span>
                <span className="text-[10px]">↗</span>
              </a>
            </div>
          </div>

          <div className="text-center mt-16">
            <Link
              href="/testimonials"
              className="text-xs uppercase tracking-[0.2em] text-gold border-b border-gold/30 hover:border-gold pb-1 transition-all duration-300 font-semibold"
            >
              Explore Verified Review Center
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Bottom CTA Banner */}
      <section className="py-24 bg-gradient-to-br from-card-bg to-charcoal border-y border-gold/20 relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold tracking-wide text-cream mb-6">
            Ready to Relive Your Wedding Forever?
          </h2>
          <p className="text-cream/80 max-w-xl mx-auto text-sm md:text-base font-light mb-10 leading-relaxed">
            The flowers will fade, the music will stop, and the celebrations will end—but your memories deserve to live on forever. Let&apos;s create a wedding story you&apos;ll cherish for generations.
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
