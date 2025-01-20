'use client';

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { usePathname } from "next/navigation";
import { metadata } from "./metadata"; // Import metadata without .ts extension

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname(); // Get the current pathname
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <html lang="en">
      <head>
  <title>{String(metadata.title || "Default Title")}</title>
  <meta name="description" content={String(metadata.description || "No description available")} />
</head>

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {!isAdminRoute && <Navbar />}
        
        <main className="min-h-screen flex flex-col">
          {children}
          <Toaster position="top-right" reverseOrder={false} />
        </main>
        
        {!isAdminRoute && <Footer />}
      </body>
    </html>
  );
}
