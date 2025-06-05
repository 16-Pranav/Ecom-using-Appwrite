import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <>
      <Navbar />

      <div>
        <div>
          {" "}
          <div className="relative flex justify-center items-center h-40 sm:h-60 md:h-86 bg-gray-600 mb-6 sm:mb-10">
            <img
              className="absolute w-full h-full object-cover top-0"
              src={assets.aboutPoster}
              alt=""
            />
            <h1 className="relative text-white font-serif font-extrabold text-2xl sm:text-3xl md:text-4xl">
              About Us
            </h1>
          </div>
          <div className="py-3 sm:py-5">
            <div className="flex flex-col justify-center items-center py-3 sm:py-5">
              <h1 className="relative text-black font-serif font-extrabold text-2xl sm:text-3xl md:text-4xl px-4 py-2 sm:py-4 text-center">
                Organic Mission
              </h1>
              <h3 className="px-4 py-2 sm:py-4 text-center">
                Cultivating a healthier future with sustainable, organic
                practices—nurturing nature, nourishing lives
              </h3>
              <div className="flex flex-col sm:flex-row gap-8 sm:gap-10 md:gap-20 lg:gap-30 justify-center items-center py-4">
                <div className="flex flex-col justify-center items-center">
                  <img
                    className="w-28 sm:w-32 md:w-full max-w-[150px] h-auto max-h-28 sm:max-h-36"
                    src={assets.organic}
                    alt=""
                  />
                  <h1 className="py-2 sm:py-4 px-2 sm:px-4 text-center">
                    100% Organic
                  </h1>
                </div>

                <div className="flex flex-col justify-center items-center">
                  <img
                    className="w-28 sm:w-32 md:w-full max-w-[150px] h-auto max-h-28 sm:max-h-36"
                    src={assets.quality}
                    alt=""
                  />
                  <h1 className="py-2 sm:py-4 px-2 sm:px-3 text-center">
                    Best Quality Sourced
                  </h1>
                </div>

                <div className="flex flex-col justify-center items-center">
                  <img
                    className="w-28 sm:w-32 md:w-full max-w-[150px] h-auto max-h-28 sm:max-h-36"
                    src={assets.bestPrice}
                    alt=""
                  />
                  <h1 className="py-2 sm:py-4 px-2 sm:px-3 text-center">
                    Always Best Priced
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default About;
