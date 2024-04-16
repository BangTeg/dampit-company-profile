import React, { useState } from "react";
import {
	LineChartIcon,
	CarFrontIcon,
	UserIcon,
	PlaneTakeoffIcon,
	UserCheckIcon,
	UserXIcon,
	TicketSlashIcon,
	BanIcon,
} from "lucide-react";
import AuthenticatedLayout from "@/components/layout";
import { useQuery } from "react-query";
import apiInstance from "@/libs/axios";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/admin/ui/select";
import { MONTHS, YEARS } from "@/components/constants";

const Dashboard = () => {
	const [month, setMonth] = useState(new Date().getMonth() + 1);
	const [year, setYear] = useState(new Date().getFullYear());

	const { data: result, isLoading } = useQuery("dashboard", async () => {
		const response = await apiInstance.get("/admin/dashboard");
		return response.data;
	});

	const { data: revenue } = useQuery(`revenue-${month}-${year}`, async () => {
		const response = await apiInstance.get("/admin/revenue", {
			params: {
				month,
				year,
			},
		});
		return response.data;
	});

	const onMonthChange = (value) => {
		if (value === "all") {
			setMonth(null);
			return;
		}
		setMonth(value);
	};

	const onYearChange = (value) => {
		if (value === "all") {
			setYear(null);
			return;
		}
		setYear(value);
	};

	return (
		<div>
			<AuthenticatedLayout>
				{isLoading ? (
					<div className="">Loading</div>
				) : (
					<>
						<div className="flex-1">
							<h1 className="text-2xl font-semibold">Dashboard</h1>
						</div>
						<div className="grid grid-cols-1 mt-5 md:grid-cols-2 lg:grid-cols-4 gap-5">
							<div className="bg-white p-5 rounded-md shadow-md flex items-center justify-between ">
								<div className="flex-1 mr-10">
									<h1 className="text-lg font-semibold mb-3">
										Total Revenue
									</h1>
									<div className="flex gap-3 mb-3">
										<Select onValueChange={onMonthChange}>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Select Month" />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													<SelectLabel>Select Month</SelectLabel>
													<SelectItem value="all">All</SelectItem>
													{MONTHS.map((month, index) => (
														<SelectItem key={index} value={index + 1}>
															{month}
														</SelectItem>
													))}
												</SelectGroup>
											</SelectContent>
										</Select>
										<Select onValueChange={onYearChange}>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Select Year" />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													<SelectLabel>Select Year</SelectLabel>
													<SelectItem value="all">All</SelectItem>
													{YEARS.map((year, index) => (
														<SelectItem key={index} value={year}>
															{year}
														</SelectItem>
													))}
												</SelectGroup>
											</SelectContent>
										</Select>
									</div>
									<h1 className="text-2xl font-semibold">
										{new Intl.NumberFormat("id-ID", {
											style: "currency",
											currency: "IDR",
										}).format(revenue?.data.totalRevenue)}
									</h1>
								</div>
								<LineChartIcon className="hidden w-8 h-8 lg:block" />
							</div>
							<div className="bg-white p-5 rounded-md shadow-md flex items-center justify-between">
								<div className="">
									<h1 className="text-lg font-semibold mb-3">Total Unit</h1>
									<h1 className="text-2xl font-semibold">
										{result?.data.vehicleCount}
									</h1>
								</div>
								<CarFrontIcon className="w-8 h-8" />
							</div>
							<div className="bg-white p-5 rounded-md shadow-md flex items-center justify-between">
								<div className="">
									<h1 className="text-lg font-semibold mb-3">
										Total User Verified
									</h1>
									<h1 className="text-2xl font-semibold">
										{result?.data.verifiedUserCount}
									</h1>
								</div>
								<UserCheckIcon className="w-8 h-8" />
							</div>
							<div className="bg-white p-5 rounded-md shadow-md flex items-center justify-between">
								<div className="">
									<h1 className="text-lg font-semibold mb-3">Total Admin</h1>
									<h1 className="text-lg font-semibold">
										{result?.data.adminCount}
									</h1>
								</div>
								<UserIcon className="w-8 h-8" />
							</div>
						</div>
						<div className="grid grid-cols-1 mt-5 md:grid-cols-2 lg:grid-cols-4 gap-5">
							<div className="bg-white p-5 rounded-md shadow-md flex items-center justify-between">
								<div className="">
									<h1 className="text-lg font-semibold mb-3">
										Total User Unverified
									</h1>
									<h1 className="text-2xl font-semibold">
										{result?.data.notVerifiedUserCount}
									</h1>
								</div>
								<UserXIcon className="w-8 h-8" />
							</div>
							<div className="bg-white p-5 rounded-md shadow-md flex items-center justify-between">
								<div className="">
									<h1 className="text-lg font-semibold mb-3">
										Total Finished Reservation
									</h1>
									<h1 className="text-base font-semibold">
										{result?.data.finishedReservationCount} Finished
									</h1>
								</div>
								<PlaneTakeoffIcon className="w-8 h-8" />
							</div>
							<div className="bg-white p-5 rounded-md shadow-md flex items-center justify-between">
								<div className="">
									<h1 className="text-lg font-semibold mb-3">
										Total Cancelled Reservation
									</h1>
									<h1 className="text-base font-semibold">
										{result?.data.cancelledReservationCount} Canceled
									</h1>
								</div>
								<TicketSlashIcon className="w-8 h-8" />
							</div>
							<div className="bg-white p-5 rounded-md shadow-md flex items-center justify-between">
								<div className="">
									<h1 className="text-lg font-semibold mb-3">
										Total Rejected Reservation
									</h1>
									<h1 className="text-lg font-semibold">
										{result?.data.rejectedReservationCount} Rejected
									</h1>
								</div>
								<BanIcon className="w-8 h-8" />
							</div>
						</div>
					</>
				)}
			</AuthenticatedLayout>
		</div>
	);
};

export default Dashboard;
