"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
import { Eye, EyeOff } from "lucide-react";

export default function ResetPassword() {
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const searchParams = useSearchParams();
	const token = searchParams.get("token");

	const handleReset = async (e: React.FormEvent) => {
		e.preventDefault();

		if (newPassword !== confirmPassword) {
			toast.error("Passwords do not match");
			return;
		}

		setLoading(true);
		try {
			const response = await fetch("/api/reset-password", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ token, newPassword }),
			});

			const data = await response.json();

			if (response.ok) {
				toast.success(data.msg);
				router.push("/login");
			} else {
				toast.error(data.error);
			}
		} catch (error) {
			toast.error("Failed to reset password");
		}
		setLoading(false);
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-50">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle>Reset Password</CardTitle>
					<CardDescription>Enter your new password</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleReset}>
						<div className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="newPassword">New Password</Label>
								<div className="relative">
									<Input
										id="newPassword"
										type={showPassword ? "text" : "password"}
										value={newPassword}
										onChange={(e) => setNewPassword(e.target.value)}
										required
									/>
									<button
										type="button"
										onClick={() => setShowPassword(!showPassword)}
										className="absolute right-3 top-1/2 -translate-y-1/2"
									>
										{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
									</button>
								</div>
							</div>
							<div className="space-y-2">
								<Label htmlFor="confirmPassword">Confirm Password</Label>
								<div className="relative">
								<Input
									id="confirmPassword"
									type={showConfirmPassword ? "text" : "password"}
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
									required
								/>
								<button
									type="button"
									onClick={() => setShowConfirmPassword(!showConfirmPassword)}
									className="absolute right-3 top-1/2 -translate-y-1/2"
								>
									{showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
								</button>
								</div>
							</div>
						</div>
					</form>
				</CardContent>
				<CardFooter>
					<Button
						className="w-full bg-purple-600 text-white hover:bg-purple-600/90"
						onClick={handleReset}
						disabled={loading}
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
							"Reset Password"
						)}
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
