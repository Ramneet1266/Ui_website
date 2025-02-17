import React from "react";

export default function FeaturedProduct({ store }) {
  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm p-4">
      <div className="px-5 pb-5 text-white">
        <p className="text-sm text-gray-600">Store Category: {store.category}</p>
        <p className="text-sm text-gray-600">Store Name: {store.storeNumber}</p>
        <p className="text-sm text-gray-600">Store ID: {store.storeId}</p>
      </div>
    </div>
  );
}
