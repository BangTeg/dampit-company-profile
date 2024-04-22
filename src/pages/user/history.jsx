import { useNavigate } from "react-router-dom";
import React, { useCallback, useEffect, useState } from "react";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/admin/ui/table";
import {
	flexRender,
	getCoreRowModel,
	useReactTable,
	getSortedRowModel,
} from "@tanstack/react-table";
import { Badge } from "@/components/admin/ui/badge";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/admin/ui/select";
import AuthenticatedLayout from "@/components/layout";
import ModalRequestCancel from "./components/history/modal-request-cancel";
import apiInstance from "@/libs/axios";
import { useQuery } from "react-query";
import moment from "moment";
import "moment/locale/id";
import Pagination from "rc-pagination";
import useSearchParams from "@/hook/useSearchParams";

const History = () => {
	moment.locale("id");
	const navigate = useNavigate();
	const [sorting, setSorting] = useState([]);
	const PAGE_SIZE = 5;
	const [currentPage, setCurrentPage] = useState(1);
	const [status, setStatus] = useState("all");
	const paramStatus = useSearchParams("status");
	const paramCurrentPage = useSearchParams("page");

	useEffect(() => {
		if (paramStatus) {
			setStatus(paramStatus);
			setCurrentPage(paramCurrentPage);
		}
	}, [paramStatus, paramCurrentPage]);

	useEffect(() => {
		if (!paramStatus) {
			navigate(`/user/history?status=all&page=1`);
		}
	}, []);

	const onChangeStatus = (status) => {
		setStatus(status);
		navigate(`/user/history?status=${status}&page=${currentPage}`);
	};

	const { data, isLoading, refetch } = useQuery(
		`booking-history-${currentPage}-${status}`,
		async () => {
			const response = await apiInstance.get("/reservation/token/user", {
				params: {
					limit: PAGE_SIZE,
					page: currentPage,
					status: status === "all" ? undefined : status,
				},
			});
			return response.data;
		}
	);

	const onPageChange = (page) => {
		setCurrentPage(page);
		const url = new URL(window.location.href);
		url.searchParams.set("page", page);
		window.history.pushState({}, "", url);
	};
	const columns = [
		{
			accessorKey: "Vehicles.name",
			header: "Car Name",
		},
		{
			accessorKey: "unit",
			header: "Car Unit(s)",
		},
		{
			accessorKey: "passengers",
			header: "Passenger(s)",
		},
		{
			accessorKey: "pickDate",
			header: "Pick Date",
			cell: useCallback(({ row }) => {
				const date = new Date(row.getValue("pickDate"));
				return <div>{moment(date).format("dddd, DD MMMM YYYY")}</div>;
			}, []),
		},
		{
			accessorKey: "dropDate",
			header: "Drop Date",
			cell: useCallback(({ row }) => {
				const date = new Date(row.getValue("pickDate"));
				return <div>{moment(date).format("dddd, DD MMMM YYYY")}</div>;
			}, []),
		},
		{
			accessorKey: "totalPrice",
			header: "Total Price",
			cell: useCallback(({ row }) => {
				const amount = parseFloat(row.getValue("totalPrice"));
				const formatted = new Intl.NumberFormat("id-ID", {
					style: "currency",
					currency: "IDR",
				}).format(amount);
				return <div className=" font-medium">{formatted}</div>;
			}, []),
		},
		{
			accessorKey: "status",
			header: "Status",
			cell: useCallback(({ row }) => {
				const status = row.getValue("status");
				const variant = ["cancelled", "rejected"].some(
					(item) => item === status
				)
					? "destructive"
					: "secondary";
				return (
					<Badge className="capitalize " variant={variant}>
						{status}
					</Badge>
				);
			}, []),
		},
		{
			id: "actions",
			cell: useCallback(({ row }) => {
				const data = row.original;
				return (
					<ModalRequestCancel
						navigate={() => navigate(`/user/history/${data.id}`)}
						id={data.id}
						refetch={refetch}
					/>
				);
			}, []),
		},
	];

	const table = useReactTable({
		data: data?.data.rows || [],
		columns,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		state: {
			sorting,
		},
	});

	return (
		<AuthenticatedLayout>
			{isLoading ? (
				<div>Loading...</div>
			) : (
				<div className="relative w-full ">
					<div className="py-4 flex gap-3">
						<Select
							value={status}
							onValueChange={(event) =>
								onChangeStatus(event === "all" ? "all" : event)
							}>
							<SelectTrigger className="w-fit">
								<SelectValue placeholder="Filter Status Reservasi" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All</SelectItem>
								<SelectItem value="finished">Finished</SelectItem>
								<SelectItem value="rejected">Rejected</SelectItem>
								<SelectItem value="pending">Pending</SelectItem>
								<SelectItem value="approved">Approved</SelectItem>
								<SelectItem value="cancelled">Cancelled</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className="rounded-md border w-full">
						<Table>
							<TableHeader>
								{table.getHeaderGroups().map((headerGroup) => (
									<TableRow key={headerGroup.id}>
										{headerGroup.headers.map((header) => {
											return (
												<TableHead key={header.id}>
													{header.isPlaceholder
														? null
														: flexRender(
																header.column.columnDef.header,
																header.getContext()
														)}
												</TableHead>
											);
										})}
									</TableRow>
								))}
							</TableHeader>
							<TableBody>
								{table.getRowModel().rows?.length ? (
									table.getRowModel().rows.map((row) => (
										<TableRow
											key={row.id}
											data-state={row.getIsSelected() && "selected"}>
											{row.getVisibleCells().map((cell) => (
												<TableCell key={cell.id}>
													{flexRender(
														cell.column.columnDef.cell,
														cell.getContext()
													)}
												</TableCell>
											))}
										</TableRow>
									))
								) : (
									<TableRow>
										<TableCell
											colSpan={columns.length}
											className="h-24 text-center">
											No results.
										</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
						<Pagination
							current={currentPage}
							total={data?.data.totalRows}
							pageSize={PAGE_SIZE}
							onChange={(page) => onPageChange(page)}
							className="flex justify-center py-4"
						/>
					</div>
				</div>
			)}
		</AuthenticatedLayout>
	);
};

export default History;
