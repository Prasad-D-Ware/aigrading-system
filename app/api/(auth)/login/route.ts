import Teacher from "@/lib/models/teacher";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/db";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export const POST = async (req: Request) => {
	const { username, password } = await req.json();

	try {
		await connectDB();
		const teacher = await Teacher.findOne({
			username: username,
		});

		if (!teacher) {
			return NextResponse.json({
				msg: "Teacher not found!",
			});
		}

		const isPasswordValid = await bcrypt.compare(password, teacher.password);

		if (!isPasswordValid) {
			return NextResponse.json({
				msg: "Invalid Password",
			});
		}

		const token = jwt.sign(
			{
				teacher_id: teacher.teacher_id,
				email :teacher.email,
				username: username,
			},
			JWT_SECRET,
			{
				expiresIn : '1d',
			}
		);

		return NextResponse.json({
			msg: "Teacher logged in Successfully!",
			token,
		});
	} catch (error: any) {
		console.log("Error logging in : ", error.message);
		return NextResponse.json({
			error: error.message,
		});
	}
};
