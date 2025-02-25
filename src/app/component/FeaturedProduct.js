

// import React, { useState } from "react";

// export default function FeaturedProduct({ store }) {
//   const [mousePosition, setMousePosition] = useState({ x: -100, y: -100, isHovered: false });

//   const handleMouseMove = (e) => {
//     const { left, top } = e.currentTarget.getBoundingClientRect();
//     setMousePosition({
//       x: e.clientX - left,
//       y: e.clientY - top,
//       isHovered: true,
//     });
//   };

//   const handleMouseLeave = () => {
//     setMousePosition({ x: -100, y: -100, isHovered: false });
//   };

//   return (
//     <div
//       className=" min-w-[280px] relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl rounded-2xl shadow-xl overflow-hidden transition-transform duration-300 hover:scale-105 bg-gray-900 text-white border border-gray-700"
//       onMouseMove={handleMouseMove}
//       onMouseLeave={handleMouseLeave}
//     >
//       {/* Glowing Gradient Border Layer */}
//       <div className="absolute inset-0 pointer-events-none rounded-2xl border-2 border-transparent">
//         {mousePosition.isHovered && (
//           <div
//             className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-200"
//             style={{
//               maskImage: `radial-gradient(circle 150px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 0, 150, 0.9), transparent)`,
//               WebkitMaskImage: `radial-gradient(circle 150px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 0, 150, 0.9), transparent)`,
//               background: "linear-gradient(90deg, #ff00ff, #00ffff, #ffcc00)",
//               zIndex: 1,
//             }}
//           />
//         )}
//       </div>

//       {/* Card Content Layer */}
//       <div className="relative p-4 sm:p-6 flex flex-col items-center z-10">
//         {/* Store Category */}
//         <h3 className="text-xl sm:text-2xl font-extrabold mt-3 text-transparent bg-clip-text bg-white transition-transform duration-300 hover:scale-110">
//           {store.category}
//         </h3>

//         {/* Store Details */}
//         <p className="text-xs sm:text-sm text-gray-300 mt-2 transition-all duration-300 hover:text-gray-100">
//           🆔 Store ID: <span className="font-semibold">{store.storeId}</span>
//         </p>
//         <p className="text-xs sm:text-sm text-gray-300 mb-4 transition-all duration-300 hover:text-gray-100">
//           🏬 Store Number: <span className="font-semibold">{store.storeNumber}</span>
//         </p>

//         {/* Call-to-Action Button */}
//         <button className="px-5 sm:px-8 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-white rounded-full shadow-lg transform transition-all duration-300 flex items-center gap-2 bg-gradient-to-r from-blue-400 to-indigo-600 hover:scale-110 hover:bg-opacity-90 hover:shadow-blue-500/50 active:scale-95">
//           Visit Store 🚀
//         </button>
//       </div>
//     </div>
//   );
// }


import React, { useState } from "react";

export default function FeaturedProduct({ store }) {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100, isHovered: false });

  const handleMouseMove = (e) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - left,
      y: e.clientY - top,
      isHovered: true,
    });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: -100, y: -100, isHovered: false });
  };

  return (
    <div
      className="min-w-[320px]  relative w-full max-w-lg sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl rounded-2xl shadow-xl overflow-hidden transition-transform duration-300 hover:scale-105 bg-gray-900 text-white border border-gray-700"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glowing Gradient Border Layer */}
      <div className="absolute inset-0 pointer-events-none rounded-2xl border-2 border-transparent">
        {mousePosition.isHovered && (
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-200"
            style={{
              maskImage: `radial-gradient(circle 150px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 0, 150, 0.9), transparent)`,
              WebkitMaskImage: `radial-gradient(circle 150px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 0, 150, 0.9), transparent)`,
              background: "linear-gradient(90deg, #ff00ff, #00ffff, #ffcc00)",
              zIndex: 1,
            }}
          />
        )}
      </div>

      
      <div className="relative p-4 sm:p-6 flex flex-col items-center z-10">
        {/* Store Category */}
        <h3 className="text-xl sm:text-2xl font-extrabold mt-3 text-transparent bg-clip-text bg-white transition-transform duration-300 hover:scale-110">
          {store.category}
        </h3>

        {/* Store Details (Prevent Wrapping) */}
        <div className="flex flex-wrap justify-center gap-2 mt-2">
          <p className="text-xs sm:text-sm text-gray-300 transition-all duration-300 hover:text-gray-100 whitespace-nowrap">
            🆔 Store ID: <span className="font-semibold">{store.storeId}</span>
          </p>
          <p className="text-xs sm:text-sm text-gray-300 transition-all duration-300 hover:text-gray-100 whitespace-nowrap">
            🏬 Store Number: <span className="font-semibold">{store.storeNumber}</span>
          </p>
        </div>

        {/* Call-to-Action Button (Prevent Chubbiness) */}
        <button className="px-5 sm:px-8  mt-6 py-2 text-xs sm:text-sm font-semibold text-white rounded-full shadow-lg transform transition-all duration-300 flex items-center gap-2 bg-gradient-to-r from-blue-400 to-indigo-600 hover:scale-110 hover:bg-opacity-90 hover:shadow-blue-500/50 active:scale-95 min-w-[120px] h-[40px]">
          Visit Store 🚀
        </button>
      </div>
    </div>

    
  );
}
