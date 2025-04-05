import sgMail from "@sendgrid/mail";

if (!process.env.SENDGRID_API_KEY) {
	throw new Error("SENDGRID_API_KEY is not defined");
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendResetEmail = async (email: string, resetToken: string) => {
	const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`;
	console.log(resetUrl);

	const msg = {
		to: email,
		from: "prasadware42116@gmail.com",
		subject: "Reset Your Password for AIGrading",
		html: `
            <div style="font-family: Arial, sans-serif; padding: 20px;">
                <h2>Reset Your Password</h2>
                <p>You requested to reset your password. Click the button below to reset it:</p>
                <a href="${resetUrl}" style="
                    background-color: #7c3aed;
                    color: white;
                    padding: 12px 24px;
                    text-decoration: none;
                    border-radius: 4px;
                    display: inline-block;
                    margin: 20px 0;
                ">Reset Password</a>
                <p>If you didn't request this, you can safely ignore this email.</p>
                <p>This link will expire in 1 hour.</p>
            </div>
        `,
	};

	try {
		await sgMail.send(msg);
	} catch (error: any) {
		console.error("Error sending email:", error.message);
		throw new Error("Failed to send reset email");
	}
};
