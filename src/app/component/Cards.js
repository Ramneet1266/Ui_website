"use client"
import { useRouter } from "next/navigation"
import React from "react"

export default function Cards({ product }) {
	const router = useRouter()
	console.log(product.catalogueProductID)

	const handleProductClick = (event) => {
		event.preventDefault() // Prevents default navigation behavior
		router.push(
			`/store/product/${product.id}?categoryId=${product.categoryId}`
		) // Correct way to navigate
	}

	return (
		<a
			href={`/store/product/${product.id}?categoryId=${product.categoryId}`} // Improves SEO
			onClick={handleProductClick} // Handles client-side navigation
			className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 cursor-pointer block"
		>
			<img
				className="p-8 rounded-t-lg"
				src={product.productImageUrl || "/default-image.jpg"}
				alt={product.catalogueProductName}
			/>

			<div className="px-5 pb-5">
				<h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
					{product.catalogueProductID}
				</h5>

				<p className="text-gray-500 dark:text-gray-300">
					{product.productDescription || "No description available."}
				</p>
			</div>
		</a>
	)
}
