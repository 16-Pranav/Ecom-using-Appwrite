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
    console.log(
      "AuthContextProvider useEffect: Calling checkUser. Current path:",
      window.location.pathname
    );
    checkUser();
  }, []);

  const checkUser = async () => {
    console.log(
      "checkUser: Attempting to get user session. Current path:",
      window.location.pathname
    );
    try {
      const currentUser = await account.get();
      // account.get() should throw an error if no session, so currentUser should be populated if successful.
      setUser(currentUser);
      if (currentUser) {
        console.log(
          "checkUser: User session successfully retrieved:",
          currentUser
        );
      } else {
        // This block might not be reached if account.get() errors out on no session,
        // but good for sanity checking if it somehow returns null without error.
        console.log(
          "checkUser: account.get() returned null/undefined, but did not throw an error. Setting user to null."
        );
        setUser(null);
      }
    } catch (error) {
      console.error(
        "checkUser: Error during account.get(). Setting user to null.",
        {
          message: error.message,
          code: error.code, // HTTP status code or Appwrite specific code
          type: error.type, // Appwrite specific error type (e.g., 'user_session_not_found')
          response: error.response, // Potentially more details from Appwrite
        }
      );
      setUser(null);
    } finally {
      console.log("checkUser: finally block. Setting loading to false.");
      setLoading(false);
    }
  };

  // Signin with email and password
  const signInEmail = async (email, password) => {
    setLoading(true);
    try {
      await account.createEmailPasswordSession(email, password);

      const loggedInUser = await account.get(); // Fetch user details after session creation
      setUser(loggedInUser); // Update user state

      toast.success("Login successful");
      console.log(loggedInUser);

      // Redirect to profile page only after success
      navigate("/profile"); // Navigate after user state is updated
    } catch (error) {
      console.error("Login error:", error);
      let errorMessage = "Invalid email or password. Please try again.";

      if (error.message) {
        errorMessage = error.message;
      } else if (error.response && error.response.message) {
        errorMessage = error.response.message;
      }

      toast.error(errorMessage);
      setUser(null); // Clear user on error
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
    console.log("signInGoogle: Initiating OAuth with Google.");
    try {
      await account.createOAuth2Session(
        "google",
        "http://localhost:5173/profile", // Your success URL
        "http://localhost:5173/login" // Your failure URL
      );
      // Browser redirects, so code here might not run if successful.
      console.log(
        "signInGoogle: createOAuth2Session call completed (browser should be redirecting)."
      );
    } catch (error) {
      console.error("signInGoogle: Error during OAuth initiation:", error);
      toast.error(error.message || "Google sign-in failed to start.");
      setLoading(false);
      if (window.location.pathname !== "/login") {
        navigate("/login");
      }
    }
    // No setLoading(false) here if successful, checkUser handles it on redirect.
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
