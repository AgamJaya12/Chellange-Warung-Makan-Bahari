import {
	Table,
	Button,
	TableBody,
	TableCell,
	TableColumn,
	TableRow,
	TableHeader,
	Input,
} from "@heroui/react";
import { Plus, Search } from "lucide-react";
import { useApiErrorHandler } from "../hooks/useApiHandler";
<<<<<<< HEAD
import { useState } from "react";
=======
import { useEffect, useState } from "react";
import { useAllApi } from "../hooks/useAllApi";

import { AxiosInstance } from "../lib/axios";
>>>>>>> e44cb85 (Feat: Transaction UI)

function TransactionPage() {
	useApiErrorHandler();

	const [visibleCount, setVisibleCount] = useState(11);
	const [isLoading, setIsLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");
	const [localTransaction, setLocalTransaction] = useState([]);

	// const { customer, menu, tables, loading, error } = useAllApi();

	async function fetchTransaction() {
		try {
			setIsLoading(true);
			const response = await AxiosInstance.get("/transactions");
			setLocalTransaction(response.data);
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	}

	useEffect(() => {
		fetchTransaction();
	}, []);

	const filteredCustomer = localTransaction.filter((transaction) =>
		transaction.customer.toLowerCase().includes(searchTerm.toLowerCase()),
	);
<<<<<<< HEAD
	const hasMore = visibleCount < localCustomer.length;
=======
	const hasMore = visibleCount < localTransaction.length;

>>>>>>> e44cb85 (Feat: Transaction UI)
	return (
		<>
			<div>
				<div className="flex justify-between mt-4 mx-4 items-center">
					<div>
						<h1 className="text-2xl font-semibold">
							Histori Transaksi
						</h1>
						<Input
							className="w-[30rem] mt-2"
							startContent={<Search />}
							placeholder="Cari transaksi berdasarkan nama pelanggan"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</div>
					<Button color="primary">
						<Plus /> Tambah Transaksi
					</Button>
				</div>
				<div>
					<Table
						isStriped
						isHeaderSticky
						bottomContent={
							hasMore && !isLoading ? (
								<div className="flex w-full justify-center">
									<Button
										variant="flat"
										onPress={() =>
											setVisibleCount((prev) => prev + 10)
										}
									>
										Lihat Selengkapnya
									</Button>
								</div>
							) : null
						}
						aria-label="customer table"
						classNames={{
							base: "max-h-[37rem] overflow-scroll",
							table: "min-h-[7rem]",
						}}
<<<<<<< HEAD
					></Table>
=======
					>
						<TableHeader>
							<TableColumn>Nama Pelanggan</TableColumn>
							<TableColumn>Pesanan</TableColumn>
							<TableColumn>Total Harga</TableColumn>
							<TableColumn>Tipe</TableColumn>
							<TableColumn>Nomor Meja</TableColumn>
						</TableHeader>
						<TableBody>
							{filteredCustomer.map((transaction) => (
								<TableRow key={transaction.customer}>
									<TableCell>
										{transaction.customer}
									</TableCell>
									<TableCell>
										{transaction.items
											.map((item) => item.name)
											.join(", ")}
									</TableCell>
									<TableCell>
										Rp.{" "}
										{transaction.totalAmount.toLocaleString(
											"id-ID",
										)}
									</TableCell>
									<TableCell>
										{transaction.isDinein
											? "Makan di tempat"
											: "Bawa pulang"}
									</TableCell>
									<TableCell>
										{transaction.tableNumber}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
>>>>>>> e44cb85 (Feat: Transaction UI)
				</div>
			</div>
		</>
	);
}

export default TransactionPage;
