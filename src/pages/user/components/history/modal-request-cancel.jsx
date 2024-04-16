import { Button } from "@/components/admin/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/admin/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/admin/ui/dropdown-menu";
import { useToast } from "@/components/admin/ui/use-toast";
import { AlertTriangleIcon, LoaderIcon, MoreHorizontal } from "lucide-react";
import React, { useState } from "react";
import apiInstance from "@/libs/axios";
import { useMutation } from "react-query";

const ModalRequestCancel = ({ navigate, id, refetch }) => {
	const [modalRequestOpen, setModalRequestOpen] = useState(false);
	const { toast } = useToast();

	const { mutate, isLoading } = useMutation(
		"request-cancel",
		async () => {
			const response = await apiInstance.put(`/reservation/cancel/${id}`);
			return response.data;
		},
		{
			onSuccess: (data) => {
				toast({
					title: `Berhasil membatalkan transaksi ${id}`,
					description: data.message,
					status: "success",
				});
				setModalRequestOpen(false);
				refetch();
			},
			onError: (error) => {
				console.log(error);
				toast({
					title: `Gagal membatalkan transaksi ${id}`,
					description: error.response.data.error,
					status: "error",
				});
			},
		}
	);

	const onSubmit = () => {
		mutate();
		setModalRequestOpen(false);
	};

	return (
		<Dialog
			defaultOpen={false}
			open={modalRequestOpen}
			onOpenChange={setModalRequestOpen}>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" className="h-8 w-8 p-0">
						<span className="sr-only">Open menu</span>
						<MoreHorizontal className="h-4 w-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuItem>
						<Button className="w-full" onClick={navigate}>
							View
						</Button>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<DialogTrigger className="bg-red-500 hover:bg-red-600 w-full py-2 rounded-md text-white px-3">
							Request Cancel
						</DialogTrigger>
					</DropdownMenuItem>
				</DropdownMenuContent>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Hapus Data</DialogTitle>
					</DialogHeader>
					<div className="flex flex-col items-center justify-center gap-3">
						<AlertTriangleIcon className="w-16 h-16 text-red-500" />
						<p className="text-md text-center">
							Apakah Anda yakin ingin membatalkan transaksi ini?
						</p>
					</div>
					<DialogFooter>
						<Button
							type="submit"
							onClick={() => {
								onSubmit();
							}}>
							{isLoading && (
								<LoaderIcon className="mr-2 w-4 h-4 animate-spin" />
							)}
							Ya
						</Button>
					</DialogFooter>
				</DialogContent>
			</DropdownMenu>
		</Dialog>
	);
};

export default ModalRequestCancel;
