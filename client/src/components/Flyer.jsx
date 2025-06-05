import React from "react";
import { assets } from "../assets/assets";
const Flyer = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-center py-4 sm:py-6 md:py-10">
        <img
          className="w-full max-w-4xl h-40 sm:h-60 md:h-80 object-cover object-center"
          src={assets.poster}
          alt=""
        />
      </div>
    </div>
  );
};

export default Flyer;
