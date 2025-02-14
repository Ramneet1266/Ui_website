"use client"
import React from "react"
import FilterSideBar from "../component/StoreData/FilterSideBar"
import MainData from "../component/StoreData/MainData"

export default function page() {
	return (
		<div className="px-56 py-10 custom-bg-home flex items-start gap-10">
			{/* First Div */}
			<FilterSideBar />
			{/* Second Div (Taking more space) */}
			<div className="flex-grow p-4">
				<MainData />
			</div>
		</div>
	)
}
