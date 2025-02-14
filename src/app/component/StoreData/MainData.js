"use client"
import React from "react"
import { Grid3x3, Menu, Filter } from "lucide-react"
import Cards from "../Cards"

export default function MainData() {
	return (
		<div>
			{" "}
			<div className="text-white flex justify-between items-center">
				<h2 className="text-gray-400">Showing 1-6 of 18 Results</h2>
				<div className="flex items-center gap-5">
					<Grid3x3 size={32} />
					<Menu size={32} />
					<div className="flex items-center gap-2 bg-white text-black py-3 px-5 rounded-xl">
						<Filter size={32} />
						<button className="text-xl">Filter</button>
					</div>
				</div>
			</div>
			<div className="grid grid-cols-3 gap-5 py-5">
				<Cards />
				<Cards />
				<Cards />
				<Cards />
				<Cards />
				<Cards />
			</div>
			<div className="flex items-center justify-center text-white gap-5 text-xl pt-5">
				<p>Previous</p>
				<div className=" flex gap-5">
					<p className="hover:bg-gradient-to-t hover:from-pink-600 hover:to-blue-600 text-white px-3 py-2 rounded-lg">
						1
					</p>
					<p className="hover:bg-gradient-to-t hover:from-pink-600 hover:to-blue-600 text-white px-3 py-2 rounded-lg">
						2
					</p>
					<p className="hover:bg-gradient-to-t hover:from-pink-600 hover:to-blue-600 text-white px-3 py-2 rounded-lg">
						3
					</p>
				</div>
				<p>Next</p>
			</div>
		</div>
	)
}
