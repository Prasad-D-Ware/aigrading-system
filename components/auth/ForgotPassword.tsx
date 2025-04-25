"use client";

import { useState } from "react";
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
import Loader from "../Loader";

export default function ForgotPassword() {
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);

	const [errors, setErrors] = useState<
		{
			message?: string;
			path?: string[];
		}[]
	>([]);

	const handleForgot = async (e: React.FormEvent) => {
		e.preventDefault();
		setErrors([]); 
		setLoading(true);
		const response = await fetch("/api/forgot-password", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email }),
		});

		const data = await response.json();

		if (data.errors) {
			setErrors(data.errors);
			toast.error(data.msg);
			setLoading(false);
			return;
		}

		if (data.msg) {
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
								Forgot Password
							</CardTitle>
							<CardDescription className="text-center">
								Enter your email to reset your password
							</CardDescription>
						</CardHeader>
						<CardContent>
							<form onSubmit={handleForgot}>
								<div className="grid w-full items-center gap-4">
									<div className="flex flex-col space-y-1.5">
										<Label htmlFor="email">Email</Label>
										<Input
											id="email"
											placeholder="Enter your email"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											required
										/>
										{errors.map(
											(error, index) =>
												error.path?.[0] === "email" && (
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
								onClick={handleForgot}
							>
								{loading ? (
									<Loader/>
								) : (
									"Forgot Password"
								)}
							</Button>
						</CardFooter>
					</Card>
				</motion.div>
			</div>
		</div>
	);
}
