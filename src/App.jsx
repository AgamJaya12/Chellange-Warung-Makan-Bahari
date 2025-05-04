import { useNavigate } from "react-router-dom";
import WmbRoutes from "./Routes/Routes";
import NavigationBar from "./components/Navbar";

function App() {
	const navigate = useNavigate();
	return (
		<>
			<NavigationBar navigate={navigate} />
			<WmbRoutes />
		</>
	);
}

export default App;

