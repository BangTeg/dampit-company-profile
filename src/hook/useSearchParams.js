import { useLocation } from "react-router-dom";

const useSearchParams = (param) => {
	let locations = useLocation();
	let queryParams = new URLSearchParams(locations.search);
	let paramStatus = queryParams.get(param);
	return paramStatus;
};

export default useSearchParams;
