"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
} from "recharts";
import { GitCommit, GitPullRequest, Calendar, Code } from "lucide-react";
import { GradeData, GradeDialog } from "./GradeDialog";
import { useAuthStore } from "@/store/auth-store";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

interface Commit {
	date: string;
	message: string;
	additions: number;
	deletions: number;
	files: {
		name: string;
		changes: number;
		additions: number;
		deletions: number;
	}[];
}

interface WeeklyActivity {
	days: number[];
	total: number;
	week: number;
}

export interface StudentData {
	project_id: string;
	user_id: string;
	github_username: string;
	profile_url: string;
	grade: GradeData;
	avatar_url: string;
	total_commits: number;
	total_additions: number;
	total_deletions: number;
	active_days: number;
	commit_history: Commit[];
	languages: string[];
	weekly_activity: WeeklyActivity[];
}

export interface StudentProfileProps {
	student: StudentData;
}

export default function StudentProfile({ student }: StudentProfileProps) {
	const router = useRouter();
	const [selectedCommit, setSelectedCommit] = useState<Commit | null>(null);
	const [grade, setGrade] = useState<GradeData>(student.grade);
	const [isLoading, setIsLoading] = useState<boolean>();
	const { token } = useAuthStore();

	const activityData = student?.weekly_activity.map((week) => ({
		week: new Date(week.week * 1000).toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
		}),
		activity: week.total,
	}));

	const handleStudentGrading = async () => {
		const user_id = student.user_id;
		try {
			setIsLoading(true);
			const response = await fetch("/api/grade", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + token,
				},
				body: JSON.stringify({ user_id }),
			});

			const data = await response.json();

			// console.log(data);
			setGrade(data.gradeData);
			setIsLoading(false);
		} catch (error: any) {
			setIsLoading(false);
			console.log(error.message);
		}
	};

	const handleBack = () => {
		router.push(`/projects/${student.project_id}`);
	};

	const handleDownload = async () => {
		try {
			setIsLoading(true);
			const response = await fetch("/api/generate-pdf", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + token,
				},
				body: JSON.stringify({
					gradeData: grade,
					studentName: student.github_username,
					studentData: {
						github_username: student.github_username,
						profile_url: student.profile_url,
						total_commits: student.total_commits,
						total_additions: student.total_additions,
						total_deletions: student.total_deletions,
						active_days: student.active_days,
						languages: student.languages,
						commit_history: student.commit_history,
					},
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to generate PDF");
			}

			// Get the blob from the response
			const blob = await response.blob();

			// Create a URL for the blob
			const url = window.URL.createObjectURL(blob);

			// Create a temporary link element
			const link = document.createElement("a");
			link.href = url;
			link.download = `gradeai-report-${student.github_username}.pdf`;

			// Append to body, click, and remove
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);

			// Clean up the URL
			window.URL.revokeObjectURL(url);
			setIsLoading(false);
			toast.success("PDF successfully downloaded!");
		} catch (error: any) {
			console.error("Error downloading PDF:", error);
			toast.error("Failed to generate PDF. Please try again.");
			setIsLoading(false);
		}
	};

	return (
		<div className="space-y-6 md:p-5">
			<Card>
				<CardHeader>
					<div className="flex justify-between items-center flex-col sm:flex-row">
						<div className="flex items-center space-x-4 ">
							<Button
								variant="outline"
								onClick={handleBack}
								className="mb-4 rounded-full"
							>
								←
							</Button>
							<Avatar className="w-20 h-20">
								<AvatarImage
									src={student?.avatar_url}
									alt={student?.github_username}
								/>
								<AvatarFallback>
									{student?.github_username.slice(0, 2).toUpperCase()}
								</AvatarFallback>
							</Avatar>
							<div>
								<CardTitle className="text-2xl">
									{student?.github_username}
								</CardTitle>
								<a
									href={student?.profile_url}
									target="_blank"
									rel="noopener noreferrer"
									className="text-sm text-primary hover:underline"
								>
									View GitHub Profile
								</a>
							</div>
						</div>
						{
							<div className="">
								{grade ? (
									<div className="flex gap-6 sm:gap-2 mt-5 sm:mt-0">
										<Button
											className="bg-purple-600 hover:bg-purple-500"
											onClick={handleDownload}
										>
											{isLoading ? (
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
												"Download"
											)}
										</Button>
										<GradeDialog gradeData={grade} />
									</div>
								) : (
									<Button
										className="bg-purple-600 hover:bg-purple-500 w-24"
										onClick={handleStudentGrading}
									>
										{isLoading ? (
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
											"Grade"
										)}
									</Button>
								)}
							</div>
						}
					</div>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
						<div className="flex flex-col items-center p-3 bg-purple-600/10 rounded-lg">
							<GitCommit className="w-6 h-6 text-primary mb-2" />
							<span className="text-sm font-medium">Total Commits</span>
							<span className="text-2xl font-bold">
								{student?.total_commits}
							</span>
						</div>
						<div className="flex flex-col items-center p-3 bg-green-100 rounded-lg">
							<GitPullRequest className="w-6 h-6 text-green-600 mb-2" />
							<span className="text-sm font-medium">Lines Added</span>
							<span className="text-2xl font-bold">
								{student?.total_additions}
							</span>
						</div>
						<div className="flex flex-col items-center p-3 bg-red-100 rounded-lg">
							<GitPullRequest className="w-6 h-6 text-red-600 mb-2" />
							<span className="text-sm font-medium">Lines Deleted</span>
							<span className="text-2xl font-bold">
								{student?.total_deletions}
							</span>
						</div>
						<div className="flex flex-col items-center p-3 bg-blue-100 rounded-lg">
							<Calendar className="w-6 h-6 text-blue-600 mb-2" />
							<span className="text-sm font-medium">Active Days</span>
							<span className="text-2xl font-bold">{student?.active_days}</span>
						</div>
					</div>

					<div className="mb-6">
						<h3 className="text-lg font-semibold mb-2">Weekly Activity</h3>
						<ResponsiveContainer width="100%" height={200}>
							<BarChart data={activityData}>
								<XAxis dataKey="week" />
								<YAxis />
								<Tooltip />
								<Bar dataKey="activity" fill="var(--primary)" />
							</BarChart>
						</ResponsiveContainer>
					</div>

					<div className="mb-6">
						<h3 className="text-lg font-semibold mb-2">Languages Used</h3>
						<div className="flex flex-wrap gap-2">
							{student?.languages.map((lang) => (
								<Badge key={lang} variant="secondary">
									<Code className="w-4 h-4 mr-1" />
									{lang}
								</Badge>
							))}
						</div>
					</div>

					<div>
						<h3 className="text-lg font-semibold mb-2">Commit History</h3>
						<div className="space-y-4">
							{student?.commit_history.map((commit, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.3, delay: index * 0.1 }}
								>
									<Card
										className="cursor-pointer hover:shadow-md transition-shadow"
										onClick={() => setSelectedCommit(commit)}
									>
										<CardContent className="p-4">
											<p className="font-medium">{commit.message}</p>
											<p className="text-sm text-gray-500">
												{new Date(commit.date).toLocaleString()}
											</p>
											<div className="flex gap-4 mt-2">
												<span className="text-green-600">
													+{commit.additions}
												</span>
												<span className="text-red-600">
													-{commit.deletions}
												</span>
											</div>
										</CardContent>
									</Card>
								</motion.div>
							))}
						</div>
					</div>
				</CardContent>
			</Card>

			<Dialog open={!!selectedCommit} onOpenChange={() => setSelectedCommit(null)}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Commit Details</DialogTitle>
					</DialogHeader>
					<div>
						<p className="font-medium">{selectedCommit?.message}</p>
						<p className="text-sm text-gray-500 mb-4">
							{selectedCommit && new Date(selectedCommit.date).toLocaleString()}
						</p>
						<h4 className="font-semibold mb-2">Files Changed:</h4>
						<ul className="space-y-2">
							{selectedCommit?.files.map((file, index) => (
								<li key={index} className="flex justify-between items-center">
									<span>{file.name}</span>
									<div>
										<span className="text-green-600 mr-2">
											+{file.additions}
										</span>
										<span className="text-red-600">-{file.deletions}</span>
									</div>
								</li>
							))}
						</ul>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
}
