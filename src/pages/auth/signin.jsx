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
import { Link } from "react-router-dom";
import { putToCookie } from "@/lib/utils";
import apiInstance from "@/libs/axios";
import { useMutation } from "react-query";
import { toast } from "@/components/admin/ui/use-toast";
import { LoaderIcon, MoveLeft } from "lucide-react";

const SignIn = () => {
	const formSchema = z.object({
		email: z
			.string({
				required_error: "Email is required",
			})
			.email({
				message: "Email is not valid",
			}),
		password: z.string({
			required_error: "Password is required",
		}),
	});

	const searchParams = new URLSearchParams(window.location.search);
	const email = searchParams.get("email");

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
		values: {
			email: email ?? "",
			password: "",
		},
	});

	const { mutate, isLoading } = useMutation(
		"login",
		async (data) => {
			const response = await apiInstance.post("/auth/login", data);
			return response.data;
		},
		{
			onSuccess: (data) => {
				const user = {
					fullName: data.firstName + " " + data.lastName,
					email: data.email,
					role: data.role,
					avatarUrl: data.avatar,
					username: data.username,
				};
				putToCookie("token", data.token);
				putToCookie("user", JSON.stringify(user));

				toast({
					title: "Success",
					description: "Login success",
					type: "success",
				});
				form.reset();
				window.location.replace("/");
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

	const handleLoginGoogle = () => {
		window.location.replace(
			"https://dampit.et.r.appspot.com/googleOAuth/login"
		);
	};

	return (
		<div className="p-5">
			<Link to="/" className="flex gap-3">
				<MoveLeft />
				Back to Homepage
			</Link>
			<div className="w-full max-w-xl min-h-screen mx-auto flex flex-col justify-center items-center">
				<h1 className="text-2xl font-semibold">Sign In</h1>
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

						<Link
							to="/auth/forgot-password"
							className="text-blue-500 hover:underline float-left">
							Forgot Password?
						</Link>
						<Button
							type="submit"
							className="mt-5 disabled:cursor-not-allowed"
							disabled={isLoading}>
							{isLoading && (
								<LoaderIcon className="mr-2 w-4 h-4 animate-spin" />
							)}
							Sign In
						</Button>
					</form>
				</Form>
				<Button
					onClick={handleLoginGoogle}
					disabled={isLoading}
					className="w-full mt-3">
					With Google
				</Button>
				<Link
					to="/auth/signup"
					className="text-blue-500 hover:underline text-center mt-3">
					Don't have an account? Sign Up
				</Link>
			</div>
		</div>
	);
};

export default SignIn;
