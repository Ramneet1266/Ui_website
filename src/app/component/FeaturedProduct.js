import { StoreIcon } from "lucide-react";
import React from "react";

export default function FeaturedProduct({ store }) {
  return (
    <div className="w-80 bg-gray-500 border border-gray-700 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-3xl hover:border-blue-500-20 relative">
      
      {/* Animated Neon Glow Effect */}
      {/* <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-30 blur-md transition-opacity duration-300 hover:opacity-50"></div> */}
      {/* <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-30 blur-md transition-opacity duration-300 hover:opacity-50"></div> */}

      {/* Card Content */}
      <div className="p-6 text-white flex flex-col items-center relative z-10">
        
        {/* Store Icon */}
        <div className="p-3 bg-blue-600 rounded-full shadow-md flex justify-center items-center">
          <StoreIcon size={32} className="text-white" />
        </div>

        {/* Store Category */}
        <h3 className="text-2xl font-extrabold mt-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 transition-transform duration-300 hover:scale-110">
          {store.category}
        </h3>

        {/* Store Details */}
        <p className="text-sm text-gray-300 mt-2 transition-all duration-300 hover:text-gray-100">
          🆔 Store ID: <span className="font-semibold">{store.storeId}</span>
        </p>
        <p className="text-sm text-gray-300 mb-4 transition-all duration-300 hover:text-gray-100">
          🏬 Store Number: <span className="font-semibold">{store.storeNumber}</span>
        </p>

        {/* Interactive Call-to-Action Button */}
        <button className="px-10 py-3 text-lg font-bold text-white bg-blue-600 rounded-full shadow-lg transform transition-all duration-300 flex items-center gap-2 hover:scale-110 hover:rotate-1 hover:bg-pink-500 active:scale-95">
          {/* <StoreIcon className="animate-pulse" /> */}
          Visit Store
        </button>
      </div>
    </div>
  );
}
