import { Plus_Jakarta_Sans, Inter, Playfair_Display } from 'next/font/google';
import localFont from 'next/font/local';
import Script from 'next/script';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import BottomNavBar from '@/components/BottomNavBar';
import './globals.css';

const playwrite = localFont({
  src: [
    { path: './fonts/PlaywriteGBJ.ttf',        weight: '100 400', style: 'normal' },
    { path: './fonts/PlaywriteGBJ-Italic.ttf', weight: '100 400', style: 'italic' },
  ],
  display: 'swap',
  variable: '--font-playwrite',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jakarta',
  weight: ['400', '500', '600'],
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
});

export const metadata = {
  title: {
    default: 'The Gallery Creation & Shoot Insights | Premium Wedding & Event Photography Kolkata',
    template: '%s | The Gallery Creation & Shoot Insights',
  },
  description: 'Premium wedding and event photography by Raju Das, Kuushaal Debnaath & Swarna Mukherjee Debnath. Capturing timeless, emotional stories and fine-art moments in Kolkata and across India.',
  keywords: ['Wedding Photography', 'Premium Wedding Photographer', 'Kolkata Wedding Photographer', 'Raju Das', 'Kuushaal Debnaath', 'Swarna Mukherjee Debnath', 'The Gallery Creation', 'Shoot Insights', 'Pre-Wedding Shoot'],
  authors: [{ name: 'Raju Das, Kuushaal Debnaath & Swarna Mukherjee Debnath' }],
  metadataBase: new URL('https://thegallerycreation.in'),
  openGraph: {
    title: 'The Gallery Creation & Shoot Insights | Premium Wedding & Event Photography',
    description: 'Premium wedding and event photography by Raju Das, Kuushaal Debnaath & Swarna Mukherjee Debnath. Capturing timeless, emotional stories and fine-art moments.',
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
    <html lang="en" className={`${jakarta.variable} ${playwrite.variable} ${inter.variable} ${playfair.variable}`}>
      <body className="font-sans bg-charcoal text-cream min-h-screen flex flex-col selection:bg-gold selection:text-charcoal relative">
        <div className="film-grain" />
        {/* Local Business JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "The Gallery Creation & Shoot Insights",
              "image": [
                "https://thegallerycreation.in/the-gallery-creation.png",
                "https://thegallerycreation.in/brand-logo.jpg",
                "https://thegallerycreation.in/shoot-insights.png"
              ],
              "description": "Premium wedding and event photography studio in Kolkata by Raju Das & Kuushaal Debnaath",
              "@id": "https://thegallerycreation.in",
              "url": "https://thegallerycreation.in",
              "telephone": "+919163961246",
              "priceRange": "$$$$",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "76/28, Jogendra Nath Mukherjee Road, Ghusuri",
                "addressLocality": "Howrah",
                "addressRegion": "West Bengal",
                "postalCode": "711107",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 22.6174,
                "longitude": 88.3512
              },
              "hasMap": "https://maps.app.goo.gl/72RfANH9arShYVKk7?g_st=ac",
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday","Tuesday","Wednesday",
                  "Thursday","Friday","Saturday"
                ],
                "opens": "10:00",
                "closes": "19:00"
              },
              "sameAs": [
                "https://thegallerycreation.com",
                "https://instagram.com/thegallerycreation",
                "https://facebook.com/thegallerycreation"
              ]
            })
          }}
        />
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
        <BottomNavBar />
      </body>
    </html>
  );
}
