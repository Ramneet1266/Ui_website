"use client";

import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "..//app//lib//firebase"; // Adjust path as needed
import FeaturedProduct from "./component/FeaturedProduct";
import { ChevronDown } from "lucide-react";
import Link from "next/link"; // Import Link for navigation

// Define the Store type
type Store = {
  storeId: string;
  category: string;
  addressOne: string;
  addressTwo: string;
  status: string;
  email: string;
  storeNumber: string;
};

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [stores, setStores] = useState<Store[]>([]); // Ensure stores use the correct type
  const [filteredStores, setFilteredStores] = useState<Store[]>([]); // For filtered stores
  const [selectedCategory, setSelectedCategory] = useState<string>("All"); // Track selected category
  const [categories, setCategories] = useState<string[]>([]); // Store all categories

  // Fetch stores from Firebase
  const fetchStores = async () => {
    const storesCollection = collection(db, "stores"); // Get stores collection
    const storeSnapshot = await getDocs(storesCollection); // Fetch all documents

    // Map the fetched documents to the expected Store type
    const storeList = storeSnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        storeId: doc.id, // Use Firestore document ID as storeId
        category: data.category || "", // Default to empty string if category is missing
        addressOne: data.addressOne || "",
        addressTwo: data.addressTwo || "",
        status: data.status || "",
        email: data.email || "",
        storeNumber: data.storeNumber || "",
      };
    });

    setStores(storeList); // Update state with fetched store data

    // Get unique categories from the stores
    const storeCategories = Array.from(new Set(storeList.map((store) => store.category)));
    setCategories(["All", ...storeCategories]); // Add "All" option to categories
    setFilteredStores(storeList); // Initially display all stores
  };

  // Fetch stores when the component mounts
  useEffect(() => {
    fetchStores();
  }, []);

  // Filter stores based on selected category
  const filterStoresByCategory = (category: string) => {
    if (category === "All") {
      setFilteredStores(stores); // Show all stores if "All" is selected
    } else {
      setFilteredStores(stores.filter((store) => store.category === category)); // Filter stores by category
    }
  };

  // Category selection (dropdown toggle)
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    filterStoresByCategory(category);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col overflow-hidden">
      <div className="custom-bg px-20 pb-20">
        <div className="relative w-48 mr-10 mt-10 ml-10">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex justify-between items-center w-[200px] px-4 py-2 text-white bg-blue-500 rounded-lg shadow-md"
          >
            Select Category <ChevronDown className="w-4 h-4" />
          </button>
          {isOpen && (
            <div className="absolute w-full mt-2 bg-white border rounded-lg shadow-lg">
              {categories.map((category) => (
                <div
                  key={category}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="ml-10 mt-10 mr-10">
          <div className="gap-10 grid grid-cols-4 w-full">
            {filteredStores.map((store) => (
              <Link key={store.storeId} href={`/store/${store.storeId}`}>
                <FeaturedProduct store={store} />
              </Link> // Navigate to the dynamic store page
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
