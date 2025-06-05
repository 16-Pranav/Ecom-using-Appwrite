import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { CartContext } from "../context/CartContext";

const CartPage = () => {
  const {
    cart = [],
    totalAmount = 0,
    totalItems = 0,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
  } = useContext(CartContext) || {};

  // Calculate delivery fee - free if order is above Rs. 250
  const DELIVERY_FEE = 5;
  const FREE_DELIVERY_THRESHOLD = 250;
  const deliveryFee = totalAmount >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const finalTotal = totalAmount + deliveryFee;

  // Show loading if cart context is not yet available
  if (!cart) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto p-4 sm:p-6 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lime-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading cart...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />{" "}
      <div className="container mx-auto p-4 sm:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Shopping Cart Section */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-4 sm:mb-6 px-2 sm:px-4 mt-3">
              {" "}
              <h1 className="text-xl sm:text-2xl font-bold text-gray-600 py-2">
                Shopping Cart
              </h1>
              <span className="text-gray-600 px-2 sm:px-4 text-lg sm:text-xl items-center font-bold">
                {totalItems} Items
              </span>
            </div>{" "}
            <hr className="px-2 sm:px-4 py-2 sm:py-4 text-gray-400 border-t-3" />{" "}
            <div className="space-y-4 sm:space-y-6 px-2 sm:px-6 md:px-10">
              {cart.length === 0 ? (
                <div className="text-center text-gray-600">
                  <h1>No items in Cart</h1>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.$id}
                    className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 border-b pb-4"
                  >
                    <img
                      src={item.imageUrl || item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-gray-600">
                        {item.category || item.platform}
                      </p>
                      <button
                        onClick={() => removeItem(item.$id)}
                        className="text-red-500 mt-2 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                      <button
                        onClick={() => decreaseQuantity(item.$id)}
                        className="text-gray-500 text-xl hover:text-gray-700"
                      >
                        -
                      </button>
                      <span className="px-3 sm:px-4 py-1 border rounded">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => increaseQuantity(item)}
                        className="text-gray-500 text-xl hover:text-gray-700"
                      >
                        +
                      </button>
                    </div>
                    <div className="w-24 text-right">
                      <p className="font-semibold">
                        Rs. {(item.price * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-600">
                        Rs. {item.price.toFixed(2)} each
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
            <Link
              to="/"
              className="text-white bg-indigo-600 6 inline-block px-3 py-2 rounded-lg mt-10"
            >
              ← Continue Shopping
            </Link>
          </div>

          {/* Order Summary Section */}
          <div className="bg-gray-50 p-6 rounded-lg h-fit">
            <h2 className="text-2xl font-bold text-gray-600 py-4">
              Order Summary
            </h2>
            <hr className="px-4 py-4 text-gray-400 border-t-3" />{" "}
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>ITEMS ({totalItems})</span>
                <span>Rs. {totalAmount.toFixed(2)}</span>
              </div>
              <div className="mt-4">
                <p className="mb-2">SHIPPING</p>
                <div className="p-2 border rounded bg-white border-none">
                  {deliveryFee === 0 ? (
                    <span className="text-green-600">
                      FREE Delivery (Order above Rs. 250)
                    </span>
                  ) : (
                    <span>
                      Standard Delivery - Rs. {DELIVERY_FEE.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
              <div className="mt-4">
                <p className="mb-2">PROMO CODE</p>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Enter your code"
                    className="flex-1 p-2 border rounded border-none"
                  />
                  <button className="bg-red-400 text-white px-4 py-2 rounded">
                    APPLY
                  </button>
                </div>
              </div>{" "}
              <div className="mt-6 pt-4 border-t">
                <div className="flex justify-between font-semibold">
                  <span>TOTAL COST</span>
                  <span>Rs. {finalTotal.toFixed(2)}</span>
                </div>
                {deliveryFee === 0 && (
                  <p className="text-sm text-green-600 mt-1">
                    You saved Rs. {DELIVERY_FEE}! Free delivery applied.
                  </p>
                )}
              </div>
              <Link to="/checkout" className="w-full block">
                <button className="w-full bg-lime-600 text-white py-3 rounded mt-4">
                  CHECKOUT
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
