import React from "react";
import {
	Input,
	Button,
	Card,
	CardBody,
	Select,
	SelectItem,
} from "@heroui/react";
import { Icon } from "@iconify/react";

export default function Menu() {
	return (
		<div className="max-w-4xl mx-auto p-4">
			<div className="text-center mb-6">
				<h1 className="text-3xl font-bold text-gray-800">
					Daftar Menu Makanan
				</h1>
				<p className="text-gray-600 mt-2">
					Kami menyajikan beberapa menu masakan khas yang ada dari
					berbagai daerah yang ada di Indonesia
				</p>
			</div>

			<Card className="mb-6">
				<CardBody>
					<div className="flex flex-col gap-4">
						<Input
							placeholder="Cari menu..."
							startContent={
								<Icon
									icon="lucide:search"
									className="text-default-400"
								/>
							}
						/>

						<div className="flex flex-wrap gap-2">
							<Select
								placeholder="Semua"
								className="w-40 sm:w-48"
								startContent={
									<Icon
										icon="lucide:filter"
										className="text-default-400"
									/>
								}
							>
								<SelectItem key="all" value="all">
									Semua
								</SelectItem>
								<SelectItem key="makanan" value="makanan">
									Makanan Utama
								</SelectItem>
								<SelectItem key="minuman" value="minuman">
									Minuman
								</SelectItem>
							</Select>

							<Button
								color="primary"
								className="ml-auto"
								startContent={<Icon icon="lucide:plus" />}
							>
								Tambah Menu
							</Button>
						</div>
					</div>
				</CardBody>
			</Card>

			<div className="space-y-4">
				{/* Menu Item 1 */}

				{/* Menu Item 2 */}
				<Card className="overflow-hidden">
					<div className="flex flex-col sm:flex-row">
						<div className="relative w-full sm:w-64 h-48">
							<img
								src=""
								alt="Es Jeruk"
								className="w-full h-full object-cover"
							/>
							<div className="absolute top-2 right-2"></div>
							<div className="absolute bottom-0 left-0 bg-black/60 text-white px-3 py-1">
								Minuman
							</div>
						</div>

						<CardBody className="flex flex-col justify-between">
							<div>
								<div className="flex justify-between items-start">
									<h3 className="text-xl font-bold">
										Es Jeruk
									</h3>
									<p className="text-primary-600 font-bold">
										Rp 7.000
									</p>
								</div>
								<p className="text-default-500 mt-1">
									Jeruk segar dengan es batu
								</p>
							</div>

							<div className="flex gap-2 mt-4">
								<Button color="primary" variant="flat">
									Detail
								</Button>
								<Button color="success" className="ml-auto">
									Pesan
								</Button>
							</div>
						</CardBody>
					</div>
				</Card>

				{/* Menu Item 3 */}
				<Card className="overflow-hidden">
					<div className="flex flex-col sm:flex-row">
						<div className="relative w-full sm:w-64 h-48">
							<img
								src="\"
								alt="Nasi Goreng"
								className="w-full h-full object-cover"
							/>
							<div className="absolute top-2 right-2"></div>
							<div className="absolute bottom-0 left-0 bg-black/60 text-white px-3 py-1">
								Makanan Utama
							</div>
						</div>

						<CardBody className="flex flex-col justify-between">
							<div>
								<div className="flex justify-between items-start">
									<h3 className="text-xl font-bold">
										Nasi Goreng
									</h3>
									<p className="text-primary-600 font-bold">
										Rp 15.000
									</p>
								</div>
								<p className="text-default-500 mt-1">
									Nasi goreng spesial dengan telur
								</p>
							</div>

							<div className="flex gap-2 mt-4">
								<Button color="primary" variant="flat">
									Detail
								</Button>
								<Button color="success" className="ml-auto">
									Pesan
								</Button>
							</div>
						</CardBody>
					</div>
				</Card>
			</div>
		</div>
	);
}
