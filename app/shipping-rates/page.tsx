"use client";

import React, { useState } from "react";

const ShippingRate: React.FC = () => {
  const [shippingMethod, setShippingMethod] = useState<string>("standard");

  // Example shipping options
  const shippingOptions = [
    { id: "standard", name: "Standard Shipping", cost: "$5.00", duration: "5-7 business days" },
    { id: "expedited", name: "Expedited Shipping", cost: "$15.00", duration: "2-3 business days" },
    { id: "overnight", name: "Overnight Shipping", cost: "$25.00", duration: "1 business day" },
  ];

  return (
    <div className="container mx-auto px-6 py-16 mt-28">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">Shipping Rates</h1>

      <div className="text-lg text-gray-600 mb-8">
        <p>
          We offer several shipping options to fit your needs. Please select a shipping method below to see the
          associated costs and estimated delivery times.
        </p>
      </div>

      {/* Shipping Method Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {shippingOptions.map((option) => (
          <div
            key={option.id}
            className={`border p-6 rounded-lg shadow-md cursor-pointer hover:bg-gray-100 ${
              shippingMethod === option.id ? "bg-blue-100" : ""
            }`}
            onClick={() => setShippingMethod(option.id)}
          >
            <h3 className="text-xl font-semibold text-gray-800">{option.name}</h3>
            <p className="text-gray-600">Cost: {option.cost}</p>
            <p className="text-gray-600">Estimated delivery: {option.duration}</p>
          </div>
        ))}
      </div>

      {/* Shipping Address Form */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mt-4">Calculate Shipping Costs</h2>
        <form>
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2" htmlFor="address">
              Shipping Address
            </label>
            <input
              type="text"
              id="address"
              className="w-full p-4 border border-gray-300 rounded-lg"
              placeholder="Enter your shipping address"
            />
          </div>

          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2" htmlFor="city">
              City
            </label>
            <input
              type="text"
              id="city"
              className="w-full p-4 border border-gray-300 rounded-lg"
              placeholder="Enter your city"
            />
          </div>

          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2" htmlFor="zip">
              Zip Code
            </label>
            <input
              type="text"
              id="zip"
              className="w-full p-4 border border-gray-300 rounded-lg"
              placeholder="Enter your zip code"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700"
          >
            Calculate Shipping
          </button>
        </form>
      </div>

      {/* Call to Action / Checkout Button */}
      <div className="text-center">
        <button
          className="bg-green-600 text-white py-4 px-8 rounded-lg hover:bg-green-700"
          onClick={() => alert("Proceeding to checkout...")}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default ShippingRate;
