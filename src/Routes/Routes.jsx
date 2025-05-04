import { Route, Routes } from "react-router-dom";
import RegisterPage from "../Pages/RegisterPage";
import LoginPage from "../Pages/LoginPage";
import CustomerPage from "../Pages/CustomerPage";
import HomePage from "../Pages/HomePage";
import Menu from "../Pages/Menu";
import TablePage from "../Pages/TablePage";
import TransactionPage from "../Pages/TransactionPage";
import ProtectedRoute from "./ProtectedRoute";

function WmbRoutes() {
	return (
		<Routes>
			<Route path="/login" element={<LoginPage />} />
			<Route path="/register" element={<RegisterPage />} />
			<Route
				path="/"
				element={
					<ProtectedRoute>
						<HomePage />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/menu"
				element={
					<ProtectedRoute>
						<Menu />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/customer"
				element={
					<ProtectedRoute>
						<CustomerPage />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/table"
				element={
					<ProtectedRoute>
						<TablePage />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/transactions"
				element={
					<ProtectedRoute>
						<TransactionPage />
					</ProtectedRoute>
				}
			/>
			<Route path="*" element={<h1>404 Not Found</h1>} />
		</Routes>
	);
}

export default WmbRoutes;
