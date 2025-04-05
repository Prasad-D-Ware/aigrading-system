import { validateForgot } from "@/utils/userValidation";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import Teacher from "@/lib/models/teacher";
import { sendResetEmail } from "@/utils/email";
import connectDB from "@/lib/db";

export const POST = async (req: NextRequest) => {
	try {
		const { email } = await req.json();

		const forgot = validateForgot({ email });

		if (!forgot.success) {
			return NextResponse.json(
				{
					msg: "Enter Valid Email",
					errors: forgot.errors,
				},
				{ status: 400 }
			);
		}

        await connectDB();

		const teacher = await Teacher.findOne({ email });

		if (!teacher) {
			return NextResponse.json(
				{
					msg: "If an account exists with this email, you will receive a password reset link",
				},
				{ status: 200 }
			);
		}

		const resetToken = crypto.randomBytes(32).toString("hex");
		const hashedToken = crypto
			.createHash("sha256")
			.update(resetToken)
			.digest("hex");

		teacher.resetToken = hashedToken;
		teacher.resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour
		await teacher.save();

		await sendResetEmail(email, resetToken);

		return NextResponse.json(
			{
				msg: "Password reset instructions have been sent to your email",
			},
			{ status: 200 }
		);
	} catch (error: any) {
		console.log("Error in forgot-password:", error.message);
		return NextResponse.json(
			{
				msg: "Failed to process password reset request",
			},
			{ status: 500 }
		);
	}
};
