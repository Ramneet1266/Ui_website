"use client"
import Link from "next/link"
import React, { useState } from "react"
import { ShoppingCart ,Heart,X} from "lucide-react"
// import { useStore } from "../context/StoreContext";

import {LikeAndCart} from "@/app/component/like_and_cart"
export default function Navbar() {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)
	const [liked, setLiked] = useState(false); // ✅ State correctly placed
	// const { likedItems, cartItems } = useStore();
	const [openDropdown, setOpenDropdown] = useState(null);
	// const dropdownRef = useRef(null);

	
	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen)
	}

	return (
		<div>
			<nav className="bg-pink-400 border-b border-gray-300">
				<div className="max-w-screen  flex items-center mx-auto p-4">
					
					{/* Left Section: Logo */}
					<a
						href="https://flowbite.com/"
						className="flex items-center space-x-3 rtl:space-x-reverse"
					>
						<img
							src="https://flowbite.com/docs/images/logo.svg"
							className="h-8"
							alt="Flowbite Logo"
						/>
						<span className="self-center text-2xl font-semibold whitespace-nowrap text-gray-800">
							USERApp
						</span>
					</a>

					{/* Middle Section: Nav Links (takes remaining space) */}
					<div className="hidden md:flex flex-1 justify-center">
						<ul className="flex space-x-8 font-medium">
							<li>
								<Link href={"/"}>
									<div className="text-blue-700 hover:text-blue-500">Home</div>
								</Link>
							</li>
							<li>
								<Link href={"/store"}>
									<div className="text-gray-900 hover:text-blue-700">Store</div>
								</Link>
							</li>
							<li>
								<a href="#" className="text-gray-900 hover:text-blue-700">
									Contact
								</a>
							</li>
						</ul>
					</div>


						{/* <LikeAndCart/> */}
									{/* Right Section: Shopping Cart & Profile (Pushed to Extreme Right) */}
					<div className="flex items-center flex-0.1 space-x-6 ml-auto">

						<Heart className="w-6 h-6 cursor-pointer text-gray-800" />
						{/* Shopping Cart */}
						<ShoppingCart className="w-6 h-6 cursor-pointer text-gray-800" /> 

						{/* Profile Dropdown */}
						<button
							type="button"
							className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300"
							onClick={toggleDropdown}
						>
							<span className="sr-only">Open user menu</span>
							<img
								className="w-8 h-8 rounded-full"
								src="/docs/images/people/profile-picture-3.jpg"
								alt="user photo"
							/>
						</button>

						{/* Dropdown Menu */}
						{isDropdownOpen && (
							<div className="absolute top-14 right-0 z-50 bg-white shadow-lg rounded-lg w-32">
								<ul className="py-2 text-gray-700">
									<li>
										<a href="#" className="block px-4 py-2 hover:bg-gray-100">Dashboard</a>
									</li>
									<li>
										<a href="#" className="block px-4 py-2 hover:bg-gray-100">Settings</a>
									</li>
									<li>
										<a href="#" className="block px-4 py-2 hover:bg-gray-100">Earnings</a>
									</li>
									<li>
										<a href="#" className="block px-4 py-2 hover:bg-gray-100">Sign out</a>
									</li>
								</ul>
							</div>
						)}
					</div>
				</div>
			</nav>
		</div>
	)
}
