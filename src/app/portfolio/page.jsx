import Gallery from '@/components/gallery/Gallery';

export const metadata = {
  title: 'Our Portfolio',
  description: 'Explore the full portfolio of luxury wedding, pre-wedding, event, and portrait photography by Arjun Mehta.',
};

export default function PortfolioPage() {
  return (
    <div className="w-full bg-charcoal text-cream py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Page Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-gold uppercase tracking-[0.4em] text-xs font-semibold block mb-3">
            Portfolio
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-wide mb-6">
            Our Portfolio
          </h1>
          <div className="w-16 h-[1px] bg-gold mx-auto mb-6" />
          <p className="text-sm md:text-base text-cream/70 leading-relaxed font-light">
            A curated selection of love stories, personal narratives, and grand celebrations captured across 12 cities. Use the filters below to explore specific categories.
          </p>
        </div>

        {/* Interactive Gallery */}
        <Gallery />
      </div>
    </div>
  );
}
