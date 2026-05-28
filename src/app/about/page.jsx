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
        {/* Left: Founder Photo Column */}
        <div className="lg:col-span-5 relative min-h-[50vh] lg:min-h-0 bg-[#222]">
          <Image
            src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80"
            alt="Raju Das & Kuushaal Debnaath - The Gallery Creation & Shoot Insights"
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            priority
            className="object-cover object-center"
          />
          {/* Subtle gold-tint overlay */}
          <div className="absolute inset-0 bg-gold/5 bg-gradient-to-t from-charcoal via-transparent to-transparent" />
        </div>

        {/* Right: Story Column */}
        <div className="lg:col-span-7 flex flex-col justify-center p-8 md:p-16 lg:p-24 bg-charcoal">
          <span className="text-gold uppercase tracking-[0.3em] text-xs font-semibold mb-3 block">
            The Founders
          </span>
          <h1 className="font-serif text-3xl md:text-5xl font-bold tracking-wide mb-8">
            Raju Das &amp; Kuushaal Debnaath
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
          <div className="mt-12 p-6 border-l border-gold bg-[#222222]/40 rounded-sm">
            <h3 className="font-serif text-lg text-gold mb-2 tracking-wide">
              What We Believe
            </h3>
            <p className="text-cream/70 text-xs md:text-sm font-light italic leading-relaxed">
              &ldquo;{photographerInfo.philosophy}&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-[#1f1f1f]">
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
