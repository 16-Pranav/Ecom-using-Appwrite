import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaCheck, FaLock, FaCreditCard, FaPaypal } from "react-icons/fa";
import { CartContext } from "../context/CartContext";
import { assets } from "../assets/assets";
import db from "../config/databases";
import { AuthContext } from "../context/AuthContext";

const CheckoutPage = () => {
  const navigate = useNavigate();

  // useStates Hooks
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [userData, setUserData] = useState(null);
  const [addressData, setAddressData] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddressModal, setShowAddressModal] = useState(false);

  // Default payment method // Get cart data from context
  const {
    cart = [],
    totalAmount = 0,
    totalItems = 0,
    clearCart,
  } = useContext(CartContext) || {};

  // Get user data from Auth context
  const { user } = useContext(AuthContext);

  const initDb = async () => {
    try {
      // Change the local variable name to avoid conflict with the user from AuthContext
      const userData = await db.users.get(user.$id);
      setUserData(userData);
      if (userData.address) {
        setAddressData(userData.address);
      }
    } catch (error) {
      console.error("Error initializing database:", error);
    }
  };

  // Calculate delivery fee - free if order is above Rs. 250
  const DELIVERY_FEE = 5;
  const FREE_DELIVERY_THRESHOLD = 250;
  const deliveryFee = totalAmount >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const discount = 0; // You can implement discount logic here
  const serviceFee = 0; // You can implement service fee logic here
  const finalTotal = totalAmount + deliveryFee + discount + serviceFee;

  // Redirect to cart if no items
  useEffect(() => {
    if (cart && cart.length === 0 && !paymentSuccess) {
      navigate("/cart");
    }
  }, [cart, navigate, paymentSuccess]);

  // Initialize database and fetch user data
  useEffect(() => {
    if (user?.$id) {
      // Add authLoading check
      initDb();
    }
  }, [user.$id]);

  // Show loading if cart context is not yet available
  if (!cart) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 py-4 sm:py-8 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lime-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }
  // Handle payment submission
  const handlePayment = (e) => {
    e.preventDefault();

    // Log payment details
    console.log("Payment Method:", paymentMethod);
    console.log("Selected Address:", selectedAddress);
    console.log("Total Amount:", finalTotal.toFixed(2));
    console.log("Cart Items:", cart);
    console.log("User Data:", userData);

    // Save order to database
    const orderData = {
      user: user.$id,
      total_items: totalItems,
      items: cart.map((item) =>
        JSON.stringify({
          id: item.$id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          imageUrl: item.imageUrl || item.image,
        })
      ), // Array of strings, not JSON.stringify of the whole array
      amount: finalTotal,
      payment: paymentMethod,
      address: JSON.stringify(selectedAddress),
      status: "Pending",
      date: new Date().toISOString(),
    };

    db.orders.create(orderData);

    // Set payment success state
    setPaymentSuccess(true);

    // Simulate payment processing
    setTimeout(() => {
      console.log("Payment processed successfully");
    }, 1000);

    // Clear cart after successful payment
    if (clearCart) {
      clearCart();
    }

    // Redirect to orders page after showing success animation
    setTimeout(() => {
      navigate("/profile", { state: { activeTab: "orders" } });
    }, 2000);
  };

  return (
    <>
      <Navbar />{" "}
      <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
        <div className="container mx-auto px-3 sm:px-4 max-w-6xl">
          {/* Payment successful Animation  */}
          {paymentSuccess ? (
            // Payment Success Animation
            <div className="flex flex-col items-center justify-center min-h-[50vh] px-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-green-100 flex items-center justify-center mb-5 animate-bounce">
                <FaCheck className="text-green-600 text-2xl sm:text-3xl" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 text-center">
                Payment Successful!
              </h1>
              <p className="text-gray-600 mb-8 text-center">
                Your order has been placed successfully.
              </p>
              <p className="text-gray-500 text-center">
                Redirecting to your orders...
              </p>
            </div>
          ) : (
            // Checkout Form
            <div className="flex flex-col lg:flex-row gap-5 sm:gap-8">
              {/* Left Column - Payment Details */}
              <div className="w-full lg:w-1/2 bg-white rounded-xl shadow-sm p-4 sm:p-6 md:p-8">
                <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
                  Checkout
                </h1>

                {/* Secure Payment Message */}
                <div className="bg-green-50 border border-green-100 rounded-md p-3 sm:p-4 mb-6 sm:mb-8 flex items-start">
                  <FaLock className="text-green-600 mt-1 mr-2 sm:mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-green-800 font-medium text-sm sm:text-base">
                      Your credit card is secure with us
                    </p>
                    <p className="text-xs sm:text-sm text-green-700">
                      We use encryption and other security measures to protect
                      your card information. We will never share your card
                      details with anyone else.
                    </p>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="mb-8">
                  <h2 className="text-lg font-semibold mb-4">Payment</h2>

                  {/* Select Payment Method */}
                  <select
                    name="Select Payment Method"
                    id=""
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md focus:ring-lime-500 focus:border-lime-500 text-sm sm:text-base mb-4"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <option value="Select">Select</option>
                    <option value="COD">Cash on Delivery</option>
                    <option value="creditCard">Credit/Debit Card</option>
                  </select>

                  {paymentMethod === "creditCard" ? (
                    <>
                      <div className="flex gap-3 mb-4">
                        <img
                          src={assets.visa}
                          alt="Visa"
                          className="h-8 object-contain"
                        />
                        <img
                          src={assets.mastercard}
                          alt="Mastercard"
                          className="h-8 object-contain"
                        />
                        <img
                          src={assets.discover}
                          alt="Discover"
                          className="h-8 object-contain"
                        />
                        <img
                          src={assets.paypal}
                          alt="PayPal"
                          className="h-8 object-contain"
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Name
                        </label>
                        <input
                          type="text"
                          placeholder="Lauren Patricia"
                          className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md focus:ring-lime-500 focus:border-lime-500 text-sm sm:text-base"
                          required
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Number
                        </label>
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md focus:ring-lime-500 focus:border-lime-500 text-sm sm:text-base"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Expired date
                          </label>
                          <div className="flex gap-2">
                            <select className="w-full px-2 sm:px-4 py-2 border border-gray-300 rounded-md focus:ring-lime-500 focus:border-lime-500 text-sm sm:text-base">
                              <option>MM</option>
                              {[...Array(12)].map((_, i) => (
                                <option key={i} value={i + 1}>
                                  {String(i + 1).padStart(2, "0")}
                                </option>
                              ))}
                            </select>
                            <select className="w-full px-2 sm:px-4 py-2 border border-gray-300 rounded-md focus:ring-lime-500 focus:border-lime-500 text-sm sm:text-base">
                              <option>YY</option>
                              {[...Array(10)].map((_, i) => (
                                <option
                                  key={i}
                                  value={i + new Date().getFullYear() - 2000}
                                >
                                  {i + new Date().getFullYear() - 2000}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            CVV/CVC
                          </label>
                          <input
                            type="text"
                            placeholder="123"
                            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md focus:ring-lime-500 focus:border-lime-500 text-sm sm:text-base"
                            maxLength={3}
                            required
                          />
                        </div>
                      </div>
                    </>
                  ) : paymentMethod === "COD" ? (
                    <div className="flex items-center gap-2 mb-4">
                      <FaCreditCard className="text-gray-600 text-xl" />
                      <span className="text-sm sm:text-base">
                        Cash on Delivery
                      </span>
                    </div>
                  ) : null}

                  {/* Billing Address */}
                  <div className="mb-6 sm:mb-8">
                    <div className="flex justify-between items-center mb-3 sm:mb-4">
                      <h2 className="text-base sm:text-lg font-semibold">
                        Billing Address
                      </h2>
                      <button
                        type="button"
                        onClick={() => setShowAddressModal(true)}
                        className="text-lime-600 text-xs sm:text-sm hover:underline"
                      >
                        Change
                      </button>
                    </div>
                    <div className="bg-gray-50 p-3 sm:p-4 rounded-md">
                      {selectedAddress ? (
                        <>
                          <p className="font-medium text-sm sm:text-base">
                            {selectedAddress.name}
                          </p>
                          <p className="text-gray-600 text-sm sm:text-base">
                            {selectedAddress.address}
                          </p>
                          <p className="text-gray-600 text-sm sm:text-base">
                            {selectedAddress.city}, {selectedAddress.state}
                          </p>
                          <p className="text-gray-600 text-sm sm:text-base">
                            {selectedAddress.pincode}
                          </p>
                        </>
                      ) : (
                        <p className="text-gray-500 text-sm sm:text-base">
                          No address selected
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Address Selection Modal */}
                  {showAddressModal && (
                    <div className="fixed inset-0 bg-blend-color flex items-center justify-center z-50 p-10">
                      <div className="bg-white rounded-xl max-w-md w-full max-h-[70vh] overflow-y-auto">
                        <div className="p-4 sm:p-6">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">
                              Select Address
                            </h3>
                            <button
                              onClick={() => setShowAddressModal(false)}
                              className="text-gray-500 hover:text-gray-700"
                            >
                              ✕
                            </button>
                          </div>

                          {addressData && addressData.length > 0 ? (
                            <div className="space-y-3">
                              {addressData.map((address, index) => (
                                <div
                                  key={index}
                                  onClick={() => {
                                    setSelectedAddress(address);
                                    setShowAddressModal(false);
                                  }}
                                  className={`p-3 border rounded-md cursor-pointer transition-colors ${
                                    selectedAddress === address
                                      ? "border-lime-500 bg-lime-50"
                                      : "border-gray-200 hover:border-gray-300"
                                  }`}
                                >
                                  <p className="font-medium text-sm">
                                    {address.name}
                                  </p>
                                  <p className="text-gray-600 text-sm">
                                    {address.address}
                                  </p>
                                  <p className="text-gray-600 text-sm">
                                    {address.city}, {address.state}{" "}
                                    {address.pincode}
                                  </p>
                                  <p className="text-gray-600 text-sm"></p>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-gray-500 text-center py-4">
                              No addresses found. Please add an address in your
                              profile.
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Pay Now Button */}
                  <form onSubmit={handlePayment}>
                    <div className="mt-6 sm:mt-8">
                      <button
                        type="submit"
                        className="w-full bg-lime-600 hover:bg-lime-700 text-white py-2 sm:py-3 px-4 rounded-lg font-medium transition duration-200 text-sm sm:text-base cursor-pointer"
                      >
                        Pay Now
                      </button>
                    </div>
                  </form>
                </div>
              </div>{" "}
              {/* Right Column - Order Summary */}
              <div className="w-full lg:w-1/2">
                <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 md:p-8">
                  <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
                    Order Details
                  </h2>{" "}
                  {/* Products List */}
                  <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                    {cart.map((item) => (
                      <div
                        key={item.$id}
                        className="flex items-center justify-between pb-3 sm:pb-4 border-b"
                      >
                        <div className="flex items-center">
                          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-md overflow-hidden mr-3 sm:mr-4 flex-shrink-0">
                            <img
                              src={item.imageUrl || item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium text-sm sm:text-base line-clamp-1">
                              {item.name}
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-500">
                              Qty: {item.quantity}
                            </p>
                          </div>
                        </div>
                        <p className="font-medium text-sm sm:text-base ml-2 flex-shrink-0">
                          Rs. {(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                  {/* Order Summary */}
                  <div>
                    <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
                      Order Summary
                    </h2>{" "}
                    <div className="space-y-2 sm:space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600 text-sm sm:text-base">
                          Subtotal ({totalItems} items)
                        </span>
                        <span className="text-sm sm:text-base">
                          Rs. {totalAmount.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 text-sm sm:text-base">
                          Delivery
                        </span>
                        <span className="text-sm sm:text-base">
                          {deliveryFee === 0 ? (
                            <span className="text-green-600">FREE</span>
                          ) : (
                            `Rs. ${deliveryFee.toFixed(2)}`
                          )}
                        </span>
                      </div>
                      {discount !== 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-600 text-sm sm:text-base">
                            Discount
                          </span>
                          <span className="text-green-600 text-sm sm:text-base">
                            -Rs. {Math.abs(discount).toFixed(2)}
                          </span>
                        </div>
                      )}
                      {serviceFee !== 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-600 text-sm sm:text-base">
                            Service fee
                          </span>
                          <span className="text-sm sm:text-base">
                            Rs. {serviceFee.toFixed(2)}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between pt-3 sm:pt-4 border-t mt-3 sm:mt-4 font-semibold text-base sm:text-lg">
                        <span>Total</span>
                        <span>Rs. {finalTotal.toFixed(2)}</span>
                      </div>
                      {deliveryFee === 0 &&
                        totalAmount >= FREE_DELIVERY_THRESHOLD && (
                          <p className="text-sm text-green-600 mt-2">
                            🎉 You saved Rs. {DELIVERY_FEE}! Free delivery
                            applied.
                          </p>
                        )}
                    </div>
                    {/* Cancel Button */}
                    <div className="mt-6 sm:mt-8">
                      <button
                        type="button"
                        onClick={() => navigate("/cart")}
                        className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 sm:py-3 px-4 rounded-lg font-medium transition duration-200 text-sm sm:text-base cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CheckoutPage;
