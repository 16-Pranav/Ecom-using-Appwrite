import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { assets } from "../assets/assets"; // Assuming you store images here

const Footer = () => {
  return (
    <div className="bg-gray-900 text-white py-8 px-4 sm:px-8 justify-center items-center">
      <div className="container mx-auto px-2 sm:px-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10">
        {/* About Section with Logo and Name */}
        <div>
          <div className="flex items-center gap-4 mb-4">
            <img
              className="w-12 sm:w-16 h-12 sm:h-16"
              src={assets.OGV}
              alt="The Organic Store"
            />
            <h1 className="text-lg sm:text-xl font-semibold font-serif">
              The Organic Store
            </h1>
          </div>
          <p className="text-gray-400 text-sm leading-6">
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          {/* Payment Method Logos */}
          <div className="flex flex-wrap gap-2 mt-4">
            <img src={assets.paypal} alt="PayPal" className="w-12" />
            <img src={assets.discover} alt="Discover" className="w-12" />
            <img src={assets.visa} alt="Visa" className="w-12" />
            <img src={assets.mastercard} alt="MasterCard" className="w-12" />
          </div>
        </div>
        {/* Categories Section */}
        <div className="mt-6 sm:mt-0">
          <h2 className="text-lg font-semibold mb-4">CATEGORIES</h2>
          <ul className="text-gray-400 space-y-2 text-sm">
            <li>
              <Link to="/category/dairy">Dairy</Link>
            </li>
            <li>
              <Link to="/category/vegetables">Vegetables</Link>
            </li>
            <li>
              <Link to="/category/fruits">Fruits</Link>
            </li>
            <li>
              <Link to="/category/grocery">Grocery</Link>
            </li>
          </ul>
        </div>
        {/* Contact Section */}
        <div className="mt-6 md:mt-0">
          <h2 className="text-lg font-semibold mb-4">CONTACT</h2>
          <p className="text-gray-400 text-sm">📍 XYZ, New Delhi, India</p>
          <p className="text-gray-400 text-sm">Pin Code - 110005</p>
          <p className="text-gray-400 text-sm mt-2">📞 +91 123456789</p>
          {/* Social Media Icons */}
          <div className="flex gap-4 mt-4">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook size={20} />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube size={20} />
            </a>
          </div>
        </div>{" "}
      </div>

      {/* Copyright Section */}
      <hr className="my-6 border-gray-700" />
      <div className="text-center text-gray-500 text-sm px-2">
        Copyright © 2025 All rights reserved |
        <span className="text-white">Pranav Bhat</span>
      </div>
    </div>
  );
};

export default Footer;
