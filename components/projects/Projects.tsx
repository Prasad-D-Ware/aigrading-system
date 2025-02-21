"use client";
import { AddProject } from "@/components/projects/AddProject";
import ProjectInfo, { ProjectInfoProps } from "@/components/projects/ProjectInfo";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/auth-store";
import React, { useEffect, useState } from "react";

const Project = () => {
	const [projects, setProjects] = useState([]);
	const [msg, setMsg] = useState();
	const { username , token } = useAuthStore();
	
	const fetchProjects = async () => {
		try {
			const response = await fetch("/api/getprojects", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization : "Bearer " + token
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
		if(username){
			fetchProjects();
		}
	}, [username]);

	return (
		<div className=" ">
			<div className="flex gap-2 items-center justify-center mt-10 md:mt-20 px-4">
				<Input className="w-[700px]" />
				<AddProject onProjectAdded={fetchProjects} />
			</div>

			<div className="my-10 flex flex-col gap-3 px-4">
				{projects.length > 0 ? (
					projects.map((project: ProjectInfoProps) => {
						return <ProjectInfo {...project} key={project.project_id} />;
					})
				) : (
					<div className="flex flex-col justify-center items-center font-bold text-xl">
						{msg}
					</div>
				)}
			</div>
		</div>
	);
};

export default Project;
