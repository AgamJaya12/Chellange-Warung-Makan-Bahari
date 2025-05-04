import { Route, Routes } from "react-router-dom";
import RegisterPage from "../Pages/RegisterPage";
import LoginPage from "../Pages/LoginPage";
import CustomerPage from "../Pages/CustomerPage";
import NavigationBar from "../components/Navbar";
import HomePage from "../Pages/HomePage";
import Menu from "../Pages/Menu";

function WmbRoutes() {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/login" element={<LoginPage />} />
			<Route path="/menu" element={<Menu />} />
			<Route path="/register" element={<RegisterPage />} />
			<Route path="/customer" element={<CustomerPage />} />
			<Route path="*" element={<h1>404 Not Found</h1>} />
		</Routes>
	);
}
export default WmbRoutes;
