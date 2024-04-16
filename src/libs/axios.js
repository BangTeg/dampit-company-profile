import axios from "axios";
import { getFromCookie } from "@/lib/utils";

const apiInstance = axios.create({
	baseURL: "https://dampit.et.r.appspot.com",
	headers: {
		"Content-Type": "application/json",
	},
});

const token = getFromCookie("token");

apiInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

export default apiInstance;
