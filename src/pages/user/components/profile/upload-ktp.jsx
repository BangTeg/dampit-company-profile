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
import apiInstance from "@/libs/axios";
import { updateKTP } from "@/schema/form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useToast } from "@/components/admin/ui/use-toast";
import { LoaderIcon } from "lucide-react";

const UploadKTP = ({ avatarUrl, refetch }) => {
	const { toast } = useToast();
	const formUpdateKTP = useForm({
		resolver: zodResolver(updateKTP),
	});

	const { mutate, isLoading } = useMutation(
		"upload-ktp",
		async (data) => {
			const formData = new FormData();
			formData.append("ktp", data.ktp);
			const response = await apiInstance.post("/user/ktp", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			return response.data;
		},
		{
			onSuccess: (data) => {
				toast({
					title: "Success",
					description: data.message,
					status: "success",
				});
				formUpdateKTP.reset();
				refetch();
			},
			onError: (error) => {
				toast({
					title: "Error",
					description: "Gagal upload avatar",
					status: "error",
				});
			},
		}
	);

	const ktpRef = formUpdateKTP.register("ktp");
	const onSubmitUpdateKTP = (value) => {
		const data = {
			ktp: value["ktp"][0],
		};
		mutate(data);
	};

	return (
		<>
			<h1 className="text-2xl font-semibold">KTP</h1>
			<div className="flex justify-center flex-col items-center space-y-5">
				<Avatar className="w-64 h-fit rounded-none">
					<AvatarImage
						src={avatarUrl ?? "https://github.com/shadcn.png"}
						className="w-full h-fit rounded-none object-fill"
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
				<Form {...formUpdateKTP}>
					<form onSubmit={formUpdateKTP.handleSubmit(onSubmitUpdateKTP)}>
						<FormField
							control={formUpdateKTP.control}
							name="ktp"
							render={({ field }) => (
								<FormItem>
									<Label htmlFor="ktp">Change KTP</Label>
									<Input
										type="file"
										id="ktp"
										accept="image/*"
										className="mb-5"
										{...ktpRef}
									/>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit" className="mt-3">
							{isLoading && (
								<LoaderIcon className="mr-2 w-4 h-4 animate-spin" />
							)}
							Upload KTP
						</Button>
					</form>
				</Form>
			</div>
		</>
	);
};

export default UploadKTP;
