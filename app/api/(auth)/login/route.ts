import Teacher from "@/lib/models/teacher";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import * as jose from "jose";
import connectDB from "@/lib/db";


export const POST = async (req: Request) => {
	const { username, password } = await req.json();

	if (!username || !password) {
		return NextResponse.json({
			msg: "Enter the required details!",
		});
	}

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

		const secret = new TextEncoder().encode(process.env.JWT_SECRET);
		const token = await new jose.SignJWT({
			teacher_id: teacher.teacher_id,
			email: teacher.email,
			username: username,
		})
			.setProtectedHeader({ alg: "HS256" })
			.setExpirationTime("1d")
			.sign(secret);

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
