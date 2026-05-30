"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Camera, Heart, User, Calendar } from 'lucide-react';

const iconMap = {
  'wedding-coverage': Camera,
  'pre-wedding-shoot': Heart,
  'portrait-session': User,
  'event-coverage': Calendar,
};

export default function ServiceCard({ id, name, description, price, deliverables = [] }) {
  const [isHovered, setIsHovered] = useState(false);
  const IconComponent = iconMap[id] || Camera;

  const cardStyle = {
    background: isHovered ? 'rgba(255, 255, 255, 0.78)' : 'rgba(255, 255, 255, 0.55)',
    backdropFilter: 'blur(16px) saturate(140%)',
    WebkitBackdropFilter: 'blur(16px) saturate(140%)',
    borderColor: isHovered ? 'rgba(201, 169, 110, 0.55)' : 'rgba(201, 169, 110, 0.25)',
    boxShadow: isHovered
      ? '0 8px 40px rgba(0, 0, 0, 0.10), 0 2px 8px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(201, 169, 110, 0.15), inset 0 1px 0 rgba(255, 255, 255, 1)'
      : '0 4px 24px rgba(0, 0, 0, 0.07), 0 1px 3px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.90)',
    transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
    transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative border rounded-[24px] p-8 flex flex-col justify-between h-full cursor-default overflow-hidden"
      style={cardStyle}
    >
      {/* Gold Top Accent Line */}
      <div
        className="absolute top-0 left-[10%] w-[80%] h-[2px] rounded-full pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)',
          borderRadius: '9999px',
        }}
      />

      <div className="flex flex-col flex-1">
        {/* Card Header Icon & Price Tag Pill */}
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-xl border border-[#C9A96E]/20 flex items-center justify-center text-[#C9A96E] group-hover:bg-[#C9A96E] group-hover:text-[#1a1a1a] transition-all duration-300">
            <IconComponent size={24} />
          </div>
          <span className="bg-[#C9A96E]/15 border border-[#C9A96E]/40 text-[#C9A96E] rounded-full px-4 py-1 text-sm font-semibold inline-block">
            {price}
          </span>
        </div>

        {/* Card Title & Desc */}
        <h3 className="font-serif text-2xl font-bold text-[#2A2724] mb-3 tracking-wide">
          {name}
        </h3>
        <p className="font-sans text-sm text-[rgba(42,39,36,0.75)] leading-relaxed mb-4 font-light">
          {description}
        </p>

        {/* Divider Line between description and deliverables */}
        {deliverables.length > 0 && (
          <div
            className="h-[1px] bg-[#C9A96E]/15 my-4"
            style={{ borderTop: '1px solid rgba(201, 169, 110, 0.20)' }}
          />
        )}

        {/* Deliverables List (if present) */}
        {deliverables.length > 0 && (
          <ul className="space-y-3 mb-8 flex-1">
            {deliverables.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-[rgba(42,39,36,0.80)]">
                {/* 6px Gold Filled Circle Bullet */}
                <span
                  className="rounded-full bg-[#C9A96E] shrink-0 mt-2"
                  style={{ width: '6px', height: '6px' }}
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Book CTA Button */}
      <Link
        href="/contact"
        className="mt-auto w-full text-center py-3 bg-transparent border border-[#C9A96E] text-[#2A2724] hover:bg-[#C9A96E] hover:text-[#1a1a1a] rounded-[12px] font-semibold tracking-wider uppercase text-sm block"
        style={{ transition: 'all 0.25s ease' }}
      >
        Book Now
      </Link>
    </div>
  );
}
