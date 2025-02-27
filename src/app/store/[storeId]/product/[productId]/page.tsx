"use client";
import React, { useEffect, useState } from "react";
import { ArrowRight, Star, Minus, Plus } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { getProductById } from "@/app/component/firebaseUtil";
import { useStore } from "..//..//..//..//context/StoreContext";
import { toast } from "react-toastify";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "@/app/lib/firebase";

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
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");

  if (!categoryId) {
    return <p className="p-10">Category ID is missing or invalid</p>;
  }

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { addToCart } = useStore();

  useEffect(() => {
    if (!storeId || !categoryId || !productId) {
      console.error("Missing required parameters");
      router.push("/store");
      return;
    }

    const fetchProduct = async () => {
      try {
        const productData = await getProductById(storeId, categoryId, productId);
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

  const handleBuyNow = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (!user?.uid) {
      toast.error("Please log in to place an order.");
      return;
    }

    if (!product) {
      toast.error("No product details available.");
      return;
    }

    try {
      const orderId = `${user.uid}_${productId}_${Date.now()}`;
      const orderRef = doc(db, "orders", orderId);

      // Create a new order with user details
      await setDoc(orderRef, {
        userID: user.uid,
        createdAt: new Date(),
      });

      // Create a store sub-collection inside the order document (store1 is used here instead of stores)
      const storeRef = doc(orderRef, "store1", storeId);

      // Add the product to the store sub-collection
      const productRef = doc(storeRef, "products", productId);
      await setDoc(productRef, {
        productID: productId,
        productName: product.catalogueProductName,
        productImageUrl: product.productImageUrl,
        quantity: 1,
        price: 360,
      });

      toast.success("Order placed successfully!");
      router.push("/orders"); // Redirect to the orders page
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order. Please try again.");
    }
  };

  const handleAddToCart = async () => {
    if (product) {
      addToCart(product); // Add the product to the cart when the button is clicked
    }
  
    const user = JSON.parse(localStorage.getItem("user") || "{}");
  
    if (!user?.uid) {
      toast.error("Please log in to add to cart.");
      return;
    }
  
    if (!product) {
      toast.error("No product details available.");
      return;
    }
  
    try {
      const cartRef = doc(db, "Carts", `${user.uid}`); // Reference to the user's cart document
      const productsRef = collection(cartRef, "products"); // Create a sub-collection called 'products' under the user's cart
  
      // Add the product to the user's cart in the 'products' sub-collection
      const productRef = doc(productsRef, productId); // Using productId as document ID
      await setDoc(productRef, {
        productID: productId,
        productName: product.catalogueProductName,
        productImageUrl: product.productImageUrl,
        quantity: 1,
        price: 360, // You can modify this if the price changes dynamically
      });
  
      addToCart(product); // Update the global cart state
      toast.success("Product added to cart!");
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error("Failed to add product to cart. Please try again.");
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
        <div className="flex flex-col w-[40%]">
          {/* Main Product Image */}
          <img
            src={product.productImageUrl}
            alt={product.catalogueProductName}
            width={450}
            height={400}
            className="rounded-3xl"
          />
        </div>

        <div className="flex-grow p-6 bg-gray-800 rounded-lg">
          <h2 className="text-3xl font-bold">{product.catalogueProductName}</h2>
          <p className="text-gray-400 mt-1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>

          <div className="flex items-center gap-1 mt-3">
            <p className="text-yellow-400 font-semibold">(4.5)</p>
            <Star size={20} className="text-yellow-400" />
            <Star size={20} className="text-yellow-400" />
            <Star size={20} className="text-yellow-400" />
            <Star size={20} className="text-yellow-400" />
            <Star size={20} className="text-gray-500" />
          </div>

          <p className="text-gray-300 mt-4">
            {product.productDescription || "No description available"}
          </p>

          <p className="mt-4 text-red-400">
            Only <span className="font-bold">(5)</span> items left in stock!
          </p>

          <div className="flex items-center justify-between mt-6">
            <p className="text-3xl font-bold text-green-400">$360</p>

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

          <div className="mt-6 flex gap-4">
            <button
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg text-lg font-semibold"
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
            <button
              className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg text-lg font-semibold"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
