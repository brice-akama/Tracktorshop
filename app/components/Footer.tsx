import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Company Section */}
        <div>
          <h2 className="text-lg font-semibold">PowerPlow</h2>
          <p className="mt-2 text-sm text-gray-400">
            Your trusted source for premium tractor parts and accessories. We power your productivity.
          </p>
        </div>

        {/* Products Section */}
        <div>
          <h3 className="text-sm font-semibold uppercase mb-4">Products</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <Link href="/products/engine-parts" className="hover:text-white">
                Engine Parts
              </Link>
            </li>
            <li>
              <Link href="/products/hydraulics" className="hover:text-white">
                Hydraulics
              </Link>
            </li>
            <li>
              <Link href="/products/tires" className="hover:text-white">
                Tires
              </Link>
            </li>
            <li>
              <Link href="/products/electronics" className="hover:text-white">
                Electronics
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources Section */}
        <div>
          <h3 className="text-sm font-semibold uppercase mb-4">Resources</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <Link href="/our-company" className="hover:text-white">
                Our Company
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="hover:text-white">
                Private Policy                                                           
              </Link>
            </li>
            <li>
              <Link href="/terms-of-use" className="hover:text-white">
                Terms Of Use
              </Link>
            </li>
            <li>
              <Link href="/support" className="hover:text-white">              
                Support
              </Link>
            </li>
            <li>
              <Link href="/contact-us" className="hover:text-white">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/admin/login" className="hover:text-white">
                login
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-sm font-semibold uppercase mb-4">Contact</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <span>📍 123 Tractor Lane, AgriTown, USA</span>
            </li>
            <li>
              <a href="tel:+1234567890" className="hover:text-white">
                📞 +1 234 567 890
              </a>
            </li>
            <li>
              <a href="mailto:support@powerplow.com" className="hover:text-white">
                ✉️ support@powerplow.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} PowerPlow. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            {/* Social Media Icons */}
            <a
              href="#"
              className="hover:text-white"
              aria-label="Facebook"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M22.675 0H1.325C.595 0 0 .592 0 1.321v21.357C0 23.408.595 24 1.325 24H12.82v-9.294H9.692V11.03h3.128V8.416c0-3.1 1.894-4.788 4.66-4.788 1.325 0 2.462.099 2.794.144v3.24H17.53c-1.509 0-1.799.718-1.799 1.77v2.32h3.595l-.469 3.675h-3.126V24h6.127c.729 0 1.324-.592 1.324-1.322V1.32C24 .592 23.404 0 22.675 0z" />
              </svg>
            </a>
            <a
              href="#"
              className="hover:text-white"
              aria-label="Twitter"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M24 4.557a9.82 9.82 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724 9.865 9.865 0 0 1-3.127 1.195A4.918 4.918 0 0 0 16.875 3c-2.73 0-4.944 2.215-4.944 4.943 0 .388.043.765.127 1.127C7.691 8.918 4.067 6.89 1.64 3.675a4.902 4.902 0 0 0-.669 2.482c0 1.713.87 3.225 2.19 4.112A4.936 4.936 0 0 1 .96 9.6v.051a4.944 4.944 0 0 0 3.95 4.843 4.993 4.993 0 0 1-2.212.085 4.949 4.949 0 0 0 4.607 3.42A9.868 9.868 0 0 1 .97 21.9a13.926 13.926 0 0 0 7.548 2.213c9.057 0 14.01-7.496 14.01-13.986 0-.212-.006-.425-.015-.637A9.936 9.936 0 0 0 24 4.557z" />
              </svg>
            </a>
            <a
              href="#"
              className="hover:text-white"
              aria-label="LinkedIn"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M19 0H5C2.239 0 0 2.239 0 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5V5c0-2.761-2.239-5-5-5zM7.338 19H4V8.661h3.338V19zm-1.675-11.281c-1.059 0-1.911-.857-1.911-1.914 0-1.056.857-1.911 1.911-1.911s1.911.856 1.911 1.911-.857 1.911-1.911 1.911zM20 19h-3.338v-5.281c0-1.257-.027-2.877-1.756-2.877-1.758 0-2.027 1.372-2.027 2.79V19H9.541V8.661H12.67v1.414h.043c.433-.822 1.489-1.692 3.063-1.692 3.275 0 3.877 2.155 3.877 4.956V19z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
