"use client";
import React, { useEffect, useState } from "react";
import { ArrowRight, Star, Minus, Plus } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { getProductById } from "@/app/component/firebaseUtil";
import { useStore } from "..//..//..//..//context/StoreContext";  // Importing useStore to access cart state

interface Product {
  id: string;
  catalogueProductName: string;
  productImageUrl: string;
  productDescription: string;
}

export default function Page({
  params,
}: {
  params: { storeId: string; productId: string };
}) {
  const { storeId, productId } = params;
  const searchParams = useSearchParams(); // ✅ Correct way to access searchParams
  const categoryId = searchParams.get("categoryId"); // Get categoryId as a string or null

  // If categoryId is null, provide a fallback or handle error
  if (!categoryId) {
    return <p className="p-10">Category ID is missing or invalid</p>;
  }

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  
  // Accessing the addToCart function from StoreContext
  const { addToCart } = useStore();

  useEffect(() => {
    if (!storeId || !categoryId || !productId) {
      console.error("Missing required parameters");
      router.push("/store"); // Redirect if params are missing
      return;
    }

    const fetchProduct = async () => {
      try {
        const productData = await getProductById(
          storeId,
          categoryId,
          productId
        );
        setProduct(productData);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [storeId, categoryId, productId, router]);

  if (loading) return <p className="p-10">Loading...</p>;
  if (!product) return <p className="p-10">Product not found</p>;

  const handleAddToCart = () => {
    if (product) {
      addToCart(product); // Add the product to the cart when the button is clicked
    }
  };

  return (
    <div className="custom-bg-home text-white">
      {/* Breadcrumb Navigation */}
      <div className="py-10 px-56 flex items-center gap-2 text-gray-300">
        <p>Home</p>
        <ArrowRight size={16} />
        <p>Store</p>
        <ArrowRight size={16} />
        <p>Lorem ipsum dolor sit amet consectetur.</p>
      </div>

      {/* Product Section */}
      <div className="px-40 py-10 flex items-start">
        {/* First Div (Product Images) */}
        <div className="flex flex-col w-[40%]">
          {" "}
          {/* Added fixed width */}
          {/* Main Product Image */}
          <img
            src={product.productImageUrl}
            alt={product.catalogueProductName}
            width={450}
            height={400}
            className="rounded-3xl"
          />
        </div>

        {/* Second Div (Product Details) */}
        <div className="flex-grow p-6 bg-gray-800 rounded-lg">
          {" "}
          {/* Added flex-grow */}
          <h2 className="text-3xl font-bold">
            {" "}
            {product.catalogueProductName}
          </h2>
          <p className="text-gray-400 mt-1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
          {/* Star Rating */}
          <div className="flex items-center gap-1 mt-3">
            <p className="text-yellow-400 font-semibold">(4.5)</p>
            <Star size={20} className="text-yellow-400" />
            <Star size={20} className="text-yellow-400" />
            <Star size={20} className="text-yellow-400" />
            <Star size={20} className="text-yellow-400" />
            <Star size={20} className="text-gray-500" />
          </div>
          {/* Product Description */}
          <p className="text-gray-300 mt-4">
            {product.productDescription || "No description available"}
          </p>
          {/* Stock Availability */}
          <p className="mt-4 text-red-400">
            Only <span className="font-bold">(5)</span> items left in stock!
          </p>
          {/* Price and Quantity Selector */}
          <div className="flex items-center justify-between mt-6">
            {/* Price */}
            <p className="text-3xl font-bold text-green-400">$360</p>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 border border-gray-500 px-4 py-2 rounded-lg">
              <Minus
                size={20}
                className="cursor-pointer text-gray-300 hover:text-white"
              />
              <p className="text-lg">1</p>
              <Plus
                size={20}
                className="cursor-pointer text-gray-300 hover:text-white"
              />
            </div>
          </div>
          {/* Buy & Add to Cart Buttons */}
          <div className="mt-6 flex gap-4">
            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg text-lg font-semibold">
              Buy Now
            </button>
            <button
              className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg text-lg font-semibold"
              onClick={handleAddToCart} // Attach the handleAddToCart function to the button
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
