import Image from 'next/image';
import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import { navLinks, photographerInfo } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden w-full text-[#F9F7F3] pt-[80px] pb-[120px] md:pt-[64px] md:pb-[32px] bg-[#1a1612]">
      {/* Top decorative element */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="w-full h-[1px] mb-[60px]" style={{
          background: 'linear-gradient(90deg, transparent 0%, #C9A96E 30%, #C9A96E 70%, transparent 100%)'
        }} />
      </div>

      {/* Footer content grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-[48px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 relative z-10">
        
        {/* Column 1 — Brand */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-6">
          <Link href="/" className="flex flex-col items-center sm:items-start gap-4 w-fit">
            <div className="flex flex-row items-center justify-center sm:justify-start gap-3">
              <div className="relative aspect-[3/2] w-20 sm:w-20 overflow-visible">
                <Image
                  src="/the-gallery-creation.png"
                  alt="The Gallery Creation Logo"
                  fill
                  className="object-contain scale-130 sm:scale-100 transition-transform duration-300"
                />
              </div>
              <div className="h-6 sm:h-6 w-[1px] bg-[#C9A96E]/30" />
              <div className="relative aspect-[3/2] w-20 sm:w-20 overflow-visible">
                <Image
                  src="/shoot-insights.png"
                  alt="Shoot Insights Logo"
                  fill
                  className="object-contain scale-130 sm:scale-100 transition-transform duration-300"
                />
              </div>
            </div>
            <div className="flex flex-col items-center sm:items-start">
              <span className="text-[10px] uppercase font-semibold tracking-[0.2em] text-[#C9A96E]">
                The Gallery Creation
              </span>
              <span className="text-[9px] uppercase font-medium tracking-[0.25em] text-[#F9F7F3]/60 mt-0.5">
                &amp; Shoot Insights
              </span>
            </div>
          </Link>
          <p className="text-xs text-[#F9F7F3]/60 leading-relaxed max-w-xs mx-auto sm:mx-0">
            Capturing luxury weddings and fine-art portraits with timeless sophistication.
          </p>
          <div className="text-[#C9A96E] text-sm">✦</div>
        </div>

        {/* Column 2 — Quick Links */}
        <div className="flex flex-col items-center sm:items-start space-y-4">
          <h3 className="font-serif text-[15px] font-normal tracking-[0.15em] text-[#C9A96E] italic mb-5 border-b border-[#C9A96E]/20 pb-1.5 w-fit">Explore</h3>
          <ul className="space-y-2 text-center sm:text-left">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="group relative flex items-center justify-center sm:justify-start text-[#F9F7F3]/70 hover:text-[#C9A96E] hover:underline decoration-[#C9A96E]/40 underline-offset-4 transition-colors duration-200 py-1 font-sans text-xs tracking-[0.12em] font-light uppercase"
                >
                  <span>{link.name}</span>
                  <span className="absolute -right-5 sm:relative sm:right-auto transform -translate-x-1 sm:translate-x-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 — Contact */}
        <div className="flex flex-col items-center sm:items-start space-y-4">
          <h3 className="font-serif text-[15px] font-normal tracking-[0.15em] text-[#C9A96E] italic mb-5 border-b border-[#C9A96E]/20 pb-1.5 w-fit">Connect</h3>
          <ul className="space-y-4 font-sans text-xs font-light tracking-[0.08em] text-[#F9F7F3]/70 uppercase flex flex-col items-center sm:items-start w-full">
            <li className="flex items-center justify-center sm:justify-start space-x-3">
              <MapPin size={16} className="text-[#C9A96E] shrink-0" />
              <a
                href="https://maps.app.goo.gl/72RfANH9arShYVKk7?g_st=ac"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#C9A96E] hover:underline decoration-[#C9A96E]/40 underline-offset-4 transition-colors text-center sm:text-left"
              >
                {photographerInfo.location}
              </a>
            </li>
            <li className="flex items-start justify-center sm:justify-start space-x-3">
              <Phone size={16} className="text-[#C9A96E] shrink-0 mt-0.5" />
              <div className="flex flex-col items-center sm:items-start">
                <a href="tel:+919163961246" className="hover:text-[#C9A96E] hover:underline decoration-[#C9A96E]/40 underline-offset-4 transition-colors">
                  +91 9163961246
                </a>
                <a href="tel:+918240677269" className="hover:text-[#C9A96E] hover:underline decoration-[#C9A96E]/40 underline-offset-4 transition-colors">
                  +91 8240677269
                </a>
              </div>
            </li>
            <li className="flex items-center justify-center sm:justify-start space-x-3">
              <Mail size={16} className="text-[#C9A96E] shrink-0" />
              <a href="mailto:thegallerycreation@gmail.com" className="hover:text-[#C9A96E] hover:underline decoration-[#C9A96E]/40 underline-offset-4 transition-colors lowercase text-center sm:text-left">
                thegallerycreation@gmail.com
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4 — Social */}
        <div className="flex flex-col items-center sm:items-start space-y-4">
          <h3 className="font-serif text-[15px] font-normal tracking-[0.15em] text-[#C9A96E] italic mb-5 border-b border-[#C9A96E]/20 pb-1.5 w-fit">Follow & Rate</h3>
          <div className="flex flex-col gap-3 w-full max-w-[240px] sm:max-w-none">
            <a
              href="https://www.instagram.com/thegallerycreation?igsh=bGozeWt1eTA1aXRw"
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
              href="https://www.facebook.com/profile.php?id=100067777243992"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center space-x-2 rounded-xl px-4 py-2.5 text-[#F9F7F3] transition-all duration-300 hover:scale-[1.02] hover:opacity-90 text-xs tracking-[0.12em] font-light uppercase bg-[#1877F2]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
              <span>Facebook</span>
            </a>
            <a
              href="https://maps.app.goo.gl/72RfANH9arShYVKk7?g_st=ac"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center space-x-2 rounded-xl px-4 py-2.5 text-[#2A2724] bg-[#C9A96E] hover:bg-[#b59459] transition-all duration-300 hover:scale-[1.02] hover:opacity-90 text-xs tracking-[0.12em] font-semibold uppercase"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>Google Reviews</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="w-full h-[1px]" style={{
          background: 'linear-gradient(90deg, transparent 0%, #C9A96E 30%, #C9A96E 70%, transparent 100%)'
        }} />
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 py-8 font-sans text-[10px] tracking-[0.12em] font-light text-[#F9F7F3]/40 uppercase text-center md:text-left">
          <div className="flex flex-col gap-2">
            <p>© {new Date().getFullYear()} The Gallery Creation & Shoot Insights. All Rights Reserved.</p>
            <p className="flex flex-wrap justify-center md:justify-start gap-2 items-center text-[#C9A96E] text-[9px] tracking-[0.1em]">
              <span>Govt. Registered MSME Enterprise</span>
              <span className="opacity-40">•</span>
              <a href="/Udyam.pdf" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#FAF6F0] transition-colors font-medium">
                Udyam Registration Certificate
              </a>
            </p>
          </div>
          <p className="md:text-right">Crafted with ❤️ in Kolkata &amp; Howrah</p>
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
