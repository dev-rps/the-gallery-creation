"use client";

import { useState } from 'react';
import TestimonialCard from './TestimonialCard';
import ReviewFormModal from './ReviewFormModal';
import { Plus, Star } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

export default function TestimonialsList({ initialTestimonials }) {
  const [items, setItems] = useState(initialTestimonials);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddReview = (newReview) => {
    // Prepend the new review so the user sees it at the top immediately
    setItems((prev) => [newReview, ...prev]);
  };

  return (
    <>
      {/* Write a Review Button */}
      <div className="flex justify-center mb-16 relative z-10">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-8 py-3.5 bg-gradient-to-r from-[#C9A96E] to-[#B8965A] hover:scale-[1.02] hover:shadow-lg hover:shadow-gold/20 text-[#2A2724] font-semibold tracking-widest text-xs uppercase transition-all duration-300 rounded-xl flex items-center space-x-2 shadow-md"
        >
          <Plus size={16} className="text-[#2A2724] stroke-[3px]" />
          <span>Share Your Story</span>
        </button>
      </div>

      {/* Grid of Testimonials */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24 relative z-10">
        {items.map((testimonial, index) => (
          <TestimonialCard
            key={testimonial.id}
            name={testimonial.name}
            location={testimonial.location}
            stars={testimonial.stars}
            text={testimonial.text}
            index={index}
          />
        ))}

        {/* CTA Card at the end of the grid */}
        <div
          onClick={() => setIsModalOpen(true)}
          className="p-8 rounded-[20px] border border-dashed border-[#C9A96E]/40 hover:border-[#C9A96E]/80 relative flex flex-col items-center justify-center text-center group min-h-[280px] cursor-pointer transition-all duration-300 bg-[#FAF6F0]/30 hover:bg-[#FAF6F0]/70 backdrop-blur-md shadow-sm hover:shadow-md"
        >
          <div className="w-12 h-12 rounded-full border border-[#C9A96E]/40 flex items-center justify-center bg-[#FAF6F0] text-[#B59459] group-hover:bg-[#B59459] group-hover:text-[#FAF6F0] group-hover:scale-110 transition-all duration-300 mb-4 shadow-sm">
            <Plus size={20} className="stroke-[2.5px]" />
          </div>
          <h4 className="font-serif text-lg font-bold text-[#1a1a1a] mb-2 group-hover:text-gold transition-colors duration-300">
            Share Your Experience
          </h4>
          <p className="text-xs text-[#2A2724]/60 font-light leading-relaxed max-w-[220px]">
            Were you captured by Raju & Kuushaal? Share your beautiful memories and help others choose their storytellers.
          </p>
        </div>
      </div>

      {/* Review Submission Modal with AnimatePresence */}
      <AnimatePresence>
        {isModalOpen && (
          <ReviewFormModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSuccess={handleAddReview}
          />
        )}
      </AnimatePresence>
    </>
  );
}
