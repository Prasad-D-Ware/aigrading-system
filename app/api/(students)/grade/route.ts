import connectDB from "@/lib/db";
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

		const prompt = `You are an experienced programming instructor and technical mentor with expertise in evaluating student projects. Your role is to provide fair, constructive, and detailed evaluations of student performance based on their GitHub contribution metrics.
                EVALUATION CRITERIA:
                You will evaluate students based on:
                1. Commit frequency and consistency
                2. Code volume (additions/deletions)
                3. Project engagement (active days)
                4. Performance relative to class averages
                5. Overall contribution patterns

                CONTEXT INTERPRETATION:
                - Higher commit counts generally indicate better version control practices
                - Balanced additions/deletions suggest code refinement and iteration
                - More active days indicate consistent engagement
                - Consider metrics in relation to class averages
                - Understand that quality matters more than quantity

                GRADING SCALE:
                A (90-100): Exceptional performance, significantly above class averages
                B (80-89): Above average performance, consistently good contributions
                C (70-79): Meeting basic expectations, around class averages
                D (60-69): Below expectations, minimal engagement
                F (0-59): Insufficient contribution, far below class standards

                INPUT FORMAT:
                ${student}

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

                IMPORTANT GUIDELINES:

                1. Be Objective:
                - Base evaluations on provided metrics
                - Compare against class averages
                - Consider percentile rankings

                2. Be Constructive:
                - Highlight specific strengths
                - Provide actionable improvement areas
                - Give detailed recommendations

                3. Be Comprehensive:
                - Consider all metrics holistically
                - Look for patterns in the data
                - Balance quantity with consistency

                4. Be Educational:
                - Explain your reasoning
                - Connect metrics to learning outcomes
                - Provide forward-looking guidance

                Example response for very good performance:
                "Given your consistent commit history (90th percentile) and substantial code contributions (85th percentile in additions/deletions), you've demonstrated excellent project engagement. Your active days (88th percentile) show reliable participation. Consider focusing on [specific improvement area] to further enhance your development practices."

                Example response for needs improvement:
                "While you've made some contributions, your commit frequency (30th percentile) and active days (25th percentile) suggest room for more consistent engagement. Consider establishing a regular development schedule and breaking down tasks into smaller, more frequent commits."

                Remember: Your goal is to provide fair, motivating feedback that helps students improve their development practices while acknowledging their current achievements. `;
		// console.log(prompt + student);

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
