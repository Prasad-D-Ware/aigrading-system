"use client";
import StudentCard from "@/components/students/StudentCard";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
	GitFork,
	Star,
	Eye,
	Code,
	Calendar,
} from "lucide-react";
import { useAuthStore } from "@/store/auth-store";

type Contributor = {
	username: string;
	id: number;
	avatarUrl: string;
	contributions: number;
	profileUrl: string;
};

type Project = {
	project_id: string;
	project_name: string;
	full_name: string;
	project_url: string;
	description: string;
	updated_at: string;
	forks: string;
	stars: string;
	visibility: string;
	language: string;
	contributors: Contributor[];
};

type ProjectResponse = {
	project: Project;
};
const ProjectDetails = ({ project_id }: { project_id: string }) => {
	const [project, setProject] = useState<Project>();
	const { token } = useAuthStore();

	const fetchStudents = async () => {
		try {
			const response = await fetch("/api/getprojectstudents", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + token,
				},
				body: JSON.stringify({ project_id }),
			});

			const data: ProjectResponse = await response.json();

			//   console.log(contributors)

			if (!data.project) {
				console.log("no project found!");
			}

			setProject(data.project);
		} catch (error: any) {
			console.log(error.message);
		}
	};

	useEffect(() => {
		if (token) {
			fetchStudents();
		}
	}, [project_id, token]); // Added project_id to dependency array

	return (
		<div className="mx-auto max-w-5xl p-3 md:p-10">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				<Card className="w-full">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-2xl font-bold">
							<a
								href={project?.project_url}
								target="_blank"
								rel="noopener noreferrer"
								className="text-purple-600 hover:underline"
							>
								{project?.project_name}
							</a>
						</CardTitle>
						<div className="flex items-center gap-4">
							<Badge variant="secondary" className="flex items-center gap-1">
								<Star className="w-4 h-4" />
								{project?.stars}
							</Badge>
							<Badge variant="secondary" className="flex items-center gap-1">
								<GitFork className="w-4 h-4" />
								{project?.forks}
							</Badge>
						</div>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<p className="text-sm text-gray-500">{project?.full_name}</p>
							{project?.description && (
								<p className="text-gray-700">{project?.description}</p>
							)}
							<div className="flex flex-wrap gap-2">
								<Badge variant="outline" className="flex items-center gap-1">
									<Eye className="w-4 h-4" />
									{project?.visibility}
								</Badge>
								<Badge variant="outline" className="flex items-center gap-1">
									<Code className="w-4 h-4" />
									{project?.language}
								</Badge>
								<Badge variant="outline" className="flex items-center gap-1">
									<Calendar className="w-4 h-4" />
									{project?.updated_at
										? new Date(project.updated_at).toLocaleDateString()
										: ""}
								</Badge>
							</div>
						</div>
					</CardContent>
				</Card>
			</motion.div>
			<hr className="my-5 font-bold" />
			<div className="flex flex-wrap gap-4 ">
				{project?.contributors.map((contributor: Contributor) =>
					contributor.username ? (
						<StudentCard
							key={contributor.username}
							username={contributor.username as string}
							id={contributor.id}
							avatarUrl={contributor.avatarUrl}
							contributions={contributor.contributions}
							profileUrl={contributor.profileUrl}
						/>
					) : null
				)}
			</div>
		</div>
	);
};

export default ProjectDetails;
