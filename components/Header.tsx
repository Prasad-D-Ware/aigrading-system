"use client";

import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
	const router = useRouter();
	const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    // Access localStorage only in the browser
    if (typeof window !== "undefined") {
      setUsername(localStorage.getItem("username"));
    }
  }, []);

	return (
		<motion.header
			className="bg-white"
			initial={{ opacity: 0, y: -50 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
				<div className="flex items-center justify-between h-16">
					<motion.div
						className="flex items-center"
						whileHover={{ scale: 1.05 }}
					>
						<Link href="/" className="flex items-center">
							<GraduationCap className="h-8 w-8 text-purple-600" />
							<span className="ml-2 text-xl font-bold text-gray-900">
								GradeAI
							</span>
						</Link>
					</motion.div>
					{!username && (
						<nav className="hidden md:flex space-x-4">
							<Link
								href="#features"
								className="text-gray-600 hover:text-gray-900"
							>
								Features
							</Link>
							<Link
								href="#testimonials"
								className="text-gray-600 hover:text-gray-900"
							>
								Testimonials
							</Link>
						</nav>
					)}
					{!username ? (
						<button
							className="px-4 py-2 rounded-md bg-purple-600 text-white"
							onClick={() => router.push("/login")}
						>
							Login
						</button>
					) : (
						<div className="bg-purple-600 h-10 w-10 rounded-full flex items-center justify-center text-white shadow-xl">
							{username[0].toUpperCase()}
						</div>
					)}
				</div>
			</div>
		</motion.header>
	);
}
