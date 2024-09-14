import { useState } from "react";
import { motion } from "framer-motion";
import { Clipboard, Check } from "lucide-react";

function CopyBtn({ text, isDarkMode }) {
	const [isCopied, setIsCopied] = useState(false);

	const handleCopy = () => {
		navigator.clipboard.writeText(text);
		setIsCopied(true);

		setTimeout(() => {
			setIsCopied(false);
		}, 3000);
	};

	return (
		<motion.button
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.95 }}
			onClick={handleCopy}
			className={`flex items-center space-x-2 px-4 py-2 rounded-full backdrop-blur-md border-2 ${
				isDarkMode
					? "bg-gray-700 bg-opacity-50 border-white/10"
					: "bg-gray-200 bg-opacity-50 border-black/10"
			}`}
		>
			<motion.div
				className="absolute inset-0 rounded-full"
				initial={{ opacity: 0 }}
				whileHover={{
					opacity: 1,
					transition: { duration: 0.3 },
				}}
				style={{
					background: isDarkMode
						? "rgba(255,255,255,0.1)"
						: "rgba(0,0,0,0.05)",
				}}
			/>
			{isCopied ? (
				<Check size={20} className="relative z-10" />
			) : (
				<Clipboard size={20} className="relative z-10" />
			)}
			<span className="relative z-10">
				{isCopied ? "Copied!" : "Copy"}
			</span>
		</motion.button>
	);
}

export default CopyBtn;
