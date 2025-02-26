// // // "use client"
// // // import React, { useState } from "react"
// // // import { useRouter } from "next/navigation"
// // // import { toast } from "react-toastify"
// // // import {
// // // 	registerService,
// // // 	loginService,
// // // } from "../component/firebaseUtil"

// // // export default function LoginPage() {
// // // 	const [email, setEmail] = useState("")
// // // 	const [password, setPassword] = useState("")
// // // 	const [name, setName] = useState("") // For registration
// // // 	const [isLogin, setIsLogin] = useState(true) // Toggle between login and registration
// // // 	const [error, setError] = useState("")
// // // 	const router = useRouter()

// // // 	// Handle user registration
// // // 	const handleRegister = async (e: any) => {
// // // 		e.preventDefault()
// // // 		setError("")

// // // 		// if (!email || !password || !name) {
// // // 		// 	setError("Please fill all the fields.")
// // // 		// 	return
// // // 		// }

// // // 		try {
// // // 			const user = await registerService(email, password, name) // Call the register service
// // // 			if (user) {
// // // 				toast.success("Registration successful! Please log in now.")
// // // 				setIsLogin(true) // Switch to login after successful registration
// // // 			}
// // // 		} catch (error) {
// // // 			toast.error("Error during registration: " + error)
// // // 		}
// // // 	}

// // // 	// Handle user login
// // // 	const handleLogin = async (e: any) => {
// // // 		e.preventDefault()
// // // 		setError("")

// // // 		if (!email || !password) {
// // // 			setError("Please fill in all fields.")
// // // 			return
// // // 		}

// // // 		try {
// // // 			const res = await loginService(email, password)
// // // 			if (res) {
// // // 				toast.success("Login successful!")
// // // 				router.push("/") // Redirect to homepage on successful login
// // // 			}
// // // 		} catch (error) {
// // // 			toast.error("Failed to log in: " + error)
// // // 		}
// // // 	}

// // // 	return (
// // // 		<div className="h-[100vh] items-center flex bg-gradient justify-center px-5 lg:px-0">
// // // 			<div className="max-w-screen-lg bg-white shadow-2xl sm:rounded-lg flex justify-center flex-1">
// // // 				<div className="flex-1 bg-blue-900 rounded-tl-lg rounded-bl-lg text-center hidden md:flex">
// // // 					<div
// // // 						className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
// // // 						style={{
// // // 							backgroundImage: `url(https://www.tailwindtap.com/assets/common/marketing.svg)`,
// // // 						}}
// // // 					></div>
// // // 				</div>
// // // 				<div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
// // // 					<div className="flex flex-col items-center">
// // // 						<div className="text-center">
// // // 							<h1 className="text-2xl mb-5 xl:text-4xl font-extrabold text-blue-900">
// // // 								{isLogin ? "User Login" : "User Registration"}
// // // 							</h1>
// // // 							<p className="text-[16px] text-gray-500">
// // // 								Hey, enter your details to{" "}
// // // 								{isLogin ? "login" : "register"}
// // // 							</p>
// // // 						</div>
// // // 						<div className="w-full flex-1 mt-8">
// // // 							<div className="mx-auto max-w-xs flex flex-col gap-4">
// // // 								{error && <p className="text-red-500">{error}</p>}
// // // 								<form className="flex flex-col mb-10 gap-4">
// // // 									{!isLogin && (
// // // 										<input
// // // 											type="text"
// // // 											className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
// // // 											onChange={(e) => setName(e.target.value)}
// // // 											placeholder="Enter your name"
// // // 										/>
// // // 									)}
// // // 									<input
// // // 										type="email"
// // // 										className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
// // // 										onChange={(e) => setEmail(e.target.value)}
// // // 										placeholder="Enter your email"
// // // 									/>
// // // 									<input
// // // 										type="password"
// // // 										className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
// // // 										onChange={(e) => setPassword(e.target.value)}
// // // 										placeholder="Password"
// // // 									/>
// // // 									{isLogin ? (
// // // 										<button
// // // 											onClick={handleLogin}
// // // 											className="mt-5 tracking-wide font-semibold bg-blue-900 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
// // // 										>
// // // 											<span className="ml-3">User Login</span>
// // // 										</button>
// // // 									) : (
// // // 										<button
// // // 											onClick={handleRegister}
// // // 											className="mt-5 tracking-wide font-semibold bg-blue-900 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
// // // 										>
// // // 											<span className="ml-3">Register</span>
// // // 										</button>
// // // 									)}
// // // 								</form>
// // // 								<p
// // // 									className="mt-4 text-sm text-blue-900 cursor-pointer"
// // // 									onClick={() => setIsLogin(!isLogin)} // Toggle between login and register
// // // 								>
// // // 									{isLogin
// // // 										? "Don't have an account? Register here"
// // // 										: "Already have an account? Login"}
// // // 								</p>
// // // 							</div>
// // // 						</div>
// // // 					</div>
// // // 				</div>
// // // 			</div>
// // // 		</div>
// // // 	)
// // // }


