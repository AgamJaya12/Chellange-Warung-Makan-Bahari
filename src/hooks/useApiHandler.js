import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addToast } from "@heroui/react";
import { AxiosInstance } from "../lib/axios";

export function useApiErrorHandler() {
	const navigate = useNavigate();

	useEffect(() => {
		const interceptor = AxiosInstance.interceptors.response.use(
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
			AxiosInstance.interceptors.response.eject(interceptor);
		};
	}, [navigate]);
}
