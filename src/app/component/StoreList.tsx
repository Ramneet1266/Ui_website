"use client";

import { useState,useEffect,useRef } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import FeaturedProduct from "./FeaturedProduct";

// Define Store type
type Store = {
  storeId: string;
  category: string;
  addressOne: string;
  addressTwo: string;
  status: string;
  email: string;
  storeNumber: string;
};

// StoreList component
export default function StoreList({ stores }: { stores: Store[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredStores, setFilteredStores] = useState(stores);
  const categories = ["All", ...new Set(stores.map((store) => store.category))];

  // Filter stores when category changes
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setFilteredStores(category === "All" ? stores : stores.filter((store) => store.category === category));
    setIsOpen(false);
  };

  return (
    <div className="ml-10 mt-11 mr-10 mb-10">
      {/* Category Dropdown */}
      <div className="relative w-48 mr-10 mt-10 mb-11">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex justify-between items-center w-[200px] px-4 py-2 text-white bg-blue-500 rounded-lg shadow-md"
        >
          {selectedCategory==null?"Select Category":selectedCategory}
          <ChevronDown className="w-4 h-4" />
        </button>
        {isOpen && (
          <div className="z-50 absolute w-full mt-2 bg-white border rounded-lg shadow-lg">
            {categories.map((category) => (
              <div key={category} className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={() => handleCategoryChange(category)}>
                {category}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Store Grid */}
      <div className="gap-10 grid grid-cols-1 lg:grid-cols-4 w-full">
        {filteredStores.map((store) => (
          <Link key={store.storeId} href={`/store/${store.storeId}`}>
            <FeaturedProduct store={store} />
          </Link>
        ))}
      </div>
    </div>
  );
}
