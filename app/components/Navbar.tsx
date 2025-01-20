"use client";

import React, { useState } from "react";
import { FaSearch, FaUserCircle, FaShoppingCart, FaBars, FaChevronDown  } from "react-icons/fa"; // FaBars for the menu icon
import Link from "next/link";

const Navbar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 
  const [visibleProducts, setVisibleProducts] = useState(6); // Track how many products to disp


  const handleDropdownToggle = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const categories = [
    "Engine Components",
    "Transmission & Powertrain",
    "Drivetrain & Control",
    
    // Add more categories as needed
  ];

  return (
    <nav className="bg-black py-7 px-6 fixed w-full top-0 left-0 z-10 shadow-md">
  <div className="flex items-center justify-between w-full">
  {/* Company Name (Center on Phone, Left on Larger Devices) */}
  <div className="text-4xl font-bold text-white mt-2 flex justify-center items-center w-full md:w-auto md:text-left">
    <div className="md:hidden flex justify-center w-full">
      PowerPlow
    </div>
    <Link href="/">
      <div className="hidden md:block cursor-pointer">
        PowerPlow
      </div>
    </Link>
  </div>

  {/* Search Bar (Centered on Medium and Larger Devices) */}
  <div className="flex items-center w-1/2 bg-gray-100 rounded-full shadow-inner px-6 py-3 mx-auto mt-2 hidden md:flex">
    <input
      type="text"
      placeholder="Search..."
      className="flex-grow bg-transparent outline-none text-gray-800 text-lg"
    />
    <div className="flex-shrink-0 ml-3">
      <FaSearch className="text-gray-500 text-xl" />
    </div>
  </div>

  {/* Profile and Cart Icons (Right) */}
  <div className="flex items-center gap-6 text-white text-3xl ml-auto">
      {/* Profile Link */}
      <Link href="/profile">
        <FaUserCircle className="cursor-pointer hover:text-gray-400 mt-2 hidden md:block" />
      </Link>

      {/* Cart Link */}
      <Link href="/cart">
        <FaShoppingCart className="cursor-pointer hover:text-gray-400 mt-2 hidden md:block" />
      </Link>
    </div>
</div>




      {/* Secondary Navbar */}
      
         {/* Secondary Navbar */}


  {/* Secondary Navbar */}
<nav className="bg-gray-800 text-white py-4 px-6 fixed w-full top-[72px] left-0 z-10 shadow-md mt-5 md:mt-11">
  <div className="flex items-center justify-between gap-8">
    {/* New Menu Icon on the Left for Mobile */}
    <div className="md:hidden flex items-center">
      <FaBars
        className="text-white text-3xl cursor-pointer"
        onClick={() => setIsSidebarOpen(true)} // Open the sidebar
      />
    </div>

    {/* All Categories with Dropdown (hidden on mobile, visible on desktop) */}
    <div className="relative hidden md:flex items-center gap-8 justify-start w-full md:w-auto">
      <div
        onClick={handleDropdownToggle}
        className="cursor-pointer flex items-center gap-2 hover:underline"
      >
        <FaBars className="text-lg" />
        <span className="uppercase">All Category</span>
      </div>

      {/* Links (hidden on mobile, visible on desktop) */}
      <div className="flex items-center gap-8 justify-start w-full md:w-auto">
        <Link href="/our-company" className="hover:underline hidden md:block uppercase">
          Our Company
        </Link>
        <Link href="/shipping-rates" className="hover:underline hidden md:block uppercase">
          Shipping Rates
        </Link>
        <Link href="/product" className="hover:underline hidden md:block uppercase">
          Products
        </Link>
        <Link href="/contact-us" className="hover:underline hidden md:block uppercase">
          Contact Us
        </Link>
      </div>

      {isDropdownOpen && (
  <div className="absolute top-full left-0 mt-2 bg-white bg-opacity-90 text-black shadow-lg p-4 rounded-md w-72">
    <div className="flex flex-wrap gap-2">
      {categories.map((category, index) => (
        <Link key={index} href={`/product?category=${encodeURIComponent(category)}`}>
          <div className="cursor-pointer hover:bg-gray-200 px-2 py-1 rounded-md inline-block text-sm">
            {category}
          </div>
        </Link>
      ))}
    </div>
  </div>
)}


    </div>

    {/* Profile and Shopping Cart Icons (visible only on phone devices) */}
    <div className="md:hidden flex items-center gap-4">
    <Link href="/login">
        <FaSearch className="text-white text-2xl cursor-pointer" />
      </Link>
    <Link href="/login">
        <FaUserCircle className="text-white text-2xl cursor-pointer" />
      </Link>
      <Link href="/cart">
        <FaShoppingCart className="text-white text-2xl cursor-pointer" />
      </Link>
    </div>
  </div>
</nav>

         {/* Sidebar for mobile */}
  
         {isSidebarOpen && (
        <div className="fixed top-0 left-0 w-3/4 bg-gray-800 text-white h-full z-20 p-4 md:hidden">
          <div className="flex justify-end mb-6">
            <button
              className="text-white text-3xl"
              onClick={() => setIsSidebarOpen(false)} // Close sidebar
            >
              X
            </button>
          </div>

          {/* All Products Dropdown */}
          <div>
            <div
              className="cursor-pointer flex items-center gap-2 hover:underline uppercase"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span>All Category</span>
              <FaChevronDown className={`text-lg ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </div>

            {isDropdownOpen && (
              <div className="mt-2 bg-gray-900 p-4 rounded-md">
                {/* Display first 'visibleProducts' products */}
                <div className="flex flex-col gap-2">
                  {categories.slice(0, visibleProducts).map((category, index) => (
                    <div
                      key={index}
                      className="cursor-pointer hover:bg-gray-700 px-2 py-1 rounded-md text-sm"
                    >
                      {category}
                    </div>
                  ))}
                </div>

                {/* Load More Button */}
                {visibleProducts < categories.length && (
                  <button
                    className="mt-4 w-full py-2 bg-gray-600 rounded-md hover:bg-gray-500 text-white"
                    onClick={() => setVisibleProducts(visibleProducts + 6)} // Load more products
                  >
                    Load More
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Links Below All Products */}
          <div className="mt-4">
            <Link href="/our-company">
              <div className="hover:underline border-b py-2 uppercase">Our Company</div>
            </Link>
            <Link href="/shipping-rates">
              <div className="hover:underline border-b py-2 uppercase">Shipping Rates</div>
            </Link>
            <Link href="/contact-us">
              <div className="hover:underline py-2 uppercase">Contact Us</div>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
