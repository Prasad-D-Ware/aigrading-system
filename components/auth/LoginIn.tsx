"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth-store";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter();
	const { setToken, setTeacherUsername } = useAuthStore();
	const [showPassword, setShowPassword] = useState(false);
	const [loading,setLoading] = useState(false);

	const [errors, setErrors] = useState<
		{
			message?: string;
			path?: string[];
		}[]
	>([]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setErrors([]); // Reset errors on new submission
		setLoading(true);
		const response = await fetch("/api/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username, password }),
		});

		const data = await response.json();

		if (data.errors) {
			setErrors(data.errors);
			toast.error(data.msg);
			setLoading(false);
			return;
		}

		if (data.token) {
			setToken(data.token);
			setTeacherUsername(username);
			router.push("/projects");
			toast.success(data.msg);
		} else {
			toast.error(data.msg);
		}
		setLoading(false);
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-50">
			<div className="w-full max-w-md px-4 py-8">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					<Card className="w-full">
						<CardHeader className="space-y-1">
							<CardTitle className="text-3xl font-bold text-center">
								Login
							</CardTitle>
							<CardDescription className="text-center">
								Enter your credentials to access your account
							</CardDescription>
						</CardHeader>
						<CardContent>
							<form onSubmit={handleSubmit}>
								<div className="grid w-full items-center gap-4">
									<div className="flex flex-col space-y-1.5">
										<Label htmlFor="username">Username</Label>
										<Input
											id="username"
											placeholder="Enter your username"
											value={username}
											onChange={(e) => setUsername(e.target.value)}
											required
										/>
										{errors.map(
											(error, index) =>
												error.path?.[0] === "username" && (
													<p key={index} className="text-sm text-red-500">
														{error.message}
													</p>
												)
										)}
									</div>
									<div className="flex flex-col space-y-1.5">
										<div className="flex justify-between items-center">
											<Label htmlFor="password">Password</Label>
											<Link
												href="/forgot-password"
												className="text-xs text-purple-600 hover:underline"
											>
												Forgot Password?
											</Link>
										</div>
										<div className="relative">
											<Input
												id="password"
												type={showPassword ? "text" : "password"}
												placeholder="Enter your password"
												value={password}
												onChange={(e) => setPassword(e.target.value)}
												required
											/>
											<button
												type="button"
												onClick={() => setShowPassword(!showPassword)}
												className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
											>
												{showPassword ? (
													<EyeOff size={20} />
												) : (
													<Eye size={20} />
												)}
											</button>
										</div>
										{errors.map(
											(error, index) =>
												error.path?.[0] === "password" && (
													<p key={index} className="text-sm text-red-500">
														{error.message}
													</p>
												)
										)}
									</div>
								</div>
							</form>
						</CardContent>
						<CardFooter className="flex flex-col">
							<Button
								className="w-full bg-purple-600 text-white hover:bg-purple-600/90"
								onClick={handleSubmit}
							>
								{loading ? (
												<div className="flex gap-1">
													<div
														className="w-3 h-3 rounded-full bg-white animate-bounce"
														style={{ animationDelay: "0ms" }}
													></div>
													<div
														className="w-3 h-3 rounded-full bg-white animate-bounce"
														style={{ animationDelay: "150ms" }}
													></div>
													<div
														className="w-3 h-3 rounded-full bg-white animate-bounce"
														style={{ animationDelay: "300ms" }}
													></div>
												</div>
											) : (
												"Login"
											)}
							</Button>
							<p className="mt-4 text-sm text-center text-gray-600">
								Don't have an account?
								<Link
									href="/signup"
									className="text-purple-600 hover:underline"
								>
									Sign up
								</Link>
							</p>
						</CardFooter>
					</Card>
				</motion.div>
			</div>
		</div>
	);
}
