import Project from "@/components/projects/Projects";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import React from "react";

const ProjectsPage = () => {
	return (
		<ProtectedRoute>
			<Project />
		</ProtectedRoute>
	);
};

export default ProjectsPage;
