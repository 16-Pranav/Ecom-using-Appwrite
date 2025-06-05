import React, { createContext, useState, useEffect } from "react";
import { getEffectivePrice } from "../utils/priceUtils";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  // Initialize cart from localStorage or empty array
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error(
        "[CartContext] Error loading cart from localStorage:",
        error
      );
      return [];
    }
  });
  const [quantity, setQuantity] = useState(0); // Total quantity of all items in cart
  const [total, setTotal] = useState(0); // Total price of all items in cart
  const [totalItems, setTotalItems] = useState(0); // Total count of all items in cart (sum of quantities)

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      console.error("[CartContext] Error saving cart to localStorage:", error);
    }
  }, [cart]);

  // Removed unused states like amt, loading for clarity unless you need them  // Function to add product to cart or increase its quantity
  const increaseQuantity = (product) => {
    setCart((currentCart) => {
      const existingItemIndex = currentCart.findIndex(
        (item) => item.$id === product.$id
      );

      if (existingItemIndex > -1) {
        // If item exists, increase its quantity
        const updatedCart = currentCart.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: (item.quantity || 0) + 1 }
            : item
        );
        return updatedCart;
      } else {
        // If item doesn't exist, add it to cart with quantity 1
        const newCart = [...currentCart, { ...product, quantity: 1 }];
        return newCart;
      }
    });
  };
  // Function to decrease product quantity or remove from cart
  const decreaseQuantity = (productId) => {
    setCart((currentCart) => {
      const existingItemIndex = currentCart.findIndex(
        (item) => item.$id === productId
      );

      if (existingItemIndex > -1) {
        const itemToDecrease = currentCart[existingItemIndex];
        if (itemToDecrease.quantity === 1) {
          // Remove item from cart if quantity is 1
          const updatedCart = currentCart.filter(
            (item, index) => index !== existingItemIndex
          );
          return updatedCart;
        } else {
          // Decrease quantity if it's more than 1
          const updatedCart = currentCart.map((item, index) =>
            index === existingItemIndex
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );
          return updatedCart;
        }
      }
      return currentCart;
    });
  }; // Function to remove item completely from cart
  const removeItem = (productId) => {
    setCart((currentCart) => {
      const updatedCart = currentCart.filter((item) => item.$id !== productId);
      return updatedCart;
    });
  };
  // Function to clear entire cart
  const clearCart = () => {
    setCart([]);
  };
  // Get quantity of a specific item in cart
  const getItemQuantity = (productId) => {
    const existingItem = cart.find((item) => item.$id === productId);
    const qty = existingItem ? existingItem.quantity : 0;
    return qty;
  }; // Calculate total quantity, amount, and total items when cart changes
  useEffect(() => {
    let totalQty = 0;
    let currentTotalAmt = 0;

    for (const item of cart) {
      totalQty += item.quantity;
      const effectivePrice = getEffectivePrice(item);
      currentTotalAmt += effectivePrice * item.quantity;
    }

    setQuantity(totalQty);
    setTotal(currentTotalAmt);
    setTotalItems(totalQty);
  }, [cart]);
  const value = {
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearCart,
    getItemQuantity,
    cart,
    totalQuantity: quantity, // Total quantity of all items (same as totalItems)
    totalAmount: total, // Total price of all items
    totalItems, // Total count of all items in cart (for cart badge)
    // Add other states/functions if you put them back
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
