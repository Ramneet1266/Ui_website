"use client";
import React, { useEffect, useState } from "react";
import { Grid3x3, Menu, Filter } from "lucide-react";
import Cards from "../Cards";
import { getCategoriesForStore, getProductsForCategory } from "../firebaseUtil";

type MainDataProps = {
  storeId: string; // Make sure the prop is named correctly
};

export const MainData: React.FC<MainDataProps> = ({ storeId }) => {  // Make sure 'storeId' is used consistently
  const [categories, setCategories] = useState<string[]>([]); // Type categories array
  const [products, setProducts] = useState<any[]>([]); // Type products array
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (storeId) {
      setLoading(true); // Start loading when storeId is set
      // Fetch categories for the store
      getCategoriesForStore(storeId)
        .then((categoriesData) => {
          setCategories(categoriesData); // Update categories state
        })
        .catch((err) => {
          setError("Failed to load categories"); // Set error if the request fails
        })
        .finally(() => {
          setLoading(false); // Set loading to false when fetch finishes
        });
    }
  }, [storeId]); // Re-fetch categories when storeId changes

  useEffect(() => {
    if (categories.length > 0) {
      setLoading(true); // Start loading for products
      // Fetch products for each category
      Promise.all(
        categories.map((category) =>
          getProductsForCategory(category) // Pass the category id correctly
        )
      )
        .then((productsData) => {
          setProducts(productsData.flat()); // Flatten and update products
        })
        .catch((err) => {
          setError("Failed to load products"); // Handle product fetch error
        })
        .finally(() => {
          setLoading(false); // Set loading to false after product fetch
        });
    }
  }, [categories]); // Re-fetch products when categories change

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div className="text-white flex justify-between items-center">
        <h2 className="text-gray-400">Showing {products.length} Results</h2>
      </div>

      <div className="grid grid-cols-3 gap-5 py-5">
        {products.map((product, index) => (
          <Cards key={index} product={product} />
        ))}
      </div>
    </div>
  );
};
