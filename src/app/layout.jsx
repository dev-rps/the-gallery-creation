import { Playfair_Display, Inter } from 'next/font/google';
import Script from 'next/script';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
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
    default: 'The Gallery Creation & Shoot Insights | Premium Wedding & Event Photography Kolkata',
    template: '%s | The Gallery Creation & Shoot Insights',
  },
  description: 'Premium wedding and event photography by Raju Das & Kuushaal Debnaath. Capturing timeless, emotional stories and fine-art moments in Kolkata and across India.',
  keywords: ['Wedding Photography', 'Premium Wedding Photographer', 'Kolkata Wedding Photographer', 'Raju Das', 'Kuushaal Debnaath', 'The Gallery Creation', 'Shoot Insights', 'Pre-Wedding Shoot'],
  authors: [{ name: 'Raju Das & Kuushaal Debnaath' }],
  metadataBase: new URL('https://thegallerycreation.in'),
  openGraph: {
    title: 'The Gallery Creation & Shoot Insights | Premium Wedding & Event Photography',
    description: 'Premium wedding and event photography by Raju Das & Kuushaal Debnaath. Capturing timeless, emotional stories and fine-art moments.',
    url: 'https://thegallerycreation.in',
    siteName: 'The Gallery Creation & Shoot Insights',
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
        <main className="w-full flex-grow pt-20">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
