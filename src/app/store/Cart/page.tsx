
// // // "use client";
// // // import Cards from "../../component/Cards";
// // // import { useEffect, useState } from "react";
// // // import { useRouter } from "next/navigation";
// // // import { useStore } from "../../context/StoreContext";
// // // import Image from "next/image";

// // // interface Product {
// // //   id: string;
// // //   price: number;
// // //   quantity: number;
// // //   productImageUrl: string;
// // //   catalogueProductName: string;
// // // }

// // // const CartPage = () => {
// // //   const router = useRouter();
// // //   const { cartItems, updateCartItem, removeCartItem } = useStore();
// // //   const [isMounted, setIsMounted] = useState(false);
// // //   const TAX_RATE = 0.10; // 10% tax

// // //   useEffect(() => {
// // //     setIsMounted(true);
// // //   }, []);

// // //   // Calculate totals
// // //   const subtotal = cartItems.reduce((sum: number, product: { price: number; quantity: number; }) => sum + (product.price * product.quantity), 0);
// // //   const tax = subtotal * TAX_RATE;
// // //   const total = subtotal + tax;

// // //   const handleCheckout = () => {
// // //     router.push("/checkout"); // Create checkout page
// // //   };

// // //   const handleBack = () => {
// // //     if (typeof window !== "undefined" && window.history.length > 1) {
// // //       router.back();
// // //     } else {
// // //       router.push('/store'); // Fallback to your store page
// // //     }
// // //   };

// // //   const handleRemoveItem = (productId:string) => {
// // //     // Optimistically update the UI
// // //     removeCartItem(productId);
// // //   };

// // //   return (
// // //     <div className="container mx-auto p-6 min-h-screen">
// // //       <h1 className="text-3xl font-bold mb-8">Your Shopping Cart 🛒</h1>

// // //       {cartItems.length === 0 ? (
// // //         <div className="flex flex-col items-center justify-center mt-12">
// // //           <Image
// // //             src="/images/emptyCart.jpg"
// // //             alt="Empty Cart"
// // //             width={400}
// // //             height={300}
// // //             className="max-w-xs md:max-w-md mb-8"
// // //           />
// // //           <p className="text-gray-600 text-lg mb-4">Your cart is ready for amazing finds!</p>
// // //           <button
// // //             onClick={handleBack}
// // //             className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
// // //             disabled={!isMounted}
// // //           >
// // //             {isMounted && <span>← Continue Exploring</span>}
// // //           </button>
// // //         </div>
// // //       ) : (
// // //         <div className="flex flex-col lg:flex-row gap-8">
// // //           {/* Cart Items */}
// // //           <div className="lg:w-2/3 space-y-6">
// // //             {cartItems.map((product: Product) => (
// // //               <div key={product.id} className="flex items-center bg-white p-4 rounded-lg shadow-md">
// // //                 <Image
// // //                   src={product.productImageUrl}
// // //                   alt={product.catalogueProductName}
// // //                   width={100}
// // //                   height={100}
// // //                   className="w-24 h-24 object-cover rounded-lg"
// // //                 />
// // //                 <div className="ml-6 flex-1">
// // //                   <h3 className="text-xl font-semibold">{product.catalogueProductName}</h3>
// // //                   <div className="flex items-center justify-between mt-2">
// // //                     <div className="flex items-center space-x-4">
// // //                       <span className="text-gray-600">Qty: {product.quantity}</span>
// // //                     </div>
// // //                     <p className="text-lg font-bold">
// // //                       ${(product.price * product.quantity).toFixed(2)}
// // //                     </p>
// // //                   </div>
// // //                 </div>
// // //                 <button
// // //                   onClick={() => handleRemoveItem(product.id)}
// // //                   className="ml-4 text-red-500 hover:text-red-700"
// // //                 >
// // //                   ❌
// // //                 </button>
// // //               </div>
// // //             ))}
// // //           </div>

// // //           {/* Payment Summary */}
// // //           <div className="lg:w-1/3 bg-white p-6 rounded-lg shadow-md h-fit sticky top-8">
// // //             <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

// // //             <div className="space-y-4">
// // //               <div className="flex justify-between">
// // //                 <span>Subtotal ({cartItems.length} items)</span>
// // //                 <span>${subtotal.toFixed(2)}</span>
// // //               </div>

