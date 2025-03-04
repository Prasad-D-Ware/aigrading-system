import { z } from "zod";

export const LoginSchema = z.object({
	username: z.string().min(1, "Username is required"),
	password: z
		.string()
		.min(6, "Password must be at least 6 characters")
		.max(30, "Password must not exceed 30 characters"),
});

export const SignUpSchema = z.object({
	email: z.string().email("Invalid email address"),
	username: z.string().min(1, "Username is required"),
	password: z
		.string()
		.min(6, "Password must be at least 6 characters")
		.max(30, "Password must not exceed 30 characters"),
});

export const validateLogin = (data: any) => {
	const result = LoginSchema.safeParse(data);
	if (!result.success) {
		return { success: false, errors: result.error.errors };
	}
	return { success: true };
};

export const validateSignUp = (data: any) => {
	const result = SignUpSchema.safeParse(data);
	if (!result.success) {
		return { success: false, errors: result.error.errors };
	}
	return { success: true };
};