// // "use client";

// // import { useRouter } from "next/navigation";
// // import { useState } from "react";
// // import { signInWithEmailAndPassword } from "firebase/auth";
// // import { auth } from "@/app/lib/firebase"; // Import Firebase auth

// // export default function LoginPage() {
// // 	const [email, setEmail] = useState("");
// // 	const [password, setPassword] = useState("");
// // 	const [error, setError] = useState("");
// // 	const router = useRouter();

// // 	const handleLogin = async (e: any) => {
// // 		e.preventDefault();
// // 		setError(""); // Clear previous errors
// // 		try {
// // 			await signInWithEmailAndPassword(auth, email, password);
// // 			router.push("/"); // Redirect to home after successful login
// // 		} catch (err: any) {
// // 			setError("Invalid email or password.");
// // 		}
// // 	};

// // 	return (
// // 		<div className="h-screen flex justify-center items-center">
// // 			<form onSubmit={handleLogin} className="p-5 border rounded-lg">
// // 				<h2>Login</h2>
// // 				{error && <p className="text-red-500">{error}</p>}
// // 				<input
// // 					type="email"
// // 					placeholder="Email"
// // 					onChange={(e) => setEmail(e.target.value)}
// // 					className="border p-2 w-full"
// // 				/>
// // 				<input
// // 					type="password"
// // 					placeholder="Password"
// // 					onChange={(e) => setPassword(e.target.value)}
// // 					className="border p-2 w-full mt-2"
// // 				/>
// // 				<button type="submit" className="bg-blue-500 text-white p-2 mt-2">
// // 					Login
// // 				</button>
// // 			</form>
// // 		</div>
// // 	);
// // }







// "use client";

// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { auth, db } from "@/app/lib/firebase"; // Firebase auth & Firestore
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
// import { doc, setDoc } from "firebase/firestore";

// export default function AuthPage() {
// 	const [email, setEmail] = useState("");
// 	const [password, setPassword] = useState("");
// 	const [name, setName] = useState("");
// 	const [isLogin, setIsLogin] = useState(true);
// 	const [error, setError] = useState("");
// 	const router = useRouter();

// 	const handleRegister = async (e: any) => {
// 		e.preventDefault();
// 		setError("");

// 		if (!email || !password || !name) {
// 			setError("Please fill all fields.");
// 			return;
// 		}

// 		try {
// 			const userCredential = await createUserWithEmailAndPassword(auth, email, password);
// 			const user = userCredential.user;

// 			// Store user details in Firestore
// 			await setDoc(doc(db, "users", user.uid), {
// 				name,
// 				email,
// 				uid: user.uid,
// 			});

// 			alert("Registration successful! You can now log in.");
// 			setIsLogin(true);
// 		} catch (err: any) {
// 			setError(err.message);
// 		}
// 	};

// 	const handleLogin = async (e: any) => {
// 		e.preventDefault();
// 		setError("");

// 		try {
// 			await signInWithEmailAndPassword(auth, email, password);
// 			router.push("/");
// 		} catch (err: any) {
// 			setError("Invalid email or password.");
// 		}
// 	};

