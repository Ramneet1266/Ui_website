"use client"

import { useState, useEffect } from "react"
import Navbar from "../app/component/Navbar"
import "./globals.css"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Footer from "../app/component/Footer"
import { StoreProvider } from "./context/StoreContext"
import { auth } from "@/app/lib/firebase"
import { ToastContainer } from "react-toastify"
import LoginPage from "./LoginPage/page"
export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	const [isAuthenticated, setIsAuthenticated] =
		useState<boolean>(false)

	// Check the user authentication state on mount
	useEffect(() => {
		// Check if the user is in localStorage
		const storedUser = localStorage.getItem("user")
		if (storedUser) {
			setIsAuthenticated(true)
		} else {
			const unsubscribe = auth.onAuthStateChanged((user) => {
				setIsAuthenticated(!!user) // Update state based on user
			})

			// Cleanup subscription on unmount
			return () => unsubscribe()
		}
	}, [])

	return (
		<html lang="en">
			<body className="flex flex-col min-h-screen">
				<ToastContainer autoClose={3000} position="top-right" />
				<StoreProvider>

					{isAuthenticated ? (
						<>
							<Navbar />
							<main className="flex-grow">{children}</main>
							<Footer />
						</>
					) : (
						<LoginPage />
					)}
				</StoreProvider>
				
			</body>
		</html>
	)
}
