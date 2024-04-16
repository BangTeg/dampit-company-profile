import { Badge } from "@/components/admin/ui/badge";
import { Separator } from "@/components/admin/ui/separator";
import AuthenticatedLayout from "@/components/layout";
import React from "react";
import { useQuery } from "react-query";
import apiInstance from "@/libs/axios";
import { useParams } from "react-router-dom";
import moment from "moment";
import "moment/locale/id";
import { useNavigate } from "react-router-dom";
import { MoveLeft } from "lucide-react";

const DetailHistory = () => {
	moment.locale("id");
	const { id } = useParams();
	const navigate = useNavigate();
	const { data, isLoading } = useQuery("detail-reservasi", async () => {
		const response = await apiInstance.get(`/reservation/${id}`);
		return response.data;
	});

	if (isLoading) return <AuthenticatedLayout>Loading...</AuthenticatedLayout>;

	const result = data.data;

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
						<div>
							<p className="text-sm text-gray-500">KTP</p>
							<img
								src={result?.Users.ktp ?? "https://github.com/shadcn.png"}
								className="w-64 h-fit"
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
							<p className="text-sm text-gray-500">Tanggal Selesai Reservasi</p>
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
							<p className="text-sm text-gray-500">Status</p>
							<Badge className="capitalize ">{result?.status}</Badge>
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
									<p className="text-sm text-gray-500">Total Charge Overtime</p>
									<p className="text-lg font-semibold">
										{new Intl.NumberFormat("id-ID", {
											style: "currency",
											currency: "IDR",
										}).format(
											result?.totalPriceAfterOvertime - result?.totalPrice
										)}
									</p>
								</div>
								<Separator className="col-span-2 my-3" />
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
							</>
						)}
					</div>
				</div>
			</div>
		</AuthenticatedLayout>
	);
};

export default DetailHistory;
