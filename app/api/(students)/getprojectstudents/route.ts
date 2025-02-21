import connectDB from "@/lib/db";
import Project from "@/lib/models/project";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
	const { project_id } = await req.json();

	if (!project_id) {
		return NextResponse.json({
			msg: "No Project ID send!",
		});
	}
	try {
		await connectDB();

		const project = await Project.findOne(
			{
				project_id: project_id,
			},{
                _id: 0,
                contributors : 1,
                project_name : 1,
                full_name :1,
                forks : 1,
                stars : 1,
                description : 1,
                project_id : 1,
                project_url : 1,
                visibility : 1,
                language : 1,
                updated_at : 1,
            }
		);

		if (!project) {
			return NextResponse.json({
				msg: "No Project with provided Id!",
			});
		}

		return NextResponse.json({
            project
		});

	} catch (error: any) {
		console.log("Error while getting student contributers", error.message);
        return NextResponse.json({
			msg: "Error in getting student contributors : " + error.message,
		});
	}
};
