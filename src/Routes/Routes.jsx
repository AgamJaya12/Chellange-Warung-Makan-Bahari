import { Route, Routes } from "react-router-dom";
import RegisterPage from "../Pages/RegisterPage";
import LoginPage from "../Pages/LoginPage";
import CustomerPage from "../Pages/CustomerPage";
import HomePage from "../Pages/HomePage";
import TablePage from "../Pages/TablePage";	

function WmbRoutes() {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/login" element={<LoginPage />} />
			<Route path="/register" element={<RegisterPage />} />
			<Route path="/customer" element={<CustomerPage />} />
			<Route path="/table" element={<TablePage />} />
			<Route path="*" element={<h1>404 Not Found</h1>} />
		</Routes>
	);
}
export default WmbRoutes;
