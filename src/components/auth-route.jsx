import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthRoute = ({ isLogin, role }) => {
	if (isLogin) {
		if (role === "admin") {
			return <Navigate to="/admin/dashboard" />;
		} else if (role === "user") {
			return <Navigate to="/user/profile" />;
		}
	}

	return <Outlet />;
};

export default AuthRoute;
