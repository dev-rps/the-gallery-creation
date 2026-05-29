import { Star } from 'lucide-react';

export default function TestimonialCard({ name, location, stars = 5, text }) {
  return (
    <div className="bg-card-bg border border-cream/5 p-8 rounded-sm relative flex flex-col justify-between hover:border-gold/30 transition-all duration-300 shadow-lg">
      {/* Decorative Giant Quote Mark */}
      <span className="font-serif text-8xl text-gold/10 absolute top-4 left-4 pointer-events-none select-none">
        “
      </span>

      <div className="relative z-10">
        {/* Star Rating */}
        <div className="flex items-center space-x-1 mb-6">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              size={16}
              className={`${
                index < stars
                  ? 'text-gold fill-gold'
                  : 'text-cream/20'
              }`}
            />
          ))}
        </div>

        {/* Review text */}
        <p className="text-cream/80 text-sm md:text-base leading-relaxed italic mb-8 font-light">
          &ldquo;{text}&rdquo;
        </p>
      </div>

      {/* Couple Info */}
      <div className="border-t border-cream/5 pt-4 flex justify-between items-center">
        <span className="font-serif text-sm font-semibold tracking-wider text-cream">
          {name}
        </span>
        <span className="text-[10px] uppercase tracking-widest text-cream/50">
          {location}
        </span>
      </div>
    </div>
  );
}
