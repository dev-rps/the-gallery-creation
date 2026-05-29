import Link from 'next/link';
import { Camera, Heart, User, Calendar, ArrowRight } from 'lucide-react';

const iconMap = {
  'wedding-coverage': Camera,
  'pre-wedding-shoot': Heart,
  'portrait-session': User,
  'event-coverage': Calendar,
};

export default function ServiceCard({ id, name, description, price, deliverables = [] }) {
  const IconComponent = iconMap[id] || Camera;

  return (
    <div className="group relative bg-card-bg border border-cream/5 p-8 flex flex-col justify-between rounded-sm transition-all duration-300 hover:border-gold hover:shadow-[0_0_20px_rgba(201,169,110,0.15)]">
      <div>
        {/* Card Header Icon & Price */}
        <div className="flex items-start justify-between mb-8">
          <div className="w-12 h-12 rounded-sm border border-gold/20 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-charcoal transition-all duration-300">
            <IconComponent size={24} />
          </div>
          <div className="text-right">
            <span className="text-[10px] uppercase tracking-widest text-cream/40 block">Starting From</span>
            <span className="font-serif text-xl font-bold text-gold">{price}</span>
          </div>
        </div>

        {/* Card Title & Desc */}
        <h3 className="font-serif text-2xl font-semibold text-cream mb-4 tracking-wide group-hover:text-gold transition-colors duration-300">
          {name}
        </h3>
        <p className="text-sm text-cream/70 leading-relaxed mb-6 font-light">
          {description}
        </p>

        {/* Deliverables List (if present) */}
        {deliverables.length > 0 && (
          <ul className="border-t border-cream/5 pt-6 space-y-3 mb-8">
            {deliverables.map((item, index) => (
              <li key={index} className="flex items-start space-x-3 text-xs text-cream/80">
                <span className="text-gold mt-1 shrink-0">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Book CTA */}
      <Link
        href="/contact"
        className="mt-6 inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-semibold text-gold group-hover:translate-x-1 transition-transform duration-300 border-b border-transparent hover:border-gold pb-1"
      >
        <span>Book Now</span>
        <ArrowRight size={14} />
      </Link>
    </div>
  );
}
