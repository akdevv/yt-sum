import { useState } from "react";
import { motion } from "framer-motion";

import SaveBtn from "./SaveBtn";
import CopyBtn from "./CopyBtn";
import RegenerateBtn from "./RegenerateBtn";

function SummaryCard({ initialText, initialMetadata, isDarkMode }) {
	const [text, setText] = useState(initialText);
	const [metadata, setMetadata] = useState(initialMetadata);

	const handleRegenerate = (newText, newMetadata) => {
		setText(newText);
		setMetadata(newMetadata);
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 50 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.2 }}
			className={`max-w-[80%] md:max-w-[50%] mx-auto backdrop-blur-md rounded-2xl overflow-hidden shadow-lg ${
				isDarkMode
					? "bg-gray-800 bg-opacity-50"
					: "bg-white bg-opacity-50"
			}`}
		>
			<div className="aspect-w-16 aspect-h-9">
				<img
					src={metadata.thumbnail}
					alt="Video thumbnail"
					className="object-cover w-full h-full"
				/>
			</div>
			<div className="p-6">
				<h2 className="mb-4 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
					{metadata.title}
				</h2>
				<p
					className={`mb-6 ${
						isDarkMode ? "text-gray-300" : "text-gray-700"
					}`}
				>
					{text}
				</p>
				<div className="flex flex-wrap justify-center gap-4">
					<RegenerateBtn
						url={metadata.original_url}
						isDarkMode={isDarkMode}
						onRegenerate={handleRegenerate}
					/>
					<CopyBtn text={text} isDarkMode={isDarkMode} />
					<SaveBtn
						text={text}
						metadata={metadata}
						isDarkMode={isDarkMode}
					/>
				</div>
			</div>
		</motion.div>
	);
}

export default SummaryCard;
