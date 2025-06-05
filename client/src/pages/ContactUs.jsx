import React from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ContactUs = () => {
  return (
    <>
      <Navbar />{" "}
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-lime-100 to-white px-4 py-8 sm:py-12">
        <div className="relative w-full max-w-4xl flex flex-col md:flex-row shadow-xl rounded-lg overflow-hidden">
          {/* Left Section - Contact Details */}
          <div className="bg-lime-500 text-white w-full md:w-2/5 p-6 sm:p-8 flex flex-col justify-between rounded-t-lg md:rounded-l-lg md:rounded-tr-none">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                Contact Us
              </h2>
              <p className="flex flex-wrap items-start sm:items-center gap-2 sm:gap-3 mb-4 text-sm sm:text-base">
                <FaMapMarkerAlt className="text-lg mt-1 sm:mt-0" /> XYZ, New
                Delhi, India Pin Code - 110005
              </p>
              <p className="flex items-center gap-2 sm:gap-3 mb-4 text-sm sm:text-base">
                <FaEnvelope className="text-lg" /> ogvhelp@ogvdemo.com
              </p>
              <p className="flex items-center gap-2 sm:gap-3 mb-4 text-sm sm:text-base">
                <FaPhone className="text-lg" /> +91 123456789
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4 mt-4">
              <FaXTwitter className="text-xl cursor-pointer hover:text-black" />
              <FaLinkedin className="text-xl cursor-pointer hover:text-blue-700" />
            </div>
          </div>

          {/* Right Section - Contact Form */}
          <div className="bg-white w-full md:w-3/5 p-6 sm:p-8 rounded-b-lg md:rounded-r-lg md:rounded-bl-none">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
              Get in Touch
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Feel free to drop us a line below!
            </p>{" "}
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-gray-300 rounded-md px-3 sm:px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full border border-gray-300 rounded-md px-3 sm:px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Your Message"
                className="w-full border border-gray-300 rounded-md px-3 sm:px-4 py-2 h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
              <button className="bg-black text-white w-full py-2 rounded-md font-semibold hover:bg-gray-900">
                SEND
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