// // //               <div className="flex justify-between">
// // //                 <span>Taxes ({TAX_RATE * 100}%)</span>
// // //                 <span>${tax.toFixed(2)}</span>
// // //               </div>

// // //               <hr className="my-4" />

// // //               <div className="flex justify-between text-xl font-bold">
// // //                 <span>Total</span>
// // //                 <span>${total.toFixed(2)}</span>
// // //               </div>
// // //             </div>

// // //             <button
// // //               onClick={handleCheckout}
// // //               className="w-full mt-6 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors font-semibold text-lg"
// // //             >
// // //               Proceed to Payment
// // //             </button>
// // //           </div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default CartPage;




// // "use client";
// // import Cards from "../../component/Cards";
// // import { useEffect, useState } from "react";
// // import { useRouter } from "next/navigation";
// // import { useStore } from "../../context/StoreContext";
// // import Image from "next/image";

// // interface Product {
// //   id: string;
// //   price: number;
// //   quantity: number;
// //   productImageUrl: string;
// //   catalogueProductName: string;
// // }

// // const CartPage = () => {
// //   const router = useRouter();
// //   const { cartItems, updateCartItem, removeCartItem } = useStore();
// //   const [isMounted, setIsMounted] = useState(false);
// //   const TAX_RATE = 0.10; // 10% tax

// //   useEffect(() => {
// //     setIsMounted(true);
// //   }, []);

// //   // Calculate totals
// //   const subtotal = cartItems.reduce((sum: number, product: { price: number; quantity: number; }) => sum + (product.price * product.quantity), 0);
// //   const tax = subtotal * TAX_RATE;
// //   const total = subtotal + tax;

// //   const handleCheckout = () => {
// //     router.push("/checkout"); // Navigate to checkout page
// //   };

// //   const handleBack = () => {
// //     if (typeof window !== "undefined" && window.history.length > 1) {
// //       router.back();
// //     } else {
// //       router.push('/store'); // Fallback to store page
// //     }
// //   };

// //   const handleRemoveItem = (productId: string) => {
// //     removeCartItem(productId);
// //   };

// //   const handleIncreaseQuantity = (product: Product) => {
// //     updateCartItem(product.id, product.quantity + 1);
// //   };

// //   const handleDecreaseQuantity = (product: Product) => {
// //     if (product.quantity > 1) {
// //       updateCartItem(product.id, product.quantity - 1);
// //     }
// //   };

// //   return (
// //     <div className="container mx-auto p-6 min-h-screen">
// //       <h1 className="text-3xl font-bold mb-8">Your Shopping Cart 🛒</h1>

// //       {cartItems.length === 0 ? (
// //         <div className="flex flex-col items-center justify-center mt-12">
// //           <Image
// //             src="/images/emptyCart.jpg"
// //             alt="Empty Cart"
// //             width={400}
// //             height={300}
// //             className="max-w-xs md:max-w-md mb-8"
// //           />
// //           <p className="text-gray-600 text-lg mb-4">Your cart is ready for amazing finds!</p>
// //           <button
// //             onClick={handleBack}
// //             className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
// //             disabled={!isMounted}
// //           >
// //             {isMounted && <span>← Continue Exploring</span>}
// //           </button>
// //         </div>
// //       ) : (
// //         <div className="flex flex-col lg:flex-row gap-8">
// //           {/* Cart Items */}
// //           <div className="lg:w-2/3 space-y-6">
// //             {cartItems.map((product: Product) => (
// //               <div key={product.id} className="flex items-center bg-white p-4 rounded-lg shadow-md">
// //                 <Image
// //                   src={product.productImageUrl}
// //                   alt={product.catalogueProductName}
// //                   width={100}
// //                   height={100}
// //                   className="w-24 h-24 object-cover rounded-lg"
// //                 />
// //                 <div className="ml-6 flex-1">
// //                   <h3 className="text-xl font-semibold">{product.catalogueProductName}</h3>
// //                   <div className="flex items-center justify-between mt-2">
// //                     <div className="flex items-center space-x-4">
// //                       <button
// //                         onClick={() => handleDecreaseQuantity(product)}
// //                         className={`px-3 py-1 text-lg font-bold rounded bg-gray-300 hover:bg-gray-400 transition ${
// //                           product.quantity === 1 ? "opacity-50 cursor-not-allowed" : ""
// //                         }`}
// //                         disabled={product.quantity === 1}
// //                       >
// //                         -
// //                       </button>
// //                       <span className="text-gray-600 text-lg">{product.quantity}</span>
// //                       <button
// //                         onClick={() => handleIncreaseQuantity(product)}
// //                         className="px-3 py-1 text-lg font-bold rounded bg-gray-300 hover:bg-gray-400 transition"
// //                       >
// //                         +
// //                       </button>
// //                     </div>
// //                     <p className="text-lg font-bold">
// //                       ${(product.price * product.quantity).toFixed(2)}
// //                     </p>
// //                   </div>
// //                 </div>
// //                 <button
// //                   onClick={() => handleRemoveItem(product.id)}
// //                   className="ml-4 text-red-500 hover:text-red-700"
// //                 >
// //                   ❌
// //                 </button>
// //               </div>
// //             ))}
// //           </div>

