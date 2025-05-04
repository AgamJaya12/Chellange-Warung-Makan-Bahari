import { useEffect, useState } from "react";
import { AxiosInstance } from "../lib/axios";

export function useAllApi() {
	const [data, setData] = useState({
		customer: null,
		menu: null,
		tables: null,
	});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	async function fetchCustomer() {
		const response = await AxiosInstance.get("/customer");
		return response.data;
	}

	async function fetchMenu() {
		const response = await AxiosInstance.get("/menu");
		return response.data;
	}

	async function fetchTable() {
		const response = await AxiosInstance.get("/tables");
		return response.data;
	}

	useEffect(() => {
		async function fetchAll() {
			try {
				const [customer, menu, tables] = await Promise.all([
					fetchCustomer(),
					fetchMenu(),
					fetchTable(),
				]);
				setData({ customer, menu, tables });
			} catch (err) {
				console.error("Error saat mengambil data:", err);
				setError(err);
			} finally {
				setLoading(false);
			}
		}

		fetchAll();
	}, []);

	return { ...data, loading, error };
}
