import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import connectDB from "@/lib/db";
import Teacher from "@/lib/models/teacher";
import { v4 as uuid4 } from "uuid";
import { validateSignUp } from "@/utils/userValidation";

export const POST = async (req: Request) => {
	const { email, username, password } = await req.json();

	const signup = validateSignUp({ email, username, password });

	if (!signup.success) {
		return NextResponse.json(
			{
				msg: "Signup Failed",
				errors: signup.errors,
			},
			{ status: 400 }
		);
	}

	try {
		const id = uuid4();

		const hashedPassword = await bcrypt.hash(password, 10);

		await connectDB();

		await Teacher.create({
			teacher_id: id,
			email: email,
			username,
			password: hashedPassword,
		});

		return NextResponse.json(
			{
				msg: "Teacher Created Successfully!",
			},
			{ status: 200 }
		);
	} catch (error: any) {
		console.log("Error while signing up : ", error.message);
		return NextResponse.json(
			{
				msg: error.message,
			},
			{ status: 500 }
		);
	}
};
