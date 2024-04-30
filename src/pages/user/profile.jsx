import { Button } from "@/components/admin/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	FormDescription,
} from "@/components/admin/ui/form";
import { Input } from "@/components/admin/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/admin/ui/radio-group";
import AuthenticatedLayout from "@/components/layout";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { updateProfileFormSchema } from "@/schema/form";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/admin/ui/dialog";
import { useToast } from "@/components/admin/ui/use-toast";
import { LoaderIcon } from "lucide-react";
import apiInstance from "@/libs/axios";
import { useQuery, useMutation } from "react-query";
import UploadAvatar from "./components/profile/upload-avatar";
import UploadKTP from "./components/profile/upload-ktp";

const UserProfile = () => {
	const [modalConfirmProfile, setModalConfirmProfile] = useState(false);
	const { toast } = useToast();

	const {
		data,
		isLoading: loading,
		refetch,
	} = useQuery("user-data", async () => {
		const response = await apiInstance.get("/user/profile");
		return response.data;
	});

	const { mutate, isLoading } = useMutation(
		"update-profile",
		async (data) => {
			const response = await apiInstance.put("/user/profile", data);
			return response.data;
		},
		{
			onSuccess: (data) => {
				toast({
					title: "Success",
					description: "Profile Updated",
					status: "success",
				});
				refetch();
			},
			onError: (error) => {
				toast({
					title: "Error Updating Profile",
					description: "Oops! Something went wrong. Please try again later",
					status: "error",
				});
			},
		}
	);

	const formUpdateProfile = useForm({
		resolver: zodResolver(updateProfileFormSchema),
		defaultValues: {
			username: "",
			firstName: "",
			lastName: "",
			email: "",
			gender: "",
			address: "",
			contact: "",
		},
		values: {
			username: data?.data.username ?? "",
			firstName: data?.data.firstName ?? "",
			lastName: data?.data.lastName ?? "",
			email: data?.data.email ?? "",
			gender: data?.data.gender ?? "",
			address: data?.data.address ?? "",
			contact: data?.data.contact ?? "",
		},
	});

	const onSubmitUpdateProfile = (data) => {
		mutate(data);
		setModalConfirmProfile(false);
	};

	return (
		<AuthenticatedLayout>
			{loading ? (
				<div>Loading...</div>
			) : (
				<>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-20">
						<div className="space-y-5">
							<h1 className="text-2xl font-semibold">Profile</h1>
							<Form {...formUpdateProfile}>
								<form
									onSubmit={formUpdateProfile.handleSubmit(
										onSubmitUpdateProfile
									)}
									className="space-y-8">
									<FormField
										control={formUpdateProfile.control}
										name="username"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Username</FormLabel>
												<FormControl>
													<Input placeholder="Username" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={formUpdateProfile.control}
										name="firstName"
										render={({ field }) => (
											<FormItem>
												<FormLabel>First Name</FormLabel>
												<FormControl>
													<Input placeholder="First Name.." {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={formUpdateProfile.control}
										name="lastName"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Last Name</FormLabel>
												<FormControl>
													<Input placeholder="Last Name.." {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={formUpdateProfile.control}
										name="email"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Email</FormLabel>
												<FormControl>
													<Input placeholder="Email.." {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={formUpdateProfile.control}
										name="gender"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Gender</FormLabel>
												<FormControl>
													<RadioGroup
														onValueChange={field.onChange}
														value={field.value}
														className="flex flex-col space-y-1">
														<FormItem className="flex items-center space-x-3 space-y-0">
															<FormControl>
																<RadioGroupItem value="male" />
															</FormControl>
															<FormLabel className="font-normal">
																Male
															</FormLabel>
														</FormItem>
														<FormItem className="flex items-center space-x-3 space-y-0">
															<FormControl>
																<RadioGroupItem value="female" />
															</FormControl>
															<FormLabel className="font-normal">
																Female
															</FormLabel>
														</FormItem>
														<FormItem className="flex items-center space-x-3 space-y-0">
															<FormControl>
																<RadioGroupItem value="other" />
															</FormControl>
															<FormLabel className="font-normal">
																Other
															</FormLabel>
														</FormItem>
													</RadioGroup>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={formUpdateProfile.control}
										name="address"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Address</FormLabel>
												<FormControl>
													<Input placeholder="Address.." {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={formUpdateProfile.control}
										name="contact"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Contact</FormLabel>
												<FormControl>
													<Input placeholder="Contact.." {...field} />
												</FormControl>
												<FormMessage />
												<FormDescription>
													Phone number format: +62xxxxxxxxxx
												</FormDescription>
											</FormItem>
										)}
									/>

									<Dialog
										defaultOpen={false}
										open={modalConfirmProfile}
										onOpenChange={setModalConfirmProfile}>
										<DialogTrigger asChild>
											<Button type="button">Submit</Button>
										</DialogTrigger>
										<DialogContent>
											<DialogHeader>
												<DialogTitle>Update Profile</DialogTitle>
												<DialogDescription>
													Make sure all the data is correct before submitting the form to update your profile!
												</DialogDescription>
											</DialogHeader>
											<Button
												type="submit"
												onClick={formUpdateProfile.handleSubmit(
													onSubmitUpdateProfile
												)}
												size="sm"
												className="px-3">
												{isLoading && (
													<LoaderIcon className="mr-2 w-4 h-4 animate-spin" />
												)}
												Confirm
											</Button>
										</DialogContent>
									</Dialog>
								</form>
							</Form>
						</div>
						<div className="space-y-5">
							<UploadAvatar avatarUrl={data?.data.avatar} refetch={refetch} />
							<UploadKTP avatarUrl={data?.data.ktp} refetch={refetch} />
						</div>
					</div>
				</>
			)}
		</AuthenticatedLayout>
	);
};

export default UserProfile;
