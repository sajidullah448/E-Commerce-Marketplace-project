import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-indigo-600 text-white py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <h2 className="text-2xl font-bold mb-4">SMV-ECOM</h2>
          <p className="text-gray-200">
            Smart Multi-Vendor Marketplace for all your shopping needs.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul>
            <li className="mb-2 hover:text-gray-300">
              <Link to="/">Home</Link>
            </li>
            <li className="mb-2 hover:text-gray-300">
              <Link to="/products">Products</Link>
            </li>
            <li className="mb-2 hover:text-gray-300">
              <Link to="/cart">Cart</Link>
            </li>
            <li className="mb-2 hover:text-gray-300">
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Resources</h3>
          <ul>
            <li className="mb-2 hover:text-gray-300">
              <Link to="/terms">Terms & Conditions</Link>
            </li>
            <li className="mb-2 hover:text-gray-300">
              <Link to="/privacy">Privacy Policy</Link>
            </li>
            <li className="mb-2 hover:text-gray-300">
              <Link to="/faq">FAQ</Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray-300"><FaFacebookF /></a>
            <a href="#" className="hover:text-gray-300"><FaTwitter /></a>
            <a href="#" className="hover:text-gray-300"><FaInstagram /></a>
            <a href="#" className="hover:text-gray-300"><FaLinkedinIn /></a>
          </div>
          <p className="mt-6 text-gray-300 text-sm">
            &copy; {new Date().getFullYear()} SMV-ECOM. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
