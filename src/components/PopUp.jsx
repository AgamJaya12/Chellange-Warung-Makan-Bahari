import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Input,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Select,
	SelectItem,
	addToast,
} from "@heroui/react";
import { Plus, User } from "lucide-react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { AxiosInstance } from "../lib/axios";
import { useApiErrorHandler } from "../hooks/useApiHandler";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useState } from "react";

const addCustomerSchema = z.object({
	name: z
		.string()
		.min(3, "Nama harus memiliki minimal 3 karakter")
		.max(50, "Nama harus memiliki maksimal 50 karakter"),
	address: z
		.string()
		.min(5, "Alamat yang diisi harus lengkap")
		.max(100, "Alamat harus memiliki maksimal 100 karakter"),
	phone: z
		.string()
		.min(10, "Nomor telepon harus memiliki minimal 10 karakter")
		.max(15, "Nomor telepon harus memiliki maksimal 15 karakter")
		.regex(/^\d+$/, "Nomor telepon harus berupa angka"),
});

export function AddCustomerPopUP({ fetchCustomers }) {
	useApiErrorHandler();
	async function submitHandler(data) {
		try {
			const response = await AxiosInstance.post("/customers", data);
			console.log(response);
			fetchCustomers();
			form.reset();
		} catch (error) {
			console.error(error);
		}
	}

	const form = useForm({
		defaultValues: {
			name: "",
			address: "",
			phone: "",
		},
		resolver: zodResolver(addCustomerSchema),
	});

	return (
		<Popover showArrow offset={10} placement="bottom">
			<PopoverTrigger>
				<Button color="primary">
					<Plus /> Tambah Pelanggan
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[17rem] h-[15rem]">
				<form onSubmit={form.handleSubmit(submitHandler)}>
					<div className="flex flex-col gap-2">
						<Controller
							name="name"
							control={form.control}
							render={({ field, fieldState }) => (
								<div>
									<Input
										{...field}
										size="sm"
										label="Nama"
										className="w-[15rem]"
									/>
									{fieldState.error && (
										<p className="text-red-500">
											{fieldState.error.message}
										</p>
									)}
								</div>
							)}
						/>
						<Controller
							name="address"
							control={form.control}
							render={({ field, fieldState }) => (
								<div>
									<Input
										{...field}
										size="sm"
										label="Alamat"
									/>
									{fieldState.error && (
										<p className="text-red-500">
											{fieldState.error.message}
										</p>
									)}
								</div>
							)}
						/>
						<Controller
							name="phone"
							control={form.control}
							render={({ field, fieldState }) => (
								<div>
									<Input
										{...field}
										size="sm"
										label="Nomor HP"
									/>
									{fieldState.error && (
										<p className="text-red-500">
											{fieldState.error.message}
										</p>
									)}
								</div>
							)}
						/>
					</div>
					<Button
						type="submit"
						color="primary"
						size="sm"
						className="mt-4 w-full"
					>
						Simpan
					</Button>
				</form>
			</PopoverContent>
		</Popover>
	);
}

export function ProfilePopUp() {
	const navigate = useNavigate();
	return (
		<Popover>
			<PopoverTrigger>
				<Button
					color="primary"
					radius="full"
					size="icon"
					variant="flat"
					className="rounded-full max-w-none w-10 h-10"
				>
					<User className="w-5 h-5" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[10rem] h-[5rem]">
				<p>You are logged in!</p>
				<Button
					color="danger"
					size="sm"
					className="mt-2"
					onClick={() => {
						localStorage.removeItem("token");
						navigate("/login");
					}}
				>
					Logout
				</Button>
			</PopoverContent>
		</Popover>
	);
}

