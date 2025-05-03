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
					addToast({
						title: "Sesi anda habis!",
						description: "Silahkan login kembali.",
					});
					navigate("/login");
				} else if (status >= 500) {
					addToast({
						title: "Server error!",
						description: "Silahkan coba lagi nanti.",
					});
				}

				return Promise.reject(err);
			},
		);

		return () => {
			AxiosInstance.interceptors.response.eject(interceptor);
		};
	}, [navigate]);
}
