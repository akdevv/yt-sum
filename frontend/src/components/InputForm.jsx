import { useState } from "react";
import { motion } from "framer-motion";
import { Send, AlertCircle } from "lucide-react";
import { isValidURL } from "../helpers/validation";

function InputForm({ onSubmit, isDarkMode }) {
	const [url, setUrl] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = (evt) => {
		evt.preventDefault();
		setError(""); // reset err befor validation

		if (!isValidURL(url)) {
			setError("Please enter a valid YouTube video URL!");
			return;
		}

		onSubmit(url);
	};

	return (
		<div className="max-w-[80%] md:max-w-[50%] mx-auto mb-12">
			<form
				onSubmit={handleSubmit}
				className="flex items-center space-x-4"
			>
				<motion.input
					type="text"
					name="url"
					value={url}
					whileFocus={{ scale: 1.02 }}
					placeholder="Enter YouTube video URL"
					onChange={(evt) => setUrl(evt.target.value)}
					className={`flex-grow p-4 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-full backdrop-blur-md shadow-sm text-lg ${
						isDarkMode
							? "bg-gray-800 bg-opacity-50"
							: "bg-white bg-opacity-50"
					} ${error ? "border-2 border-red-500" : "border-0"}`}
				/>
				<motion.button
					type="submit"
					className="relative flex items-center justify-center p-4 overflow-hidden rounded-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
				>
					<Send size={24} className="relative z-10 text-white" />
				</motion.button>
			</form>
			{/* Error message */}
			{error && (
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -20 }}
					className="flex items-center mt-2 space-x-2"
				>
					<AlertCircle size={20} className="text-red-500" />
					<span className="text-sm text-red-500 font-poppins">
						{error}
					</span>
				</motion.div>
			)}
		</div>
	);
}

export default InputForm;
