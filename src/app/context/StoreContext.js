"use client";
import React, { createContext, useContext, useState } from "react";

// Create Context
const StoreContext = createContext();

// Context Provider
export function StoreProvider({ children }) {
  const [likedItems, setLikedItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  // Toggle Like Item
  function toggleLike(item) {
    setLikedItems((prev) =>
      prev.some((i) => i.id === item.id)
        ? prev.filter((i) => i.id !== item.id) // Remove if already liked
        : [...prev, item] // Add if not liked
    );
  }

  // Add to Cart
  function addToCart(item) {
    setCartItems((prev) =>
      prev.some((i) => i.id === item.id)
        ? prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i))
        : [...prev, { ...item, quantity: 1 }]
    );
  }

  return (
    <StoreContext.Provider value={{ likedItems, cartItems, toggleLike, addToCart }}>
      {children}
    </StoreContext.Provider>
  );
}

// Custom Hook for using context
export function useStore() {
  return useContext(StoreContext);
}
