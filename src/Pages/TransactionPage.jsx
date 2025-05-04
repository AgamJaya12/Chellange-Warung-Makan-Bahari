import { Button } from "@heroui/react";
import { Plus, Table, Train } from "lucide-react";
import { useApiErrorHandler } from "../hooks/useApiHandler";
import { useState } from "react";

function TransactionPage() {
	useApiErrorHandler();

	const [visibleCount, setVisibleCount] = useState(11);
	const [localCustomer, setLocalCustomer] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");
	const [localTransaction, setLocalTransaction] = useState([]);

	const filteredCustomer = localTransaction.filter((transaction) =>
		transaction.name.toLowerCase().includes(searchTerm.toLowerCase()),
	);
	const hasMore = visibleCount < localCustomer.length;
	return (
		<>
			<div>
				<div className="flex justify-between mt-4 mx-4 items-center">
					<h1 className="text-2xl font-semibold">
						Histori Transaksi
					</h1>
					<Button>
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
					></Table>
				</div>
			</div>
		</>
	);
}

export default TransactionPage;
