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
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/admin/ui/button";
import { registerFormSchema } from "@/schema/form";
import apiInstance from "@/libs/axios";
import { useMutation } from "react-query";
import { useToast } from "@/components/admin/ui/use-toast";
import { LoaderIcon, MoveLeft } from "lucide-react";
import { Link } from "react-router-dom";

const SignUp = () => {
	const { toast } = useToast();
	const form = useForm({
		resolver: zodResolver(registerFormSchema),
		values: {
			username: "",
			firstName: "",
			lastName: "",
			email: "",
			password: "",
		},
	});

	const { mutate, isLoading } = useMutation(
		"register",
		async (data) => {
			const response = await apiInstance.post("/auth/register", data);
			return response.data;
		},
		{
			onSuccess: (data) => {
				toast({
					title: "Success",
					description:
						"Email verification has been sent to your email, please check your email to verify your account.	",
					type: "success",
				});
				form.reset();
			},
			onError: (error) => {
				toast({
					title: "Error",
					description: error.response.data.error,
					type: "error",
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
				<h1 className="text-2xl font-semibold">Sign Up</h1>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="w-full space-y-5 flex flex-col">
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username</FormLabel>
									<FormControl>
										<Input
											placeholder="Username"
											{...field}
											disabled={isLoading}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="firstName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>First Name</FormLabel>
									<FormControl>
										<Input
											placeholder="First Name"
											{...field}
											disabled={isLoading}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="lastName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Last Name</FormLabel>
									<FormControl>
										<Input
											placeholder="Last Name"
											{...field}
											disabled={isLoading}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											placeholder="Email"
											{...field}
											disabled={isLoading}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											placeholder="Password"
											type="password"
											{...field}
											disabled={isLoading}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							type="submit"
							className="mt-5 disabled:cursor-not-allowed w-full"
							disable={isLoading}>
							{isLoading && (
								<LoaderIcon className="mr-2 w-4 h-4 animate-spin" />
							)}
							Register
						</Button>
						<Link
							to="/auth/signin"
							className="text-blue-500 hover:underline text-center">
							Already have an account? Sign In
						</Link>
					</form>
				</Form>
			</div>
		</div>
	);
};

export default SignUp;