// 	return (
// 		// <div className="h-screen flex justify-center items-center">
// 		// 	<form onSubmit={isLogin ? handleLogin : handleRegister} className="p-5 border rounded-lg">
// 		// 		<h2>{isLogin ? "Login" : "Register"}</h2>
// 		// 		{error && <p className="text-red-500">{error}</p>}
// 		// 		{!isLogin && (
// 		// 			<input
// 		// 				type="text"
// 		// 				placeholder="Name"
// 		// 				onChange={(e) => setName(e.target.value)}
// 		// 				className="border p-2 w-full"
// 		// 			/>
// 		// 		)}
// 		// 		<input
// 		// 			type="email"
// 		// 			placeholder="Email"
// 		// 			onChange={(e) => setEmail(e.target.value)}
// 		// 			className="border p-2 w-full"
// 		// 		/>
// 		// 		<input
// 		// 			type="password"
// 		// 			placeholder="Password"
// 		// 			onChange={(e) => setPassword(e.target.value)}
// 		// 			className="border p-2 w-full mt-2"
// 		// 		/>
// 		// 		<button type="submit" className="bg-blue-500 text-white p-2 mt-2 w-full">
// 		// 			{isLogin ? "Login" : "Register"}
// 		// 		</button>
// 		// 		<p className="mt-2 text-sm cursor-pointer text-blue-500" onClick={() => setIsLogin(!isLogin)}>
// 		// 			{isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
// 		// 		</p>
// 		// 	</form>
// 		// </div>







// 		<div className="h-[100vh] items-center flex bg-gradient justify-center px-5 lg:px-0">
// 			<div className="max-w-screen-lg bg-white shadow-2xl sm:rounded-lg flex justify-center flex-1">
// 				<div className="flex-1 bg-blue-900 rounded-tl-lg rounded-bl-lg text-center hidden md:flex">
// 					<div
// 						className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
// 						style={{
// 							backgroundImage: `url(https://www.tailwindtap.com/assets/common/marketing.svg)`,
// 						}}
// 					></div>
// 				</div>
// 				<div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
// 					<div className="flex flex-col items-center">
// 						<div className="text-center">
// 							<h1 className="text-2xl mb-5 xl:text-4xl font-extrabold text-blue-900">
// 								{isLogin ? "User Login" : "User Registration"}
// 							</h1>
// 							<p className="text-[16px] text-gray-500">
// 								Hey, enter your details to{" "}
// 								{isLogin ? "login" : "register"}
// 							</p>
// 						</div>
// 						<div className="w-full flex-1 mt-8">
// 							<div className="mx-auto max-w-xs flex flex-col gap-4">
// 								{error && <p className="text-red-500">{error}</p>}
// 								<form className="flex flex-col mb-10 gap-4">
// 									{!isLogin && (
// 										<input
// 											type="text"
// 											className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
// 											onChange={(e) => setName(e.target.value)}
// 											placeholder="Enter your name"
// 										/>
// 									)}									<input
// 										type="email"
// 										className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
// 										onChange={(e) => setEmail(e.target.value)}
// 										placeholder="Enter your email"
// 									/>
// 									<input
// 										type="password"
// 										className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
// 										onChange={(e) => setPassword(e.target.value)}
//  										placeholder="Password"
//  									/>
// 									{isLogin ? (
// 										<button
// 											onClick={handleLogin}
// 											className="mt-5 tracking-wide font-semibold bg-blue-900 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
// 										>
// 											<span className="ml-3">User Login</span>
// 										</button>
//  									) : (
// 										<button
// 											onClick={handleRegister}
// 											className="mt-5 tracking-wide font-semibold bg-blue-900 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
// 										>
// 											<span className="ml-3">Register</span>
// 										</button>
// 									)}
// 								</form>
// 								<p
// 									className="mt-4 text-sm text-blue-900 cursor-pointer"
// 									onClick={() => setIsLogin(!isLogin)} // Toggle between login and register
//  								>
//  									{isLogin
//  										? "Don't have an account? Register here"
//  										: "Already have an account? Login"}
//  								</p>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
//  			</div>
//  		</div>
// 	);
// }






































"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/app/lib/firebase"; // Ensure db is exported from your firebase config

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (error: any) {
      setError("Invalid email or password.");
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Add user to Firestore
      await setDoc(doc(db, "Users", userCredential.user.uid), {
        name,
        email,
        uid: userCredential.user.uid,
        createdAt: new Date()
      });

      toast.success("Registration successful! Please log in.");
      setIsLogin(true);
      // Clear form fields
      setName("");
      setEmail("");
      setPassword("");
    } catch (error: any) {
      setError(error.message);
    }
  };

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
                <form onSubmit={isLogin ? handleLogin : handleRegister} className="flex flex-col mb-10 gap-4">
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
  );
}