export function UpdateTableStatusPopUp({ fetchTables }) {
	useApiErrorHandler();

	const form = useForm({
		defaultValues: {
			number: "",
			status: "",
		},
		resolver: zodResolver(
			z.object({
				number: z
					.string()
					.regex(/^\d+$/, "Nomor meja harus berupa angka")
					.min(1, "Nomor meja harus diisi"),
				status: z.enum(["available", "occupied"], {
					errorMap: () => ({ message: "Status harus valid" }),
				}),
			}),
		),
	});

	async function submitHandler(data) {
		try {
			const response = await AxiosInstance.put(`/tables/${data.number}`, {
				status: data.status,
			});
			console.log("Response:", response);
			addToast({
				color: "success",
				title: "Status Meja Berhasil Diubah!",
				description: `Status meja ${data.number} berhasil diubah menjadi ${data.status}`,
			});

			await fetchTables();
			form.reset();
		} catch (error) {
			// Enhanced error logging
			console.error("Error Details:", {
				message: error.message,
				response: error.response?.data,
				status: error.response?.status,
			});

			addToast({
				color: "danger",
				title: "Gagal Mengubah Status Meja!",
				description: `Gagal mengubah status meja ${data.number}. Silakan coba lagi.`,
			});
		}
	}

	return (
		<Popover showArrow offset={10} placement="bottom">
			<PopoverTrigger>
				<Button color="secondary">
					<Plus /> Ubah Status Meja
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[17rem] h-[12rem]">
				<form onSubmit={form.handleSubmit(submitHandler)}>
					<div className="flex flex-col gap-2">
						<Controller
							name="number"
							control={form.control}
							render={({ field, fieldState }) => (
								<div>
									<Input
										{...field}
										size="sm"
										label="nomor Meja"
										className="w-[15rem]"
									/>
									{fieldState.error && (
										<p className="text-red-500">
											{fieldState.error.message}
										</p>
									)}
								</div>
							)}
						/>
						<Controller
							name="status"
							control={form.control}
							render={({ field, fieldState }) => (
								<div>
									<select
										{...field}
										className="w-[15rem] p-2 border rounded"
									>
										<option value="">Pilih Status</option>
										<option value="available">
											Available
										</option>
										<option value="occupied">
											Occupied
										</option>
									</select>
									{fieldState.error && (
										<p className="text-red-500">
											{fieldState.error.message}
										</p>
									)}
								</div>
							)}
						/>
					</div>
					<Button
						type="submit"
						color="primary"
						size="sm"
						className="mt-4 w-full"
					>
						Simpan
					</Button>
				</form>
			</PopoverContent>
		</Popover>
	);
}

export const Order = ({ menu, onClose, onOrder }) => {
	const [quantity, setQuantity] = useState(1);
  
	const [selectedCustomer, setSelectedCustomer] = useState(null);
	const [selectedTable, setSelectedTable] = useState(null);
  
	const [customers, setCustomers] = useState([]);
	const [tables, setTables] = useState([]);
  
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
  
	const total = quantity * menu.price;
  
  
	const handleOrder = async () => {
	  if (!selectedCustomer || !selectedTable) {
		alert("Pilih pelanggan dan meja terlebih dahulu");
		return;
	  }
  
	  const orderData = {
		customerId: Number(selectedCustomer),
		items: [
		  {
			menuId: menu.id,
			quantity,
			note,
		  },
		],
		isDineIn: true,
		tableNumber: Number(selectedTable),
	  };
  
	  try {
		const response = await AxiosInstance.post("/transaction", orderData);
		if (response.status === 200) {
		  onOrder && onOrder(orderData);
		  onClose();
		}
	  } catch (err) {
		console.error("Gagal mengirim data pesanan:", err);
		alert("Gagal mengirim data pesanan");
	  }
	};
  
	return (
	  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
		<div className="bg-white rounded-xl w-full max-w-md p-6 shadow-lg relative">
		  <button
			className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
			onClick={onClose}
		  >
			<Icon icon="lucide:x" className="text-xl" />
		  </button>
  
		  <h2 className="text-xl font-semibold mb-4">Tambah Pesanan</h2>
  
		  <div className="flex items-center justify-between mb-4">
			<div>
			  <h3 className="text-lg font-bold capitalize">{menu.name}</h3>
			  <p className="text-gray-600">
				Rp {parseInt(menu.price).toLocaleString("id-ID")}
			  </p>
			</div>
			<Icon icon="lucide:shopping-bag" className="text-3xl text-gray-400" />
		  </div>
  
		  <div className="mb-4">
			<label className="text-sm font-medium text-gray-600">Pilih Pelanggan</label>
			<Select
			  className="mt-1"
			  selectedKeys={selectedCustomer ? [selectedCustomer] : []}
			  onSelectionChange={(keys) => {
				const [id] = Array.from(keys);
				setSelectedCustomer(id);
			  }}
			  placeholder="Pilih pelanggan..."
			>
			  {customers.map((customer) => (
				<SelectItem key={customer.id} value={customer.id}>
				  {customer.name}
				</SelectItem>
			  ))}
			</Select>
		  </div>
  
		  <div className="mb-4">
			<label className="text-sm font-medium text-gray-600">Pilih Meja</label>
			<Select
			  className="mt-1"
			  selectedKeys={selectedTable ? [selectedTable] : []}
			  onSelectionChange={(k) => {
				const [id] = Array.from(k);
				setSelectedTable(id);
			  }}
			  placeholder="Pilih Meja..."
			>
			  {tables.map((table) => (
				<SelectItem key={table.number} value={table.number}>
				  Meja {table.number}
				</SelectItem>
			  ))}
			</Select>
		  </div>
  
		  <div className="mb-4">
			<label className="text-sm font-medium text-gray-600">Jumlah</label>
			<div className="flex items-center gap-2 mt-1">
			  <Button
				size="sm"
				variant="bordered"
				onClick={() => setQuantity(Math.max(1, quantity - 1))}
			  >
				-
			  </Button>
			  <span className="w-6 text-center">{quantity}</span>
			  <Button
				size="sm"
				variant="bordered"
				onClick={() => setQuantity(quantity + 1)}
			  >
				+
			  </Button>
			</div>
		  </div>
  
		  <div className="flex justify-between items-center font-semibold text-lg mb-4">
			<span>Total</span>
			<span>Rp {total.toLocaleString("id-ID")}</span>
		  </div>
  
		  <div className="flex justify-end gap-2">
			<Button variant="bordered" onClick={onClose}>Batal</Button>
			<Button color="warning" onClick={handleOrder}>Tambah Pesanan</Button>
		  </div>
		</div>
	  </div>
	);
  };

