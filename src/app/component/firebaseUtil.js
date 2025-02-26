import { db } from "../lib/firebase"
import {
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	where,
} from "firebase/firestore"

// Function to fetch all stores from Firestore
export const fetchStores = async () => {
	try {
		const storesCollection = collection(db, "stores")
		const storesSnapshot = await getDocs(storesCollection)
		const storesList = storesSnapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}))

		return storesList
	} catch (error) {
		console.error("Error fetching stores:", error)
		return []
	}
}

export const getCategoriesForStore = async (storeID) => {
	try {
		console.log("Fetching categories for store:", storeID) // Debugging

		if (!storeID) throw new Error("storeID is undefined")

		const categoriesRef = collection(
			db,
			`stores/${storeID}/categories`
		) // Access subcollection
		const querySnapshot = await getDocs(categoriesRef)

		let categories = []
		querySnapshot.forEach((doc) => {
			categories.push({ id: doc.id, ...doc.data() })
		})

		console.log("Fetched categories:", categories) // Debug fetched data

		if (categories.length === 0)
			throw new Error("No categories found for this store")

		return categories
	} catch (error) {
		console.error("Error fetching categories:", error)
		throw error
	}
}

// Function to fetch all products for a specific category in a specific store
export const getProductsForCategory = async (storeID, categoryID) => {
	const productsRef = collection(
		db,
		`stores/${storeID}/categories/${categoryID}/products`
	)

	// No need to filter by catalogueCategoryId, just fetch all products in this category
	const querySnapshot = await getDocs(productsRef)

	let products = []

	querySnapshot.forEach((doc) => {
		products.push({ id: doc.id, ...doc.data() })
	})

	return products
}
export const getProductDetails = async (productId, categoryId) => {
	const productRef = doc(
		db,
		"stores",
		"storeId",
		"categories",
		categoryId,
		"products",
		productId
	)
	const docSnap = await getDoc(productRef)

	if (docSnap.exists()) {
		return docSnap.data() // Return the product details
	} else {
		throw new Error("Product not found")
	}
}
export const getProductById = async (
	storeID,
	categoryID,
	productId
) => {
	try {
		// Fetch the product document from Firestore
		const productRef = doc(
			db,
			`stores/${storeID}/categories/${categoryID}/products`,
			productId
		)
		const docSnap = await getDoc(productRef)

		if (!docSnap.exists()) {
			throw new Error("Product not found")
		}

		// Return the full product data
		return {
			id: docSnap.id,
			catalogueProductName: docSnap.data().catalogueProductName,
			catalogueCategoryName: docSnap.data().catalogueCategoryName,
			productImageUrl: docSnap.data().productImageUrl,
			productDescription: docSnap.data().productDescription,
		}
	} catch (error) {
		console.error("Error fetching product:", error)
		throw error
	}
}
import { toast } from "react-toastify"
import {
	createUserWithEmailAndPassword,
	getAuth,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth"
import { app } from "../lib/firebase"

const auth = getAuth(app)

// Login function
export const loginService = async (email, password) => {
	try {
	  const userCredential = await signInWithEmailAndPassword(auth, email, password)
	  toast.success("Login successful!")
	  return userCredential
	} catch (error) {
	  toast.error("Login failed: " + error.message)
	  throw error
	}
  }

// Register service to register user and store info in Firestore
export const registerService = async (email, password, name) => {
	try {
	  console.log("Attempting to register with:", email, password);
  
	  // Validate email format (basic regex check)
	  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	  if (!emailRegex.test(email)) {
		throw new Error("Invalid email format.");
	  }
  
	  // Validate password length
	  if (password.length < 6) {
		throw new Error("Password should be at least 6 characters long.");
	  }
  
	  // Firebase authentication to create a user
	  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
	  const user = userCredential.user;
  
	  console.log("User created successfully:", user.email);
  
	  // Create the 'Users' document with user ID
	  const userRef = doc(db, "Users", user.uid); // Document reference using user UID
	  await setDoc(userRef, {
		email: user.email,
		name: name,
		uid: user.uid,
	  });
  
	  console.log("User document created with ID:", user.uid);
  
	  // Show success notification
	  toast.success("User registered successfully!");
  
	  return userCredential;
	} catch (error) {
	  console.log("Error during registration:", error.message);
  
	  if (error.code === "auth/email-already-in-use") {
		toast.error("This email is already in use. Please use a different one.");
	  } else if (error.code === "auth/invalid-email") {
		toast.error("The email address is not valid.");
	  } else if (error.code === "auth/weak-password") {
		toast.error("Password should be at least 6 characters long.");
	  } else {
		toast.error("Registration failed: " + error.message);
	  }
  
	  throw error;
	}
  };