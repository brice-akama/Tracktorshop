// SupportPage.js
import React from "react";

const SupportPage = () => {
  return (
    <div className="container mx-auto px-6 py-16 text-gray-800 mt-20">
      <h1 className="text-4xl font-bold text-center mt-6">Customer Support</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mt-2">Frequently Asked Questions</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>How do I track my order?</li>
          <li>What warranty does my tractor come with?</li>
          <li>Can I return a product?</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Product Support</h2>
        <p>If you need assistance with a product, please consult our <a href="/product-manuals" className="text-blue-400">product manuals</a> or visit our troubleshooting guide.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Contact Our Support Team</h2>
        <p>If you cannot find the answer you're looking for, please feel free to contact us directly via the <a href="/contact-us" className="text-blue-400">Contact Us</a> page.</p>
      </section>
    </div>
  );
};

export default SupportPage;
