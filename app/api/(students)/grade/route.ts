import connectDB from "@/lib/db";
import Project from "@/lib/models/project";
import Student from "@/lib/models/student";
import { model } from "@/utils/gemini";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
	const { user_id } = await req.json();

	try {
		await connectDB();

		const student = await Student.findOne(
			{
				user_id: user_id,
			},
			{
				_id: 0,
				__v: 0,
			}
		);

        const project = await Project.findOne({
            project_id : student.project_id
        },{
            _id:0,
            projectStats : 1,
            contributors : 1,
        })

		const prompt = `You are an experienced programming instructor tasked with evaluating student contributions to a collaborative project. Your goal is to provide fair and detailed assessments by comparing individual student metrics against overall project statistics and compared to other contributors.

                PROJECT CONTEXT:
                Total Project Commits: ${project.projectStats.totalCommits}
                Average Commits per Contributor: ${project.projectStats.avgCommits}
                Total Project Additions: ${project.projectStats.totalProjectAdditions}
                Total Project Deletions: ${project.projectStats.totalProjectDeletions}
                Total Project Contributors: ${project.contributors.length}
                Contributors Details: ${JSON.stringify(project.contributors.map((c : any) => ({
                    username: c.username,
                    contributions: c.contributions
                })))}

                STUDENT METRICS:
                Student Commits: ${student.total_commits}
                Student Additions: ${student.total_additions}
                Student Deletions: ${student.total_deletions}
                Active Days: ${student.active_days}
                Commit History: ${JSON.stringify(student.commit_history?.map((commit : any) => ({ message : commit.message , date : commit.date})) || [])}

                EVALUATION GUIDELINES:

                1. Commit Analysis:
                - Compare student's ${student.total_commits} commits against project total of ${project.projectStats.totalCommits}
                - Evaluate against average commits per contributor (${project.projectStats.avgCommits})
                - Consider commit frequency and consistency over time
                - Look into commit messages in ${JSON.stringify(student.commit_history?.map((commit : any) => { message : commit.message ; date : commit.date}) || [])} which has all commits and there regarding messages and analyes commit patterns to evaluate student higher if the commit messages are well defined
                - Also look into the amounts of contributions by other contributors of the project at  ${JSON.stringify(project.contributors.map((c : any) => ({
                    username: c.username,
                    contributions: c.contributions
                })))} to provide a better grade

                2. Code Contribution Analysis:
                - Assess additions (${student.total_additions} vs project total ${project.projectStats.totalProjectAdditions})
                - Assess deletions (${student.total_deletions} vs project total ${project.projectStats.totalProjectDeletions})
                - Consider the ratio and balance of changes

                3. Engagement Metrics:
                - Evaluate active days against project timespan
                - Consider consistency of contributions
                - Look for patterns in weekly activity

                GRADING SCALE:
                A (80-100): Contributions significantly exceed average metrics
                B (60-80): Above average contributions and consistent engagement
                C (50-60): Meets expected contribution levels or Below average contributions
                D (0-50):  Minimal or insufficient contributions

                YOUR RESPONSE SHOULD BE IN THIS FORMAT:
                {
                    "grade": "letter_grade",
                    "numericalScore": number,
                    "evaluation": {
                        "summary": "Brief overall assessment",
                        "strengths": [
                            "Key strength 1",
                            "Key strength 2"
                        ],
                        "areasForImprovement": [
                            "Area 1",
                            "Area 2"
                        ],
                        "recommendations": [
                            "Specific recommendation 1",
                            "Specific recommendation 2"
                        ]
                    },
                    "metrics": {
                        "commitQuality": "Assessment of commit patterns",
                        "codeContribution": "Assessment of code changes",
                        "consistency": "Assessment of engagement"
                    },
                    "feedback": "Detailed constructive feedback paragraph"
                }

                EVALUATION FOCUS:
                - Calculate contribution percentages relative to project totals
                - Compare individual metrics to project averages
                - Consider both quantity and consistency of contributions
                - Provide specific, actionable feedback based on metrics
                - Acknowledge both technical contributions and engagement patterns
                - Acknowledge the comparision with the contributors of the project and grade accordingly

                Remember to maintain a balanced perspective, considering both absolute numbers and relative contributions within the project context.`;


		const result = await model.generateContent(prompt);
		const grade = result.response.text();

        const gradeData = JSON.parse(grade.replace(/```json\n|```/g, ""));

        const updateStudent = await Student.updateOne({
            user_id: user_id,
        },{
            grade : gradeData
        })
        
		return NextResponse.json({
			gradeData,
		});
	} catch (error: any) {
		console.log("Error grading student : ", error.message);
		return NextResponse.json({
			msg: "Error grading student : " + error.message,
		});
	}
};
