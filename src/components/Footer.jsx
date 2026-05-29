import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import { navLinks, photographerInfo } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="bg-charcoal border-t border-gold/10 text-cream pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        {/* Left: Studio Info */}
        <div className="flex flex-col space-y-4">
          <Link href="/" className="flex flex-col w-fit">
            <span className="font-serif text-2xl tracking-widest text-gold font-bold leading-tight">THE GALLERY CREATION</span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-cream/70 mt-0.5">&amp; SHOOT INSIGHTS</span>
          </Link>
          <p className="text-sm text-cream/70 leading-relaxed max-w-sm italic">
            &quot;Timeless memories, treasured forever.&quot;
          </p>
          <p className="text-sm text-cream/60 leading-relaxed max-w-sm pt-2">
            Capturing luxury weddings and fine-art portraits in Howrah, Kolkata, and nationwide. Let us document your love story with timeless sophistication.
          </p>
        </div>

        {/* Center: Quick Links */}
        <div className="flex flex-col space-y-4 md:items-center">
          <div className="w-fit">
            <h3 className="font-serif text-lg text-gold tracking-wide mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-cream/80">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-gold transition-colors duration-200 block py-1">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: Contact & Socials */}
        <div className="flex flex-col space-y-4">
          <h3 className="font-serif text-lg text-gold tracking-wide">Connect With Us</h3>
          <ul className="space-y-3 text-sm text-cream/80">
            <li className="flex items-center space-x-3">
              <MapPin size={16} className="text-gold shrink-0" />
              <span>{photographerInfo.location}</span>
            </li>
            <li className="flex items-start space-x-3">
              <Phone size={16} className="text-gold shrink-0 mt-0.5" />
              <div className="flex flex-col text-cream/80">
                <a href="https://wa.me/919163961246" className="hover:text-gold transition-colors">
                  +91 9163961246
                </a>
                <a href="https://wa.me/918240677269" className="hover:text-gold transition-colors">
                  +91 8240677269
                </a>
              </div>
            </li>
            <li className="flex items-center space-x-3">
              <Mail size={16} className="text-gold shrink-0" />
              <a href="mailto:thegallerycreation@gmail.com" className="hover:text-gold transition-colors">
                thegallerycreation@gmail.com
              </a>
            </li>
          </ul>

          <div className="flex space-x-4 pt-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-gold/20 flex items-center justify-center text-cream hover:text-gold hover:border-gold transition-all duration-300"
              aria-label="Instagram"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-gold/20 flex items-center justify-center text-cream hover:text-gold hover:border-gold transition-all duration-300"
              aria-label="Facebook"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-cream/5 text-center text-xs text-cream/40 flex flex-col md:flex-row justify-between items-center gap-4">
        <p>© {new Date().getFullYear()} The Gallery Creation & Shoot Insights. All Rights Reserved.</p>
        <p className="tracking-wide">
          Designed by The Gallery Creation | Hosted on Vercel
        </p>
      </div>
    </footer>
  );
}
