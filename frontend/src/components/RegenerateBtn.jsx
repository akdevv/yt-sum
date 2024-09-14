import axios from "axios";
import { useState } from "react";
import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";

function RegenerateBtn({ url, isDarkMode, onRegenerate }) {
	const [isLoading, setIsLoading] = useState(false);

	const handleRegenerate = async () => {
		try {
			setIsLoading(true);

			const response = await axios.post(
				"http://localhost:5000/api/summarize",
				{ url }
			);

			if (response.status === 200) {
				onRegenerate(response.data.text, response.data.metadata);
			} else {
				console.error("Error submitting data!");
			}
		} catch (err) {
			console.error("Error:", err);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<motion.button
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.95 }}
			className={`flex items-center space-x-2 px-4 py-2 rounded-full backdrop-blur-md border-2 ${
				isDarkMode
					? "bg-gray-700 bg-opacity-50 border-white/10"
					: "bg-gray-200 bg-opacity-50 border-black/10"
			}`}
			onClick={handleRegenerate}
			disabled={isLoading}
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
			<RefreshCw
				size={20}
				className={`relative z-10 ${isLoading && "animate-spin"}`}
			/>
			<span className="relative z-10">
				{isLoading ? "Regenerating..." : "Regenerate"}
			</span>
		</motion.button>
	);
}

export default RegenerateBtn;
