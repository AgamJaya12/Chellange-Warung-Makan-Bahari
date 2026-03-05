import { useRef, useState } from "react";
import { Button, Card, CardBody, CardHeader, Divider } from "@heroui/react";
import WMB from "../assets/wmb.jpeg";
import { About } from "../components/About";
import { motion, useInView } from "framer-motion"; // eslint-disable-line
import { useNavigate } from "react-router-dom";

function HomePage() {
	const [hovered, setHovered] = useState(false);
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true });
	const navigate = useNavigate();

	return (
		<div className="flex flex-col">
			<section
				className="relative h-[92vh] bg-cover bg-center flex items-center justify-center text-center text-white"
				style={{ backgroundImage: `url(${WMB})` }}
			>
				<div className="absolute inset-0 bg-black bg-opacity-40 z-0" />

				<div className="relative z-10 p-6 rounded-md">
					<h1 className="text-6xl font-serif font-bold">
						Warung Makan
					</h1>
					<h1 className="text-6xl mt-2 font-serif font-bold">
						Bahari
					</h1>
					<p className="mt-2">
						Pilihan warung makan terbaik untuk anda.
					</p>

					<Button
						color="warning"
						variant={hovered ? "bordered" : "solid"}
						radius="sm"
						className="bg-opacity-85 mt-3"
						onMouseEnter={() => setHovered(true)}
						onMouseLeave={() => setHovered(false)}
						onClick={() => navigate("/register")}
					>
						Bergabung Sekarang!
					</Button>
				</div>
			</section>

			<section className="h-[30vh] bg-gray-200 flex flex-col items-center justify-start py-8">
				<motion.div
					ref={ref}
					initial={{ opacity: 0, y: 50 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.6, ease: "easeOut" }}
				>
					<h2 className="text-2xl font-serif mb-6 underline">
						Tentang Kami
					</h2>
				</motion.div>
				<div className="flex w-full justify-center flex-row gap-14">
					<About nama="Rizqi" link="https://github.com/Ryuuusuke" />
					<About nama="Nurdin" link="https://github.com/Julfaninurdinnst"/>
					<About nama="Agam" link="https://github.com/AgamJaya12"/>
				</div>
			</section>
		</div>
	);
}

export default HomePage;
