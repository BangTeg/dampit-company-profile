import { z } from "zod";

export const updateProfileFormSchema = z.object({
	username: z.string({ required_error: "Username is required" }).nonempty(),
	firstName: z.string({ required_error: "First Name is required" }).nonempty(),
	lastName: z.string({ required_error: "Last Name is required" }).nonempty(),
	email: z.string({ required_error: "Email is required" }).email().nonempty(),
	gender: z.enum(["male", "female", "other"]),
	address: z.string({ required_error: "Address is required" }).nonempty(),
	contact: z
		.string({ required_error: "Contact is required" })
		.regex(/^\+62\d{9,11}$/, "Phone Number not in valid format (e.g. +6281234567890)")
		.max(16, "Phone Number max length is 13 characters"),
});

export const updateAvatarFormSchema = z.object({
	avatar: z.instanceof(FileList).refine((value) => value.length > 0, {
		message: "Avatar is required",
	}),
});

export const updateKTP = z.object({
	ktp: z.instanceof(FileList).refine((value) => value.length > 0, {
		message: "KTP is required",
	}),
});

export const registerFormSchema = z.object({
	username: z.string({ required_error: "Username is required" }).nonempty(),
	firstName: z.string({ required_error: "First Name is required" }).nonempty(),
	lastName: z.string({ required_error: "Last Name is required" }).nonempty(),
	email: z.string({ required_error: "Email is required" }).email().nonempty(),
	password: z
		.string({ required_error: "Password is required" })
		.min(8, { message: "Password must be at least 8 characters long" }),
});
