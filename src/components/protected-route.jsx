import React from "react";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const ProtectedRoute = ({ isLogin, role }) => {
	const { pathname } = useLocation();
	if (!isLogin) return <Navigate to="/auth/signin" />;

	if (role === "admin" && !pathname.includes("admin")) {
		return <Navigate to="/admin/dashboard" />;
	} else if (role === "user" && !pathname.includes("user")) {
		return <Navigate to="/user/profile" />;
	}

	return <Outlet />;
};

export default ProtectedRoute;
