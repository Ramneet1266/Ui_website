import {db} from "../lib/firebase"
import { collection, getDocs } from "firebase/firestore"

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
    const categoriesRef = collection(db, "categories");
    const q = query(categoriesRef, where("storeID", "==", storeID));
    const querySnapshot = await getDocs(q);
    let categories = [];
    
    querySnapshot.forEach((doc) => {
      categories.push({ id: doc.id, ...doc.data() });
    });
    
    return categories;
  };
  
  // Function to get products for a specific category
  export const getProductsForCategory = async (categoryID) => {
    const productsRef = collection(db, "products");
    const q = query(productsRef, where("catalogueCategoryId", "==", categoryID));
    const querySnapshot = await getDocs(q);
    let products = [];
    
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    
    return products;
  };