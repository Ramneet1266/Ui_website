"use client";

import Navbar from "../app/component/Navbar";
import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "../app/component/Footer";
import { StoreProvider } from "./context/StoreContext";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { auth } from "@/app/lib/firebase"; 
import { onAuthStateChanged } from "firebase/auth";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setLoading(false);

      // Redirect to LoginPage if not authenticated
      if (!user && pathname !== "/LoginPage") {
        router.push("/LoginPage");
      }
    });

    return () => unsubscribe();
  }, [pathname, router]);

  const showNavbar = isAuthenticated && pathname !== "/LoginPage";

  if (loading) return <div>Loading...</div>;

  return (
	<html lang="en">
		<body>
			<StoreProvider>
			{showNavbar && <Navbar />}
			<main>{children}</main>
			<Footer />
			</StoreProvider>
		</body>
	</html>
  );
}
