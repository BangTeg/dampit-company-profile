import "../../styles/tailwind-style.css";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/admin/ui/form";
import { Input } from "@/components/admin/ui/input";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/admin/ui/button";
import { Link, useParams } from "react-router-dom";
import { useToast } from "@/components/admin/ui/use-toast";
import { LoaderIcon, MoveLeft } from "lucide-react";
import apiInstance from "@/libs/axios";
import { useMutation } from "react-query";

const ResetPassword = () => {
	const { token } = useParams();
	const { toast } = useToast();

	const formSchema = z
		.object({
			newPassword: z.string().min(8, {
				message: "Password must be at least 8 characters long",
			}),
			confirmPassword: z.string().min(8, {
				message: "Password must be at least 8 characters long",
			}),
		})
		.refine((data) => data.newPassword === data.confirmPassword, {
			message: "Passwords do not match",
			path: ["confirmPassword"],
		});

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			newPassword: "",
			confirmPassword: "",
		},
	});

	const { mutate, isLoading } = useMutation(
		"reset-password",
		async (data) => {
			const response = await apiInstance.post(`/auth/reset/${token}`, data);
			return response.data;
		},
		{
			onSuccess: (data) => {
				toast({
					title: "Password Reset",
					description: data.message || "Password reset successful",
					status: "success",
				});
				setTimeout(() => {
					window.location.href = "/auth/signin";
				}, 2000);
			},
			onError: (error) => {
				toast({
					title: "Error",
					description:
						error.response?.data?.error ||
						"Something went wrong. Please try again later.",
					status: "error",
				});
			},
		}
	);

	const onSubmit = (data) => {
		mutate(data);
	};

	return (
		<div className="p-5">
			<Link to="/" className="flex gap-3">
				<MoveLeft />
				Back to Homepage
			</Link>
			<div className="w-full max-w-xl min-h-screen mx-auto flex flex-col justify-center items-center">
				<h1 className="text-2xl font-semibold">Reset Password</h1>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="w-full space-y-5 flex flex-col">
						<FormField
							control={form.control}
							name="newPassword"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input placeholder="Password" type="password" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="confirmPassword"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Confirm Password</FormLabel>
									<FormControl>
										<Input
											placeholder="Confirm Password"
											type="password"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button type="submit" className="mt-5 over">
							{isLoading && (
								<LoaderIcon className="mr-2 w-4 h-4 animate-spin" />
							)}
							Reset Password
						</Button>
					</form>
				</Form>
			</div>
		</div>
	);
};

export default ResetPassword;
