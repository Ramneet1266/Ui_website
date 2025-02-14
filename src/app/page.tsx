"use client"
import { useState } from "react"
import { ChevronDown } from "lucide-react"
import Cards from "./component/Cards"
import Services from "./component/Services"
import FeaturedProduct from "./component/FeaturedProduct"
import Banner from "./component/Banner"
import Comments from "./component/Comments"
import Footer from "./component/Footer"
import Slider from "react-slick"

export default function Home() {
	const [isOpen, setIsOpen] = useState(false)
	const categories = [
		"All",
		"Clothes",
		"Food",
		"Jewellery",
		"Accessories",
	]
	const settings = {
		dots: false, // No navigation dots
		arrows: false, // Hide left/right arrows
		infinite: true, // Enable looping
		speed: 1000, // Transition speed (1s)
		slidesToShow: 4, // Show 4 comments per slide
		slidesToScroll: 1, // Move 1 slide at a time
		autoplay: true, // Enable auto sliding
		autoplaySpeed: 2000, // Slide every 2 seconds
		cssEase: "linear", // Smooth linear animation
		pauseOnHover: false, // Don't stop when hovered
		draggable: false, // Prevent manual dragging
		swipe: false, // Disable swipe interaction
	}

	return (
		<div className="flex flex-col overflow-hidden">
			<div className="custom-bg px-20 pb-20">
				<div className="relative w-48 mr-10 mt-10 ml-10">
					<button
						onClick={() => setIsOpen(!isOpen)}
						className="flex justify-between items-center w-[200px] px-4 py-2 text-white bg-blue-500 rounded-lg shadow-md"
					>
						Select Category <ChevronDown className="w-4 h-4" />
					</button>
					{isOpen && (
						<div className="absolute w-full mt-2 bg-white border rounded-lg shadow-lg">
							{categories.map((category) => (
								<div
									key={category}
									className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
									onClick={() => setIsOpen(false)}
								>
									{category}
								</div>
							))}
						</div>
					)}
				</div>
				<div className=" ml-10 mt-10 mr-10">
					<div className=" gap-10 grid grid-cols-4 w-full">
						<FeaturedProduct />
						<FeaturedProduct />
						<FeaturedProduct />
						<FeaturedProduct />
					</div>
				</div>
			</div>
			<div className="custom-bg-home px-20 pt-20 pb-20">
				<div className="flex items-center justify-between">
					<h3 className="text-white font-bold text-5xl mb-10 pb-5 border-b-4">
						Featured Products
					</h3>
					<div className="flex items-center justify-center gap-10 bottom-12 mr-20 relative text-white text-2xl">
						<span className="">Top Rated</span>
						<span>Top Rated</span>
						<span>Top Rated</span>
					</div>
				</div>
				<div className=" gap-10 grid grid-cols-4">
					<Cards />
					<Cards />
					<Cards />
					<Cards />
				</div>
			</div>
			<div className="custom-bg py-20 px-20 ">
				<h2 className="text-white font-bold text-5xl mb-10 pb-5 border-b-4">
					Discover Our Advantages
				</h2>
				<div className="gap-10 grid grid-cols-4">
					<Services />
					<Services />
					<Services />
					<Services />
				</div>
				<div></div>
			</div>
			<Banner />
			<div className="custom-bg py-20 px-20">
				<h2 className="text-white font-bold text-5xl mb-10 pb-5 border-b-4">
					What Our Customers Say
				</h2>
				<div className="w-full mx-auto">
					<Slider key={Math.random()} {...settings}>
						<Comments />
						<Comments />
						<Comments />
						<Comments />
						<Comments />
						<Comments />
						<Comments />
						<Comments />
					</Slider>
				</div>
			</div>
		</div>
	)
}
