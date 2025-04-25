import connectDB from "@/lib/db";
import Project from "@/lib/models/project";
import Student from "@/lib/models/student";
import Teacher from "@/lib/models/teacher";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req : NextRequest) => {

    const { project_id } = await req.json();

	if (!project_id) {
        return NextResponse.json({ msg :"Project Id not found", success : false},
            {status : 401}
        )
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
            return NextResponse.json({ msg :"Project Not Found!", success : false} ,
                {status : 401}
            )
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

        return NextResponse.json({ msg :"Project Deleted Successfully!", success : true},
            {status : 200}
        )
	} catch (error: any) {
		await session.abortTransaction();
		session.endSession();
		console.log("Error while deleting project : ", error.message);
		return error.message;
	}
};