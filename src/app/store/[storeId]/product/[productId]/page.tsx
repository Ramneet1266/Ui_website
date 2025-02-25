"use client"
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { getProductById } from "@/app/component/firebaseUtil"

interface Product {
	id: string
	catalogueProductName: string
	productImageUrl: string
	productDescription: string
	price?: number
}

export default function ProductPage({
	params,
}: {
	params: { storeId: string; productId: string }
}) {
	const { storeId, productId } = params
	const searchParams = useSearchParams() // ✅ Correct way to access searchParams
	const categoryId = searchParams.get("categoryId") // Get categoryId as a string or null

	// If categoryId is null, provide a fallback or handle error
	if (!categoryId) {
		return <p className="p-10">Category ID is missing or invalid</p>
	}

	const [product, setProduct] = useState<Product | null>(null)
	const [loading, setLoading] = useState(true)
	const router = useRouter()

	useEffect(() => {
		if (!storeId || !categoryId || !productId) {
			console.error("Missing required parameters")
			router.push("/store") // Redirect if params are missing
			return
		}

		const fetchProduct = async () => {
			try {
				const productData = await getProductById(
					storeId,
					categoryId,
					productId
				)
				setProduct(productData)
			} catch (error) {
				console.error("Error fetching product:", error)
			} finally {
				setLoading(false)
			}
		}

		fetchProduct()
	}, [storeId, categoryId, productId, router])

	if (loading) return <p className="p-10">Loading...</p>
	if (!product) return <p className="p-10">Product not found</p>

	return (
		<div className="p-10">
			<h1 className="text-2xl font-bold">
				{product.catalogueProductName}
			</h1>
			<img
				src={product.productImageUrl}
				alt={product.catalogueProductName}
				className="w-64 h-64 object-cover"
			/>
			<p className="text-gray-700">
				{product.productDescription || "No description available"}
			</p>
			<p>Price: ${product.price || "N/A"}</p>
			<p>Category ID: {categoryId}</p>
			<p>Store ID: {storeId}</p>
		</div>
	)
}
