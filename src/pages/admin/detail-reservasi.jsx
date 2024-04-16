import { Badge } from "@/components/admin/ui/badge";
import { Button } from "@/components/admin/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/admin/ui/dialog";
import { Input } from "@/components/admin/ui/input";
import { Label } from "@/components/admin/ui/label";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/admin/ui/select";
import { Separator } from "@/components/admin/ui/separator";
import AuthenticatedLayout from "@/components/layout";
import React from "react";
import { useState } from "react";
import { useToast } from "@/components/admin/ui/use-toast";
import { LoaderIcon, MoveLeft } from "lucide-react";
import { useQuery, useMutation } from "react-query";
import { useParams } from "react-router-dom";
import apiInstance from "@/libs/axios";
import moment from "moment";
import "moment/locale/id";
import { useNavigate } from "react-router-dom";

const DetailReservasi = () => {
	moment.locale("id");
	const { id } = useParams();
	const navigate = useNavigate();
	const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);
	const [isOvertime, setisOvertime] = useState(false);
	const [updateReservasiPayload, setUpdateReservasiPayload] = useState({
		status: "",
		overtimeHour: 0,
	});
	const { toast } = useToast();

	const {
		data,
		isLoading: loadingData,
		refetch,
	} = useQuery("detail-reservasi", async () => {
		const response = await apiInstance.get(`/reservation/${id}`);
		return response.data;
	});

	const { mutate: updateReservation, isLoading } = useMutation(
		"update-reservasi",
		async () => {
			const response = await apiInstance.put(
				`/reservation/status/${id}`,
				updateReservasiPayload
			);
			return response.data;
		},
		{
			onSuccess: (data) => {
				toast({
					title: "Update Reservasi Berhasil",
					description: data.message,
					status: "success",
				});
				setIsModalConfirmOpen(false);
				refetch();
			},
			onError: (error) => {
				setIsModalConfirmOpen(false);
				toast({
					title: "Update Reservasi Gagal",
					description: error.response.data.error,
					status: "error",
				});
			},
		}
	);

	const onUpdateReservasi = () => {
		updateReservation();
	};

	const onUpdateStatus = (value) => {
		if (value === "finished") {
			setisOvertime(true);
		} else {
			setisOvertime(false);
		}
		setUpdateReservasiPayload((prev) => ({
			...prev,
			status: value,
		}));
	};

	const result = data?.data;

	return (
		<AuthenticatedLayout>
			<div
				onClick={() => {
					navigate(-1);
				}}
				className="flex gap-3 cursor-pointer mb-3">
				<MoveLeft />
				Back
			</div>
			<h1 className="text-2xl font-semibold">Detail Transaksi</h1>
			{loadingData ? (
				<div className="">Loading Data...</div>
			) : (
				<div className="grid grid-cols-1 xl:grid-cols-2 gap-10 mt-5">
					<div>
						<h2 className="text-xl font-semibold">Informasi Pemesan</h2>
						<Separator className="my-3" />
						<div className="grid grid-cols-2 gap-3">
							<div>
								<p className="text-sm text-gray-500">Nama</p>
								<p className="text-lg">
									{result?.Users.firstName} {result?.Users.lastName}
								</p>
							</div>
							<div>
								<p className="text-sm text-gray-500">Email</p>
								<p className="text-lg">{result?.Users.email}</p>
							</div>
							<div>
								<p className="text-sm text-gray-500">Kontak</p>
								<p className="text-lg">{result?.Users.contact}</p>
							</div>
							<div>
								<p className="text-sm text-gray-500">Alamat</p>
								<p className="text-lg">{result?.Users.address}</p>
							</div>
							<div className="col-span-2">
								<p className="text-sm text-gray-500">KTP</p>
								<img
									src={result?.Users.ktp ?? "https://github.com/shadcn.png"}
									className="w-64 h-fit object-fill"
									alt={`KTP ${result?.Users.firstName} ${result?.Users.lastName}`}
								/>
							</div>
						</div>
					</div>
					<div>
						<h2 className="text-xl font-semibold">Informasi Reservasi</h2>
						<Separator className="my-3" />
						<div className="grid grid-cols-2 gap-3">
							<div>
								<p className="text-sm text-gray-500">Tanggal Reservasi</p>
								<p className="text-lg">
									{moment(result?.pickDate).format("dddd, Do MMMM YYYY, HH:mm")}
								</p>
							</div>
							<div>
								<p className="text-sm text-gray-500">
									Tanggal Selesai Reservasi
								</p>
								<p className="text-lg">
									{moment(result?.dropDate).format("dddd, Do MMMM YYYY, HH:mm")}
								</p>
							</div>
							<div>
								<p className="text-sm text-gray-500">Lokasi Penjemputan</p>
								<p className="text-lg">{result?.pickUp}</p>
							</div>
							<div>
								<p className="text-sm text-gray-500">Lokasi Pengembalian</p>
								<p className="text-lg">{result?.dropOff}</p>
							</div>
							<div>
								<p className="text-sm text-gray-500">Unit</p>
								<p className="text-lg">{result?.unit}</p>
							</div>
							<div>
								<p className="text-sm text-gray-500">Penumpang</p>
								<p className="text-lg">{result?.passengers}</p>
							</div>
							<div>
								<p className="text-sm text-gray-500">Kendaraan</p>
								<p className="text-lg">{result?.Vehicles.name}</p>
							</div>

							<div>
								<p className="text-sm text-gray-500">Intitution</p>
								<p className="text-lg capitalize">{result?.institution}</p>
							</div>
							<div>
								<p className="text-sm text-gray-500">Total Pembayaran</p>
								<p className="text-lg font-semibold">
									{new Intl.NumberFormat("id-ID", {
										style: "currency",
										currency: "IDR",
									}).format(result?.totalPrice)}
								</p>
							</div>
							<div>
								<p className="text-sm text-gray-500">Current Status</p>
								<Badge className="text-lg capitalize">{result?.status}</Badge>
							</div>

							<Separator className="col-span-2 my-3" />
							{result?.isOvertime === 1 && (
								<>
									<div>
										<p className="text-sm text-gray-500">Overtime (hour) </p>
										<p className="text-lg font-semibold">
											{result?.overtimeHour || "-"}
										</p>
									</div>
									<div>
										<p className="text-sm text-gray-500">
											Total Charge Overtime
										</p>
										<p className="text-lg font-semibold">
											{new Intl.NumberFormat("id-ID", {
												style: "currency",
												currency: "IDR",
											}).format(
												result?.totalPriceAfterOvertime - result?.totalPrice
											)}
										</p>
									</div>
									<div />
									<div>
										<p className="text-sm text-gray-500">Total Pembayaran</p>
										<p className="text-lg font-semibold">
											{new Intl.NumberFormat("id-ID", {
												style: "currency",
												currency: "IDR",
											}).format(result?.totalPriceAfterOvertime)}
										</p>
									</div>

									<Separator className="col-span-2 my-3" />
								</>
							)}

							{result?.finishedAt && (
								<div>
									<p className="text-sm text-gray-500">
										Transaksi Telah Selesai Pada
									</p>
									<p className="text-lg">
										{moment(result?.finishedAt).format("dddd, Do MMMM YYYY")}
									</p>
								</div>
							)}

							{["cancelled", "finished"].every(
								(item) => item !== result?.status
							) && (
								<>
									<p
										className="
							text-lg font-semibold col-span-2
						">
										Update Status
									</p>
									<div>
										<p className="text-sm text-gray-500">Status</p>
										<Select onValueChange={onUpdateStatus}>
											<SelectTrigger className="w-[180px]">
												<SelectValue
													className="capitalize"
													placeholder="Pilih Status"
												/>
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													<SelectItem value="approved">Approved</SelectItem>
													<SelectItem value="cancelled">Cancelled</SelectItem>
													<SelectItem value="finished">Finished</SelectItem>
													<SelectItem value="rejected">Rejected</SelectItem>
												</SelectGroup>
											</SelectContent>
										</Select>
									</div>
									{isOvertime && (
										<div className="grid w-full max-w-sm items-center gap-1.5">
											<Label htmlFor="Overtime">Overtime (hour) </Label>
											<Input
												type="number"
												id="Overtime"
												placeholder="Overtime"
												onChange={(e) =>
													setUpdateReservasiPayload((prev) => ({
														...prev,
														overtimeHour: e.target.value,
													}))
												}
											/>
											<div className="text-xs text-gray-300">*Optional</div>
										</div>
									)}

									<Dialog
										defaultOpen={false}
										open={isModalConfirmOpen}
										onOpenChange={setIsModalConfirmOpen}>
										<DialogTrigger asChild>
											<Button className="w-[180px] col-span-2">
												Simpan Data
											</Button>
										</DialogTrigger>
										<DialogContent>
											<DialogHeader>
												<DialogTitle>Update Data Reservasi</DialogTitle>
											</DialogHeader>
											<DialogDescription>
												Pastikan Data Yang Diubah Sudah Benar ?
											</DialogDescription>
											<Button
												type="submit"
												onClick={() => {
													onUpdateReservasi();
												}}>
												{isLoading && (
													<LoaderIcon className="mr-2 w-4 h-4 animate-spin" />
												)}
												Confirm
											</Button>
										</DialogContent>
									</Dialog>
								</>
							)}
						</div>
					</div>
				</div>
			)}
		</AuthenticatedLayout>
	);
};

export default DetailReservasi;
