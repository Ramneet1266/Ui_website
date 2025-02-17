"use client"

import React, { useEffect, useState } from "react"
import { useParams } from "next/navigation" // Import useParams
import {
	getCategoriesForStore,
	getProductsForCategory,
} from "../firebaseUtil" // Import the functions to fetch categories and products
import Cards from "../Cards"

export default function MainData() {
	const params = useParams() // Use useParams to get storeId
	const storeId = params?.storeId // Get storeId from URL params

	const [categories, setCategories] = useState([]) // Categories state
	const [products, setProducts] = useState([]) // Products state
	const [loading, setLoading] = useState(true) // Loading state
	const [error, setError] = useState(null) // Error state

	// Fetch categories for the store
	useEffect(() => {
		console.log("Received storeId:", storeId) // Debugging storeId

		if (storeId) {
			setLoading(true)
			getCategoriesForStore(storeId)
				.then((categoriesData) => {
					console.log("Fetched categories:", categoriesData)
					setCategories(categoriesData) // Set categories state
				})
				.catch((err) => {
					console.error("Error fetching categories:", err)
					setError("Failed to load categories")
				})
				.finally(() => setLoading(false))
		}
	}, [storeId])

	// Fetch products for each category
	useEffect(() => {
		if (categories.length > 0) {
			setLoading(true)
			const fetchProducts = async () => {
				try {
					const allProducts = await Promise.all(
						categories.map(
							(category) =>
								getProductsForCategory(storeId, category.id) // Pass storeId and categoryId
						)
					)
					setProducts(allProducts.flat()) // Flatten the array of products
				} catch (err) {
					console.error("Error fetching products:", err)
					setError("Failed to load products")
				} finally {
					setLoading(false)
				}
			}
			fetchProducts()
		}
	}, [categories, storeId])

	if (loading) return <div>Loading...</div>
	if (error) return <div>{error}</div>

	return (
		<div>
			<h2 className="text-gray-400">Categories for this store:</h2>
			<ul className="mb-5">
				{categories.length > 0 ? (
					categories.map((category, index) => (
						<li
							key={index}
							className="text-white bg-blue-500 p-2 rounded-lg inline-block mr-2"
						>
							{category.catalogueCategoryName ||
								category.name ||
								"Unknown Category"}{" "}
							{/* Display category name */}
						</li>
					))
				) : (
					<p>No categories found.</p>
				)}
			</ul>

			<h2 className="text-gray-400">
				Showing {products.length} Results
			</h2>
			<div className="grid grid-cols-3 gap-5 py-5">
				{products.map((product, index) => (
					<Cards key={index} product={product} />
				))}
			</div>
		</div>
	)
}
