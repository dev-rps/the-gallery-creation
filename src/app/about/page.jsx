import Image from 'next/image';
import { timeline, photographerInfo } from '@/lib/data';

export const metadata = {
  title: 'About Raju Das & Kuushaal Debnaath',
  description: 'Learn about Raju Das & Kuushaal Debnaath, the founders and principal photographers behind The Gallery Creation & Shoot Insights.',
};

export default function AboutPage() {
  return (
    <div className="w-full bg-charcoal text-cream">
      {/* Split Biography Section */}
      <section className="min-h-[85vh] grid grid-cols-1 lg:grid-cols-12 gap-0 border-b border-gold/10">
        {/* Left: Brand Logo Column */}
        <div className="lg:col-span-5 relative min-h-[50vh] lg:min-h-0 bg-[#ffffff] flex items-center justify-center p-12 border-r border-gold/10">
          <div className="relative w-full aspect-square max-w-sm">
            <Image
              src="/shoot-insights.png"
              alt="Shoot Insights Logo"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-contain"
            />
          </div>
        </div>

        {/* Right: Story Column */}
        <div className="lg:col-span-7 flex flex-col justify-center p-8 md:p-16 lg:p-24 bg-charcoal">
          <span className="text-gold uppercase tracking-[0.3em] text-xs font-semibold mb-3 block">
            The Story
          </span>
          <h1 className="font-serif text-3xl md:text-5xl font-bold tracking-wide mb-8">
            The Gallery Creation
          </h1>

          <div className="space-y-6 text-cream/80 text-sm md:text-base font-light leading-relaxed">
            <p>
              We believe that photography is more than just framing a shot; it&apos;s about holding onto a feeling. For the past 10 years, our cameras have been extensions of our hearts, helping us capture the quiet glances, grand celebrations, and emotional milestones that define our lives.
            </p>
            <p>
              Growing up in the culturally rich streets of Kolkata and Howrah, we were always drawn to how light dances across local structures and how festive rituals bring communities together in a burst of colors. This city taught us to find beauty in details, which eventually inspired the inception of The Gallery Creation &amp; Shoot Insights.
            </p>
            <p>
              For us, every wedding is a completely blank canvas. We approach each couple not just as clients, but as collaborators in creating a visual heritage. Our style blends editorial aesthetics with candid photojournalism, giving you photographs that feel like cinema and print quality that lasts for generations.
            </p>
          </div>

          {/* Philosophy Section */}
          <div className="mt-12 p-6 border-l border-gold bg-card-bg/40 rounded-sm">
            <h3 className="font-serif text-lg text-gold mb-2 tracking-wide">
              What We Believe
            </h3>
            <p className="text-cream/70 text-xs md:text-sm font-light italic leading-relaxed">
              &ldquo;{photographerInfo.philosophy}&rdquo;
            </p>
          </div>

          {/* Studio Brand Logos Grid */}
          <div className="mt-12 pt-10 border-t border-cream/5">
            <h3 className="text-xs uppercase tracking-widest text-gold font-semibold mb-6">
              Our Studio Brands
            </h3>
            <div className="flex flex-wrap gap-6">
              <div className="bg-[#ffffff] p-4 rounded-sm flex items-center justify-center w-32 h-32 shadow-md">
                <Image
                  src="/mockup.png"
                  alt="The Gallery Creation Logo"
                  width={110}
                  height={110}
                  className="object-contain"
                />
              </div>
              <div className="bg-[#ffffff] p-4 rounded-sm flex items-center justify-center w-32 h-32 shadow-md">
                <Image
                  src="/shoot-insights.png"
                  alt="Shoot Insights Logo"
                  width={110}
                  height={110}
                  className="object-contain"
                />
              </div>
            </div>
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
