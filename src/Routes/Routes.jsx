import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterPage from "../Pages/RegisterPage";
import CustomerPage from "../Pages/CustomerPage";

function WmbRoutes() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/customer" element={<CustomerPage />} />
			</Routes>
		</BrowserRouter>
	);
}
export default WmbRoutes;
