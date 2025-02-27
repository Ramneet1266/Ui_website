// "use client";
// import { createContext, useContext, useState, useEffect } from "react";
// import { auth, db } from "@/app/lib/firebase";
// import { 
//   collection, 
//   doc, 
//   getDoc, 
//   setDoc, 
//   deleteDoc, 
//   getDocs 
// } from "firebase/firestore";
// import { onAuthStateChanged } from "firebase/auth";

// const StoreContext = createContext();

// export function StoreProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [likedItems, setLikedItems] = useState([]);
//   const [cartItems, setCartItems] = useState([]);

//   // Listen for auth state changes
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (authUser) => {
//       setUser(authUser);
//     });
//     return () => unsubscribe();
//   }, []);

//   // Fetch wishlist items
//   useEffect(() => {
//     if (!user) return;

//     const fetchWishlist = async () => {
//       const wishlistRef = collection(db, "Users", user.uid, "wishlist");

//       try {
//         const querySnapshot = await getDocs(wishlistRef);
//         const wishlistData = querySnapshot.docs.map((doc) => doc.data());
//         setLikedItems(wishlistData);
//       } catch (error) {
//         console.error("Error fetching wishlist:", error);
//       }
//     };

//     fetchWishlist();
//   }, [user]); // Re-fetch when user changes

//   // Toggle liked items (wishlist)
//   const toggleLike = async (product) => {
//     const user = auth.currentUser;
//     if (!user) {
//       console.error("User not authenticated");
//       return;
//     }
  
//     const productRef = doc(db, "Users", user.uid, "wishlist", product.id);
  
//     // **Optimistically update UI**
//     setLikedItems((prev) =>
//       prev.some((item) => item.id === product.id)
//         ? prev.filter((item) => item.id !== product.id)
//         : [...prev, product]
//     );
  
//     try {
//       const docSnapshot = await getDoc(productRef);
//       if (docSnapshot.exists()) {
//         await deleteDoc(productRef);
//       } else {
//         await setDoc(productRef, product);
//       }
//     } catch (error) {
//       console.error("Error updating wishlist:", error);
//     }
//   };
  
//   // const toggleLike = async (product) => {
//   //   if (!user) {
//   //     console.error("User not authenticated");
//   //     return;
//   //   }

//   //   const wishlistRef = collection(db, "Users", user.uid, "wishlist");
//   //   const productRef = doc(wishlistRef, product.id);

//   //   try {
//   //     const docSnapshot = await getDoc(productRef);

//   //     if (docSnapshot.exists()) {
//   //       await deleteDoc(productRef);
//   //       setLikedItems((prev) => prev.filter((item) => item.id !== product.id));
//   //     } else {
//   //       await setDoc(productRef, product);
//   //       setLikedItems((prev) => [...prev, product]);
//   //     }
//   //   } catch (error) {
//   //     console.error("Error updating wishlist:", error);
//   //   }
//   // };

//   // Add to cart
//   const addToCart = (product) => {
//     setCartItems((prev) => {
//       const existing = prev.find((item) => item.id === product.id);
//       if (existing) {
//         return prev.map((item) =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       }
//       return [...prev, { ...product, quantity: 1 }];
//     });
//   };

//   return (
//     <StoreContext.Provider value={{ likedItems, cartItems, toggleLike, addToCart }}>
//       {children}
//     </StoreContext.Provider>
//   );
// }

// export const useStore = () => useContext(StoreContext);



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
      const cartRef = collection(db, "Users", user.uid, "cart");
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
    const user = auth.currentUser;
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
  // Add to cart
  const addToCart = async (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    if (user) {
      const productRef = doc(db, "Users", user.uid, "cart", product.id);
      try {
        const docSnapshot = await getDoc(productRef);
        if (docSnapshot.exists()) {
          await updateDoc(productRef, { quantity: product.quantity + 1 });
        } else {
          await setDoc(productRef, { ...product, quantity: 1 });
        }
      } catch (error) {
        console.error("Error updating cart:", error);
      }
    }
  };

  // Remove from cart
  const removeFromCart = async (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));

    if (user) {
      const productRef = doc(db, "Users", user.uid, "cart", productId);
      try {
        await deleteDoc(productRef);
      } catch (error) {
        console.error("Error removing item from cart:", error);
      }
    }
  };

  // Update quantity in cart
  // const updateCartQuantity = async (productId, newQuantity) => {
  //   setCartItems((prev) =>
  //     prev.map((item) =>
  //       item.id === productId ? { ...item, quantity: newQuantity } : item
  //     )
  //   );
  // const updateCartQuantity = async (productId, newQuantity) => {
  //   if (newQuantity < 1) {
  //     removeFromCart(productId);
  //     return;
  //   }

  //   if (user) {
  //     const productRef = doc(db, "Users", user.uid, "cart", productId);
  //     try {
  //       await updateDoc(productRef, { quantity: newQuantity });
  //     } catch (error) {
  //       console.error("Error updating cart quantity:", error);
  //     }
  //   }
  // };
  const updateCartQuantity = async (productId, newQuantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  
    // Backend update in the background
    if (user) {
      const productRef = doc(db, "Users", user.uid, "cart", productId);
      updateDoc(productRef, { quantity: newQuantity }).catch((error) => {
        console.error("Error updating cart quantity:", error);
        // Revert UI if Firestore update fails
        setCartItems((prev) =>
          prev.map((item) =>
            item.id === productId ? { ...item, quantity: newQuantity - 1 } : item
          )
        );
      });
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
        updateCartQuantity 
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => useContext(StoreContext);
