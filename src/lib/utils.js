import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import Cookies from "universal-cookie";

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

const cookies = new Cookies();
export const putToCookie = (key, value) => {
	const maxAge = 60 * 60 * 24;
	cookies.set(key, value, {
		path: "/",
		expires: new Date(Date.now() + maxAge * 1000),
	});
};

export const getFromCookie = (key) => {
	return cookies.get(key);
};

export const removeFromCookie = (key) => {
	cookies.remove(key, {
		path: "/",
	});
};

export const signOut = () => {
	removeFromCookie("token");
	removeFromCookie("user");
	window.location.reload();
};
