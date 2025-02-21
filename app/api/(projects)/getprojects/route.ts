import connectDB from "@/lib/db";
import Project from "@/lib/models/project";
import Teacher from "@/lib/models/teacher";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
	const { username } = await req.json();
    
    
	if (!username) {
		return NextResponse.json({
			msg: "Username not provided!",
		});
	}
    
	try {

        await connectDB();
        
        const teacher = await Teacher.findOne({
            username : username
        },{
            _id : 0,
            projects : 1
        });

        if(!teacher){
            return NextResponse.json({
                msg : "Teacher not found"
            })
        }

        const projects = await Promise.all(
            teacher.projects.map(async (projectId : string) => {
                return await Project.findOne(
                    { project_id: projectId },
                    { _id: 0, __v: 0 }
                );
            })
        );

        if(projects.length == 0){
            return NextResponse.json({
                msg: "No projects found yet!"
            });
        }

        return NextResponse.json({
            projects
        })

	} catch (error: any) {
		console.log("Error while getting projects : ", error.message);
		return NextResponse.json({
			msg: "Error while getting projects : " + error.message,
		});
	}
};