export function AddTransactionPopup({
	customer,
	menu,
	tables,
	fetchTransactions,
}) {
	const [selectedCustomer, setSelectedCustomer] = useState(null);
	const [selectedMenu, setSelectedMenu] = useState([]);
	const [selectedTable, setSelectedTable] = useState(null);
	const [isDineIn, setIsDineIn] = useState();

	async function handleSubmit() {
		if (
			!selectedCustomer ||
			selectedMenu.length === 0 ||
			(isDineIn && !selectedTable)
		) {
			addToast({
				title: "Data tidak lengkap",
				color: "danger",
				description: "Mohon lengkapi semua data",
			});
			return;
		}

		const order = {
			customerId: Number(selectedCustomer),
			items: selectedMenu.map((item) => Number(item)),
			isDineIn: isDineIn,
			tableNumber: isDineIn ? Number(selectedTable) : 1,
		};

		try {
			console.log(order);
			const response = await AxiosInstance.post("/transaction", order);
			console.log(response.data);
			addToast({
				title: "Transaksi berhasil ditambahkan",
				color: "success",
			});
			fetchTransactions();
		} catch (error) {
			console.error(error);
			addToast({
				title: "Gagal menambahkan transaksi",
				color: "danger",
				description: error.message,
			});
		}
	}

	return (
		<Popover showArrow offset={10} placement="bottom">
			<PopoverTrigger>
				<Button color="primary">
					<Plus className="mr-2" /> Tambah Transaksi
				</Button>
			</PopoverTrigger>

			<PopoverContent className="w-[30rem] space-y-4">
				<Select
					className="mt-2"
					label="Pilih Customer"
					selectedKeys={selectedCustomer ? [selectedCustomer] : []}
					onSelectionChange={(keys) =>
						setSelectedCustomer(keys.currentKey)
					}
				>
					{customer?.map((c) => (
						<SelectItem key={c.id}>{c.name}</SelectItem>
					))}
				</Select>

				<Select
					label="Pilih Menu"
					selectionMode="multiple"
					selectedKeys={selectedMenu}
					onSelectionChange={(keys) =>
						setSelectedMenu(Array.from(keys))
					}
					renderValue={(items) =>
						items.map((item) => item.textValue).join(", ")
					}
				>
					{menu?.map((m) => (
						<SelectItem key={m.id}>{m.name}</SelectItem>
					))}
				</Select>

				{/* Dine In / Take Away */}
				<Select
					label="Makan dimana?"
					selectedKeys={
						isDineIn !== undefined ? [isDineIn.toString()] : []
					}
					onSelectionChange={(keys) =>
						setIsDineIn(keys.currentKey === "true")
					}
				>
					<SelectItem key="true">Makan di tempat</SelectItem>
					<SelectItem key="false">Bawa pulang</SelectItem>
				</Select>

				{isDineIn && (
					<Select
						label="Pilih Meja Tersedia"
						selectedKeys={selectedTable ? [selectedTable] : []}
						onSelectionChange={(keys) =>
							setSelectedTable(keys.currentKey)
						}
					>
						{tables
							?.filter((t) => t.status === "available")
							.map((t) => (
								<SelectItem
									key={t.number}
									textValue={`Meja ${t.number}`}
								>
									Meja {t.number}
								</SelectItem>
							))}
					</Select>
				)}

				<Button color="primary" className="mb-1" onClick={handleSubmit}>
					Tambah
				</Button>
			</PopoverContent>
		</Popover>
	);
}
