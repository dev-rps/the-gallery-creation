"use client";

import { useState } from 'react';
import { Mail, Phone, MapPin, MessageSquare, Send, CheckCircle, AlertTriangle } from 'lucide-react';

export default function ContactPage() {
  const mailtoUrl = `mailto:thegallerycreation@gmail.com?subject=${encodeURIComponent(
    "Booking Inquiry — The Gallery Creation"
  )}&body=${encodeURIComponent(
    "Hello, I visited your website and would like to inquire about booking a photography session. Please get in touch with me at your earliest convenience."
  )}`;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    message: '',
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [responseMessage, setResponseMessage] = useState('');

  let whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919163961246';
  if (!whatsappNumber || whatsappNumber === '910000000000' || whatsappNumber.includes('000000') || whatsappNumber.includes('XXXX')) {
    whatsappNumber = '919163961246';
  }
  const web3formsKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || 'your_key_here';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitInquiry = async (e) => {
    if (e) e.preventDefault();

    // Form fields validation
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      setStatus('error');
      setResponseMessage('Please fill out all required fields (Name, Email, Phone, Message).');
      return;
    }

    setStatus('loading');

    const keyToUse = web3formsKey && web3formsKey !== 'your_key_here' 
      ? web3formsKey 
      : 'e80df3ae-394c-4e90-914b-26515df46515';

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: keyToUse,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          event_date: formData.eventDate,
          message: formData.message,
          subject: `The Gallery Creation Booking - ${formData.name}`,
          from_name: 'The Gallery Creation Website',
        }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus('success');
        setResponseMessage('Your booking inquiry has been received! Raju or Kuushaal will connect with you within 24 hours.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          eventDate: '',
          message: '',
        });
      } else {
        setStatus('error');
        setResponseMessage(data.message || 'Submission failed. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setResponseMessage('Network error. Please check your internet connection and try again.');
    }
  };

  return (
    <div 
      className="w-full text-cream py-16 md:py-24 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #362921 0%, #1E1612 100%)'
      }}
    >
      {/* Background Watermark */}
      <div className="absolute left-[20px] top-[15%] font-serif font-black italic text-[120px] md:text-[180px] text-cream/[0.02] pointer-events-none select-none z-0">
        hello
      </div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-[#C9A96E] uppercase tracking-[0.4em] text-xs font-semibold block mb-3">
            Get In Touch
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-wide mb-6 text-[#F9F7F3]">
            Let&apos;s Tell Your <span className="text-[#C9A96E] italic font-normal">Story</span>
          </h1>
          <div className="w-16 h-[1px] bg-gold/30 mx-auto mb-6" />
          <p className="text-sm md:text-base leading-relaxed font-light text-[#FAF6F0]/80">
            Every celebration is unique, and we&apos;d love to hear yours. Share your wedding details, and we&apos;ll create a photography and filmmaking experience tailored to your vision.
          </p>
        </div>

        {/* Layout Column Wrapper */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Form Wrapper (NO <form> TAGS) */}
          {/* Left Column: Form Wrapper */}
          <div 
            className="lg:col-span-7 p-8 md:p-12 relative z-10 overflow-hidden"
            style={{
              background: 'rgba(42, 39, 36, 0.65)',
              backdropFilter: 'blur(24px) saturate(150%)',
              WebkitBackdropFilter: 'blur(24px) saturate(150%)',
              border: '1px solid rgba(201, 169, 110, 0.20)',
              borderRadius: '20px',
              boxShadow: '0 8px 40px rgba(0, 0, 0, 0.25), 0 2px 8px rgba(0, 0, 0, 0.20), inset 0 1px 0 rgba(255, 255, 255, 0.06)'
            }}
          >
            {/* Top Gold Accent Line */}
            <div
              className="absolute top-0 left-[10%] w-[80%] h-[1px] pointer-events-none"
              style={{
                background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)',
              }}
            />
            <h2 className="font-serif text-2xl font-semibold mb-8 text-[#F9F7F3] tracking-wide">
              Inquiry Form
            </h2>

            {/* Response Alerts */}
            {status === 'success' && (
              <div className="mb-6 p-4 bg-green-950/60 border border-green-800 text-green-300 rounded-sm flex items-start space-x-3 text-sm">
                <CheckCircle className="shrink-0 mt-0.5" size={18} />
                <span>{responseMessage}</span>
              </div>
            )}

            {status === 'error' && (
              <div className="mb-6 p-4 bg-red-950/60 border border-red-800 text-red-300 rounded-sm flex items-start space-x-3 text-sm">
                <AlertTriangle className="shrink-0 mt-0.5" size={18} />
                <span>{responseMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmitInquiry} className="space-y-6">
              {/* Name */}
              <div>
                <label 
                  className="text-xs uppercase tracking-widest block mb-2 font-semibold text-gold-light"
                >
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Priyanjali Sen"
                  className="w-full bg-white/[0.06] border border-[#C9A96E]/20 focus:border-[#C9A96E]/60 focus:ring-[3px] focus:ring-[#C9A96E]/10 py-3 px-4 rounded-xl text-[#F9F7F3] placeholder-[#F9F7F3]/60 text-sm transition-all duration-200 outline-none"
                  disabled={status === 'loading'}
                  required
                />
              </div>

              {/* Email & Phone Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label 
                    className="text-xs uppercase tracking-widest block mb-2 font-semibold text-gold-light"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g. name@domain.com"
                    className="w-full bg-white/[0.06] border border-[#C9A96E]/20 focus:border-[#C9A96E]/60 focus:ring-[3px] focus:ring-[#C9A96E]/10 py-3 px-4 rounded-xl text-[#F9F7F3] placeholder-[#F9F7F3]/60 text-sm transition-all duration-200 outline-none"
                    disabled={status === 'loading'}
                    required
                  />
                </div>
                <div>
                  <label 
                    className="text-xs uppercase tracking-widest block mb-2 font-semibold text-gold-light"
                  >
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full bg-white/[0.06] border border-[#C9A96E]/20 focus:border-[#C9A96E]/60 focus:ring-[3px] focus:ring-[#C9A96E]/10 py-3 px-4 rounded-xl text-[#F9F7F3] placeholder-[#F9F7F3]/60 text-sm transition-all duration-200 outline-none"
                    disabled={status === 'loading'}
                    required
                  />
                </div>
              </div>

              {/* Event Date */}
              <div>
                <label 
                  className="text-xs uppercase tracking-widest block mb-2 font-semibold text-gold-light"
                >
                  Event Date
                </label>
                <input
                  type="date"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleInputChange}
                  style={{ colorScheme: 'dark' }}
                  className="w-full bg-white/[0.06] border border-[#C9A96E]/20 focus:border-[#C9A96E]/60 focus:ring-[3px] focus:ring-[#C9A96E]/10 py-3 px-4 rounded-xl text-[#F9F7F3] placeholder-[#F9F7F3]/60 text-sm transition-all duration-200 outline-none"
                  disabled={status === 'loading'}
                />
              </div>

              {/* Message */}
              <div>
                <label 
                  className="text-xs uppercase tracking-widest block mb-2 font-semibold text-gold-light"
                >
                  Tell us about your event *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  placeholder="Share details like event style, venues, timings, or specific questions..."
                  className="w-full bg-white/[0.06] border border-[#C9A96E]/20 focus:border-[#C9A96E]/60 focus:ring-[3px] focus:ring-[#C9A96E]/10 py-3 px-4 rounded-xl text-[#F9F7F3] placeholder-[#F9F7F3]/60 text-sm transition-all duration-200 outline-none resize-none"
                  disabled={status === 'loading'}
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-[#C9A96E] to-[#B8965A] hover:scale-[1.01] hover:shadow-lg hover:shadow-gold/20 text-[#2A2724] font-semibold tracking-widest text-xs uppercase transition-all duration-300 rounded-xl flex items-center justify-center space-x-2"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? (
                  <>
                    <div className="w-4 h-4 border-2 border-[#2A2724]/30 border-t-[#2A2724] rounded-full animate-spin" />
                    <span>Submitting Inquiry...</span>
                  </>
                ) : (
                  <>
                    <Send size={14} />
                    <span>Submit Inquiry</span>
                  </>
                )}
              </button>
            </form>

            {/* Direct WhatsApp Link Button Below Form */}
            <div className="mt-8 border-t border-cream/5 pt-8 text-center">
              <p 
                className="text-xs uppercase tracking-widest mb-4 font-semibold text-gold-light"
              >
                Want a faster response?
              </p>
              <a
                href="https://wa.me/919163961246"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-6 py-3 border border-[#25D366]/40 hover:border-[#25D366] text-[#25D366] font-semibold tracking-widest text-xs uppercase transition-all duration-300 rounded-xl bg-[#25D366]/5 hover:bg-[#25D366]/10"
              >
                <MessageSquare size={14} />
                <span>Chat Direct on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Column: Contact Details & Google Maps */}
          <div className="lg:col-span-5 space-y-8 relative z-10">
            {/* Contact Details Card */}
            <div 
              className="p-8 relative overflow-hidden shadow-xl"
              style={{
                background: 'rgba(42, 39, 36, 0.65)',
                backdropFilter: 'blur(24px) saturate(150%)',
                WebkitBackdropFilter: 'blur(24px) saturate(150%)',
                border: '1px solid rgba(201, 169, 110, 0.20)',
                borderRadius: '20px',
                boxShadow: '0 8px 40px rgba(0, 0, 0, 0.25), 0 2px 8px rgba(0, 0, 0, 0.20), inset 0 1px 0 rgba(255, 255, 255, 0.06)'
              }}
            >
              {/* Top Gold Accent Line */}
              <div
                className="absolute top-0 left-[10%] w-[80%] h-[1px] pointer-events-none"
                style={{
                  background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)',
                }}
              />
              <h2 className="font-serif text-xl font-semibold mb-6 text-[#F9F7F3] tracking-wide leading-tight">
                The Gallery Creation &amp; Shoot Insights
              </h2>
              <ul className="space-y-6 text-sm" style={{ color: 'rgba(249, 247, 243, 0.75)' }}>
                <li className="flex items-start space-x-4">
                  <MapPin size={20} className="text-[#C9A96E] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-[#F9F7F3] mb-1">Our Studio Address</h4>
                    <p className="text-xs font-light leading-relaxed" style={{ color: 'rgba(249, 247, 243, 0.75)' }}>
                      76/28, JOGENDRA NATH MUKHERJEE ROAD,<br/>
                      Ghusuri, Howrah, West Bengal - 711107
                    </p>
                  </div>
                </li>
                <li className="flex items-start space-x-4">
                  <Phone size={20} className="text-[#C9A96E] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-[#F9F7F3] mb-1">Call / WhatsApp</h4>
                    <div className="flex flex-col text-xs font-light space-y-1" style={{ color: 'rgba(249, 247, 243, 0.75)' }}>
                      <a href="https://wa.me/919163961246" className="hover:text-gold transition-colors block">
                        +91 9163961246
                      </a>
                      <a href="https://wa.me/918240677269" className="hover:text-gold transition-colors block">
                        +91 8240677269
                      </a>
                    </div>
                  </div>
                </li>
                 <li className="flex items-start space-x-4">
                  <Mail size={20} className="text-[#C9A96E] shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-[#F9F7F3] mb-1">Inquiries Email</h4>
                    <a
                      href={mailtoUrl}
                      className="inline-flex items-center space-x-2 border border-[#C9A96E] text-[#C9A96E] hover:bg-[#C9A96E] hover:text-[#1a1a1a] px-4 py-2 text-xs uppercase tracking-widest font-semibold transition-all duration-300 rounded-sm mt-2 focus:outline-none"
                    >
                      <Mail size={14} className="shrink-0" />
                      <span>Send Booking Email</span>
                    </a>
                  </div>
                </li>
              </ul>
            </div>

            {/* Google Maps Placeholder Card */}
            <div 
              className="border rounded-2xl overflow-hidden h-[300px] relative flex flex-col justify-end shadow-xl"
              style={{
                background: 'rgba(42, 39, 36, 0.65)',
                backdropFilter: 'blur(24px) saturate(150%)',
                WebkitBackdropFilter: 'blur(24px) saturate(150%)',
                border: '1px solid rgba(201, 169, 110, 0.20)',
                borderRadius: '20px',
                boxShadow: '0 8px 40px rgba(0, 0, 0, 0.25), 0 2px 8px rgba(0, 0, 0, 0.20), inset 0 1px 0 rgba(255, 255, 255, 0.06)'
              }}
            >
              {/* Top Gold Accent Line */}
              <div
                className="absolute top-0 left-[10%] w-[80%] h-[1px] pointer-events-none z-10"
                style={{
                  background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)',
                }}
              />
              {/* Mock map style */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-0">
                <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold mb-4">
                  <MapPin size={24} className="text-[#C9A96E]" />
                </div>
                <h4 className="font-serif text-[#F9F7F3] font-bold tracking-wide mb-1">Howrah Studio</h4>
                <p className="text-xs font-light max-w-xs mb-2" style={{ color: 'rgba(249, 247, 243, 0.75)' }}>
                  76/28, JOGENDRA NATH MUKHERJEE ROAD, Ghusuri, Howrah - 711107
                </p>
                <span className="text-[10px] text-gold uppercase tracking-[0.2em] font-semibold border border-gold/20 py-1 px-3 rounded-sm bg-gold/5">
                  Physical Consults by Appointment
                </span>
              </div>

              {/* Decorative Map Layout Lines overlay */}
              <div className="absolute inset-0 opacity-10 pointer-events-none border-t border-b border-cream" style={{ backgroundImage: 'linear-gradient(45deg, #FFF 25%, transparent 25%), linear-gradient(-45deg, #FFF 25%, transparent 25%)', backgroundSize: '40px 40px' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
