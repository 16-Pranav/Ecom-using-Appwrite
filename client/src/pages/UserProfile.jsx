import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  MdOutlineLogout,
  MdPersonOutline,
  MdLockOutline,
  MdPhone,
  MdEdit,
  MdEmail,
  MdAdd,
  MdDelete,
} from "react-icons/md";
import {
  FaRegUser,
  FaShoppingBag,
  FaMapMarkerAlt,
  FaHeadset,
  FaBox,
  FaTruck,
  FaCheck,
  FaInfoCircle,
  FaHistory,
} from "react-icons/fa";
import Footer from "../components/Footer";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { account } from "../config/appwrite";
// Import the database helper instead of direct imports
import db from "../config/databases";

const UserProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Context for authentication
  const {
    logout,
    user,
    checkUser,
    loading: authLoading,
  } = useContext(AuthContext);

  /*
  Note: variable "user" is imported from AuthContext. 
  It contains user details like name, email, phone, etc.

  But: variable "userDbData" is the user data fetched from the database.
  */

  // UseState Hooks for all
  const [activeTab, setActiveTab] = useState("profile");
  const [profileImage, setProfileImage] = useState(
    "/src/assets/profile-logo.png"
  );
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    currentPassword: "",
  });
  // Changed from static array to state that will be populated from database
  const [addressData, setAddressData] = useState([]);
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(false);
  const [userDbData, setUserDbData] = useState(null); // Store user data from database

  // Orders data state
  const [orders, setOrders] = useState([]); // Initialize orders data state

  // Add state for address form
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressForm, setAddressForm] = useState({
    type: "Home",
    name: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
    phone: "",
    default: false,
  });
  const [orderActiveTab, setOrderActiveTab] = useState("allOrders"); // Add this new state

  // Initialize formData when user data is available or changes
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        currentPassword: "",
      });
    }
  }, [user]);

  // Initialize user database data when user is available
  useEffect(() => {
    if (user?.$id && !authLoading) {
      // Add authLoading check
      initUserDb();
    }
  }, [user, authLoading]); // Add authLoading as dependency

  // Helper function to get user data from database
  const initUserDb = async () => {
    if (!user?.$id || authLoading) return;

    setIsLoadingAddresses(true);
    try {
      const userDoc = await db.users.get(user.$id);
      setUserDbData(userDoc);

      if (userDoc.address && Array.isArray(userDoc.address)) {
        setAddressData(userDoc.address);
      } else {
        setAddressData([]);
      }

      if (userDoc.orders) {
        setOrders(userDoc.orders);
      }
    } catch (error) {      console.error("Error fetching user data:", error);

      if (error.code === 404) {
        // User document doesn't exist yet - your function will create it
        setAddressData([]);
      } else {
        toast.error("Failed to load user data");
      }
    } finally {
      setIsLoadingAddresses(false);
    }
  };

  // Handle date function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    return date.toLocaleDateString("en-IN", options);
  };

  // Function to update addresses in database
  const updateAddressesInDatabase = async (newAddresses) => {
    if (!user?.$id) return false;

    try {
      // Only remove 'id' field before saving (keep 'default' since it's now in your schema)
      const cleanAddresses = newAddresses.map((addr) => {
        const { id, ...cleanAddr } = addr; // Only destructure 'id', keep 'default'
        return cleanAddr;
      });

      await db.users.update(user.$id, {
        address: cleanAddresses,
      });
      return true;
    } catch (error) {
      console.error("Error updating addresses:", error);

      if (error.code === 404) {
        toast.error(
          "User profile not found. Please try logging out and back in."
        );
        return false;
      }

      toast.error("Failed to update addresses");
      return false;
    }
  };

  // Function to add new address
  const handleAddAddress = async (newAddress) => {
    const updatedAddresses = [
      ...addressData,
      { ...newAddress, id: Date.now() },
    ];
    const success = await updateAddressesInDatabase(updatedAddresses);
    if (success) {
      setAddressData(updatedAddresses);
      toast.success("Address added successfully");
    }
  };

  // Function to delete address
  const handleDeleteAddress = async (addressId) => {
    const updatedAddresses = addressData.filter(
      (addr) => addr.id !== addressId
    );

    const success = await updateAddressesInDatabase(updatedAddresses);
    if (success) {
      setAddressData(updatedAddresses);
      toast.success("Address deleted successfully");
    }
  };

  // Function to set default address
  const handleSetDefaultAddress = async (addressId) => {
    const updatedAddresses = addressData.map((addr) => ({
      ...addr,
      default: addr.id === addressId,
    }));
    const success = await updateAddressesInDatabase(updatedAddresses);
    if (success) {
      setAddressData(updatedAddresses);
      toast.success("Default address updated");
    }
  };

  const handlelogout = () => {
    logout();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        currentPassword: "",
      });
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        currentPassword: "",
      });
    }
  };

  const handleSaveClick = async () => {
    if (!user) {
      toast.error("User data not found.");
      return;
    }
    setIsLoading(true);
    let changesMade = false;

    try {
      // Update Name
      if (formData.name !== user.name) {
        await account.updateName(formData.name);
        toast.success("Name updated successfully!");
        changesMade = true;
      }

      // Update Email
      if (formData.email !== user.email) {
        if (!formData.currentPassword) {
          toast.error("Current password is required to update email.");
          setIsLoading(false);
          return;
        }
        await account.updateEmail(formData.email, formData.currentPassword);
        toast.success(
          "Email updated successfully! Please verify your new email if required."
        );
        changesMade = true;
      }

      // Update Phone
      if (formData.phone !== user.phone) {
        if (!formData.currentPassword) {
          toast.error("Current password is required to update phone number.");
          setIsLoading(false);
          return;
        }
        await account.updatePhone(formData.phone, formData.currentPassword);
        toast.success(
          "Phone number updated successfully! Please verify your new phone if required."
        );
        changesMade = true;
      }

      if (changesMade) {
        await checkUser(); // Refresh user data in AuthContext
      } else {
        toast.dismiss("No changes were made.");
      }
      setIsEditing(false);
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error(
        error.message || "Failed to update profile. Please try again."
      );
    } finally {
      setIsLoading(false);
      setFormData((prev) => ({ ...prev, currentPassword: "" }));
    }
  };

  // Handle address form input changes
  const handleAddressInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddressForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle address form submission
  const handleAddressSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (
      !addressForm.name ||
      !addressForm.address ||
      !addressForm.city ||
      !addressForm.pincode ||
      !addressForm.phone
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    // If this is set as default, remove default from other addresses
    let updatedAddresses = [...addressData];
    if (addressForm.default) {
      updatedAddresses = updatedAddresses.map((addr) => ({
        ...addr,
        default: false,
      }));
    }

    // Add new address with proper structure
    const newAddress = {
      ...addressForm,
      id: Date.now(), // Generate unique ID
      default: addressForm.default || addressData.length === 0, // First address is default
    };

    updatedAddresses.push(newAddress);

    const success = await updateAddressesInDatabase(updatedAddresses);
    if (success) {
      setAddressData(updatedAddresses);
      setShowAddressForm(false);
      setAddressForm({
        type: "Home",
        name: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        country: "India",
        phone: "",
        default: false,
      });
      toast.success("Address added successfully");
    }
  };

  // Close address form
  const handleCloseAddressForm = () => {
    setShowAddressForm(false);
    setAddressForm({
      type: "Home",
      name: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      country: "India",
      phone: "",
      default: false,
    });
  };

  // Add better loading state handling
  if (authLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  // Add check for unauthenticated users
  if (!authLoading && !user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-gray-500">Please log in to view your profile.</div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 h-auto py-4 sm:py-8">
        <div className="container mx-auto px-3 sm:px-4 max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-8">
            {/* Sidebar - keep existing code */}
            <div className="w-full lg:w-64 bg-white rounded-xl shadow-sm p-4 sm:p-6">
              {/* Tab buttons for mobile - Horizontal scroll */}
              <div className="lg:hidden flex overflow-x-auto pb-2 mb-2 scrollbar-hide space-x-4">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`px-4 py-2 whitespace-nowrap rounded-lg flex items-center ${
                    activeTab === "profile"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  <FaRegUser className="mr-2" /> Profile
                </button>
                <button
                  onClick={() => setActiveTab("orders")}
                  className={`px-4 py-2 whitespace-nowrap rounded-lg flex items-center ${
                    activeTab === "orders"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  <FaShoppingBag className="mr-2" /> Orders
                </button>
                <button
                  onClick={() => setActiveTab("address")}
                  className={`px-4 py-2 whitespace-nowrap rounded-lg flex items-center ${
                    activeTab === "address"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  <FaMapMarkerAlt className="mr-2" /> Address
                </button>
                <button
                  onClick={() => setActiveTab("support")}
                  className={`px-4 py-2 whitespace-nowrap rounded-lg flex items-center ${
                    activeTab === "support"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  <FaHeadset className="mr-2" /> Support
                </button>
              </div>

              {/* Desktop Sidebar */}
              <div className="hidden lg:block space-y-1">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`py-4 font-medium w-full text-left cursor-pointer flex items-center ${
                    activeTab === "profile" ? "text-blue-600" : "text-gray-600"
                  }`}
                >
                  <FaRegUser className="mr-3" /> User Profile
                </button>
                <button
                  onClick={() => setActiveTab("orders")}
                  className={`py-4 font-medium w-full text-left cursor-pointer flex items-center ${
                    activeTab === "orders" ? "text-blue-600" : "text-gray-600"
                  }`}
                >
                  <FaShoppingBag className="mr-3" /> Orders
                </button>
                <button
                  onClick={() => setActiveTab("address")}
                  className={`py-4 font-medium w-full text-left cursor-pointer flex items-center ${
                    activeTab === "address" ? "text-blue-600" : "text-gray-600"
                  }`}
                >
                  <FaMapMarkerAlt className="mr-3" /> Address
                </button>
                <button
                  onClick={() => setActiveTab("support")}
                  className={`py-4 font-medium w-full text-left cursor-pointer flex items-center ${
                    activeTab === "support" ? "text-blue-600" : "text-gray-600"
                  }`}
                >
                  <FaHeadset className="mr-3" /> Customer Support
                </button>
              </div>

              <div className="mt-4 lg:mt-8 pt-3 lg:pt-4 border-t border-gray-200">
                <button
                  className="flex items-center text-red-500 font-medium cursor-pointer text-sm sm:text-base"
                  onClick={handlelogout}
                >
                  <MdOutlineLogout className="text-lg sm:text-xl mr-2 cursor-pointer" />
                  Sign out
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 bg-white rounded-xl shadow-sm p-4 sm:p-8">
              {/* Profile Tab - keep existing code */}
              {activeTab === "profile" && (
                <>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 sm:mb-6">
                    <h1 className="text-xl sm:text-2xl font-semibold">
                      User profile
                    </h1>
                    {!isEditing && (
                      <button
                        onClick={handleEditClick}
                        className="px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-500 text-white rounded-lg text-xs sm:text-sm hover:bg-blue-600 flex items-center"
                        disabled={isLoading}
                      >
                        <MdEdit className="mr-1.5 sm:mr-2" /> Edit Profile
                      </button>
                    )}
                  </div>
                  <p className="text-gray-500 text-sm sm:text-base mb-6 sm:mb-8">
                    Manage your details, view your tier status and change your
                    password.
                  </p>

                  {isLoading && !authLoading ? ( // Show specific loading for profile update
                    <div className="flex justify-center items-center h-48 sm:h-64">
                      <p>Updating profile...</p> {/* Or a spinner */}
                    </div>
                  ) : (
                    <>
                      {/* Profile Information */}
                      <div className="mb-8 sm:mb-12">
                        <h2 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">
                          General Information
                        </h2>
                        <div className="flex flex-col md:flex-row gap-6 sm:gap-8 items-center md:items-start">
                          {/* Profile Image */}
                          <div className="flex flex-col items-center">
                            <div className="relative">
                              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-blue-100">
                                <img
                                  src={profileImage}
                                  alt="Profile"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="absolute bottom-0 right-0">
                                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-green-500 border-2 border-white"></div>
                              </div>
                            </div>
                            {isEditing ? (
                              <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Full Name"
                                className="mt-2 text-sm font-medium p-2 border rounded-md w-full text-center"
                              />
                            ) : (
                              <p className="mt-2 text-sm font-medium">
                                {user?.name || "Not set"}
                              </p>
                            )}
                            {/* Phone display under profile image - consider if this is redundant with security section */}
                            {!isEditing && (
                              <p className="text-xs text-gray-500">
                                {user?.phone || "Phone not set"}
                              </p>
                            )}
                          </div>

                          {/* Profile Fields (Simplified as Name is with image now) */}
                          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full">
                            {isEditing ? (
                              <div className="md:col-span-2">
                                <label className="block text-sm text-gray-500 mb-1">
                                  Name
                                </label>
                                <input
                                  type="text"
                                  name="name"
                                  value={formData.name}
                                  onChange={handleInputChange}
                                  className="w-full p-2 border rounded-md"
                                />
                              </div>
                            ) : (
                              <div>
                                <label className="block text-sm text-gray-500 mb-1">
                                  Name
                                </label>
                                <p className="font-medium">
                                  {user?.name || "Not set"}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>{" "}
                      {/* Security Section */}
                      <div>
                        <h2 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">
                          Security
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                          <div>
                            <label className="block text-xs sm:text-sm text-gray-500 mb-1">
                              Email
                            </label>
                            {isEditing ? (
                              <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-md text-sm sm:text-base"
                              />
                            ) : (
                              <div className="flex items-center">
                                <MdEmail className="text-gray-400 mr-2 flex-shrink-0" />
                                <p className="text-sm sm:text-base break-all">
                                  {user?.email || "Not set"}
                                </p>
                              </div>
                            )}
                          </div>
                          <div>
                            <label className="block text-xs sm:text-sm text-gray-500 mb-1">
                              Phone number
                            </label>
                            {isEditing ? (
                              <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder="+1234567890"
                                className="w-full p-2 border rounded-md text-sm sm:text-base"
                              />
                            ) : (
                              <div className="flex items-center">
                                <MdPhone className="text-gray-400 mr-2 flex-shrink-0" />
                                <p className="text-sm sm:text-base">
                                  {user?.phone || "Not set"}
                                </p>
                              </div>
                            )}
                          </div>
                          {isEditing &&
                            (formData.email !== user?.email ||
                              formData.phone !== user?.phone) && (
                              <div className="md:col-span-2">
                                <label className="block text-xs sm:text-sm text-gray-500 mb-1">
                                  Current Password (to update email/phone)
                                </label>
                                <input
                                  type="password"
                                  name="currentPassword"
                                  value={formData.currentPassword}
                                  onChange={handleInputChange}
                                  className="w-full p-2 border rounded-md text-sm sm:text-base"
                                  placeholder="Enter current password"
                                />
                              </div>
                            )}
                          {!isEditing && (
                            <div>
                              <label className="block text-xs sm:text-sm text-gray-500 mb-1">
                                Password
                              </label>
                              <div className="flex items-center">
                                <MdLockOutline className="text-gray-400 mr-2 flex-shrink-0" />
                                <p className="text-sm sm:text-base">••••••</p>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="mt-4 sm:mt-6 flex flex-wrap gap-3 sm:gap-4">
                          {isEditing ? (
                            <>
                              <button
                                onClick={handleSaveClick}
                                className="px-4 sm:px-5 py-1.5 sm:py-2 bg-green-500 text-white rounded-lg text-xs sm:text-sm hover:bg-green-600"
                                disabled={isLoading}
                              >
                                {isLoading ? "Saving..." : "Save Changes"}
                              </button>
                              <button
                                onClick={handleCancelClick}
                                className="px-4 sm:px-5 py-1.5 sm:py-2 border border-gray-300 rounded-lg text-xs sm:text-sm hover:bg-gray-50"
                                disabled={isLoading}
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <>
                              <button className="px-4 sm:px-5 py-1.5 sm:py-2 border border-gray-300 rounded-lg text-xs sm:text-sm hover:bg-gray-50">
                                Change password
                              </button>
                              {/* The "Edit Profile" button is now at the top of the profile section */}
                            </>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}{" "}
              {/* Orders Tab */}
              {activeTab === "orders" && (
                <>
                  <h1 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
                    My Orders
                  </h1>
                  <p className="text-gray-500 text-sm sm:text-base mb-6 sm:mb-8">
                    View and track your order history.
                  </p>

                  <div className="mb-5 sm:mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
                    <div className="flex flex-wrap gap-2 w-full sm:w-auto overflow-x-auto pb-1">
                      <button
                        className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm whitespace-nowrap ${
                          orderActiveTab === "allOrders"
                            ? "bg-blue-500 text-white"
                            : "border border-gray-300"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          setOrderActiveTab("allOrders");
                        }}
                      >
                        All Orders
                      </button>
                      <button
                        className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm whitespace-nowrap ${
                          orderActiveTab === "processing"
                            ? "bg-blue-500 text-white"
                            : "border border-gray-300"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          setOrderActiveTab("processing");
                        }}
                      >
                        Processing
                      </button>
                      <button
                        className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm whitespace-nowrap ${
                          orderActiveTab === "delivered"
                            ? "bg-blue-500 text-white"
                            : "border border-gray-300"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          setOrderActiveTab("delivered");
                        }}
                      >
                        Delivered
                      </button>
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search orders..."
                        className="px-4 py-2 border border-gray-300 rounded-lg text-sm w-64"
                      />
                    </div>
                  </div>

                  {/* Orders List */}
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      {/* Orders Table Headings */}
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Order ID
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Date
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Items
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Total
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Status
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Items Ordered
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Payment Method
                          </th>
                        </tr>
                      </thead>

                      {/* Orders table Contents */}
                      <tbody className="bg-white divide-y divide-gray-200">
                        {/* Update the conditionals to use orderActiveTab */}
                        {orderActiveTab === "allOrders" && (
                          <>
                            {orders.map((order) => (
                              <tr key={order.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  {order.$id}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {formatDate(order.date)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {order.total_items} items
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {order.amount}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span
                                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                      order.status === "Delivered"
                                        ? "bg-green-100 text-green-800"
                                        : "bg-yellow-100 text-yellow-800"
                                    }`}
                                  >
                                    {order.status}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-medium">
                                  {order.items.map((itemString, index) => {
                                    try {
                                      const item = JSON.parse(itemString);
                                      return (
                                        <div
                                          key={item.id || index}
                                          className="mb-1"
                                        >
                                          {item.name}
                                        </div>
                                      );
                                    } catch (error) {
                                      console.error(
                                        "Error parsing item:",
                                        error
                                      );
                                      return (
                                        <div
                                          key={index}
                                          className="mb-1 text-red-500"
                                        >
                                          Invalid item data
                                        </div>
                                      );
                                    }
                                  })}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {order.payment}
                                </td>
                              </tr>
                            ))}
                          </>
                        )}
                        {orderActiveTab === "processing" && (
                          <>
                            {orders
                              .filter((order) => order.status === "Processing")
                              .map((order) => (
                                <tr key={order.id}>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {order.$id}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {formatDate(order.date)}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {order.total_items} items
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {order.amount}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                      Processing
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-medium">
                                    {order.items.map((itemString, index) => {
                                      try {
                                        const item = JSON.parse(itemString);
                                        return (
                                          <div
                                            key={item.id || index}
                                            className="mb-1"
                                          >
                                            {item.name}
                                          </div>
                                        );
                                      } catch (error) {
                                        console.error(
                                          "Error parsing item:",
                                          error
                                        );
                                        return (
                                          <div
                                            key={index}
                                            className="mb-1 text-red-500"
                                          >
                                            Invalid item data
                                          </div>
                                        );
                                      }
                                    })}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {order.payment}
                                  </td>
                                </tr>
                              ))}
                          </>
                        )}
                        {orderActiveTab === "delivered" && (
                          <>
                            {orders
                              .filter((order) => order.status === "Delivered")
                              .map((order) => (
                                <tr key={order.id}>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {order.$id}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {formatDate(order.date)}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {order.total_items} items
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {order.amount}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <span
                                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        order.status === "Delivered"
                                          ? "bg-green-100 text-green-800"
                                          : "bg-yellow-100 text-yellow-800"
                                      }`}
                                    >
                                      {order.status}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-medium">
                                    {order.items.map((itemString, index) => {
                                      try {
                                        const item = JSON.parse(itemString);
                                        return (
                                          <div
                                            key={item.id || index}
                                            className="mb-1"
                                          >
                                            {item.name}
                                          </div>
                                        );
                                      } catch (error) {
                                        console.error(
                                          "Error parsing item:",
                                          error
                                        );
                                        return (
                                          <div
                                            key={index}
                                            className="mb-1 text-red-500"
                                          >
                                            Invalid item data
                                          </div>
                                        );
                                      }
                                    })}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {order.payment}
                                  </td>
                                </tr>
                              ))}
                          </>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {orders.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <p>No orders found.</p>
                      <p className="text-sm">
                        Your orders will appear here once you make a purchase.
                      </p>
                    </div>
                  )}
                </>
              )}
              {/* Address Tab - Updated with proper form */}
              {activeTab === "address" && (
                <>
                  <h1 className="text-2xl font-semibold mb-6">My Addresses</h1>
                  <p className="text-gray-500 mb-8">
                    Manage your delivery addresses.
                  </p>

                  {/* New Address add Button */}
                  <button
                    onClick={() => setShowAddressForm(true)}
                    className="mb-6 px-4 py-2 flex items-center gap-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    <MdAdd /> Add New Address
                  </button>

                  {/* Address Form Modal/Section */}
                  {showAddressForm && (
                    <div className="mb-8 p-6 border border-gray-200 rounded-lg bg-gray-50">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium">Add New Address</h3>
                        <button
                          onClick={handleCloseAddressForm}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          ✕
                        </button>
                      </div>

                      <form onSubmit={handleAddressSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Address Type *
                            </label>
                            <select
                              name="type"
                              value={addressForm.type}
                              onChange={handleAddressInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                              required
                            >
                              <option value="Home">Home</option>
                              <option value="Work">Work</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Full Name *
                            </label>
                            <input
                              type="text"
                              name="name"
                              value={addressForm.name}
                              onChange={handleAddressInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                              required
                            />
                          </div>

                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Street Address *
                            </label>
                            <textarea
                              name="address"
                              value={addressForm.address}
                              onChange={handleAddressInputChange}
                              rows="2"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              City *
                            </label>
                            <input
                              type="text"
                              name="city"
                              value={addressForm.city}
                              onChange={handleAddressInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              State
                            </label>
                            <input
                              type="text"
                              name="state"
                              value={addressForm.state}
                              onChange={handleAddressInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Postal Code *
                            </label>
                            <input
                              type="text"
                              name="pincode"
                              value={addressForm.pincode}
                              onChange={handleAddressInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Country
                            </label>
                            <input
                              type="text"
                              name="country"
                              value={addressForm.country}
                              onChange={handleAddressInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Phone Number *
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              value={addressForm.phone}
                              onChange={handleAddressInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                              required
                            />
                          </div>

                          <div className="md:col-span-2">
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                name="default"
                                checked={addressForm.default}
                                onChange={handleAddressInputChange}
                                className="mr-2"
                              />
                              <span className="text-sm text-gray-700">
                                Set as default address
                              </span>
                            </label>
                          </div>
                        </div>

                        <div className="flex gap-4 mt-6">
                          <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                          >
                            Save Address
                          </button>
                          <button
                            type="button"
                            onClick={handleCloseAddressForm}
                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  {isLoadingAddresses ? (
                    <div className="flex justify-center items-center h-32">
                      <div className="text-gray-500">Loading addresses...</div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {addressData.length === 0 ? (
                        <div className="col-span-full text-center py-8 text-gray-500">
                          No addresses found. Add your first address to get
                          started.
                        </div>
                      ) : (
                        addressData.map((address) => (
                          <div
                            key={address.id}
                            className="border border-gray-200 rounded-lg p-6 relative"
                          >
                            {address.default && (
                              <span className="absolute top-4 right-4 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-md">
                                Default
                              </span>
                            )}
                            <div className="flex justify-between">
                              <h3 className="text-lg font-medium">
                                {address.type}
                              </h3>
                            </div>
                            <div className="mt-4 space-y-2 text-gray-600">
                              <p className="font-medium">{address.name}</p>
                              <p>{address.address}</p>
                              <p>
                                {address.city}
                                {address.state && `, ${address.state}`}{" "}
                                {address.pincode}
                              </p>
                              <p>{address.country}</p>
                              <p>Phone: {address.phone}</p>
                            </div>
                            <div className="mt-4 flex gap-4">
                              <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteAddress(address.id)}
                                className="px-3 py-1 border border-red-300 text-red-500 rounded text-sm hover:bg-red-50"
                              >
                                Delete
                              </button>
                              {!address.default && (
                                <button
                                  onClick={() =>
                                    handleSetDefaultAddress(address.id)
                                  }
                                  className="px-3 py-1 border border-blue-300 text-blue-500 rounded text-sm hover:bg-blue-50 ml-auto"
                                >
                                  Set as Default
                                </button>
                              )}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </>
              )}
              {/* Customer Support Tab - keep existing code */}
              {activeTab === "support" && (
                <>
                  <h1 className="text-2xl font-semibold mb-6">
                    Customer Support
                  </h1>
                  <p className="text-gray-500 mb-8">
                    Get help with your orders or product inquiries.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <div className="flex items-start">
                        <FaHeadset className="text-3xl text-blue-500 mt-1" />
                        <div className="ml-4">
                          <h3 className="text-lg font-medium mb-2">
                            Contact Support
                          </h3>
                          <p className="text-gray-600 mb-4">
                            Our customer service team is here to help.
                          </p>
                          <p className="font-medium mb-2">
                            Email: support@organicstore.com
                          </p>
                          <p className="font-medium mb-4">
                            Phone: +91 1234567890
                          </p>
                          <p className="text-sm text-gray-500">
                            Hours: Mon-Sat, 9 AM - 6 PM
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 p-6 rounded-lg">
                      <div className="flex items-start">
                        <FaHistory className="text-3xl text-green-500 mt-1" />
                        <div className="ml-4">
                          <h3 className="text-lg font-medium mb-2">
                            Recent Inquiries
                          </h3>
                          <p className="text-gray-600 mb-4">
                            View status of your recent support requests.
                          </p>
                          <div className="text-sm text-gray-700">
                            <p className="mb-1">No recent inquiries found.</p>
                            <p>Need help? Create a new support ticket below.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-medium mb-4">
                      Create Support Ticket
                    </h3>
                    <form>
                      <div className="grid grid-cols-1 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Subject
                          </label>
                          <input
                            type="text"
                            placeholder="Brief description of your issue"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Category
                          </label>
                          <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                            <option>Select a category</option>
                            <option>Order Issue</option>
                            <option>Product Inquiry</option>
                            <option>Return & Refund</option>
                            <option>Account Help</option>
                            <option>Other</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Message
                          </label>
                          <textarea
                            rows="4"
                            placeholder="Please describe your issue in detail"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          ></textarea>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Attachments (optional)
                          </label>
                          <div className="mt-1 flex items-center">
                            <button
                              type="button"
                              className="px-4 py-2 border border-gray-300 rounded-md text-sm"
                            >
                              Upload File
                            </button>
                            <span className="ml-2 text-xs text-gray-500">
                              Max file size: 5MB
                            </span>
                          </div>
                        </div>

                        <div>
                          <button
                            type="submit"
                            className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Submit Ticket
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserProfile;