// //           {/* Payment Summary */}
// //           <div className="lg:w-1/3 bg-white p-6 rounded-lg shadow-md h-fit sticky top-8">
// //             <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

// //             <div className="space-y-4">
// //               <div className="flex justify-between">
// //                 <span>Subtotal ({cartItems.length} items)</span>
// //                 <span>${subtotal.toFixed(2)}</span>
// //               </div>

// //               <div className="flex justify-between">
// //                 <span>Taxes ({TAX_RATE * 100}%)</span>
// //                 <span>${tax.toFixed(2)}</span>
// //               </div>

// //               <hr className="my-4" />

// //               <div className="flex justify-between text-xl font-bold">
// //                 <span>Total</span>
// //                 <span>${total.toFixed(2)}</span>
// //               </div>
// //             </div>

// //             <button
// //               onClick={handleCheckout}
// //               className="w-full mt-6 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors font-semibold text-lg"
// //             >
// //               Proceed to Payment
// //             </button>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default CartPage;








// "use client";
// import Cards from "../../component/Cards";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useStore } from "../../context/StoreContext";
// import Image from "next/image";



// interface Product {
//   id: string;
//   price: number;
//   quantity: number;
//   productImageUrl: string;
//   catalogueProductName: string;
// }

// const CartPage = () => {
//   const router = useRouter();
//   const { cartItems, updateCartItem, removeCartItem } = useStore();
//   const [isMounted, setIsMounted] = useState(false);
//   const TAX_RATE = 0.10; // 10% tax

//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   // Calculate totals
//   const subtotal = cartItems.reduce(
//     (sum: number, product: { price: number; quantity: number }) =>
//       sum + product.price * product.quantity,
//     0
//   );
//   const tax = subtotal * TAX_RATE;
//   const total = subtotal + tax;

//   const handleCheckout = () => {
//     router.push("/checkout");
//   };

//   const handleBack = () => {
//     if (typeof window !== "undefined" && window.history.length > 1) {
//       router.back();
//     } else {
//       router.push("/store");
//     }
//   };

//   const handleRemoveItem = (productId: string) => {
//     removeCartItem(productId);
//   };

//   const handleQuantityChange = (productId: string, newQuantity: number) => {
//     if (newQuantity >= 1) {
//     updateCartItem(productId, newQuantity);
//     }
//   };

//   return (
//     <div className="container mx-auto p-6 min-h-screen">
//       <h1 className="text-3xl font-bold mb-8">Your Shopping Cart 🛒</h1>

