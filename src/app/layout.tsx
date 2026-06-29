import type { Metadata } from "next";
import localFont from 'next/font/local';
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import RouteAwareNavbar from "@/components/RouteAwareNavbar";
import RouteAwarePageFrame from "@/components/RouteAwarePageFrame";
import ClientEffectsRoot from "@/components/ClientEffectsRoot";
import TopBar from "@/components/TopBar";
import SitePreloader from "@/components/SitePreloader";
import { PreloaderProvider } from "@/components/PreloaderContext";
import PreloaderGate from "@/components/PreloaderGate";
import { serializeJsonLd, siteJsonLd } from "@/lib/schema";

// Brand fonts (local woff2)
const futuraHV = localFont({
  src: '../fonts/FuturaHVBT.woff2',
  weight: '700',
  style: 'normal',
  display: 'swap',
  variable: '--font-futura',
});

const helveticaNow = localFont({
  src: '../fonts/HelveticaNowDisplay.woff2',
  weight: '400',
  style: 'normal',
  display: 'swap',
  variable: '--font-helvetica',
});

const helveticaUI = localFont({
  src: '../fonts/HelveticaRegular.woff2',
  weight: '400',
  style: 'normal',
  display: 'swap',
  variable: '--font-helvetica-ui',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.consultico.co.uk'),
  title: {
    default: 'Digital Marketing Consultant in Glasgow | Consultico',
    template: '%s | Consultico',
  },
  description:
    'Glasgow digital marketing consultancy. We start with strategy, then deliver SEO, GEO, paid ads and web. Serving the UK and US.',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: 'Consultico',
    url: 'https://www.consultico.co.uk',
    title: 'Digital Marketing Consultant in Glasgow | Consultico',
    description:
      'Glasgow digital marketing consultancy. Strategy first, then SEO, GEO, paid ads and web. Serving the UK and US.',
    images: ['/og.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digital Marketing Consultant in Glasgow | Consultico',
    description:
      'Glasgow digital marketing consultancy. Strategy first, then SEO, GEO, paid ads and web.',
    images: ['/og.jpg'],
  },
  icons: {
    icon: [
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
      {
        url: '/brand/c-lettermark.svg',
        type: 'image/svg+xml',
      },
    ],
    shortcut: '/icon.svg',
  },
};

const themeScript = `
(() => {
  try {
    const stored = localStorage.getItem('theme');
    const theme = stored === 'light' || stored === 'dark' ? stored : 'light';
    document.documentElement.classList.toggle('dark', theme === 'dark');
  } catch {
    // no-op
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${futuraHV.variable} ${helveticaNow.variable} ${helveticaUI.variable} antialiased font-sans relative`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(siteJsonLd) }}
        />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <PreloaderProvider>
          <SitePreloader />
          <PreloaderGate>
            {/* Mobile-only top bar */}
            <TopBar />
            <RouteAwareNavbar />
            <RouteAwarePageFrame>
              {children}
            </RouteAwarePageFrame>
          </PreloaderGate>
          <ClientEffectsRoot />
        </PreloaderProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
