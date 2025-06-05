import { Link } from "react-router-dom";
import React from "react";
import { assets } from "../assets/assets";
import { FaLeaf, FaShoppingCart, FaStar, FaHeart } from "react-icons/fa";

const ShopRedirect = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-lime-50 via-green-50 to-emerald-50">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-lime-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-green-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-emerald-200 rounded-full opacity-30 animate-bounce delay-500"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 relative">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content Section */}
          <div className="space-y-8 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-lime-100 text-lime-800 px-4 py-2 rounded-full text-sm font-medium border border-lime-200">
              <FaLeaf className="text-lime-600" />
              100% Organic & Fresh
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
                Welcome to{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-600 to-green-600">
                  The Organic Store
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Always Fresh and Organic. Trusted by{" "}
                <span className="font-bold text-lime-700 relative">
                  Millions of Indians
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-lime-300 -z-10"></div>
                </span>
              </p>
            </div>

            {/* Features */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6">
              <div className="flex items-center gap-2 text-gray-600">
                <div className="w-8 h-8 bg-lime-100 rounded-full flex items-center justify-center">
                  <FaStar className="text-lime-600 text-sm" />
                </div>
                <span className="text-sm font-medium">Premium Quality</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <div className="w-8 h-8 bg-lime-100 rounded-full flex items-center justify-center">
                  <FaHeart className="text-lime-600 text-sm" />
                </div>
                <span className="text-sm font-medium">Health First</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <div className="w-8 h-8 bg-lime-100 rounded-full flex items-center justify-center">
                  <FaLeaf className="text-lime-600 text-sm" />
                </div>
                <span className="text-sm font-medium">Eco-Friendly</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/products"
                className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-lime-600 to-green-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <FaShoppingCart className="group-hover:animate-bounce" />
                Shop Now
                <div className="absolute inset-0 bg-gradient-to-r from-lime-700 to-green-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>

              <Link
                to="/about"
                className="inline-flex items-center gap-2 bg-white text-gray-700 px-8 py-4 rounded-full font-semibold border-2 border-gray-200 hover:border-lime-300 hover:bg-lime-50 transition-all duration-300"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Image Section */}
          <div className="relative order-first lg:order-last">
            <div className="relative">
              {/* Background circle */}
              <div className="absolute inset-0 bg-gradient-to-br from-lime-200 to-green-200 rounded-full transform rotate-6 scale-110 opacity-20"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-200 to-lime-200 rounded-full transform -rotate-6 scale-105 opacity-30"></div>

              {/* Main image */}
              <div className="relative z-10 p-8">
                <img
                  className="w-full max-w-md mx-auto h-auto object-contain drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
                  src={assets.adPhoto}
                  alt="Fresh Organic Produce"
                />
              </div>

              {/* Floating elements */}
              <div className="absolute top-8 right-8 bg-white rounded-full p-3 shadow-lg animate-float">
                <FaLeaf className="text-lime-600 text-xl" />
              </div>
              <div className="absolute bottom-8 left-8 bg-white rounded-full p-3 shadow-lg animate-float delay-1000">
                <FaHeart className="text-red-500 text-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-8 sm:h-12"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            className="fill-white"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            className="fill-white"
          ></path>
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            className="fill-white"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default ShopRedirect;


