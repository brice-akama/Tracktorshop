'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasConsented = localStorage.getItem('cookieConsent');
    if (!hasConsented) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white px-4 py-4 z-50 shadow-lg">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        <p className="text-sm">
          We use cookies to ensure you get the best experience on our website. By continuing to use
          this site, you accept our use of cookies.{' '}
          <Link href="/privacy-policy" className="underline">
            Learn more
          </Link>.
        </p>
        <button
          onClick={handleAccept}
          className="ml-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
