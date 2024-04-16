import { Button } from "@/components/admin/ui/button";
import { BadgeCheckIcon, BadgeAlertIcon } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import apiInstance from "@/libs/axios";
import { useQuery } from "react-query";

const TokenVerificationPage = () => {
	const { token } = useParams();
	const navigate = useNavigate();
	const [tokenVerified, setTokenVerified] = useState(null);

	const searchParams = new URLSearchParams(window.location.search);
	const email = searchParams.get("email");

	const { data } = useQuery(
		"verify-email",
		async () => {
			const { data } = await apiInstance.get(`/auth/verify/${token}`);
			return data;
		},
		{
			onSuccess: (data) => {
				setTokenVerified(true);
			},
			onError: (error) => {
				setTokenVerified(false);
			},
		}
	);

	return (
		<div className="max-w-lg mx-auto flex flex-col justify-center items-center min-h-screen space-y-5">
			{tokenVerified ? (
				<>
					<BadgeCheckIcon className="w-32 h-32 text-green-500" />
					<h1 className=" font-semibold text-xl text-center">
						Congratulations! Your email has been successfully verified. 
						You can now access all of our features and services. Thank you for your participation!
					</h1>
					<Button onClick={() => navigate(`/auth/signin?email=${email}`)}>
						Login to dashboard
					</Button>
				</>
			) : (
				<>
					<BadgeAlertIcon className="w-32 h-32 text-red-500" />
					<h1 className="font-semibold text-xl text-center">
						Sorry, there was a problem with the email verification process. 
						Please make sure the verification link you clicked is still valid or try verifying again. 
						If the problem persists, please contact our support team.
					</h1>
					<Button onClick={() => navigate("/")}>Back to Home</Button>
				</>
			)}
		</div>
	);
};

export default TokenVerificationPage;
