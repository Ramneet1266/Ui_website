import React from "react"
import { MoveRight } from "lucide-react"

export default function Banner() {
	return (
		<div className="custom-banner-color ">
			<div className="flex justify-around items-center py-5">
				<div className="flex flex-col gap-3 text-white justify-center items-center">
					<h2 className="font-bold text-6xl">Discover the Latest</h2>
					<h2 className="font-bold text-6xl">Gadgets</h2>
					<h2 className="font-bold text-6xl">With Exciting Deals</h2>
					<p className="text-lg">
						Explore a wide range of electronics at unbeatable prices
					</p>
					<div className="flex gap-3 py-2 items-center justify-center rounded-full px-3 bg-white text-black text-lg mt-3">
						<MoveRight />
						<button>Shop Now</button>
					</div>
				</div>
				<img
					src="/images/headphone_main.png"
					height={400}
					width={400}
				/>
			</div>
		</div>
	)
}
