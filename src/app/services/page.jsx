import ServiceCard from '@/components/ServiceCard';
import { services } from '@/lib/data';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

export const metadata = {
  title: 'Our Services & Pricing',
  description: 'Explore photography packages for weddings, pre-wedding couple shoots, fine-art portraits, and corporate event coverages at The Gallery Creation & Shoot Insights.',
};

export default function ServicesPage() {
  return (
    <div className="w-full bg-charcoal text-cream py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Page Hero */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-gold uppercase tracking-[0.4em] text-xs font-semibold block mb-3">
            Pricing & Packages
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-wide mb-6">
            Our Services
          </h1>
          <div className="w-16 h-[1px] bg-gold mx-auto mb-6" />
          <p className="text-sm md:text-base text-cream/70 leading-relaxed font-light">
            Luxury photography experiences designed to celebrate life&apos;s most meaningful moments. Each session is meticulously curated with bespoke editorial direction, premium styling, and world-class post-production to create timeless, sophisticated imagery.
          </p>
        </div>

        {/* Services Grid */}
        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto mb-24"
          style={{ contain: 'layout style paint' }}
        >
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              id={service.id}
              name={service.name}
              description={service.description}
              price={service.price}
              priceNote={service.priceNote}
              deliverables={service.deliverables}
            />
          ))}
        </div>

        {/* Custom Package Bottom Banner */}
        <div className="bg-card-bg border border-gold/20 p-8 md:p-12 text-center rounded-sm max-w-4xl mx-auto relative overflow-hidden">
          {/* Subtle decoration */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gold/5 rounded-full blur-2xl pointer-events-none" />

          <h3 className="font-serif text-2xl md:text-3xl text-gold font-bold mb-4 tracking-wide">
            Need a Bespoke Package?
          </h3>
          <p className="text-sm text-cream/70 leading-relaxed font-light max-w-xl mx-auto mb-8">
            No two celebrations are the same. Whether you need multi-city coverage, additional photographers, cinematic films, or custom deliverables, we&apos;ll create a package tailored exclusively for you.
          </p>
          <a
            href="https://forms.gle/zsCAEjuWGraNmLU68"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-8 py-4 border border-[#C9A96E] hover:bg-[#C9A96E] hover:text-charcoal text-[#C9A96E] font-semibold tracking-widest text-xs uppercase transition-all duration-300 rounded-sm"
          >
            <span>Get Your Custom Quote</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}
