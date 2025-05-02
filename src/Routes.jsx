import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterPage from "./Pages/RegisterPage";

function WmbRoutes() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/register" element={<RegisterPage />} />
			</Routes>
		</BrowserRouter>
	);
}
export default WmbRoutes;
