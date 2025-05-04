import { useRef } from "react";
import { motion, useInView } from "framer-motion"; // eslint-disable-line
import { Card, CardBody, CardHeader, Divider } from "@heroui/react";
import { Github, User } from "lucide-react";

export function About({ nama, link }) {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true });

	return (
		<motion.div
			ref={ref}
			initial={{ opacity: 0, y: 50 }}
			animate={isInView ? { opacity: 1, y: 0 } : {}}
			transition={{ duration: 0.6, ease: "easeOut" }}
		>
			<div className="flex items-center flex-col justify-center">
				<div className="border-2 hover:cursor-pointer hover:border-blue-500 flex justify-center items-center  rounded-full w-10 h-10 border-black">
					<a href={link} target="_blank">
						<Github className="" />
					</a>
				</div>
				<p>{nama}</p>
			</div>
		</motion.div>
	);
}
