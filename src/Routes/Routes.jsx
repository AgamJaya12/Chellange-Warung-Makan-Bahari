import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterPage from "../Pages/RegisterPage";
import LoginPage from "../pages/LoginPage";

function WmbRoutes() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<h1>Welcome to WMB</h1>} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path="*" element={<h1>404 Not Found</h1>} />
			</Routes>
		</BrowserRouter>
	);
}
export default WmbRoutes;
