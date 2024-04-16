import BookCar from "@/components/BookCar";
import Hero from "@/components/Hero";
import PublicLayout from "@/components/PublicLayout";
import React from "react";
import { Input } from "@/components/admin/ui/input";
import Navbar from "@/components/Navbar";

const Booking = () => {
	return (
		<>
			<Navbar />
			<div
				className="h-72 bg-transparent"
				style={{
					background:
						"linear-gradient(to bottom, #f8f8f8 20%, #ffffff 80%) !important",
				}}>
				1
			</div>
			<BookCar />
		</>
	);
};

export default Booking;
