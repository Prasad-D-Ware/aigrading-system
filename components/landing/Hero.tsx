"use client";

import { useAuthStore } from "@/store/auth-store";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Code, Sparkles, Zap } from "lucide-react";

export default function Hero() {
	const router = useRouter();
	const { username } = useAuthStore();
	return (
		<section className="py-24 sm:py-32">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="max-w-4xl mx-auto text-center">
					<motion.div
						className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 text-purple-700 mb-8"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
					>
						<Sparkles className="w-4 h-4 mr-2" />
						<span className="text-sm font-medium">AI-Powered Code Grading</span>
					</motion.div>
					<motion.h1
						className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6 text-gray-900"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
					>
						Grade Smarter,{" "}
						<span className="text-purple-600">Not Harder</span>
					</motion.h1>
					<motion.p
						className="text-xl sm:text-2xl mb-12 text-gray-600 max-w-2xl mx-auto"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.4 }}
					>
						Revolutionize your grading process with AI-powered code analysis and instant feedback.
					</motion.p>
					<motion.div
						className="flex flex-col sm:flex-row gap-4 items-center justify-center"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.6 }}
					>
						<button
							className="px-8 py-3 border-2 border-purple-600 rounded-xl bg-purple-600 text-white hover:bg-purple-700 transition-colors duration-200 flex items-center gap-2 w-full sm:w-auto justify-center"
							onClick={() => router.push("/signup")}
						>
							<Zap className="w-5 h-5" />
							Start Grading for Free
						</button>
						{username && (
							<button
								className="px-8 py-3 rounded-xl border-2 border-purple-600 text-purple-600 hover:bg-purple-50 transition-colors duration-200 flex items-center gap-2 w-full sm:w-auto justify-center"
								onClick={() => router.push("/projects")}
							>
								<Code className="w-5 h-5" />
								View Projects
							</button>
						)}
					</motion.div>
					<motion.div
						className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-3xl mx-auto"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.8 }}
					>
						<div className="text-center">
							<div className="text-3xl font-bold text-purple-600 mb-2">98%</div>
							<div className="text-sm text-gray-600">Accuracy Rate</div>
						</div>
						<div className="text-center">
							<div className="text-3xl font-bold text-purple-600 mb-2">10x</div>
							<div className="text-sm text-gray-600">Faster Grading</div>
						</div>
						<div className="text-center">
							<div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
							<div className="text-sm text-gray-600">Availability</div>
						</div>
						<div className="text-center">
							<div className="text-3xl font-bold text-purple-600 mb-2">1000+</div>
							<div className="text-sm text-gray-600">Happy Educators</div>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
