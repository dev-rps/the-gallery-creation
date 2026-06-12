import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import { navLinks, photographerInfo } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden w-full text-[#F9F7F3] pt-[64px] pb-[32px] bg-[#1a1612]">
      {/* Top decorative element */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="w-full h-[1px] mb-[60px]" style={{
          background: 'linear-gradient(90deg, transparent 0%, #C9A96E 30%, #C9A96E 70%, transparent 100%)'
        }} />
      </div>

      {/* Footer content grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-[48px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 relative z-10">
        
        {/* Column 1 — Brand */}
        <div className="flex flex-col space-y-4">
          <Link href="/" className="flex flex-col justify-center items-start gap-[3px] w-fit" style={{ overflow: 'visible' }}>
            <span
              style={{
                fontFamily: 'var(--font-playwrite)',
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: '1.5rem',
                letterSpacing: '0.04em',
                lineHeight: 1.5,
                paddingBottom: '6px',
                display: 'block',
                background: 'linear-gradient(135deg, #C9A96E 0%, #F5E090 30%, #EDD470 50%, #F5E090 70%, #C9A96E 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                overflow: 'visible',
              }}
              className="text-2xl font-serif"
            >
              The Gallery Creation
            </span>
            <span
              className="text-[10.5px] uppercase font-semibold tracking-[0.3em] text-[#C9A96E]"
              style={{
                fontFamily: 'var(--font-jakarta)',
                marginTop: '-2px',
                paddingLeft: '2px',
                display: 'block',
                lineHeight: 1,
              }}
            >
              &amp; Shoot Insights
            </span>
          </Link>
          <p className="text-sm text-[#F9F7F3]/60 leading-relaxed max-w-xs line-clamp-2">
            Capturing luxury weddings and fine-art portraits with timeless sophistication.
          </p>
          <div className="text-[#C9A96E] text-sm mt-2">✦</div>
        </div>

        {/* Column 2 — Quick Links */}
        <div className="flex flex-col space-y-4">
          <h3 className="font-serif text-[15px] font-normal tracking-[0.15em] text-[#C9A96E] italic lowercase mb-5">explore</h3>
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="group flex items-center gap-1 text-[#F9F7F3]/70 hover:text-[#C9A96E] transition-colors duration-200 py-1 font-sans text-xs tracking-[0.12em] font-light uppercase"
                >
                  <span>{link.name}</span>
                  <span className="transform -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 — Contact */}
        <div className="flex flex-col space-y-4">
          <h3 className="font-serif text-[15px] font-normal tracking-[0.15em] text-[#C9A96E] italic lowercase mb-5">connect</h3>
          <ul className="space-y-4 font-sans text-xs font-light tracking-[0.08em] text-[#F9F7F3]/70 uppercase">
            <li className="flex items-center space-x-3">
              <MapPin size={16} className="text-[#C9A96E] shrink-0" />
              <span>{photographerInfo.location}</span>
            </li>
            <li className="flex items-start space-x-3">
              <Phone size={16} className="text-[#C9A96E] shrink-0 mt-0.5" />
              <div className="flex flex-col">
                <a href="tel:+919163961246" className="hover:text-[#C9A96E] transition-colors">
                  +91 9163961246
                </a>
                <a href="tel:+918240677269" className="hover:text-[#C9A96E] transition-colors">
                  +91 8240677269
                </a>
              </div>
            </li>
            <li className="flex items-center space-x-3">
              <Mail size={16} className="text-[#C9A96E] shrink-0" />
              <a href="mailto:thegallerycreation@gmail.com" className="hover:text-[#C9A96E] transition-colors lowercase">
                thegallerycreation@gmail.com
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4 — Social */}
        <div className="flex flex-col space-y-4">
          <h3 className="font-serif text-[15px] font-normal tracking-[0.15em] text-[#C9A96E] italic lowercase mb-5">follow</h3>
          <div className="flex flex-col gap-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center space-x-2 rounded-xl px-4 py-2.5 text-[#F9F7F3] transition-all duration-300 hover:scale-[1.02] hover:opacity-90 text-xs tracking-[0.12em] font-light uppercase"
              style={{ background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
              <span>Instagram</span>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center space-x-2 rounded-xl px-4 py-2.5 text-[#F9F7F3] transition-all duration-300 hover:scale-[1.02] hover:opacity-90 text-xs tracking-[0.12em] font-light uppercase bg-[#1877F2]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
              <span>Facebook</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="w-full h-[1px]" style={{
          background: 'linear-gradient(90deg, transparent 0%, #C9A96E 30%, #C9A96E 70%, transparent 100%)'
        }} />
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-6 font-sans text-[10px] tracking-[0.12em] font-light text-[#F9F7F3]/40 uppercase">
          <p>© {new Date().getFullYear()} The Gallery Creation & Shoot Insights. All Rights Reserved.</p>
          <p>Crafted with ❤️ in Kolkata</p>
        </div>
      </div>

      {/* Decorative background element */}
      <div
        className="absolute bottom-[60px] left-1/2 -translate-x-1/2 font-black tracking-[0.3em] pointer-events-none user-select-none whitespace-nowrap z-0"
        style={{
          fontSize: '120px',
          color: 'rgba(201, 169, 110, 0.04)',
          fontWeight: 900,
        }}
      >
        GALLERY
      </div>
    </footer>
  );
}
