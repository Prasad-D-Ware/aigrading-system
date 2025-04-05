import { NextRequest, NextResponse } from "next/server";
import Teacher from "@/lib/models/teacher";
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import connectDB from "@/lib/db";

export const POST = async (req: NextRequest) => {
    try {
        const { token, newPassword } = await req.json();

        // Hash the token from the URL
        const hashedToken = crypto
            .createHash('sha256')
            .update(token)
            .digest('hex');

        await connectDB();

        const teacher = await Teacher.findOne({
            resetToken: hashedToken,
            resetTokenExpiry: { $gt: Date.now() }
        });

        if (!teacher) {
            return NextResponse.json({
                error: "Invalid or expired reset token"
            }, { status: 400 });
        }

        // Hash new password and update teacher
        const hashedPassword = await bcrypt.hash(newPassword, 12);
        
        teacher.password = hashedPassword;
        teacher.resetToken = undefined;
        teacher.resetTokenExpiry = undefined;
        await teacher.save();

        return NextResponse.json({
            msg: "Password has been successfully reset"
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({
            msg: "Failed to reset password"
        }, { status: 500 });
    }
};
