import { Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import { Plus } from "lucide-react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { AxiosInstance } from "../lib/axios";

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

export function addCustomerPopUP() {
	async function handleSubmit(data) {
		try {
			const response = await AxiosInstance.post("/customers", data);
			console.log(response);
		} catch (error) {
			console.error(error);
		}
	}

	const form = useForm({
		resolver: zodResolver(addCustomerSchema),
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
					<Plus /> Tambah Customer
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[40rem]"></PopoverContent>
		</Popover>
	);
}
