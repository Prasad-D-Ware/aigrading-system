"use client";
import { AddProject } from "@/components/projects/AddProject";
import ProjectInfo, { ProjectInfoProps } from "@/components/projects/ProjectInfo";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/auth-store";
import React, { useEffect, useState } from "react";

const Project = () => {
	const [projects, setProjects] = useState([]);
	const [msg, setMsg] = useState();
	const [searchQuery, setSearchQuery] = useState("");
	const { username, token } = useAuthStore();

	const fetchProjects = async () => {
		try {
			const response = await fetch("/api/getprojects", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + token
				},
				body: JSON.stringify({ username }),
			});

			const data = await response.json();
			if (data.projects) {
				// console.log("Projects received:", data.projects);
				setProjects(data.projects);
			} else {
				console.log("No projects found");
				setProjects([]);
				setMsg(data.msg);
			}
		} catch (error: any) {
			console.log(error.message);
			setProjects([]);
		}
	};

	useEffect(() => {
		if (username) {
			fetchProjects();
		}
	}, [username]);

	// Filter projects based on search query
	const filteredProjects = projects.filter((project: ProjectInfoProps) =>
		project.project_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
		project.description?.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<div className=" ">
			<div className="flex gap-2 items-center justify-center mt-10 md:mt-20 px-4">
				<Input 
					className="w-[700px]" 
					placeholder="Search projects..."
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
				<AddProject onProjectAdded={fetchProjects} />
			</div>

			<div className="my-10 flex flex-col gap-3 px-4">
				{filteredProjects?.length > 0 ? (
					filteredProjects?.map((project: ProjectInfoProps) => {
						return <ProjectInfo {...project} key={project?.project_id} />;
					})
				) : (
					<div className="flex flex-col justify-center items-center font-bold text-xl">
						{searchQuery ? "No matching projects found" : msg}
					</div>
				)}
			</div>
		</div>
	);
};

export default Project;
