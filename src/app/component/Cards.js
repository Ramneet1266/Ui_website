// // "use client";
// // import React from "react";

// // // Define the component
// // export default function Cards({ product }) {
// //   return (
// //     <div className=" bg-amber-300 flex justify-center items-center p-4  ">
// //       {/* <div className="w-full max-w-xs bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 relative overflow-hidden rounded-lg shadow-lg"> */}
// //         {/* Gradient Border */}
// //         {/* <div className="absolute inset-0 border-4 border-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded-lg"></div> */}

// //         {/* Card Image */}
// //         <a href="#" className="block relative overflow-hidden">
// //           <img
// //             className="w-full h-64 object-cover transition-all transform hover:scale-110 hover:rotate-3 rounded-t-lg"
// //             src={product.productImageUrl || "/default-image.jpg"}
// //             alt={product.catalogueProductName}
// //           />
// //         </a>

// //         {/* Card Content */}
// //         {/* <div className="px-5 pb-5 bg-white dark:bg-gray-800 rounded-b-lg relative z-10"> */}
// //           <a href="#" className="block mb-2">
// //             <h5 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 hover:underline">
// //               {product.catalogueProductName}
// //             </h5>
// //           </a>

// //           <p className="text-gray-900 dark:text-gray-300 text-base mb-4 truncate">
// //             {product.productDescription || "No description available."}
// //           </p>
// //           <div className="absolute bottom-5 left-5 right-5 text-center">
// //             <button className="px-6 py-2 bg-gradient-to-r from-teal-400 to-blue-500 text-white font-semibold rounded-full transform hover:scale-110 hover:rotate-3 transition duration-300">
// //               Add to Cart
// //             </button>
// //           </div>
// //         {/* </div> */}

// //         {/* Decorative Effect */}
// //         {/* <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-500 opacity-20 blur-xl"></div> */}
// //       {/* </div> */}
// //     </div>
// //   );
// // }
// "use client";
// import React from "react";

// // Define the component
// export default function Cards({ product }) {
//   return (
//     <div className="flex justify-center items-center p-4 bg-amber-300">
//       {/* Card Container */}
//       <div className="w-full max-w-xs bg-white rounded-lg shadow-lg overflow-hidden">
        
//         {/* Card Image */}
//         <a href="#" className="block relative">
//           <img
//             className="w-full h-64 object-cover transition-transform transform hover:scale-105 rounded-t-lg"
//             src={product.productImageUrl || "/default-image.jpg"}
//             alt={product.catalogueProductName}
//           />
//         </a>

//         {/* Card Content */}
//         <div className="px-5 pb-5 text-center">
//           <a href="#">
//             <h5 className="text-2xl font-bold text-gray-800 hover:underline">
//               {product.catalogueProductName}
//             </h5>
//           </a>
//           <p className="text-gray-600 text-sm mt-2 truncate">
//             {product.productDescription || "No description available."}
//           </p>

//           {/* Button */}
//           <button className="mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-full transform hover:scale-105 transition">
//             Add to Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }




// "use client";
// import React from "react";

// export default function Cards({ product }) {
//   return (
//     <div className="flex justify-center items-center p- bg-gradient-to-br color-purple-500 min-h-screen border-r-8">
//       {/* Card Wrapper with Funky Border Glow */}
//       <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl p-6 relative overflow-hidden transform transition duration-500 hover:scale-105">
        
//         {/* Funky Border Effect */}
//         <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 blur-lg opacity-30"></div>

//         {/* Card Image */}
//         <a href="#" className="block relative rounded-2xl overflow-hidden">
//           <img
//             className="w-full h-64 object-cover transition-transform transform hover:rotate-2 hover:scale-110"
//             src={product.productImageUrl || "/default-image.jpg"}
//             alt={product.catalogueProductName}
//           />
//         </a>

//         {/* Card Content */}
//         <div className="text-center mt-4">
//           <a href="#">
//             <h5 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 hover:scale-105 transform transition">
//               {product.catalogueProductName}
//             </h5>
//           </a>

//           <p className="text-gray-700 text-lg mt-2 font-medium px-4">
//             {product.productDescription || "This product is amazing, check it out!"}
//           </p>

//           {/* Funky Button */}
//           <button className="mt-6 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-bold rounded-full shadow-lg transform hover:scale-110 hover:rotate-2 transition-all">
//              Add to Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";
import React, { useState } from "react";
import { ShoppingCart, Heart } from "lucide-react";

export default function Cards({ product }) {
  const [liked, setLiked] = useState(false); // ✅ State correctly placed

  return (
    <div className="flex flex-wrap justify-center gap-4 p-10 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl border-cyan-400">
      
      {/* Card Wrapper */}
      <div className="w-80 h-[400px] bg-gradient-to-br from-red-900200 to-blue-300 rounded-3xl shadow-2xl p-5 relative overflow-hidden transform transition duration-500 hover:scale-105 flex flex-col border-cyan-600">
        
        {/* Card Image */}
        <a href="#" className="block relative rounded-2xl overflow-hidden">
          <img
            className="w-full h-40 object-cover transition-transform transform hover:rotate-2 hover:scale-110 rounded-lg"
            src={product.productImageUrl || "/default-image.jpg"}
            alt={product.catalogueProductName}
          />
        </a>

        {/* Card Content */}
        <div className="text-center mt-4 flex-grow flex flex-col justify-between">
          <a href="#">
            <h5 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 hover:scale-105 transform transition">
              {product.catalogueProductName}
            </h5>
          </a>

          <p className="text-gray-700 text-sm mt-2 font-medium px-2 line-clamp-2">
            {product.productDescription || "Awesome product, check it out!"}
          </p>

          {/* Buttons Section */}
          <div className="flex justify-between items-center mt-4">
            
            {/* Add to Cart Button */}
            <button className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-full shadow-lg flex items-center gap-2 transform hover:scale-110 transition-all">
              <ShoppingCart size={16} />
              Add to Cart
            </button>

            {/* Heart Like Button */}
            <button
              className={`p-2 rounded-full shadow-md transition-all duration-300 ${
                liked ? "text-red-500 scale-110" : "text-gray-400 hover:text-red-500"
              }`}
              onClick={() => setLiked(!liked)}
            >
              <Heart size={20} fill={liked ? "red" : "transparent"} />
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}


