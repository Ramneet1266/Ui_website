
"use client";
import { createContext, useContext, useState } from "react";

const StoreContext = createContext();

export function StoreProvider({ children }) {
  const [likedItems, setLikedItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  // Toggle liked items (wishlist)
  const toggleLike = (product) => {
    setLikedItems((prev) =>
      prev.some((item) => item.id === product.id)
        ? prev.filter((item) => item.id !== product.id)
        : [...prev, product]
    );
  };
  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };
 
  // In your StoreContext provider
// const addToCart = (product) => {
//   setCartItems((prev) =>
//     prev.some((item) => item.id === product.id)
//       ? prev.filter((item) => item.id !== product.id) // Remove if exists
//       : [...prev, product] // Add if not exists
//   );
// };

// Remove the old addToCart and ensure you're exporting this new version

  return (
    <StoreContext.Provider value={{ likedItems, cartItems, toggleLike, addToCart }}>
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => useContext(StoreContext);