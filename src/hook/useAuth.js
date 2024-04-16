import { getFromCookie } from "@/lib/utils";

export const useAuth = () => {
	const token = getFromCookie("token");
	const isLogin = token ? true : false;
	const users = getFromCookie("user");
	const role = users?.role;

	return { isLogin, role, users };
};
