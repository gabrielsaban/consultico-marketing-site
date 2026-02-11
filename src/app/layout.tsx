import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from 'next/font/local';
import "./globals.css";
import RouteAwareNavbar from "@/components/RouteAwareNavbar";
import RouteAwarePageFrame from "@/components/RouteAwarePageFrame";
import EffectsLayer from "@/components/EffectsLayer";
import TopBar from "@/components/TopBar";
import SitePreloader from "@/components/SitePreloader";
import { PreloaderProvider } from "@/components/PreloaderContext";
import PreloaderGate from "@/components/PreloaderGate";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.consultico.example'),
  title: {
    default: 'Consultico - Digital Marketing Consultancy',
    template: '%s | Consultico',
  },
  description: 'Marketing made for you. Our digital marketing consultants build tailored strategies for your business.',
  openGraph: {
    type: 'website',
    url: '/',
    title: 'Consultico - Digital Marketing Consultancy',
    description: 'Marketing made for you. Our digital marketing consultants build tailored strategies for your business.',
    siteName: 'Consultico',
    images: [
      {
        url: '/og.jpg',
        width: 1200,
        height: 630,
        alt: 'Consultico',
      },
    ],
    locale: 'en_GB',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Consultico | Digital Marketing Consultancy',
    description: 'Marketing made for you. Our digital marketing consultants build tailored strategies for your business.',
    images: ['/og.jpg'],
  },
  alternates: {
    canonical: '/',
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
      <body className={`${geistSans.variable} ${geistMono.variable} ${futuraHV.variable} ${helveticaNow.variable} ${helveticaUI.variable} antialiased font-sans relative`}>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <PreloaderProvider>
          <SitePreloader />
          <PreloaderGate>
            <EffectsLayer>
              {/* Mobile-only top bar */}
              <TopBar />
              <RouteAwareNavbar />
              <RouteAwarePageFrame>
                {children}
              </RouteAwarePageFrame>
            </EffectsLayer>
          </PreloaderGate>
        </PreloaderProvider>
      </body>
    </html>
  );
}
