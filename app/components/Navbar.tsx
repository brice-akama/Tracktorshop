"use client";

import React, { useState, useEffect } from "react";
import { FaSearch, FaUserCircle, FaShoppingCart, FaBars, FaChevronDown, FaTimes  } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast, Toaster } from "react-hot-toast";

const Navbar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 
  const [visibleProducts, setVisibleProducts] = useState(6);
  const [cartCount, setCartCount] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const [isSearchPopupVisible, setIsSearchPopupVisible] = useState(false);

  
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    // Define a list of known paths to handle directly
    const knownPaths = [
      "/privacy-policy",
      "/terms-of-service",
      "/contact-us",
      "/about-us", // Match "about" to "/about-us"
    ];

    try {
      // Check if the search query partially matches any known path
      const matchedPath = knownPaths.find((path) =>
        path.toLowerCase().includes(searchQuery.trim().toLowerCase())
      );

      if (matchedPath) {
        router.push(matchedPath); // Redirect to the matched path
        setSearchQuery(''); // Clear the search input after redirect
        setIsSearchPopupVisible(false); // Close the popup
        return;
      }

      // Proceed with the search functionality for products or categories
      const res = await fetch(`/api/search?search=${encodeURIComponent(searchQuery.trim())}`);
      const { redirectTo } = await res.json();

      if (redirectTo) {
        router.push(redirectTo); // Redirect to the URL returned by the backend
        setSearchQuery(''); // Clear the search input after redirect
        setIsSearchPopupVisible(false); // Close the popup
      } else {
        toast.error("No matching results found.");
        setSearchQuery(''); // Clear the search input after no results
        setIsSearchPopupVisible(false); // Close the popup
      }
    } catch (error) {
      console.error("Error during search:", error);
      toast.error("Something went wrong. Please try again.");
      setSearchQuery(''); // Clear the search input after error
      setIsSearchPopupVisible(false); // Close the popup
    }
  };
  
  const handleDropdownToggle = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const categories = [
    "Engine Components",
    "Transmission & Powertrain",
    "Drivetrain & Control",
    
    // Add more categories as needed
  ];

 // Function to fetch cart count from the backend
  const fetchCartCount = async () => {
    try {
      const response = await fetch('/api/cart', { method: 'GET', credentials: 'include' });
      const data = await response.json();

      if (response.ok && data.cart?.items) {
        const totalCount = data.cart.items.reduce((sum: number, item: any) => sum + item.quantity, 0);
        setCartCount(totalCount);
      } else {
        setCartCount(0); // Set to 0 if no cart is found
      }
    } catch (error) {
      console.error('Error fetching cart count:', error);
      setCartCount(0); // Fallback in case of error
    }
  };


  



  useEffect(() => {
    // Fetch cart count initially
    fetchCartCount();

    // Listen for custom cart update events
    const handleCartUpdate = () => fetchCartCount();
    window.addEventListener('cartUpdated', handleCartUpdate);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);


  useEffect(() => {
    // Fetch cart count initially
    fetchCartCount();

    // Listen for custom cart update events
    const handleCartUpdate = () => fetchCartCount();

    window.addEventListener('cartUpdated', handleCartUpdate);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);


  return (
    <nav className="bg-black py-7 px-6 fixed w-full top-0 left-0 z-10 shadow-md">
      <Toaster position="top-center" reverseOrder={false} />
  <div className="flex items-center justify-between w-full">
  {/* Company Name (Center on Phone, Left on Larger Devices) */}
  
  <div className="text-4xl font-bold text-white mt-2 flex justify-center items-center w-full md:w-auto md:text-left">
  <Link  href="/" >
  <div className="md:hidden flex justify-center w-full">
      PowerPlow
    </div>
  </Link>
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
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search..."
        className="flex-grow bg-transparent outline-none text-gray-800 text-lg"
      />
      <button onClick={handleSearch} className="flex-shrink-0 ml-3">
        <FaSearch className="text-gray-500 text-xl" />
      </button>
    </div>

  {/* Profile and Cart Icons (Right) */}
  <div className="flex items-center gap-6 text-white text-3xl ml-auto">
      {/* Profile Link */}
      <Link href="/profile">
        <FaUserCircle className="cursor-pointer hover:text-gray-400 mt-2 hidden md:block" />
      </Link>

      {/* Cart Link */}
      <div className="relative">
          <Link href="/cart">
            <FaShoppingCart className="cursor-pointer hover:text-gray-400 mt-2 hidden md:block" />
          </Link>

          {/* Cart Count Badge */}
          
            <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full px-1 py-0.5 text-xs hidden md:block">
              {cartCount} 
            </span>
        
        </div>
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
    <div>
      {/* Search Icon on the Navbar (for mobile) */}
      <div className="md:hidden">
        <FaSearch
          className="text-white text-2xl cursor-pointer"
          onClick={() => setIsSearchPopupVisible(true)} // Show the popup on click
        />
      </div>

      {/* Search Popup */}
      {isSearchPopupVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-11/12 md:w-1/2">
            <div className="flex items-center">
              {/* Search Input */}
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="flex-grow bg-transparent outline-none text-gray-800 text-lg"
              />
              {/* Search Icon */}
              <button onClick={handleSearch} className="ml-3">
                <FaSearch className="text-gray-500 text-xl" />
              </button>
              {/* Close Button */}
              <button
                onClick={() => setIsSearchPopupVisible(false)} // Close the popup
                className="ml-3"
              >
                <FaTimes className="text-gray-500 text-xl" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    <Link href="/profile">
        <FaUserCircle className="text-white text-2xl cursor-pointer" />
      </Link>
      <div className="relative">
      {/* Cart Link */}
      <Link href="/cart">
            <FaShoppingCart className="text-white text-2xl cursor-pointer" />
          </Link>

          {/* Cart Count Badge */}
          
            <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full px-1 py-0.5 text-xs">
              {cartCount} 
            </span>

    </div>
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
