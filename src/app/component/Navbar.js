"use client"
import Link from "next/link"
import React, { useState } from "react"

export default function Navbar() {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen)
	}

	return (
		<div>
			<nav className="custom-bg-home border-b border-gray-700">
				<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
					<a
						href="https://flowbite.com/"
						className="flex items-center space-x-3 rtl:space-x-reverse"
					>
						<img
							src="https://flowbite.com/docs/images/logo.svg"
							className="h-8"
							alt="Flowbite Logo"
						/>
						<span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
							Flowbite
						</span>
					</a>
					<div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse relative">
						<button
							type="button"
							className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
							onClick={toggleDropdown}
						>
							<span className="sr-only">Open user menu</span>
							<img
								className="w-8 h-8 rounded-full"
								src="/docs/images/people/profile-picture-3.jpg"
								alt="user photo"
							/>
						</button>

						{isDropdownOpen && (
							<div className="z-50 mt-[220px] text-base list-none bg-white divide-y divide-gray-100 rounded-lg w-32 shadow-sm dark:bg-gray-700 dark:divide-gray-600 absolute right-0">
								<ul className="py-2">
									<li>
										<a
											href="#"
											className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
										>
											Dashboard
										</a>
									</li>
									<li>
										<a
											href="#"
											className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
										>
											Settings
										</a>
									</li>
									<li>
										<a
											href="#"
											className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
										>
											Earnings
										</a>
									</li>
									<li>
										<a
											href="#"
											className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
										>
											Sign out
										</a>
									</li>
								</ul>
							</div>
						)}
					</div>
					<div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
						<ul className="flex flex-col font-medium p-4 md:p-0 mt-4 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0  ">
							<li>
								<Link href={"/"}>
									<div className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500">
										Home
									</div>
								</Link>
							</li>
							<li>
								<Link href={"/store"}>
									<div className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500">
										Store
									</div>
								</Link>
							</li>
							<li>
								<a
									href="#"
									className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white"
								>
									Services
								</a>
							</li>
							<li>
								<a
									href="#"
									className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white"
								>
									Pricing
								</a>
							</li>
							<li>
								<a
									href="#"
									className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white"
								>
									Contact
								</a>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</div>
	)
}
