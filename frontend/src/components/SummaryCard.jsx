import { motion } from "framer-motion";
import { RefreshCw, Clipboard, FileDown } from "lucide-react";

const btns = ["Regenerate", "Copy", "Save PDF"];

function SummaryCard({ text, metadata, isDarkMode }) {
	console.log(text);
	console.log(metadata);
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
					src="/placeholder.svg?height=360&width=640"
					alt="Video thumbnail"
					className="object-cover w-full h-full"
				/>
			</div>
			<div className="p-6">
				<h2 className="mb-4 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
					AI-Generated Video Summary
				</h2>
				<p
					className={`mb-6 ${
						isDarkMode ? "text-gray-300" : "text-gray-700"
					}`}
				>
					This is an AI-generated summary of the YouTube video. It
					provides a concise overview of the main points discussed in
					the video, allowing viewers to quickly grasp the content
					without watching the entire video. The summary highlights
					key ideas, important facts, and any conclusions drawn in the
					video.
				</p>
				<div className="flex flex-wrap justify-center gap-4">
					{btns.map((text, index) => (
						<motion.button
							key={text}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
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
							{index === 0 && (
								<RefreshCw
									size={20}
									className="relative z-10"
								/>
							)}
							{index === 1 && (
								<Clipboard
									size={20}
									className="relative z-10"
								/>
							)}
							{index === 2 && (
								<FileDown size={20} className="relative z-10" />
							)}
							<span className="relative z-10">{text}</span>
						</motion.button>
					))}
				</div>
			</div>
		</motion.div>
	);
}

export default SummaryCard;
