"use client";

import React from "react";

const TermsOfUse = () => {
  return (
    <div className="container mx-auto px-6 py-16 mt-20 text-gray-800">
      <h1 className="text-4xl font-bold text-center mt-8">Terms of Use</h1>

      <section className="mb-8">

        <p className="leading-relaxed mt-2">
          Welcome to PowerPlow! These Terms of Use govern your use of our website and services. By accessing or using
          our website, you agree to comply with these terms and conditions. If you do not agree, please do not use our
          website.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Use of the Website</h2>
        <p className="leading-relaxed">
          You are authorized to use our website only for lawful purposes. You agree not to:
        </p>
        <ul className="list-disc ml-6 space-y-2">
          <li>Engage in any illegal activity or violate any local, state, or national laws.</li>
          <li>Attempt to interfere with the proper working of the website or its services.</li>
          <li>Upload or transmit any harmful content, including viruses or malware.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Account Responsibility</h2>
        <p className="leading-relaxed">
          You are responsible for maintaining the confidentiality of your account credentials and ensuring the security
          of your account. If you suspect any unauthorized use of your account, please contact us immediately.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-1xl font-semibold mb-4">Product and Service Availability</h2>
        <p className="leading-relaxed">
          While we strive to maintain accurate and up-to-date information on our website, we cannot guarantee that all
          products or services will be available at all times. Availability may vary, and we reserve the right to modify
          or discontinue any products or services without notice.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
        <p className="leading-relaxed">
          PowerPlow is not liable for any damages arising from the use or inability to use our website or services,
          including but not limited to direct, indirect, incidental, or consequential damages.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Changes to Terms</h2>
        <p className="leading-relaxed">
          We reserve the right to modify these Terms of Use at any time. Any changes will be posted on this page, and
          the updated terms will be effective immediately upon posting.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Governing Law</h2>
        <p className="leading-relaxed">
          These Terms of Use will be governed by and construed in accordance with the laws of the state in which
          PowerPlow operates, without regard to its conflict of law principles.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p className="leading-relaxed">
          If you have any questions or concerns regarding these Terms of Use, please contact us at:
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

export default TermsOfUse;
