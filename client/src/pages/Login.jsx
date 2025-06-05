import React, { useContext, useEffect, useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FiMail, FiLock } from "react-icons/fi";
import { ArrowRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/transition.css"; // CSS for animations
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const {
    user,
    signInEmail,
    loading: authLoading,
    signInGoogle,
  } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (user) {
      // If user is already logged in, redirect from login page
      navigate("/profile"); // Or to the homepage or dashboard
    }
  }, [user, navigate]);

  // Handle sign in
  const handleSignIn = async () => {
    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    if (!password) {
      toast.error("Please enter your password");
      return;
    }

    await signInEmail(email, password);
  };

  // Handle sign up
  const handleSignUp = async () => {
    // Validate fields before submission
    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    // Only call signup if validation passes
    await signUpEmail(email, password, confirmPassword);
  };

  // Handle Google sign in
  const handleGoogleSignIn = async () => {
    await signInGoogle();
  };

  return (
    <>
      <Navbar />{" "}
      <div className="flex justify-center items-center min-h-screen py-8 px-4 bg-gradient-to-b from-lime-100 to-white">
        <div className={`auth-form ${isSignUp ? "sign-up" : "sign-in"}`}>
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-lg shadow-gray-300 w-full max-w-sm text-center relative">
            {/* Top Icon */}
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white p-3 rounded-full shadow-md">
              <FaSignInAlt className="h-6 w-6 text-gray-600" />
            </div>
            {/* Title */}
            <h2 className="text-lg sm:text-xl font-semibold mt-6">
              {isSignUp ? "Sign up for a new account" : "Sign in with email"}
            </h2>{" "}
            {/* Input Fields */}
            <div className="mt-6 space-y-4">
              <div className="flex items-center border border-gray-300 rounded-lg px-3 sm:px-4 py-2">
                <FiMail className="text-gray-500" />
                <input
                  type="email"
                  placeholder="Email"
                  className="ml-2 w-full outline-none text-gray-700 text-sm sm:text-base"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex items-center border border-gray-300 rounded-lg px-3 sm:px-4 py-2">
                <FiLock className="text-gray-500" />
                <input
                  type="password"
                  placeholder="Password"
                  className="ml-2 w-full outline-none text-gray-700 text-sm sm:text-base"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>{" "}
              {isSignUp && (
                <div className="flex items-center border border-gray-300 rounded-lg px-3 sm:px-4 py-2">
                  <FiLock className="text-gray-500" />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="ml-2 w-full outline-none text-gray-700 text-sm sm:text-base"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              )}
              {!isSignUp && (
                <div className="text-right text-sm text-gray-500">
                  <a href="#" className="hover:underline">
                    Forgot password?
                  </a>
                </div>
              )}
            </div>{" "}
            {/* Login or Sign Up Button */}
            <button
              className="mt-4 bg-black text-white w-full py-2 rounded-lg text-base sm:text-lg font-semibold hover:opacity-90"
              onClick={isSignUp ? handleSignUp : handleSignIn}
            >
              {isSignUp ? "Sign up" : "Sign in"}
            </button>
            {/* Social Login */}
            <div className="text-gray-400 text-sm my-4">
              Or {isSignUp ? "sign up" : "sign in"} with
            </div>
            {/* Google Login Button */}
            <div className="flex justify-center">
              <div
                className="px-2 py-2 bg-gray-100 rounded-lg shadow-md cursor-pointer flex justify-center items-center space-x-2 w-full"
                onClick={handleGoogleSignIn}
              >
                {/* Google Icon */}
                <FcGoogle className="h-6 sm:h-8 w-6 sm:w-8 text-gray-600" />
                <h2 className="text-gray-600 px-2 text-sm sm:text-base">
                  {isSignUp ? "Sign up with Google" : "Sign in with Google"}
                </h2>
              </div>
            </div>
            {/* Toggle Sign In/Sign Up */}
            <div className="text-gray-500 text-sm mt-4">
              {isSignUp ? "Already have an account?" : "New Customer?"}
              <span
                className="text-blue-500 cursor-pointer hover:underline"
                onClick={() => setIsSignUp(!isSignUp)}
              >
                {isSignUp ? " Sign in" : " Sign up"}
              </span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
