import { Playfair_Display, Inter } from 'next/font/google';
import Script from 'next/script';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import PageTransitionWrapper from '@/components/PageTransitionWrapper';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata = {
  title: {
    default: 'Lumière Studio | Luxury Wedding & Event Photography Kolkata',
    template: '%s | Lumière Studio',
  },
  description: 'Luxury wedding and event photography by Arjun Mehta. Capturing timeless, emotional stories and fine-art moments in Kolkata and across India.',
  keywords: ['Wedding Photography', 'Luxury Wedding Photographer', 'Kolkata Wedding Photographer', 'Arjun Mehta', 'Lumiere Studio', 'Pre-Wedding Shoot'],
  authors: [{ name: 'Arjun Mehta' }],
  metadataBase: new URL('https://lumierestudio.in'),
  openGraph: {
    title: 'Lumière Studio | Luxury Wedding & Event Photography',
    description: 'Luxury wedding and event photography by Arjun Mehta. Capturing timeless, emotional stories and fine-art moments.',
    url: 'https://lumierestudio.in',
    siteName: 'Lumière Studio',
    locale: 'en_IN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans bg-charcoal text-cream min-h-screen flex flex-col selection:bg-gold selection:text-charcoal">
        {/* Google Analytics */}
        {gaId && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />
            <Script
              id="gtag-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaId}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
        <Navbar />
        <PageTransitionWrapper>
          <main className="w-full flex-grow pt-20">
            {children}
          </main>
        </PageTransitionWrapper>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
