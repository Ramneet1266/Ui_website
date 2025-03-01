
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
  
  
  const clearCart = async () => {
    if (!user) {
      console.error("User not authenticated");
      return;
    }
  
    const cartRef = collection(db, "Carts", user.uid, "products");
  
    try {
      // Fetch all cart items
      const querySnapshot = await getDocs(cartRef);
      const deletePromises = querySnapshot.docs.map((doc) => deleteDoc(doc.ref));
      
      await Promise.all(deletePromises); // Delete all items in parallel

  
      // Clear cart items in state
      setCartItems([]);
      console.log("Cart cleared successfully.");
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };
  
  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
    });
    return () => unsubscribe();
  }, []);

  // Fetch wishlist items
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

  // Fetch cart items
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

  // Toggle liked items (wishlist)
  const toggleLike = async (product) => {
    if (!user) {
      console.error("User not authenticated");
      return;
    }

    const productRef = doc(db, "Users", user.uid, "wishlist", product.id);

    // **Optimistically update UI**
    setLikedItems((prev) =>
      prev.some((item) => item.id === product.id)
        ? prev.filter((item) => item.id !== product.id)
        : [...prev, product]
    );

    try {
      const docSnapshot = await getDoc(productRef);
      if (docSnapshot.exists()) {
        await deleteDoc(productRef);
      } else {
        await setDoc(productRef, product);
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
  };
// Update quantity
const updateCartItem = (id, quantity) => {
  setCartItems((prev) =>
    prev.map((item) =>
      item.id === id ? { ...item, quantity } : item
    )
  );
};
 
//    
const addToCart = async (product, storeId) => {
  if (!user) {
    console.error("User not authenticated");
    return;
  }
 

  console.log("Adding to cart:", product, storeId); // Debugging log

  const productRef = doc(db, "Carts", user.uid, "products", product.id);

  try {
    const docSnapshot = await getDoc(productRef);
    let updatedCartItems = [...cartItems];

    if (docSnapshot.exists()) {
      // If item already in cart, increase quantity
      const currentQuantity = docSnapshot.data().quantity || 1;
      // await updateDoc(productRef, { quantity: currentQuantity + 1 });
      const newQuantity = currentQuantity + 1;

      await updateDoc(productRef, { quantity: newQuantity });
      // Update state correctly
      updatedCartItems = updatedCartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: newQuantity } : item
      );
     
    } else {
      // Add new item to cart
      const cartItem = {
        id: product.id, // Ensure product has an ID
        name: product.catalogueProductName,
        price: product.price || 0, // Avoid undefined prices
        storeId: storeId,
        quantity: 1,
        productImageUrl:product.productImageUrl
      };
      await setDoc(productRef, cartItem);
      updatedCartItems = [...updatedCartItems, cartItem];
      // setCartItems((prev) => [...prev, cartItem]);
    }

    setCartItems(updatedCartItems); // Ensure state updates correctly
    console.log("Cart updated successfully");
  } catch (error) {
    console.error("Error adding to cart:", error);
  }
};

 
  // 
  // Remove from cart
const removeFromCart = async (id) => {
  if (!user) {
    console.error("User not authenticated");
    return;
  }

  const productRef = doc(db, "Carts", user.uid, "products", id);

  // **Optimistically update UI**
  setCartItems((prev) =>{
    const updatedCart=prev.filter((item) => item.id !== id);
    return [...updatedCart];
  });

  try {
    await deleteDoc(productRef);
    console.log(`Product ${id} removed from cart.`);
  } catch (error) {
    console.error("Error removing product from cart:", error);

     // **Rollback UI change if the backend fails**
     setCartItems((prev) => [...prev, prev.find((item) => item.id === id)]);
  }
};

 

  
  const updateCartQuantity = async (id, newQuantity) => {
    if (!user) {
      console.error("User not authenticated");
      return;
    }

    const productRef = doc(db, "Carts", user.uid, "products", id);
    const prevCart = [...cartItems]; // Store previous state
    
    
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
    try {
      await updateDoc(productRef, { quantity: newQuantity });
      console.log("Cart quantity updated successfully.");
    } catch (error) {
      console.error("Error updating cart quantity:", error);
      setCartItems(prevCart); // Revert state on failure
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
        setCartItems
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => useContext(StoreContext);
