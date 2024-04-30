import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/components/admin/ui/avatar";
import { Button } from "@/components/admin/ui/button";
import {
	Form,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/admin/ui/form";
import { Input } from "@/components/admin/ui/input";
import { Label } from "@/components/admin/ui/label";
import { updateAvatarFormSchema } from "@/schema/form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import apiInstance from "@/libs/axios";
import { useToast } from "@/components/admin/ui/use-toast";
import { LoaderIcon } from "lucide-react";

const UploadAvatar = ({ avatarUrl, refetch }) => {
	const { toast } = useToast();
	const formUpdateAvatar = useForm({
		resolver: zodResolver(updateAvatarFormSchema),
	});

	const { mutate, isLoading } = useMutation(
		"updateAvatar",
		async (data) => {
			const formData = new FormData();
			formData.append("avatar", data.avatar);
			const response = await apiInstance.post("/user/avatar", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			return response.data;
		},
		{
			onSuccess: (data) => {
				toast({
					title: "Success upload avatar",
					descsription: data.message,
					type: "success",
				});
				refetch();
				formUpdateAvatar.reset();
			},
			onError: (error) => {
				toast({
					title: "Error",
					descsription: "Failed to upload avatar",
					type: "error",
				});
			},
		}
	);

	const avatarRef = formUpdateAvatar.register("avatar");
	const onSubmitUpdateAvatar = (value) => {
		const data = {
			avatar: value["avatar"][0],
		};
		mutate(data);
	};

	return (
		<>
			<h1 className="text-2xl font-semibold">Avatar</h1>
			<div className="flex justify-center flex-col items-center space-y-5">
				<Avatar className="w-32 h-full">
					<AvatarImage
						src={avatarUrl ?? "https://github.com/shadcn.png"}
						className="w-full rounded-none object-cover"
					/>

					<AvatarFallback>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="w-full"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 6v6m0 0v6m0-6h6m-6 0H6"
							/>
						</svg>
					</AvatarFallback>
				</Avatar>
				<Form {...formUpdateAvatar}>
					<form onSubmit={formUpdateAvatar.handleSubmit(onSubmitUpdateAvatar)}>
						<FormField
							control={formUpdateAvatar.control}
							name="avatar"
							render={({ field }) => (
								<FormItem>
									<Label htmlFor="avatar">Change Avatar</Label>
									<Input
										type="file"
										className="mb-5"
										accept="image/*"
										{...avatarRef}
									/>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit" className="mt-3">
							{isLoading && (
								<LoaderIcon className="mr-2 w-4 h-4 animate-spin" />
							)}
							Upload Avatar
						</Button>
					</form>
				</Form>
			</div>
		</>
	);
};

export default UploadAvatar;
