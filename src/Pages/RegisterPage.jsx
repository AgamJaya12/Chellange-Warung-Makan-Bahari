import React from "react";
import { AxiosInstance } from "../lib/axios";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Button, Divider, Form, Input } from "@heroui/react";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const registerSchema = z.object({
	name: z
		.string()
		.min(2, "Nama anda terlalu pendek!")
		.max(40, "Tolong singkat nama anda!"),
	address: z.string().min(2, "Alamat anda harus detail!"),
	phone: z
		.string()
		.regex(/^[0-9]+$/, "Nomor harus berupa angka!")
		.min(3, "Nomor anda tidak valid!"),
	username: z
		.string()
		.min(4, "Username minimal 4 karakter!")
		.max(20, "Username maksimal 20 karakter"),
	password: z
		.string()
		.min(8, "Password minimal 8 karakter!")
		.max(30, "Password maksimal 30 karakter"),
});

function RegisterPage() {
	const navigate = useNavigate();

	const form = useForm({
		defaultValues: {
			name: "",
			address: "",
			phone: "",
			username: "",
			password: "",
		},
		resolver: zodResolver(registerSchema),
	});

	async function submitHandler(data) {
		try {
			console.log("Submitting...", data);
			const response = await AxiosInstance.post("/register", {
				username: data.username,
				password: data.password,
				name: data.name,
				address: data.address,
				phone: data.phone,
			});
			console.log(response.data);
		} catch (err) {
			console.error(err);
		}
	}

	return (
		<>
			<div>
				<div className="w-full h-screen flex justify-center items-center">
					<Card className="flex w-fit h-fit ">
						<CardHeader className="flex flex-col">
							<p className="text-2xl font-bold">Register</p>
							<p className="text-gray-500 text-sm mt-1">
								Bergabung dengan membuat akun WMB baru anda!
							</p>
						</CardHeader>
						<Divider />
						<CardBody>
							<form onSubmit={form.handleSubmit(submitHandler)}>
								<div className="flex w-[25rem] mt-4 flex-col gap-2">
									<Controller
										name="name"
										control={form.control}
										render={({ field, fieldState }) => (
											<div>
												<Input
													{...field}
													label="Nama"
													placeholder="Anton Wibowo"
												/>
												{fieldState.error && (
													<p className="text-red-500 text-sm">
														{
															fieldState.error
																.message
														}
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
													label="Alamat"
													placeholder="Jl. xxxxx"
												/>
												{fieldState.error && (
													<p className="text-red-500 text-sm">
														{
															fieldState.error
																.message
														}
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
													label="Nomor Telepon"
													placeholder="08xxxxxx"
												/>
												{fieldState.error && (
													<p className="text-red-500 text-sm">
														{
															fieldState.error
																.message
														}
													</p>
												)}
											</div>
										)}
									/>
									<Controller
										name="username"
										control={form.control}
										render={({ field, fieldState }) => (
											<div>
												<Input
													{...field}
													label="Username"
													placeholder="Buat username baru"
												/>
												{fieldState.error && (
													<p className="text-red-500 text-sm">
														{
															fieldState.error
																.message
														}
													</p>
												)}
											</div>
										)}
									/>
									<Controller
										name="password"
										control={form.control}
										render={({ field, fieldState }) => (
											<div>
												<Input
													{...field}
													label="Password"
													placeholder="Buat password baru"
												/>
												{fieldState.error && (
													<p className="text-red-500 text-sm">
														{
															fieldState.error
																.message
														}
													</p>
												)}
											</div>
										)}
									/>
								</div>
								<Button
									type="submit"
									className="mt-5 w-full"
									color="primary"
								>
									Register
								</Button>
							</form>
						</CardBody>
						<CardFooter>
							<div className="flex justify-center w-full mt-[-16px] ">
								<p className="text-gray-600 text-sm">
									sudah memiliki akun?{" "}
									<span
										className="underline hover:cursor-pointer"
										onClick={() => navigate("/login")}
									>
										login
									</span>
								</p>
							</div>
						</CardFooter>
					</Card>
				</div>
			</div>
		</>
	);
}

export default RegisterPage;
