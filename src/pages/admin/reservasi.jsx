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
import ModalDelete from "./components/resevasi/modal-delete";
import { useQuery } from "react-query";
import apiInstance from "@/libs/axios";
import moment from "moment";
import "moment/locale/id";
import Pagination from "rc-pagination";
import useSearchParams from "@/hook/useSearchParams";

const Reservasi = () => {
	const navigate = useNavigate();
	const [sorting, setSorting] = useState([]);
	const PAGE_SIZE = 5;
	const [currentPage, setCurrentPage] = useState(1);
	const [status, setStatus] = useState("pending");
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
			navigate(`/admin/reservasi?status=pending&page=1`);
		}
	}, []);

	const onChangeStatus = (status) => {
		setStatus(status);
		navigate(`/admin/reservasi?status=${status}&page=${currentPage}`);
	};

	const onPageChange = (page) => {
		setCurrentPage(page);
		const url = new URL(window.location.href);
		url.searchParams.set("page", page);
		window.history.pushState({}, "", url);
	};

	const { data, isLoading, refetch } = useQuery(
		`list-reservasi-page-${currentPage}-${status}`,
		async () => {
			const data = await apiInstance.get("/reservation", {
				params: {
					limit: PAGE_SIZE,
					page: currentPage,
					status: status === "all" ? undefined : status,
				},
			});
			return data.data;
		}
	);

	const columns = [
		{
			id: "fullName",
			accessorKey: "Users.firstName",
			header: "Customer Name",
		},
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
			header: "Reservation Status",
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
			accessorKey: "actions",
			header: "Actions",
			cell: useCallback(({ row }) => {
				const data = row.original;

				return (
					<ModalDelete
						navigate={() => navigate(`/admin/reservasi/${data.id}`)}
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
		onSortingChange: setSorting,
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
				<>
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
					<div className="rounded-md border">
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
						<div className="flex justify-center  my-4">
							<Pagination
								current={currentPage}
								total={data?.data.totalRows}
								pageSize={PAGE_SIZE}
								onChange={(page) => onPageChange(page)}
							/>
						</div>
					</div>
				</>
			)}
		</AuthenticatedLayout>
	);
};

export default Reservasi;
