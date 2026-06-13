"use client";

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Star, X, Send, CheckCircle, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ReviewFormModal({ isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    text: '',
  });
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState(null);
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [responseMessage, setResponseMessage] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.location || !formData.text) {
      setStatus('error');
      setResponseMessage('Please fill out all fields.');
      return;
    }

    setStatus('loading');
    try {
      const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          location: formData.location,
          stars: rating,
          text: formData.text,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
        setResponseMessage('Thank you! Your review has been submitted successfully.');
        
        // Let the success message stay briefly before callback and close
        setTimeout(() => {
          onSuccess(data.testimonial);
          setFormData({ name: '', location: '', text: '' });
          setRating(5);
          setStatus('idle');
          onClose();
        }, 2000);
      } else {
        setStatus('error');
        setResponseMessage(data.error || 'Failed to submit review.');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
      setResponseMessage('Network error. Please try again.');
    }
  };

  const activeStars = hoveredRating !== null ? hoveredRating : rating;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={status === 'loading' ? null : onClose}
        className="fixed inset-0 bg-overlay-bg backdrop-blur-md"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="bg-[#FAF6F0]/95 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-[#C9A96E]/20 shadow-2xl max-w-lg w-full relative z-10 text-cream"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={status === 'loading'}
          className="absolute top-4 right-4 text-cream/40 hover:text-cream transition-colors duration-200 outline-none"
        >
          <X size={20} />
        </button>

        <h3 className="font-serif text-2xl font-semibold mb-2 text-gold tracking-wide">
          Share Your Story
        </h3>
        <p className="text-xs text-cream/60 uppercase tracking-widest mb-6 font-light">
          We&apos;d love to hear about your experience with us
        </p>

        {/* Status Alerts */}
        {status === 'success' && (
          <div className="mb-6 p-4 bg-green-950/10 border border-green-800/20 text-green-800 rounded-xl flex items-start space-x-3 text-sm animate-pulse">
            <CheckCircle className="shrink-0 mt-0.5 text-green-700" size={18} />
            <span>{responseMessage}</span>
          </div>
        )}

        {status === 'error' && (
          <div className="mb-6 p-4 bg-red-950/10 border border-red-800/20 text-red-800 rounded-xl flex items-start space-x-3 text-sm">
            <AlertTriangle className="shrink-0 mt-0.5 text-red-700" size={18} />
            <span>{responseMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Couple Name */}
          <div>
            <label className="text-xs uppercase tracking-widest text-cream/60 block mb-1.5 font-semibold">
              Couple Name / Client Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g. Rohan & Sneha"
              className="w-full bg-[#FDFBF7]/60 border border-[#C9A96E]/20 focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E] py-2.5 px-4 rounded-xl text-cream placeholder-cream/35 text-sm transition-all duration-200 outline-none"
              disabled={status === 'loading' || status === 'success'}
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className="text-xs uppercase tracking-widest text-cream/60 block mb-1.5 font-semibold">
              Wedding / Event Location *
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="e.g. JW Marriott, Kolkata"
              className="w-full bg-[#FDFBF7]/60 border border-[#C9A96E]/20 focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E] py-2.5 px-4 rounded-xl text-cream placeholder-cream/35 text-sm transition-all duration-200 outline-none"
              disabled={status === 'loading' || status === 'success'}
              required
            />
          </div>

          {/* Interactive Star Rating */}
          <div>
            <label className="text-xs uppercase tracking-widest text-cream/60 block mb-1.5 font-semibold">
              Your Rating *
            </label>
            <div className="flex items-center space-x-2 py-1">
              {Array.from({ length: 5 }).map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setRating(idx + 1)}
                  onMouseEnter={() => setHoveredRating(idx + 1)}
                  onMouseLeave={() => setHoveredRating(null)}
                  disabled={status === 'loading' || status === 'success'}
                  className="transition-transform duration-200 hover:scale-125 focus:outline-none"
                >
                  <Star
                    size={28}
                    className={`${
                      idx < activeStars
                        ? 'text-[#C9A96E] fill-[#C9A96E]'
                        : 'text-cream/20'
                    } transition-colors duration-150`}
                  />
                </button>
              ))}
              <span className="text-xs text-cream/50 ml-2 font-light">
                ({rating} out of 5 stars)
              </span>
            </div>
          </div>

          {/* Review text */}
          <div>
            <label className="text-xs uppercase tracking-widest text-cream/60 block mb-1.5 font-semibold">
              Your Review / Message *
            </label>
            <textarea
              name="text"
              value={formData.text}
              onChange={handleInputChange}
              rows={4}
              placeholder="Share the story of your experience with us..."
              className="w-full bg-[#FDFBF7]/60 border border-[#C9A96E]/20 focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E] py-2.5 px-4 rounded-xl text-cream placeholder-cream/35 text-sm transition-all duration-200 outline-none resize-none"
              disabled={status === 'loading' || status === 'success'}
              required
            />
          </div>

          {/* Submit Actions */}
          <div className="flex justify-end items-center space-x-4 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={status === 'loading' || status === 'success'}
              className="text-xs uppercase tracking-widest text-cream/50 hover:text-cream/80 transition-colors duration-200 font-semibold px-4 py-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="px-6 py-3 bg-gradient-to-r from-[#C9A96E] to-[#B8965A] hover:scale-[1.02] hover:shadow-lg hover:shadow-gold/20 text-[#2A2724] font-semibold tracking-widest text-xs uppercase transition-all duration-300 rounded-xl flex items-center space-x-2 disabled:opacity-55 disabled:hover:scale-100"
            >
              {status === 'loading' ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#2A2724]/30 border-t-[#2A2724] rounded-full animate-spin" />
                  <span>Submitting your review...</span>
                </>
              ) : (
                <>
                  <Send size={12} />
                  <span>Post Review</span>
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>,
    document.body
  );
}
