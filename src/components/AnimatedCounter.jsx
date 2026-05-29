"use client";

import { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

export default function AnimatedCounter({ target, suffix = "", label }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseInt(target, 10);
      if (isNaN(end)) {
        setCount(target);
        return;
      }
      if (start === end) {
        setCount(end);
        return;
      }

      const duration = 1500; // 1.5 seconds animation duration
      let animationFrameId;
      const startTime = performance.now();

      const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Quad ease-out function
        const easeProgress = progress * (2 - progress);
        
        setCount(Math.floor(easeProgress * (end - start) + start));

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(updateCounter);
        } else {
          setCount(end);
        }
      };

      animationFrameId = requestAnimationFrame(updateCounter);

      return () => {
        cancelAnimationFrame(animationFrameId);
      };
    }
  }, [isInView, target]);

  return (
    <div ref={ref} className="text-center p-4 border border-gold/5 bg-card-bg backdrop-blur-sm rounded-sm hover:border-gold/20 transition-colors duration-300">
      <div className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-gold mb-2 tracking-tight">
        {count}
        {suffix}
      </div>
      <p className="text-[10px] uppercase tracking-[0.2em] text-cream/60 font-semibold">{label}</p>
    </div>
  );
}
