"use client"
import React from "react"
import { ArrowRight, Star, Minus, Plus } from "lucide-react"

export default function Page() {
	return (
		<div className="custom-bg-home text-white">
			{/* Breadcrumb Navigation */}
			<div className="py-10 px-56 flex items-center gap-2 text-gray-300">
				<p>Home</p>
				<ArrowRight size={16} />
				<p>Store</p>
				<ArrowRight size={16} />
				<p>Lorem ipsum dolor sit amet consectetur.</p>
			</div>

			{/* Product Section */}
			<div className="px-40 py-10 flex items-start">
				{/* First Div (Product Images) */}
				<div className="flex flex-col w-[40%]">
					{" "}
					{/* Added fixed width */}
					{/* Main Product Image */}
					<img
						src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
						alt="Watch"
						width={450}
						height={400}
						className="rounded-3xl"
					/>
					{/* Thumbnail Images */}
					<div className="flex w-[600px] items-center py-5 gap-5">
						<img
							src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
							alt="Watch Thumbnail"
							width={150}
							className="rounded-3xl cursor-pointer border-2 border-transparent hover:border-gray-400"
						/>
						<img
							src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
							alt="Watch Thumbnail"
							width={150}
							className="rounded-3xl cursor-pointer border-2 border-transparent hover:border-gray-400"
						/>
					</div>
				</div>

				{/* Second Div (Product Details) */}
				<div className="flex-grow p-6 bg-gray-800 rounded-lg">
					{" "}
					{/* Added flex-grow */}
					<h2 className="text-3xl font-bold">Luxury Watch</h2>
					<p className="text-gray-400 mt-1">
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
					</p>
					{/* Star Rating */}
					<div className="flex items-center gap-1 mt-3">
						<p className="text-yellow-400 font-semibold">(4.5)</p>
						<Star size={20} className="text-yellow-400" />
						<Star size={20} className="text-yellow-400" />
						<Star size={20} className="text-yellow-400" />
						<Star size={20} className="text-yellow-400" />
						<Star size={20} className="text-gray-500" />
					</div>
					{/* Product Description */}
					<p className="text-gray-300 mt-4">
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Quas explicabo molestias enim. Ipsa quos facere
						reprehenderit iusto commodi quisquam sequi pariatur
						accusamus repudiandae fugiat aspernatur, veritatis tempora
						provident deserunt assumenda?
					</p>
					{/* Stock Availability */}
					<p className="mt-4 text-red-400">
						Only <span className="font-bold">(5)</span> items left in
						stock!
					</p>
					{/* Price and Quantity Selector */}
					<div className="flex items-center justify-between mt-6">
						{/* Price */}
						<p className="text-3xl font-bold text-green-400">$360</p>

						{/* Quantity Selector */}
						<div className="flex items-center gap-4 border border-gray-500 px-4 py-2 rounded-lg">
							<Minus
								size={20}
								className="cursor-pointer text-gray-300 hover:text-white"
							/>
							<p className="text-lg">1</p>
							<Plus
								size={20}
								className="cursor-pointer text-gray-300 hover:text-white"
							/>
						</div>
					</div>
					{/* Buy & Add to Cart Buttons */}
					<div className="mt-6 flex gap-4">
						<button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg text-lg font-semibold">
							Buy Now
						</button>
						<button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg text-lg font-semibold">
							Add to Cart
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
