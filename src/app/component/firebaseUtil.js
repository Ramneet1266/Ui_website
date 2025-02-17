import { db } from "../lib/firebase"
import { collection, getDocs, query, where } from "firebase/firestore"

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
