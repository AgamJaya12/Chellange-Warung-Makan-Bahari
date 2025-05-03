import {
	Button,
	Input,
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@heroui/react";
import { Plus, User } from "lucide-react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { AxiosInstance } from "../lib/axios";
import { useApiErrorHandler } from "../hooks/useApiHandler";
import { useNavigate } from "react-router-dom";

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
				<Button>
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
