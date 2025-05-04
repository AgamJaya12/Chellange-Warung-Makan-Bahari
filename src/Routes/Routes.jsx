import { Route, Routes } from "react-router-dom";
import RegisterPage from "../Pages/RegisterPage";
import CustomerPage from "../Pages/CustomerPage";
import NavigationBar from "../components/Navbar";
import HomePage from "../Pages/HomePage";

function WmbRoutes() {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/register" element={<RegisterPage />} />
			<Route path="/customer" element={<CustomerPage />} />
		</Routes>
	);
}
export default WmbRoutes;
