import Gallery from '@/components/gallery/Gallery';

export const metadata = {
  title: 'Our Portfolio',
  description: 'Explore the full portfolio of premium wedding, pre-wedding, event, and portrait photography by Raju Das & Kuushaal Debnaath.',
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
            Love Stories We&apos;ve Told
          </h1>
          <div className="w-16 h-[1px] bg-gold mx-auto mb-6" />
          <p className="text-sm md:text-base text-cream/70 leading-relaxed font-light">
            Each gallery is more than a collection of images—it&apos;s a journey of emotions, connections, and unforgettable moments waiting to be relived. Browse our weddings, pre-weddings, portraits, films, and reels to experience the stories we&apos;ve been privileged to capture.
          </p>
        </div>

        {/* Interactive Gallery */}
        <Gallery />
      </div>
    </div>
  );
}
