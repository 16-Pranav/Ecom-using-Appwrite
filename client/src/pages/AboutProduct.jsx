import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { assets } from "../assets/assets";

const AboutProduct = () => {
  const location = useLocation();
  const product = location.state;

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <Navbar />{" "}
      <div className="flex flex-col md:flex-row items-center px-4 py-4 bg-gradient-to-b from-lime-100 to-white">
        {/* Product picture */}
        <div className="px-3 py-4 sm:px-5 sm:py-5 mx-auto md:ml-4 md:mr-8 lg:ml-10 lg:mr-20 w-full md:w-auto flex justify-center">
          <img
            className="px-1 py-1 my-3 sm:mt-5 sm:mb-5 border border-gray-200 rounded-b-sm object-contain w-3/4 sm:w-auto sm:scale-125 md:scale-150"
            src={product.image}
            alt={product.name}
          />
        </div>

        {/* Product name and price + Add to cart Button + Speciality */}
        <div className="px-4 py-4 w-full md:w-auto flex flex-col items-center md:items-start text-center md:text-left">
          <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl">
            {product.name}
          </h1>
          <h2 className="text-xl sm:text-2xl font-semibold py-3 sm:py-5">
            Rs.{product.price}
          </h2>
          <button className="border border-lime-500 font-semibold text-lg sm:text-xl px-4 py-2 rounded-lg bg-lime-300 cursor-pointer hover:bg-lime-400 transition-colors w-full md:w-auto">
            Add to cart
          </button>

          {/* Speciality of the product */}
          <div className="container mx-auto py-4 w-full">
            <h3 className="text-xl sm:text-2xl font-semibold py-3 sm:py-4">
              Speciality
            </h3>
            <p className="py-2 sm:py-4 text-base sm:text-lg">
              {product.speciality}
            </p>
          </div>
        </div>
      </div>
      {/* Description of the product + Details of Retailer Selling */}
      <div className="container mx-auto px-4 py-4">
        <h3 className="text-xl sm:text-2xl font-semibold px-2 sm:px-4">
          Description
        </h3>
        <p
          className="px-2 sm:px-4 py-3 sm:py-4 text-base sm:text-lg"
          dangerouslySetInnerHTML={{ __html: product.description }}
        ></p>
        <h3 className="text-xl sm:text-2xl font-semibold px-2 sm:px-4 mt-4">
          Supplier Information:
        </h3>
        <p className="px-2 sm:px-4 py-3 sm:py-4 text-base sm:text-lg">
          <span className="font-semibold">Supplier Name: </span>
          {product.supplier.name} <br />
          <span className="font-semibold">Email Id: </span>
          {product.supplier.email}
        </p>
      </div>
      <Footer />
    </>
  );
};

export default AboutProduct;
