"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GitFork, Star, Users, Eye, Code, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { useState } from "react";
import { useAuthStore } from "@/store/auth-store";
import Loader from "../Loader";

export interface ProjectInfoProps {
	project_id: string;
	project_name: string;
	full_name: string;
	project_url: string;
	project_creator: string;
	description: string | null;
	no_of_contributors: number;
	created_at: string;
	updated_at: string;
	forks: string;
	stars: string;
	visibility: string;
	language: string;
	contributers: string[];
}

export default function ProjectInfo({
	project_id,
	project_name,
	full_name,
	project_creator,
	description,
	no_of_contributors,
	created_at,
	updated_at,
	forks,
	stars,
	visibility,
	language,
	onProjectDeleted,
}: ProjectInfoProps & { onProjectDeleted: () => void }) {
	const router = useRouter();
	const [open, setOpen] = useState(false);
	const { token } = useAuthStore();
	const [loading, setLoading] = useState(false);
	const deleteProject = async () => {
		// console.log(project_id);
		try {
			setLoading(true);
			const res: any = await fetch("/api/deleteproject", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + token,
				},
				body: JSON.stringify({ project_id }),
			});

			const response = await res.json();
			// console.log(response)
			if (response.success) {
				setOpen(false);
				setLoading(false);
				toast.success(response.msg);
				onProjectDeleted();
			} else {
				setLoading(false);
				toast.error(response.msg);
			}
		} catch (error: any) {
			setLoading(false);
			console.log("Error Deleting project", error.message);
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<Card
				className="w-full max-w-3xl mx-auto"
				onClick={() => router.push(`/projects/${project_id}`)}
			>
				<CardHeader>
					<CardTitle className="text-2xl font-bold">
						<div className="flex justify-between">
							<div className="text-purple-600 hover:underline">
								{project_name}
							</div>
							<Dialog open={open} onOpenChange={setOpen}>
								<DialogTrigger onClick={(e) => e.stopPropagation()}>
									<Trash2 color="red" className="cursor-pointer" />
								</DialogTrigger>
								<DialogContent onClick={(e) => e.stopPropagation()}>
									<DialogHeader>
										<DialogTitle>
											Are you sure you want to delete this project?
										</DialogTitle>
										<DialogDescription>
											This action cannot be undone. This will permanently delete
											the project and all associated student data from our
											servers.
										</DialogDescription>
									</DialogHeader>
									<div className="flex justify-end gap-3 mt-4">
										<DialogClose asChild>
											<button
												className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
												onClick={(e) => e.stopPropagation()}
											>
												Cancel
											</button>
										</DialogClose>
										{/* <DialogClose asChild> */}
											<button
												className="w-44 h-10 flex justify-center items-center bg-red-600 text-white rounded-md hover:bg-red-700"
												onClick={(e) => {
													e.stopPropagation();
													deleteProject();
												}}
											>
												{loading ? (
													<Loader />
												) : (
													"Delete Project"
												)}
											</button>
										{/* </DialogClose> */}
									</div>
								</DialogContent>
							</Dialog>
						</div>
					</CardTitle>
					<p className="text-sm text-gray-500">{full_name}</p>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						{description && <p className="text-gray-700">{description}</p>}
						<div className="flex flex-wrap gap-2">
							<Badge variant="secondary" className="flex items-center gap-1">
								<Eye className="w-4 h-4" />
								{visibility}
							</Badge>
							<Badge variant="secondary" className="flex items-center gap-1">
								<Code className="w-4 h-4" />
								{language}
							</Badge>
							<Badge variant="secondary" className="flex items-center gap-1">
								<Star className="w-4 h-4" />
								{stars}
							</Badge>
							<Badge variant="secondary" className="flex items-center gap-1">
								<GitFork className="w-4 h-4" />
								{forks}
							</Badge>
							<Badge variant="secondary" className="flex items-center gap-1">
								<Users className="w-4 h-4" />
								{no_of_contributors}
							</Badge>
						</div>
						<div className="grid grid-cols-3 gap-4 text-sm">
							<div>
								<p className="text-gray-500">Created by</p>
								<p className="font-medium">{project_creator}</p>
							</div>
							<div>
								<p className="text-gray-500">Created at</p>
								<p className="font-medium">
									{new Date(created_at).toLocaleDateString()}
								</p>
							</div>
							<div>
								<p className="text-gray-500">Last updated</p>
								<p className="font-medium">
									{new Date(updated_at).toLocaleDateString()}
								</p>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</motion.div>
	);
}
