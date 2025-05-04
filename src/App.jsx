import { useNavigate } from "react-router-dom";
import WmbRoutes from "./Routes/Routes";
import NavigationBar from "./components/Navbar";
import { useEffect, useState } from "react";
import { Spinner } from "@heroui/react";

function App() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(true);

	const handleLoad = () => {
		setIsLoading(false);
	};

	useEffect(() => {
		if (document.readyState === "complete") {
			handleLoad();
		} else {
			window.addEventListener("load", handleLoad);
		}
		return () => {
			window.removeEventListener("load", handleLoad);
		};
	}, []);

	return (
		<>
			{isLoading ? (
				<div className="flex justify-center items-center min-h-screen">
					<Spinner size="lg" label="Loading..." />
				</div>
			) : (
				<>
					<NavigationBar navigate={navigate} />
					<WmbRoutes />
				</>
			)}
		</>
	);
}

export default App;

