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
import { useToast } from "@/components/admin/ui/use-toast";
import { LoaderIcon, MoveLeft } from "lucide-react";
import { useMutation } from "react-query";
import apiInstance from "@/libs/axios";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
	const { toast } = useToast();
	const formSchema = z.object({
		email: z.string().email({
			message: "Invalid email",
		}),
	});

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
		},
	});

	const { mutate, isLoading } = useMutation(
		"forgot-password",
		async (data) => {
			const response = await apiInstance.post("/auth/reset", data);
			return response.data;
		},
		{
			onSuccess: (data) => {
				toast({
					title: "Email Sent",
					description:
						data.message || "An email has been sent to your email address.",
					status: "success",
				});
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
				<h1 className="text-2xl font-semibold">Forgot Password</h1>
				<p className="text-gray-500 text-center"> Enter your email address and we'll send you a link to reset your password</p>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="w-full space-y-5 flex flex-col">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input placeholder="Email" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit" className="mt-5">
							{isLoading && (
								<LoaderIcon className="mr-2 w-4 h-4 animate-spin" />
							)}
							Send Verfication Email
						</Button>
					</form>
				</Form>
			</div>
		</div>
	);
};

export default ForgotPassword;
