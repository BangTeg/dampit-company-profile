import { Link } from "react-router-dom";
import Logo from "../images/logo/logo.png";
import { useEffect, useState } from "react";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { useAuth } from "@/hook/useAuth";
import { ChevronDown } from "lucide-react";
import { useQuery } from "react-query";
import apiInstance from "@/libs/axios";
import { signOut } from "@/lib/utils";
import { putToCookie } from "@/lib/utils";

function Navbar() {
	const [nav, setNav] = useState(false);
	const { isLogin } = useAuth();
	const [dropdownOpen, setDropdownOpen] = useState(false);

	const { data: users } = useQuery(
		"user",
		async () => {
			const response = await apiInstance.get("/user/profile");
			return response.data.data;
		},
		{
			onSuccess: (data) => {
				putToCookie("user", JSON.stringify(data));
			},
			enabled: isLogin,
		}
	);

	const openNav = () => {
		setNav(!nav);
	};

	const pathViewId = window.location.hash;

	useEffect(() => {
		if (pathViewId) {
			const id = pathViewId.replace("#", "");
			scrollIntoView(id);
		}
	}, [pathViewId]);

	const scrollIntoView = (id) => {
		const element = document.getElementById(id);
		element.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<>
			<nav>
				{/* mobile */}
				<div className={`mobile-navbar ${nav ? "open-nav" : ""}`}>
					<div onClick={openNav} className="mobile-navbar__close">
						<IconX width={30} height={30} />
					</div>
					<ul className="mobile-navbar__links">
						<li>
							<Link onClick={openNav} to="/">
								Home
							</Link>
						</li>
						<li>
							<Link onClick={openNav} to="/about">
								About
							</Link>
						</li>
						<li>
							<Link to="#vechicle_model">Vehicle Models</Link>
						</li>
						<li>
							<Link to="/#gallery">Gallery</Link>
						</li>
						<li>
							<Link onClick={openNav} to="/contact">
								Contact
							</Link>
						</li>
						{isLogin ? (
							<>
								<li>
									<Link to="/user/profile">Profile</Link>
								</li>
								<li>
									<Link to="/user/history">History</Link>
								</li>
								<li>
									<div
										className="px-5 bg-[#eb455f] py-2 rounded-md text-white"
										onClick={signOut}>
										Sign Out
									</div>
								</li>
							</>
						) : (
							<>
								<li>
									<Link to="/auth/signin">Sign In</Link>
								</li>
								<li>
									<Link className="navbar__buttons__register" to="/auth/signup">
										Register
									</Link>
								</li>
							</>
						)}
					</ul>
				</div>

				{/* desktop */}

				<div className="navbar">
					<div className="navbar__img">
						<Link to="/" onClick={() => window.scrollTo(0, 0)}>
							<img src={Logo} alt="logo-img" />
						</Link>
					</div>
					<ul className="navbar__links">
						<li>
							<Link className="home-link" to="/">
								Home
							</Link>
						</li>
						<li>
							{" "}
							<Link className="about-link" to="/about">
								About
							</Link>
						</li>
						<li>
							{" "}
							<Link className="models-link" to="/#vechicle_model">
								Vehicle Models
							</Link>
						</li>
						<li>
							{" "}
							<Link className="testi-link" to="/#gallery">
								Gallery
							</Link>
						</li>
						<li>
							{" "}
							<Link className="contact-link" to="/contact">
								Contact
							</Link>
						</li>
						{isLogin && users?.role === "user" && (
							<li>
								{" "}
								<Link className="contact-link" to="/user/reservasi">
									Reservation
								</Link>
							</li>
						)}
					</ul>

					{isLogin ? (
						<div className="relative max-sm:mr-5 hidden lg:block">
							<div
								className="flex gap-3 items-center"
								onClick={() => setDropdownOpen((prev) => !prev)}>
								<img
									src={users?.avatar ?? "https://github.com/shadcn.png"}
									className="w-16 h-16 rounded-full"
									alt=""
								/>
								<h1 className="nav-link">
									Welcome,{" "}
									<span className="font-semibold truncate">
										{users?.username}
									</span>
								</h1>
								<ChevronDown
									size={20}
									className={`cursor-pointer ${
										dropdownOpen ? "transform rotate-180" : ""
									}`}
								/>
							</div>
							{dropdownOpen && (
								<div className="flex flex-col space-y-5 absolute bg-white p-5 mt-4 right-1 w-[180px] rounded-lg">
									{users?.role === "user" ? (
										<>
											<Link
												to="/user/profile"
												className="nav-children hover:text-[#eb455f]">
												Profile
											</Link>
											<hr />
											<Link
												to="/user/history"
												className="nav-children hover:text-[#eb455f]">
												History
											</Link>
											<hr />
										</>
									) : (
										<>
											<Link
												to="/admin/dashboard"
												className="nav-children hover:text-[#eb455f]">
												Dashboard
											</Link>
											<hr />
											<Link
												to="/admin/reservasi"
												className="nav-children hover:text-[#eb455f]">
												Reservation
											</Link>

											<hr />
										</>
									)}
									<button
										className="nav-children bg-[#eb455f] py-2 rounded-md text-white"
										onClick={signOut}>
										Sign Out
									</button>
								</div>
							)}
						</div>
					) : (
						<div className="navbar__buttons">
							<Link className="navbar__buttons__sign-in" to="/auth/signin">
								Sign In
							</Link>
							<Link className="navbar__buttons__register" to="/auth/signup">
								Register
							</Link>
						</div>
					)}
					{/* mobile */}
					<div className="mobile-hamb" onClick={openNav}>
						<IconMenu2 width={30} height={30} />
					</div>
				</div>
			</nav>
		</>
	);
}

export default Navbar;
