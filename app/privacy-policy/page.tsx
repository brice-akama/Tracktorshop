"use client";

import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-6 py-16 mt-20 text-gray-800 mt-20">
      <h1 className="text-4xl font-bold text-center mt-8">Privacy Policy</h1>

      <section className="mb-8">
        
        <p className="leading-relaxed mt-2">
          At PowerPlow, we are committed to protecting your privacy. This Privacy Policy outlines the types of
          information we collect, how we use it, and the measures we take to safeguard it.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>
            **Personal Information**: When you create an account, make a purchase, or contact us, we may collect
            information such as your name, email address, phone number, and billing address.
          </li>
          <li>
            **Usage Data**: We collect information about how you use our website, including pages visited, time spent,
            and other analytical data.
          </li>
          <li>
            **Cookies**: We use cookies to enhance your experience on our website. You can control cookie settings
            through your browser.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-1xl font-semibold mb-4">How We Use Your Information</h2>
        <p className="leading-relaxed">
          We use the information we collect to:
        </p>
        <ul className="list-disc ml-6 space-y-2">
          <li>Process your orders and provide customer support.</li>
          <li>Improve our website and services based on your feedback.</li>
          <li>Send promotional emails or updates about your account.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
        <p className="leading-relaxed">
          We implement a variety of security measures to maintain the safety of your personal information. However, no
          method of transmission over the internet or electronic storage is 100% secure, so we cannot guarantee
          absolute security.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
        <p className="leading-relaxed">
          Depending on your location, you may have rights under data protection laws, including the right to access,
          update, or delete your personal data.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p className="leading-relaxed">
          If you have any questions or concerns about this Privacy Policy, please contact us at:
        </p>
        <address className="italic">
          PowerPlow <br />
          Email: contact@powerplow.com <br />
          Phone: +1 (123) 456-7890
        </address>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
