import React from "react";
import { assets } from "../assets/assets";

const Flyer = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative overflow-hidden rounded-2xl shadow-2xl">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 z-10"></div>

        {/* Main image */}
        <div className="relative">
          <img
            className="w-full max-w-6xl mx-auto h-40 sm:h-60 md:h-80 lg:h-96 object-cover object-center transform hover:scale-105 transition-transform duration-700"
            src={assets.poster}
            alt="Special Offers"
          />
        </div>

        {/* Decorative elements */}
        <div className="absolute top-4 left-4 w-12 h-12 bg-lime-400 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute bottom-4 right-4 w-8 h-8 bg-green-400 rounded-full opacity-40 animate-pulse delay-1000"></div>

        {/* Optional overlay content */}
        <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 text-center transform scale-95 hover:scale-100 transition-transform duration-300">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Special Offers
            </h3>
            <p className="text-gray-600">
              Discover amazing deals on fresh organic products!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flyer;
