"use server";
import connectDB from "@/lib/db";
import Project from "@/lib/models/project";
import Student from "@/lib/models/student";
import Teacher from "@/lib/models/teacher";
import mongoose from "mongoose";

export const deleteProjectData = async (project_id: string) => {
	if (!project_id) {
        return { msg :"Project Id not found", success : false}
	}

	// Initialize session for transaction
	const session = await mongoose.startSession();
	session.startTransaction();

	try {
		await connectDB();

		// Find the project to get info before deletion
		const project = await Project.findOne({ project_id });

		if (!project) {
			await session.abortTransaction();
			session.endSession();
            return { msg :"Project Not Found!", success : false}
		}

		// 1. Delete all students associated with the project
		await Student.deleteMany({ project_id }, { session });

		// 2. Find teachers who have this project and remove it from their projects array
		await Teacher.updateMany(
			{ projects: project_id },
			{ $pull: { projects: project_id } },
			{ session }
		);

		// 3. Delete the project
		await Project.deleteOne({ project_id }, { session });

		// Commit the transaction
		await session.commitTransaction();
		session.endSession();

        return { msg :"Project Deleted Successfully!", success : true}
	} catch (error: any) {
		await session.abortTransaction();
		session.endSession();
		console.log("Error while deleting project : ", error.message);
		return error.message;
	}
};
