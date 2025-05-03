import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import RegisterPage from "../Pages/RegisterPage";
import CustomerPage from "../Pages/CustomerPage";
import NavigationBar from "../components/Navbar";

function WmbRoutes() {
	return (
		<Routes>
			<Route path="/register" element={<RegisterPage />} />
			<Route path="/customer" element={<CustomerPage />} />
		</Routes>
	);
}
export default WmbRoutes;
