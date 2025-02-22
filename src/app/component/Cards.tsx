
"use client";
import React from "react";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa"; // Filled heart icon
import { BsCartPlus ,BsCartDash} from "react-icons/bs";
import { useStore } from "../context/StoreContext";

interface Product {
  id: string;
  productImageUrl?: string;
  catalogueProductName: string;
  productDescription?: string;
}

interface CardProps {
  product: Product;
  
}

const Cards: React.FC<CardProps> = ({ product}) => {
  const { likedItems,addToCart,toggleLike ,cartItems} = useStore(); 
  const isLiked = likedItems.some((item: { id: string; }) => item.id === product.id);
  const isInCart = cartItems.some((item: { id: string; }) => item.id === product.id)
 
 
  return (
    <div className="flex flex-wrap justify-center gap-4 p-10 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl border-cyan-400">
      {/* Card structure remains the same */}
     
      <div className="w-80 h-[400px] bg-gradient-to-br from-red-900200 to-blue-300 rounded-3xl shadow-2xl p-5 relative overflow-hidden transform transition duration-500 hover:scale-105 flex flex-col border-cyan-600">
        <a href="#" className="block relative rounded-2xl overflow-hidden">
          <img
            className="w-full h-40 object-cover transition-transform transform hover:rotate-2 hover:scale-110 rounded-lg"
            src={product.productImageUrl || "/default-image.jpg"}
            alt={product.catalogueProductName}
          />
        </a>

        <div className="text-center mt-4 flex-grow flex flex-col justify-between">
          <h5 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 hover:scale-105 transform transition">
            {product.catalogueProductName}
          </h5>
          <p className="text-gray-700 text-sm mt-2 font-medium px-2 line-clamp-2">
            {product.productDescription || "Awesome product, check it out!"}
          </p>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-4 w-full">
        <button
        onClick={() => addToCart(product)}
        className={`px-4 py-2 ${
          isInCart ? 'bg-red-600' : 'bg-blue-600'
        } text-white text-sm font-bold rounded-full shadow-lg flex items-center gap-2 transform hover:scale-110 transition-all`}
      >
        {isInCart ? (
          <>
            <BsCartDash className="text-2xl" />
            <span className="hidden lg:inline">Remove from Cart</span>
          </>
        ) : (
          <>
            <BsCartPlus className="text-2xl" />
            <span className="hidden lg:inline">Add to Cart</span>
          </>
        )}
      </button>

      <button 
        onClick={() => toggleLike(product)}
        className={`p-2 rounded-full shadow-md transition-all duration-300 ${
          isLiked ? "text-red-500  scale-105" : "text-gray-400 hover:text-red-500 "
        }`}
      >{isLiked ? (
        <FaHeart className="text-2xl" /> // Filled heart
      ) : (
        <FiHeart className="text-2xl" /> // Outline heart
      )}
      </button>
      </div>
      </div>
     </div>
    </div>
  );
};

export default Cards;




