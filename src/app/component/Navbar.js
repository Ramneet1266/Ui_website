"use client"
import Link from "next/link"
import { FaHeart } from "react-icons/fa"
import { FiHeart } from "react-icons/fi"
import { BsCartPlus, BsCartPlusFill } from "react-icons/bs"
import React, { useState,useRef,useEffect } from "react"
import { useStore } from "../context/StoreContext"
import { useRouter } from "next/navigation"
import { signOut } from "firebase/auth"
import { auth } from "@/app/lib/firebase"
import { toast } from "react-toastify"
const Navbar = () => {
	const { likedItems, cartItems } = useStore()
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)
	const dropdownRef = useRef(null); // Ref for dropdown container
	 // Function to handle outside clicks
	 useEffect(() => {
		function handleClickOutside(event) {
		  if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
			setIsDropdownOpen(false); // Close dropdown if clicked outside
		  }
		}
		if (isDropdownOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		  }
		  return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		  };
		}, [isDropdownOpen]);
	  

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen)
	}
	const router = useRouter()

	const handleLogout = async () => {
		await signOut(auth) // Firebase logout
		toast.success("Logout Successfull!!")
		router.push("/LoginPage") // Redirect to login
	}

	return (
		<nav className="bg-pink-400 border-b border-gray-300 fixed top-0 left-0 w-full z-50">
			<div className="max-w-screen flex items-center justify-between mx-auto p-4">
				{/* Logo */}
				<Link href="/">
					<span className="text-2xl font-semibold text-gray-800">
						USERApp
					</span>
				</Link>

				{/* Navigation Links */}
				<div className="hidden md:flex flex-1 justify-center">
					<ul className="flex space-x-8 font-medium">
						<li>
							<Link href="/">Home</Link>
						</li>
						<li>
							<Link href="/store">Store</Link>
						</li>
						<li>
							<Link href="/contact">Contact</Link>
						</li>
					</ul>
				</div>

				{/* Icons Section */}
				<div className="flex items-center space-x-6 ml-auto">
					{/* Wishlist Icon */}
					<Link href="/store/Wishlist">
						<div className="relative cursor-pointer">
							{likedItems.length > 0 ? (
								<FaHeart className="text-2xl text-black"></FaHeart>
							) : (
								<FiHeart className="text-2xl" />
							)}
							{likedItems.length > 0 && (
								<span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full px-1">
									{likedItems.length}
								</span>
							)}
						</div>
					</Link>

					{/* Shopping Cart Icon */}
					<Link href="/store/Cart">
						<div className="relative cursor-pointer">
							{cartItems.length > 0 ? (
								<BsCartPlusFill className="text-2xl text-black"></BsCartPlusFill>
							) : (
								<BsCartPlus className="text-2xl" />
							)}

							{cartItems.length > 0 && (
								<span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full px-2">
									{cartItems.length}
								</span>
							)}
						</div>
					</Link>

					{/* Profile Section */}
					<div className="relative" ref={dropdownRef}>
						<button
							type="button"
							className="flex items-center justify-center text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-blue-600"
							onClick={()=>setIsDropdownOpen(!isDropdownOpen)}
						>
							<span className="sr-only">Open user menu</span>
							<img
								className="w-10 h-10 rounded-full object-cover border-1 border-black"
								src="../images/comment_user.jpg" //  Corrected image path
								alt="User profile"
							/>
						</button>

						{/* Dropdown Menu */}
						{isDropdownOpen && (
							<div className="absolute top-14 right-0 z-50 bg-white shadow-lg rounded-lg w-32">
								<ul className="py-2 text-gray-700">
									<li>
										<a
											href="#"
											className="block px-4 py-2 hover:bg-gray-100"
										>
											Dashboard
										</a>
									</li>
									<li>
										<a
											href="#"
											className="block px-4 py-2 hover:bg-gray-100"
										>
											Settings
										</a>
									</li>
									<li>
										<a
											href="#"
											className="block px-4 py-2 hover:bg-gray-100"
										>
											Earnings
										</a>
									</li>
									<li>
										<button
											onClick={handleLogout}
											className="block  w-full text-left px-4 py-2 hover:bg-gray-100   "
										>
											Logout
										</button>
									</li>
								</ul>
							</div>
						)}
					</div>
				</div>
			</div>
		</nav>
	)
}

export default Navbar
