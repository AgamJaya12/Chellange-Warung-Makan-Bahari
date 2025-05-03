import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { addToast } from "@heroui/react";

export function useApiErrorHandler() {
	const navigate = useNavigate();

	useEffect(() => {
		const interceptor = axios.interceptors.response.use(
			(res) => res,
			(err) => {
				const status = err.response?.status;

				if (status === 401) {
					addToast("Unauthorized! redirect ke login... 🔐");
					navigate("/login");
				} else if (status >= 500) {
					addToast("Server error! 🚨");
				}

				return Promise.reject(err);
			},
		);

		return () => {
			axios.interceptors.response.eject(interceptor);
		};
	}, [navigate]);
}
