"use client";
import React from "react";

// Define the component
export default function Cards({ product }) {
  return (
    <div>
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <img
            className="p-8 rounded-t-lg"
            src={product.productImageUrl || "/default-image.jpg"}
            alt={product.catalogueProductName}
          />
        </a>
        <div className="px-5 pb-5">
          <a href="#">
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {product.catalogueProductName}
            </h5>
          </a>
          <p className="text-gray-500 dark:text-gray-300">
            {product.productDescription || "No description available."}
          </p>
        </div>
      </div>
    </div>
  );
}
