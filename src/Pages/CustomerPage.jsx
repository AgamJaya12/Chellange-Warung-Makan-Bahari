import {
	Table,
	TableHeader,
	TableBody,
	TableColumn,
	TableRow,
	TableCell,
} from "@heroui/table";
import { useEffect, useState } from "react";
import { AxiosInstance } from "../lib/axios";
import { Input } from "@heroui/input";
import { Plus, Search } from "lucide-react";
import { Button, Spinner } from "@heroui/react";
import { useApiErrorHandler } from "../hooks/useApiHandler";
import { AddCustomerPopUP } from "../components/AddPopUp";

function CustomerPage() {
	useApiErrorHandler();

	const [visibleCount, setVisibleCount] = useState(10);
	const [localCustomer, setLocalCustomer] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");

	// Fetch data customers
	const fetchCustomers = async () => {
		setIsLoading(true); // Set loading to true before fetching data
		try {
			const res = await AxiosInstance.get("/customers");
			setLocalCustomer(res.data);
		} catch (error) {
			console.error("Failed to fetch customers", error);
		} finally {
			setIsLoading(false); // Set loading to false after fetching data
		}
	};

	useEffect(() => {
		// Mock token storage
		localStorage.setItem(
			"token",
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTc0NjI2MjYzNywiZXhwIjoxNzQ2MjY2MjM3fQ.sOodjXcW2f8JEgRT-KtId9QIdNt-ty_2Z3CEezQLPUI",
		);
		fetchCustomers();
	}, []);

	// Filter customers based on search
	const filteredCustomer = localCustomer.filter((customer) =>
		customer.name.toLowerCase().includes(searchTerm.toLowerCase()),
	);
	const visibleCustomer = filteredCustomer.slice(0, visibleCount);
	const hasMore = visibleCount < filteredCustomer.length;

	return (
		<>
			<div className="flex justify-center items-center min-h-screen">
				<div className="flex justify-center flex-col gap-2 w-[80rem]">
					{isLoading ? (
						<div className="flex justify-center items-center min-h-screen">
							<Spinner size="lg" label="Loading customers..." />
						</div>
					) : (
						<>
							<div className="flex justify-between">
								<Input
									className="w-[30rem]"
									startContent={<Search />}
									placeholder="Cari nama pelanggan"
									value={searchTerm}
									onChange={(e) =>
										setSearchTerm(e.target.value)
									}
								/>
								<AddCustomerPopUP
									fetchCustomers={fetchCustomers}
								/>
							</div>
							<Table
								isStriped
								isHeaderSticky
								bottomContent={
									hasMore && !isLoading ? (
										<div className="flex w-full justify-center">
											<Button
												variant="flat"
												onPress={() =>
													setVisibleCount(
														(prev) => prev + 10,
													)
												}
											>
												Load More
											</Button>
										</div>
									) : null
								}
								aria-label="customer table"
								classNames={{
									base: "max-h-[35rem] overflow-scroll",
									table: "min-h-[7rem]",
								}}
							>
								<TableHeader>
									<TableColumn>ID</TableColumn>
									<TableColumn>Nama</TableColumn>
									<TableColumn>Alamat</TableColumn>
									<TableColumn>Nomor HP</TableColumn>
								</TableHeader>
								<TableBody items={visibleCustomer}>
									{(customer) => (
										<TableRow key={customer.id}>
											<TableCell>{customer.id}</TableCell>
											<TableCell>
												{customer.name}
											</TableCell>
											<TableCell>
												{customer.address}
											</TableCell>
											<TableCell>
												{customer.phone}
											</TableCell>
										</TableRow>
									)}
								</TableBody>
							</Table>
						</>
					)}
				</div>
			</div>
		</>
	);
}

export default CustomerPage;
