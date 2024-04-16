import React, { useState } from "react";
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
import { Button } from "@/components/admin/ui/button";
import { AlertTriangleIcon, LoaderIcon, MoreHorizontal } from "lucide-react";
import { useToast } from "@/components/admin/ui/use-toast";
import { useMutation } from "react-query";
import apiInstance from "@/libs/axios";

const ModalDelete = ({ navigate, id, refetch }) => {
	const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
	const { toast } = useToast();

	const { mutate, isLoading } = useMutation(
		"delete-reservation",
		async () => {
			const response = await apiInstance.delete(`/reservation/${id}`);
			return response.data;
		},
		{
			onSuccess: (data) => {
				toast({
					title: "Berhasil Menghapus Data",
					description: data.message,
					status: "success",
				});
				refetch();
			},
			onError: (error) => {
				toast({
					title: "Gagal Menghapus Data",
					description: "Terjadi kesalahan saat menghapus data",
					status: "error",
				});
			},
		}
	);

	const onSubmit = () => {
		mutate();
		setModalDeleteOpen(false);
	};

	return (
		<Dialog
			defaultOpen={false}
			open={modalDeleteOpen}
			onOpenChange={setModalDeleteOpen}>
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
						<DialogTrigger className="bg-red-500 hover:bg-red-600 w-full py-2 rounded-md text-white">
							Delete
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
							Kamu tidak akan bisa mengembalikan data yang telah dihapus.
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
							Delete
						</Button>
					</DialogFooter>
				</DialogContent>
			</DropdownMenu>
		</Dialog>
	);
};

export default ModalDelete;
