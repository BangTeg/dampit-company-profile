import "../src/dist/styles.css";
import "rc-pagination/assets/index.css";
import About from "./pages/About";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Models from "./pages/Models";
import TestimonialsPage from "./pages/TestimonialsPage";
import Team from "./pages/Team";
import Contact from "./pages/Contact";
import PublicLayout from "./components/PublicLayout";
import { useEffect } from "react";
import SignIn from "./pages/auth/signin";
import SignUp from "./pages/auth/signup";
import Dashboard from "./pages/admin/dashboard";
import UserProfile from "./pages/user/profile";
import Reservasi from "./pages/admin/reservasi";
import DetailReservasi from "./pages/admin/detail-reservasi";
import UserHistory from "./pages/user/history";
import DetailHistory from "./pages/user/detail-history";
import { useLocation } from "react-router-dom";
import ForgotPassword from "./pages/auth/forgot-password";
import ResetPassword from "./pages/auth/reset-password";
import Booking from "./pages/reservasi/booking";
import ProtectedRoute from "./components/protected-route";
import AuthRoute from "./components/auth-route";
import { useAuth } from "./hook/useAuth";
import TokenVerificationPage from "./pages/auth/token-verification";
import { Toaster } from "./components/admin/ui/toaster";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import HandleOAuthPage from "./pages/auth/handleOAuth";

function App() {
	const { pathname } = useLocation();
	useEffect(() => {
		const isTailwind = ["/admin", "/auth", "/user"].some((path) =>
			pathname.includes(path)
		);

		if (pathname.includes("user/reservasi")) {
			document.getElementsByTagName("html")[0].style.fontSize = "62.5%";
		} else if (isTailwind) {
			document.getElementsByTagName("html")[0].style.fontSize = "16px";
		} else {
			document.getElementsByTagName("html")[0].style.fontSize = "62.5%";
		}
	}, [pathname]);

	const { isLogin, role } = useAuth();

	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<Routes>
				<Route element={<PublicLayout />}>
					<Route index path="/" element={<Home />} />
					<Route path="about" element={<About />} />
					<Route path="models" element={<Models />} />
					<Route path="testimonials" element={<TestimonialsPage />} />
					<Route path="team" element={<Team />} />
					<Route path="contact" element={<Contact />} />
				</Route>
				<Route element={<ProtectedRoute isLogin={isLogin} role={role} />}>
					{/* admin */}
					<Route path="/admin/dashboard" element={<Dashboard />} />
					<Route path="/admin/reservasi" element={<Reservasi />} />
					<Route path="/admin/reservasi/:id" element={<DetailReservasi />} />
					{/* user */}
					<Route path="/user/profile" element={<UserProfile />} />
					<Route path="/user/history" element={<UserHistory />} />
					<Route path="/user/history/:id" element={<DetailHistory />} />
					<Route path="/user/reservasi" element={<Booking />} />
				</Route>
				<Route element={<AuthRoute isLogin={isLogin} role={role} />}>
					{/* public */}
					<Route path="/auth/signin" element={<SignIn />} />
					<Route path="/auth/signup" element={<SignUp />} />
					<Route
						path="/auth/verification/:token"
						element={<TokenVerificationPage />}
					/>
					<Route path="/auth/forgot-password" element={<ForgotPassword />} />
					<Route
						path="/auth/reset-password/:token"
						element={<ResetPassword />}
					/>
					<Route path="/auth/signin/oauth" element={<HandleOAuthPage />} />
				</Route>
			</Routes>
			<Toaster />
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}

export default App;
