import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "@/components/Footer";
import "./globals.css";
import Navbar from "@/components/Navbar";
import DotMatrixBackground from "@/components/InteractiveBackground";
import LenisProvider from "@/components/LenisProvider";
import CustomCursor from "@/components/CustomCursor";
import TopBar from "@/components/TopBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Consultico | Digital Marketing Consultancy",
  description:
    "Marketing made for you. Our digital marketing consultants build tailored strategies for your business.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-white">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans bg-white relative`}>
        <LenisProvider>
          <DotMatrixBackground
            dotColor="#3B82F6"
            dotSize={1.3}
            dotSpacing={40}
            dotOpacity={0.3}
            mouseInfluence={0.2}
            breathingSpeed={0.0015}
            breathingIntensity={0.2}
          />
          <CustomCursor
            size={8}
            color="#3B82F6"
          />
          {/* Mobile-only top bar */}
          <TopBar />
          <Navbar />
          <div className="pl-0 md:pl-16 relative z-10 min-h-screen flex flex-col">
            <div className="flex-1">
              {children}
            </div>
            {/* Footer */}
            <Footer />
          </div>
        </LenisProvider>
      </body>
    </html>
  );
}
