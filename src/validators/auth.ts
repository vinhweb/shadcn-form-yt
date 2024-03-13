import { z } from "zod";

export const registerSchema = z.object({
	email: z.string().email(),
	name: z
		.string()
		.min(3, { message: "Tên của bạn quá ngắn!" })
		.max(255),
	studentId: z
		.string()
		.min(7)
		.max(7)
		.refine((val) => !isNaN(val as unknown as number), {
			message: "Student ID phải là số ",
		}),
	year: z.string().min(2).max(10),
	password: z.string().min(6).max(100),
	confirmPassword: z.string().min(6).max(100),
});
