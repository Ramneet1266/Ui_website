// pages/store/[store].tsx
import { useRouter } from "next/router";
import React from "react";
import FilterSideBar from "../component/StoreData/FilterSideBar";
import MainData from "../component/StoreData/MainData"

export default function StorePage() {
  const router = useRouter();
  const { store } = router.query; // Extract 'store' from the URL

  // Check if store is available (it might be undefined initially)
  if (!store) return <div>Loading...</div>;

  return (
    <div className="px-56 py-10 custom-bg-home flex items-start gap-10">
      {/* Sidebar */}
      <FilterSideBar />
      {/* Main content area */}
      <div className="flex-grow p-4">
        <MainData storeID={store as string} /> {/* Pass store as a prop to MainData */}
      </div>
    </div>
  );
}
