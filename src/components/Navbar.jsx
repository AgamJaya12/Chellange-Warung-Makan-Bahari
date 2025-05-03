import {
	Button,
	Link,
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
} from "@heroui/react";
import { Soup } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function NavigationBar({ navigate }) {
	const location = useLocation();
	const path = location.pathname;
	return (
		<Navbar
			maxWidth="full"
			classNames={{
				item: [
					"flex",
					"relative",
					"h-full",
					"items-center",
					"data-[active=true]:after:content-['']",
					"data-[active=true]:after:absolute",
					"data-[active=true]:after:bottom-0",
					"data-[active=true]:after:left-0",
					"data-[active=true]:after:right-0",
					"data-[active=true]:after:h-[2px]",
					"data-[active=true]:after:rounded-[2px]",
					"data-[active=true]:after:bg-primary",
				],
			}}
		>
			<NavbarBrand className="flex items-start">
				<div className="flex flex-row gap-2">
					<Soup />
					<p className="text-inherit font-bold">
						Warung Makan Bahari
					</p>
				</div>
			</NavbarBrand>
			<NavbarContent className="ml-20 justify-center flex items-center gap-10">
				<NavbarItem isActive={path === "/menu"}>
					<Link
						color={`${path === "/menu" ? "primary" : "foreground"}`}
						color="foreground"
						onClick={() => navigate("/menu")}
						className="hover:cursor-pointer"
					>
						Menu's
					</Link>
				</NavbarItem>
				<NavbarItem isActive={path === "/table"}>
					<Link
						color={`${path === "/table" ? "primary" : "foreground"}`}
						onClick={() => navigate("/table")}
						className="hover:cursor-pointer"
					>
						Meja
					</Link>
				</NavbarItem>
				<NavbarItem isActive={path === "/customer"}>
					<Link
						color={`${path === "/customer" ? "primary" : "foreground"}`}
						onClick={() => navigate("/customer")}
						className="hover:cursor-pointer"
						aria-current={path === "/customer"}
					>
						Pelanggan
					</Link>
				</NavbarItem>
				<NavbarItem isActive={path === "/transactions"}>
					<Link
						color={`${path === "/transactions" ? "primary" : "foreground"}`}
						color="foreground"
						onClick={() => navigate("/transactions")}
						className="hover:cursor-pointer"
					>
						Transaksi
					</Link>
				</NavbarItem>
			</NavbarContent>
			<NavbarContent justify="end">
				<NavbarItem>
					<Button
						color="primary"
						variant="flat"
						onClick={() => navigate("/login")}
					>
						Login
					</Button>
				</NavbarItem>
			</NavbarContent>
		</Navbar>
	);
}
