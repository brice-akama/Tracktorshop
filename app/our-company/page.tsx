"use client";

import React from "react";

const CompanyInfo: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-16 text-center mt-24"> {/* Added mt-24 for top margin */}
      <h1 className="text-4xl font-bold text-gray-800 mt-8">About PowerPlow</h1>

      {/* First Paragraph - Introduction */}
      <p className="mt-6 text-2xl text-gray-700 leading-relaxed">
        PowerPlow is a leading supplier of high-quality tractor parts, committed to providing customers with the best products, services, and solutions. With years of experience in the industry, we have become a trusted name for farmers and agricultural businesses worldwide. We understand the critical role that reliable, durable equipment plays in the farming industry, and we strive to meet the diverse needs of our customers with precision and excellence.
      </p>

      {/* Second Paragraph - Product Range */}
      <p className="mt-6 text-2xl text-gray-700 leading-relaxed">
        At PowerPlow, we specialize in offering a wide range of tractor parts, from essential components to specialized accessories. Whether you&apos;re looking for replacement parts or upgrades, we have everything you need to ensure that your machinery operates at peak performance. Our extensive product catalog includes parts for all major tractor models, giving you the flexibility and peace of mind to find exactly what you need.
      </p>

      {/* Third Paragraph - Pricing and Value */}
      <p className="mt-6 text-2xl text-gray-700 leading-relaxed">
        We pride ourselves on offering competitive prices without compromising on quality. PowerPlow is committed to providing affordable solutions to farmers and tractor owners, ensuring they can maintain their equipment while staying within budget. With us, you get the best value for your investment, backed by our dedication to long-lasting performance and customer satisfaction.
      </p>

      {/* Fourth Paragraph - Customer Service */}
      <p className="mt-6 text-2xl text-gray-700 leading-relaxed">
        Our team at PowerPlow is not just focused on selling parts &ndash; we are passionate about building relationships with our customers. We offer exceptional customer service and expert advice to help you make informed decisions. Whether you need help choosing the right parts or have a question about installation, our knowledgeable staff is here to assist you every step of the way.
      </p>

      {/* Fifth Paragraph - Shipping */}
      <p className="mt-6 text-2xl text-gray-700 leading-relaxed">
        In addition to our dedication to product quality and customer service, we prioritize fast and reliable shipping. We understand the importance of getting your parts delivered quickly, so you can get back to work without delay. PowerPlow partners with trusted logistics providers to ensure that your order arrives safely and on time, wherever you are.
      </p>

      {/* Sixth Paragraph - Company Mission */}
      <p className="mt-6 text-2xl text-gray-700 leading-relaxed">
        At PowerPlow, our mission is simple: to provide farmers and tractor owners with the highest-quality parts, exceptional service, and unmatched value. As a customer-focused company, we are always looking for ways to improve and innovate in order to better serve you. Join the PowerPlow family today, and experience the difference of working with a company that truly understands your needs.
      </p>

      {/* Closing Paragraph - Final Assurance */}
      <p className="mt-8 text-xl text-gray-600">
        Whether you&apos;re a seasoned farmer or just starting out, PowerPlow is here to provide you with the parts and expertise you need to keep your equipment performing at its best.
      </p>
    </div>
  );
};

export default CompanyInfo;
