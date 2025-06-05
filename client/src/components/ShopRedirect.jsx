import { Link } from "react-router-dom";
import React from "react";
import { assets } from "../assets/assets";

const ShopRedirect = () => {
  return (
    <div className="container mx-auto bg-gradient-to-b from-lime-500 to-lime-300 px-4 sm:px-6 md:px-8 py-5">
      <div className="flex text-black">
        <div className="flex flex-col md:flex-row py-3 w-full justify-between">
          <div className="md:w-1/2 flex flex-col justify-center">
            <h1 className="px-2 sm:px-4 py-2 sm:py-4 text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-4 text-center md:text-left">
              Welcome to The Organic Store
            </h1>
            <p className="px-2 sm:px-4 py-2 sm:py-4 text-base sm:text-lg md:text-xl mb-2 sm:mb-5 text-center md:text-left">
              Always Fresh and Organic. Trusted by{" "}
              <br className="hidden md:block" />
              <span className="font-extrabold text-lime-800">
                Millions of Indians
              </span>
            </p>

            <div className="px-2 sm:px-3 py-2 sm:py-4 text-center md:text-left">
              <Link
                to="/products"
                className="bg-white text-black px-4 py-2 sm:py-3 transform transition-transform duration-200 ease-in-out hover:scale-110 rounded-xl inline-block"
              >
                Shop Now
              </Link>
            </div>
          </div>

          <div className="md:w-1/2 flex py-5 md:py-10 items-center justify-center">
            <img
              className="py-3 max-h-[200px] md:max-h-[250px] w-auto"
              src={assets.adPhoto}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopRedirect;


