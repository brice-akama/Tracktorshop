"use client";

import React, { useState } from "react";

const NewsletterSubscription: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setMessage("Please enter a valid email address.");
      return;
    }

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to subscribe.");
      }

      setMessage(data.message);
      setEmail("");
    } catch (error: unknown) {
      // Check if the error is an instance of Error and access its message
      if (error instanceof Error) {
        setMessage(error.message || "Something went wrong.");
      } else {
        setMessage("Something went wrong.");
      }
    }
  };

  // Component's return JSX is unaffected by the handleSubmit function
  return (
    <div className="bg-gray-50 text-gray-800 py-12">
      <div className="container mx-auto px-6 lg:px-12 text-center max-w-4xl">
        <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">
          Stay Connected
        </h3>
        <p className="text-base lg:text-lg text-gray-600 mt-2">
          Join our mailing list for exclusive offers, product updates, and expert maintenance tips for tractor parts.
        </p>
        <form
          className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full sm:w-2/3 lg:w-1/2 px-5 py-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-gray-900"
          />
          <button
            type="submit"
            className="w-full sm:w-auto bg-yellow-500 px-8 py-3 rounded-md hover:bg-yellow-600 text-white font-medium transition-all duration-200"
          >
            Subscribe
          </button>
        </form>
        {message && (
          <p className="mt-4 text-sm text-yellow-600 font-medium">{message}</p>
        )}
      </div>
    </div>
  );
};

export default NewsletterSubscription;
