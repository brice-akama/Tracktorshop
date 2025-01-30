'use client';

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { usePathname } from "next/navigation";
import { metadata } from "./metadata";
import CookieConsent from './components/CookieConsent';
import BackToTop from './components/BackToTop'; // Import metadata without .ts extension
import Script from "next/script";
import { GA_TRACKING_ID } from "@/lib/analytics";
import { useEffect } from 'react';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Log traffic function
const logTraffic = async () => {
  const response = await fetch('/api/logTraffic', {
    method: 'POST',
  });
  if (!response.ok) {
    console.error('Error logging traffic');
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname(); // Get the current pathname
  const isAdminRoute = pathname.startsWith("/admin");

  useEffect(() => {
    logTraffic(); // Log traffic on page load
  }, []);

  return (
    <html lang="en">
      <head>
        <title>{String(metadata.title || "Default Title")}</title>
        <meta
          name="description"
          content={String(metadata.description || "No description available")}
        />
        {/* Google Analytics Scripts */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {!isAdminRoute && <Navbar />}

        <main className="min-h-screen flex flex-col">
          {children}
          <BackToTop />
          <CookieConsent />
          <Toaster position="top-right" reverseOrder={false} />
        </main>

        {!isAdminRoute && <Footer />}
      </body>
    </html>
  );
}
