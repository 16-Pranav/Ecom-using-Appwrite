import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AuthContext } from "../context/AuthContext";
import { IoPersonCircle } from "react-icons/io5";
import { CartContext } from "../context/CartContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { totalItems } = useContext(CartContext);

  return (
    <div className="shadow py-2 px-4 mx-auto">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3 md:gap-5">
          <img
            className="w-8 h-8 md:w-25 md:h-25 cursor-pointer"
            src={assets.OGV}
            alt=""
            onClick={() => navigate("/")}
          />
          <h1 className="font-extrabold text-xl md:text-2xl bg-gradient-to-r from-green-800 to-blue-800 text-transparent bg-clip-text">
            The Organic Store
          </h1>
        </div>
        {/* Categories/ other tab Navigations */}
        <div className="flex gap-4 md:gap-10 items-center">
          <div className="hidden md:flex gap-5 items-center">
            <Link
              className="font-semibold bg-gradient-to-r from-green-800 to-blue-600 text-transparent bg-clip-text cursor-pointer"
              to="/"
            >
              Home
            </Link>
            <p> | </p>
            <Link
              className="font-semibold bg-gradient-to-r from-green-800 to-blue-600 text-transparent bg-clip-text cursor-pointer"
              to="/about"
            >
              About
            </Link>
            <p> | </p>
            <Link
              className="font-semibold bg-gradient-to-r from-green-800 to-blue-600 text-transparent bg-clip-text cursor-pointer"
              to="/contact"
            >
              Contact Us
            </Link>
          </div>

          {/* Cart Icon */}
          <div className="relative flex items-center">
            <img
              className="h-7 w-7 cursor-pointer"
              src={assets.shopbag}
              alt=""
              onClick={() => navigate("/cart")}
            />
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1 flex items-center justify-center min-w-[18px] h-[18px] leading-none">
              {totalItems}
            </span>
          </div>

          {/* User display section */}
          {user ? (
            <div className="flex gap-3 items-center">
              <IoPersonCircle className="text-4xl text-blue-500" />
              <div className="hidden sm:block">
                <h3 className="">Hello, {user.name || user.email}</h3>
                <h2
                  className="font-bold cursor-pointer"
                  onClick={() => navigate("/profile")}
                >
                  Account
                </h2>
              </div>
            </div>
          ) : (
            <button
              className="bg-gradient-to-r from-green-800 to-blue-600 text-white font-semibold rounded-2xl p-2 font-serif w-16 sm:w-20 cursor-pointer text-sm sm:text-base"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
