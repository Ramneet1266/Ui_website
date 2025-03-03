"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
} from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { auth, db } from "@/app/lib/firebase" // Ensure db is exported from your firebase config

export default function LoginPage() {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [name, setName] = useState("")
	const [isLogin, setIsLogin] = useState(true)
	const [error, setError] = useState("")
	const router = useRouter()

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		console.log("handleLogin function triggered") // Debugging

		setError("")

		if (!email || !password) {
			setError("Please fill in all fields.")
			return
		}

		try {
			console.log("Attempting login...") // Debugging
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			)
			console.log("Login successful!") // Debugging

			toast.success("Login Successful!!")

			const user = userCredential.user
			localStorage.setItem(
				"user",
				JSON.stringify({
					uid: user.uid,
					email: user.email,
					name: user.displayName || "Anonymous",
				})
			)

			console.log("Navigating to /LoginPage...") // Debugging
			router.push("/LoginPage") // Correct navigation

			setTimeout(() => {
				window.location.href = "/LoginPage"
			}, 500) // Fallback in case push doesn't work
		} catch (error: any) {
			console.log("Login failed:", error) // Debugging
			setError("Invalid email or password.")
			toast.error("Login Failed!!")
		}
	}

	const handleRegister = async (e: React.FormEvent) => {
		e.preventDefault()
		setError("")

		if (!name || !email || !password) {
			setError("Please fill in all fields.")
			return
		}

		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			)

			// Add user to Firestore
			await setDoc(doc(db, "Users", userCredential.user.uid), {
				name,
				email,
				uid: userCredential.user.uid,
				createdAt: new Date(),
			})

			toast.success("Registration successful! Please log in.")
			setIsLogin(true)
			// Clear form fields
			setName("")
			setEmail("")
			setPassword("")
		} catch (error: any) {
			toast.error("Registration Failed!")
			setError(error.message)
		}
	}

	return (
		<div className="h-[100vh] items-center flex bg-gradient justify-center px-5 lg:px-0">
			<div className="max-w-screen-lg bg-white shadow-2xl sm:rounded-lg flex justify-center flex-1">
				<div className="flex-1 bg-blue-500 rounded-tl-lg rounded-bl-lg text-center hidden md:flex">
					<div
						className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
						style={{
							backgroundImage: `url(https://www.tailwindtap.com/assets/common/marketing.svg)`,
						}}
					></div>
				</div>
				<div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
					<div className="flex flex-col items-center">
						<div className="text-center">
							<h1 className="text-2xl mb-5 xl:text-4xl font-extrabold text-pink-500">
								{isLogin ? "User Login" : "User Registration"}
							</h1>
							<p className="text-[16px] text-gray-700">
								Hey, enter your details to{" "}
								{isLogin ? "login" : "register"}
							</p>
						</div>
						<div className="w-full flex-1 mt-8">
							<div className="mx-auto max-w-xs flex flex-col gap-4">
								{error && <p className="text-red-500">{error}</p>}
								<form
									onSubmit={isLogin ? handleLogin : handleRegister}
									className="flex flex-col mb-10 gap-4"
								>
									{!isLogin && (
										<input
											type="text"
											value={name}
											className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
											onChange={(e) => setName(e.target.value)}
											placeholder="Enter your name"
										/>
									)}
									<input
										type="email"
										value={email}
										className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
										onChange={(e) => setEmail(e.target.value)}
										placeholder="Enter your email"
									/>
									<input
										type="password"
										value={password}
										className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
										onChange={(e) => setPassword(e.target.value)}
										placeholder="Password"
									/>
									<button
										type="submit"
										className="mt-5 tracking-wide font-semibold bg-pink-400 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
									>
										<span className="ml-3">
											{isLogin ? "User Login" : "Register"}
										</span>
									</button>
								</form>
								<p
									className="mt-4 text-sm text-pink-800 cursor-pointer"
									onClick={() => setIsLogin(!isLogin)}
								>
									{isLogin
										? "Don't have an account? Register here"
										: "Already have an account? Login"}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
