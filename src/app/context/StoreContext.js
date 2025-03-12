
"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "@/app/lib/firebase";
import { 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  deleteDoc, 
  getDocs, 
  updateDoc 
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const StoreContext = createContext();

export function StoreProvider({ children }) {
  const [user, setUser] = useState(null);
  const [likedItems, setLikedItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // New state


  const clearCart = async () => {
    if (!user) {
      console.error("User not authenticated");
      return;
    }
  
    const cartRef = collection(db, "Carts", user.uid, "products");
  
    try {
      const querySnapshot = await getDocs(cartRef);
      const deletePromises = querySnapshot.docs.map((doc) => deleteDoc(doc.ref));
      await Promise.all(deletePromises);
      setCartItems([]);
      console.log("Cart cleared successfully.");
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    const fetchWishlist = async () => {
      const wishlistRef = collection(db, "Users", user.uid, "wishlist");
      try {
        const querySnapshot = await getDocs(wishlistRef);
        const wishlistData = querySnapshot.docs.map((doc) => doc.data());
        setLikedItems(wishlistData);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchWishlist();
  }, [user]);

  useEffect(() => {
    if (!user) return;

    const fetchCart = async () => {
      const cartRef = collection(db, "Carts", user.uid, "products");
      try {
        const querySnapshot = await getDocs(cartRef);
        const cartData = querySnapshot.docs.map((doc) => doc.data());
        setCartItems(cartData);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, [user]);

  // const toggleLike = async (product) => {
  //   if (!user) {
  //     console.error("User not authenticated");
  //     return;
  //   }

  //   const productRef = doc(db, "Users", user.uid, "wishlist", product.id);

  //   setLikedItems((prev) =>
  //     prev.some((item) => item.id === product.id)
  //       ? prev.filter((item) => item.id !== product.id)
  //       : [...prev, product]
  //   );

  //   try {
  //     const docSnapshot = await getDoc(productRef);
  //     if (docSnapshot.exists()) {
  //       await deleteDoc(productRef);
  //     } else {
  //       await setDoc(productRef, product);
  //     }
  //   } catch (error) {
  //     console.error("Error updating wishlist:", error);
  //   }
  // };
 
  const toggleLike = async (product, storeId) => {
    if (!user) {
      console.error("User not authenticated");
      return;
    }
  
    if (!product || !product.id) {
      console.error("Invalid product data:", product);
      return;
    }
  
    if (!storeId) {
      console.error("Missing storeId for product:", product);
      return;
    }
  
    const productRef = doc(db, "Users", user.uid, "wishlist", product.id);
  
    setLikedItems((prev) =>
      prev.some((item) => item.id === product.id)
        ? prev.filter((item) => item.id !== product.id)
        : [...prev, { ...product, storeId }]
    );
  
    try {
      const docSnapshot = await getDoc(productRef);
      if (docSnapshot.exists()) {
        await deleteDoc(productRef);
      } else {
        await setDoc(productRef, { ...product, storeId }); // Store storeId properly
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
  };
  
  const updateCartItem = (id, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const addToCart = async (product, storeId,quantity=1) => {
    if (!user) {
      console.error("User not authenticated");
      return;
    }
    
    const productRef = doc(db, "Carts", user.uid, "products", product.id);

    try {
      const docSnapshot = await getDoc(productRef);
      let updatedCartItems = [...cartItems];

      if (docSnapshot.exists()) {
        const currentQuantity = docSnapshot.data().quantity || 1;
        const newQuantity = currentQuantity + quantity;

        await updateDoc(productRef, { quantity: newQuantity });
        updatedCartItems = updatedCartItems.map((item) =>
          item.id === product.id ? { ...item, quantity: newQuantity } : item
        );
      } else {
        const cartItem = {
          id: product.id,
          name: product.catalogueProductName,
          price: parseFloat(product.price.replace("$", "")) || 0, 
          storeId: storeId,
          quantity: quantity,
          productImageUrl: product.productImageUrl,
          productDescription:product.productDescription,
          CategoryName:product.catalogueCategoryName,
          CategoryId:product.catalogueCategoryId
        };

        await setDoc(productRef, cartItem);
        updatedCartItems = [...updatedCartItems, cartItem];
      }

      setCartItems(updatedCartItems);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };


  
  const removeFromCart = async (id) => {
    if (!user) {
      console.error("User not authenticated");
      return;
    }

    const productRef = doc(db, "Carts", user.uid, "products", id);

    setCartItems((prev) => {
      const updatedCart = prev.filter((item) => item.id !== id);
      return [...updatedCart];
    });

    try {
      await deleteDoc(productRef);
    } catch (error) {
      console.error("Error removing product from cart:", error);
      setCartItems((prev) => [...prev, prev.find((item) => item.id === id)]);
    }
  };

  const updateCartQuantity = async (id, newQuantity) => {
    if (!user) {
      console.error("User not authenticated");
      return;
    }

    const productRef = doc(db, "Carts", user.uid, "products", id);
    const prevCart = [...cartItems];
    try{
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );

    
      await updateDoc(productRef, { quantity: newQuantity });
    } catch (error) {
      console.error("Error updating cart quantity:", error);
      setCartItems(prevCart);
    }
  };

  return (
    <StoreContext.Provider 
      value={{ 
        likedItems,
        cartItems,
        toggleLike,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        setCartItems,
        selectedProduct,       // Added to context
        setSelectedProduct    // Added to context
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => useContext(StoreContext);