"use client";

import React, { useState } from "react";

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      
  
      const data = await response.json(); // This might throw the error
  
      if (!response.ok) {
        throw new Error(data.error || "Failed to send the message.");
      }
  
      alert(data.message);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Something went wrong.");
      }
    }
  };
  

  return (
    <div className="container mx-auto px-6 py-16 mt-28">
      {/* Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800">Contact Us</h1>
        <p className="text-lg text-gray-600 mt-4">
          Have questions? We'd love to hear from you! Get in touch with us using the form below or through the provided
          contact details.
        </p>
      </div>

      {/* Contact Information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-center">
        <div>
          <div className="text-blue-600 mb-4">
            <i className="fas fa-phone-alt text-3xl"></i>
          </div>
          <h3 className="text-xl font-semibold text-gray-800">Phone</h3>
          <p className="text-gray-600">+1 (123) 456-7890</p>
        </div>
        <div>
          <div className="text-blue-600 mb-4">
            <i className="fas fa-envelope text-3xl"></i>
          </div>
          <h3 className="text-xl font-semibold text-gray-800">Email</h3>
          <p className="text-gray-600">support@example.com</p>
        </div>
        <div>
          <div className="text-blue-600 mb-4">
            <i className="fas fa-map-marker-alt text-3xl"></i>
          </div>
          <h3 className="text-xl font-semibold text-gray-800">Address</h3>
          <p className="text-gray-600">123 Main Street, Anytown, USA</p>
        </div>
      </div>

      {/* Contact Form */}
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-4 border border-gray-300 rounded-lg"
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-4 border border-gray-300 rounded-lg"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2" htmlFor="subject">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              className="w-full p-4 border border-gray-300 rounded-lg"
              placeholder="Enter the subject"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              className="w-full p-4 border border-gray-300 rounded-lg"
              placeholder="Enter your message"
              rows={6}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Optional: Embed Map */}
      <div className="mt-16">
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509372!2d144.95373631586072!3d-37.81720974202132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d39caa80f0e6!2sFederation%20Square!5e0!3m2!1sen!2sus!4v1635181301836!5m2!1sen!2sus"
          className="w-full h-96 rounded-lg border"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactUs;
