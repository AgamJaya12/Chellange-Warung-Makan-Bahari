import {
	Button,
	Input,
	Popover,
	PopoverContent,
	PopoverTrigger,
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
	const [note, setNote] = useState("");

	const total = quantity * menu.price;

	const handleOrder = () => {
		const orderData = {
			menuId: menu.id,
			name: menu.name,
			price: menu.price,
			quantity,
			note,
			total,
		};
		onOrder(orderData);
		onClose();
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
						<h3 className="text-lg font-bold capitalize">
							{menu.name}
						</h3>
						<p className="text-gray-600">
							Rp {parseInt(menu.price).toLocaleString("id-ID")}
						</p>
					</div>
					<Icon
						icon="lucide:shopping-bag"
						className="text-3xl text-gray-400"
					/>
				</div>

				<div className="mb-4">
					<label className="text-sm font-medium text-gray-600">
						Jumlah
					</label>
					<div className="flex items-center gap-2 mt-1">
						<Button
							size="sm"
							variant="bordered"
							onClick={() =>
								setQuantity(Math.max(1, quantity - 1))
							}
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

				<div className="mb-4">
					<label className="text-sm font-medium text-gray-600">
						Catatan (Opsional)
					</label>
					<textarea
						className="w-full mt-1 p-2 border rounded-md text-sm"
						placeholder="Mis: Tidak pedas, tanpa sayur, dll"
						value={note}
						onChange={(e) => setNote(e.target.value)}
					/>
				</div>

				<div className="flex justify-between items-center font-semibold text-lg mb-4">
					<span>Total</span>
					<span>Rp {total.toLocaleString("id-ID")}</span>
				</div>

				<div className="flex justify-end gap-2">
					<Button variant="bordered" onClick={onClose}>
						Batal
					</Button>
					<Button color="warning" onClick={handleOrder}>
						Tambah Pesanan
					</Button>
				</div>
			</div>
		</div>
	);
};