//       {cartItems.length === 0 ? (
//         <div className="flex flex-col items-center justify-center mt-12">
//           <Image
//             src="/images/emptyCart.jpg"
//             alt="Empty Cart"
//             priority
//             width={400}
//             height={300}
//             className="max-w-xs md:max-w-md mb-8"
//           />
//           <p className="text-gray-600 text-lg mb-4">
//             Your cart is ready for amazing finds!
//           </p>
//           <button
//             onClick={handleBack}
//             className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
//             disabled={!isMounted}
//           >
//             {isMounted && <span>← Continue Exploring</span>}
//           </button>
//         </div>
//       ) : (
//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Cart Items */}
//           <div className="lg:w-2/3 space-y-6">
//             {cartItems.map((product: Product) => (
//               <div
//                 key={product.id}
//                 className="flex items-center bg-white p-4 rounded-lg shadow-md"
//               >
//                 <Image
//                   src={product.productImageUrl}
//                   alt={product.catalogueProductName}
//                   width={100}
//                   height={100}
//                   className="w-24 h-24 object-cover rounded-lg"
//                 />
//                 <div className="ml-6 flex-1">
//                   <h3 className="text-xl font-semibold">
//                     {product.catalogueProductName}
//                   </h3>
//                   <div className="flex items-center justify-between mt-2">
//                     <div className="flex items-center space-x-4">
//                       <button
//                         onClick={() =>
//                           handleQuantityChange(product.id, product.quantity - 1)
//                         }
//                         className="bg-gray-300 px-3 py-1 rounded-lg text-lg font-bold"
//                         disabled={product.quantity === 1}
//                       >
//                         -
//                       </button>
//                       <span className="text-gray-600">{product.quantity}</span>
//                       <button
//                         onClick={() =>
//                           handleQuantityChange(product.id, product.quantity + 1)
//                         }
//                         className="bg-gray-300 px-3 py-1 rounded-lg text-lg font-bold"
//                       >
//                         +
//                       </button>
//                     </div>
//                     <p className="text-lg font-bold">
//                       ${(product.price * product.quantity).toFixed(2)}
//                     </p>
//                   </div>
//                 </div>
//                 <button
//                   onClick={() => handleRemoveItem(product.id)}
//                   className="ml-4 text-red-500 hover:text-red-700"
//                 >
//                   ❌
//                 </button>
//               </div>
//             ))}
//           </div>

//           {/* Payment Summary */}
//           <div className="lg:w-1/3 bg-white p-6 rounded-lg shadow-md h-fit sticky top-8">
//             <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

//             <div className="space-y-4">
//               <div className="flex justify-between">
//                 <span>Subtotal ({cartItems.length} items)</span>
//                 <span>${subtotal.toFixed(2)}</span>
//               </div>

//               <div className="flex justify-between">
//                 <span>Taxes ({TAX_RATE * 100}%)</span>
//                 <span>${tax.toFixed(2)}</span>
//               </div>

//               <hr className="my-4" />

//               <div className="flex justify-between text-xl font-bold">
//                 <span>Total</span>
//                 <span>${total.toFixed(2)}</span>
//               </div>
//             </div>

//             <button
//               onClick={handleCheckout}
//               className="w-full mt-6 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors font-semibold text-lg"
//             >
//               Proceed to Payment
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CartPage;








"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "../../context/StoreContext";
import Image from "next/image";

interface Product {
  id: string;
  price: number;
  quantity: number;
  productImageUrl: string;
  catalogueProductName: string;
}

const CartPage = () => {
  const router = useRouter();
  // Corrected destructuring
  const { cartItems, updateCartQuantity, removeFromCart } = useStore();
  const [isMounted, setIsMounted] = useState(false);
  const TAX_RATE = 0.10;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum: number, product: { price: number; quantity: number }) =>
      sum + product.price * product.quantity,
    0
  );
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  const handleCheckout = () => {
    router.push("/checkout");
  };

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/store");
    }
  };

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateCartQuantity(productId, newQuantity); // Corrected function name
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
            onClick={handleBack}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
            disabled={!isMounted}
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
                  alt={product.catalogueProductName}
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
                          handleQuantityChange(product.id, product.quantity - 1)
                        }
                        className="bg-gray-300 px-3 py-1 rounded-lg text-lg font-bold"
                        disabled={product.quantity === 1}
                      >
                        -
                      </button>
                      <span className="text-gray-600">{product.quantity}</span>
                      <button
                        onClick={() =>
                          handleQuantityChange(product.id, product.quantity + 1)
                        }
                        className="bg-gray-300 px-3 py-1 rounded-lg text-lg font-bold"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-lg font-bold">
                      ${(product.price * product.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(product.id)} // Corrected function name
                  className="ml-4 text-red-500 hover:text-red-700"
                >
                  ❌
                </button>
              </div>
            ))}
          </div>

                    {/* Payment Summary */}
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
               onClick={handleCheckout}
               className="w-full mt-6 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors font-semibold text-lg"
             >
               Proceed to Payment
             </button>
           </div>
           </div>
    
      )}
    </div>
  );
};

export default CartPage;