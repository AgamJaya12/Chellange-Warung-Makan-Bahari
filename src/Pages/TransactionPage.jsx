import { Button } from "@heroui/react";
import { Plus, Table, Train } from "lucide-react";

function TransactionPage() {
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
					<Table isHeaderSticky></Table>
				</div>
			</div>
		</>
	);
}

export default TransactionPage;
