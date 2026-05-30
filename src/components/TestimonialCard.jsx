"use client";

import { useState } from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TestimonialCard({ name, location, stars = 5, text, index = 0 }) {
  const [isHovered, setIsHovered] = useState(false);

  const cardStyle = {
    background: isHovered ? 'rgba(255, 255, 255, 0.72)' : 'rgba(255, 255, 255, 0.55)',
    backdropFilter: 'blur(20px) saturate(180%)',
    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
    borderColor: isHovered ? 'rgba(201, 169, 110, 0.4)' : 'rgba(255, 255, 255, 0.8)',
    boxShadow: isHovered
      ? '0 8px 16px rgba(0, 0, 0, 0.06), 0 20px 60px rgba(201, 169, 110, 0.10), inset 0 1px 0 rgba(255, 255, 255, 1)'
      : '0 4px 6px rgba(0, 0, 0, 0.04), 0 10px 40px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
    transition: 'all 0.3s ease',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease: 'easeOut' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="p-8 rounded-[20px] border relative flex flex-col justify-between group h-full cursor-default"
      style={cardStyle}
    >
      {/* Decorative Giant Quote Mark */}
      <span className="font-serif text-[5rem] absolute top-2 left-4 pointer-events-none select-none text-[#C9A96E] opacity-25 leading-none">
        “
      </span>

      <div className="relative z-10">
        {/* Star Rating */}
        <div className="flex items-center space-x-1 mb-6">
          {Array.from({ length: 5 }).map((_, idx) => (
            <Star
              key={idx}
              size={20}
              className={`${
                idx < stars
                  ? 'text-[#C9A96E] fill-[#C9A96E]'
                  : 'text-black/10'
              }`}
            />
          ))}
        </div>

        {/* Review text */}
        <p className="text-[#2A2724] text-sm md:text-base leading-relaxed italic mb-8 font-light">
          &ldquo;{text}&rdquo;
        </p>
      </div>

      {/* Couple Info */}
      <div className="border-t border-black/10 pt-4 flex justify-between items-center relative z-10">
        <span className="font-serif text-base font-bold tracking-wider text-[#1a1a1a]">
          {name}
        </span>
        <span className="font-sans text-sm text-[#C9A96E] font-medium">
          {location}
        </span>
      </div>
    </motion.div>
  );
}
