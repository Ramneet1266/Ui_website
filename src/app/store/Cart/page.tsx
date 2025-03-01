"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "../../context/StoreContext";
import Image from "next/image";
import { db } from "../../lib/firebase"; // Adjust Firebase import
import { collection, addDoc, doc, setDoc, serverTimestamp } from "firebase/firestore";

interface Product {
  id: string;
  price: string; // Price is stored as a string, e.g., "$100"
  quantity: number;
  name:string,
  productImageUrl: string;
  catalogueProductName: string;
  storeId: string;
  storeName: string;
}

const CartPage = () => {
  const router = useRouter();
  const { cartItems, updateCartQuantity, removeFromCart, clearCart } = useStore();
  const [isMounted, setIsMounted] = useState(false);
  const TAX_RATE = 0.10;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Convert "$100" to a number (100)
  // const parsePrice = (price: string) => Number(price.replace(/[^0-9.-]+/g, ""));
  const parsePrice = (price?: string) =>Number( price ? price.replace("$", "").trim() : "0");

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum: number, product: Product) => sum + parsePrice(product.price) * product.quantity,
    0
  );
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;
  const handlePlaceOrder = async () => {
    try {
      // Step 1: Create order document
      const orderRef = await addDoc(collection(db, "Orders"), {
        createdAt: serverTimestamp(),
      });
  
      const orderID = orderRef.id;
  
      // Step 2: Organize products by storeID
      const storesMap: Record<string, Product[]> = {};
      cartItems.forEach((product: Product) => {
        if (!product.storeId) {
          console.error("Store ID is undefined for product:", product);
          return; // Skip this product
        }
        if (!storesMap[product.storeId]) {
          storesMap[product.storeId] = [];
        }
        storesMap[product.storeId].push(product);
      });
  
      // Step 3: Save products under respective stores in Firestore
      for (const [storeId, products] of Object.entries(storesMap)) {
        const storeRef = doc(db, "Orders", orderID, "stores", storeId);
        await setDoc(storeRef, {});
  
        for (const product of products) {
          if (!product.id) {
            console.error("Product ID is undefined for:", product);
            continue; // Skip this product
          }
          const productRef = doc(db, "Orders", orderID, "stores", storeId, "products", product.id);
          await setDoc(productRef, {
            name: product.catalogueProductName|| product.name ,
            price: product.price || '0',
            quantity: product.quantity || 1,
            id: product.id,
            productImageUrl: product.productImageUrl,
            
          });
        }
      }
  
      // Step 4: Clear cart after successful order
      await clearCart();
  
      alert("Order placed successfully!");
      router.push("/");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Something went wrong while placing your order.");
    }
  };
  
  return (
    <div className="container mx-auto p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart 🛒</h1>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-12">
          <Image
            src="/images/emptyCart.jpg"
            alt="Empty Cart"
            width={400}
            height={300}
            priority
            className="max-w-xs md:max-w-md mb-8"
          />
          <p className="text-gray-600 text-lg mb-4">
            Your cart is ready for amazing finds!
          </p>
          <button
            onClick={() => router.push("/store")}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            {isMounted && <span>← Continue Exploring</span>}
          </button>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3 space-y-6">
            {cartItems.map((product: Product) => (
              <div
                key={product.id}
                className="flex items-center bg-white p-4 rounded-lg shadow-md"
              >
                <Image
                  src={product.productImageUrl}
                  alt={product.catalogueProductName || "Product image"}
                  width={100}
                  height={100}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="ml-6 flex-1">
                  <h3 className="text-xl font-semibold">
                    {product.catalogueProductName}
                  </h3>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() =>
                          updateCartQuantity(product.id, product.quantity - 1)
                        }
                        className="bg-gray-300 px-3 py-1 rounded-lg text-lg font-bold"
                        disabled={product.quantity === 1}
                      >
                        -
                      </button>
                      <span className="text-gray-600">{product.quantity}</span>
                      <button
                        onClick={() =>
                          updateCartQuantity(product.id, product.quantity + 1)
                        }
                        className="bg-gray-300 px-3 py-1 rounded-lg text-lg font-bold"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-lg font-bold">
                      ${(parsePrice(product.price) * product.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(product.id)}
                  className="ml-4 text-red-500 hover:text-red-700"
                >
                  ❌
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3 bg-white p-6 rounded-lg shadow-md h-fit sticky top-8">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal ({cartItems.length} items)</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes ({TAX_RATE * 100}%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>

              <hr className="my-4" />

              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="w-full mt-6 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors font-semibold text-lg"
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;



