import React, { useEffect } from "react";
import apiInstance from "@/libs/axios";
import { putToCookie } from "@/lib/utils";

const HandleOAuthPage = () => {
	const searchParams = new URLSearchParams(window.location.search);
	const token = searchParams.get("token");

	useEffect(() => {
		putToCookie("token", token);
		apiInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
		window.location.href = "/";
	}, [token]);

	return (
		<div className="w-full min-h-screen flex justify-center items-center">
			Loading...
		</div>
	);
};

export default HandleOAuthPage;
