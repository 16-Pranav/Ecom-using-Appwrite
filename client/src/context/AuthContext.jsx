import React, { createContext, useState, useContext, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {account} from "../config/appwrite";
import { ID } from "appwrite";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Navigate Function
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    checkUser();
  }, []);
  const checkUser = async () => {
    try {
      const currentUser = await account.get();
      setUser(currentUser);
    } catch (error) {
      console.error("Authentication check failed:", error.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
  // Signin with email and password
  const signInEmail = async (email, password) => {
    setLoading(true);
    try {
      await account.createEmailPasswordSession(email, password);
      const loggedInUser = await account.get();
      setUser(loggedInUser);
      toast.success("Login successful");
      navigate("/profile");
    } catch (error) {
      console.error("Login error:", error.message);
      let errorMessage = "Invalid email or password. Please try again.";

      if (error.message) {
        errorMessage = error.message;
      } else if (error.response && error.response.message) {
        errorMessage = error.response.message;
      }

      toast.error(errorMessage);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // SignUp with email and password
  const signUpEmail = async (email, password, confirmPassword) => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }
    setLoading(true);
    try {
      await account.create(ID.unique(), email, password); // Create account

      await account.createEmailPasswordSession(email, password); // Create session for new user

      const newUser = await account.get(); // Fetch new user's details
      setUser(newUser); // Update user state

      toast.success("Account created successfully. Logged in.");
      navigate("/profile"); // Navigate after user state is updated
    } catch (error) {
      console.error("Signup error:", error);

      let errorMessage = "Failed to create account. Please try again.";

      if (error.message) {
        errorMessage = error.message;
      } else if (error.response && error.response.message) {
        errorMessage = error.response.message;
      }
      toast.error(errorMessage);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
  // Sign in with Google
  const signInGoogle = async () => {
    setLoading(true);
    try {
      await account.createOAuth2Session(
        "google",
        "http://localhost:5173/profile",
        "http://localhost:5173/login"
      );
    } catch (error) {
      console.error("Google sign-in failed:", error.message);
      toast.error(error.message || "Google sign-in failed to start.");
      setLoading(false);
      if (window.location.pathname !== "/login") {
        navigate("/login");
      }
    }
  };

  // Logout function
  const logout = async () => {
    setLoading(true);
    try {
      await account.deleteSessions();
      setUser(null);
      toast.success("Logout successful");

      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error(error.message || "Logout failed. Please try again.");
      setUser(null); // Still clear local state
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    setUser,
    signInEmail,
    signUpEmail,
    signInGoogle,
    logout,
    checkUser,
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
