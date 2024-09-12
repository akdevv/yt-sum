import axios from "axios";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import InputForm from "./components/InputForm";
import SummaryCard from "./components/SummaryCard";

function App() {
	const [text, setText] = useState("");
	const [metadata, setMetadata] = useState("");
	const [isDarkMode, setIsDarkMode] = useState(true);

	const handleSubmit = async (url) => {
		try {
			const response = await axios.post(
				"http://localhost:5000/api/summarize",
				{ url }
			);
			if (response.status === 200) {
				setText(response.data.text);
				setMetadata(response.data.metadata);
			} else {
				console.error("Error submitting data!");
			}
		} catch (err) {
			console.error("Error:", err);
		}
	};

	const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

	useEffect(() => {
		document.body.classList.toggle("dark", isDarkMode);
	}, [isDarkMode]);

	return (
		<>
			<div
				className={`min-h-screen flex flex-col overflow-hidden font-poppins relative transition-colors duration-300 ${
					isDarkMode
						? "bg-gray-900 text-white"
						: "bg-gray-100 text-gray-900"
				}`}
			>
				{/* Animated background */}
				<motion.div
					className="absolute inset-0 overflow-hidden"
					animate={{
						background: isDarkMode
							? [
									"radial-gradient(circle at 20% 20%, rgba(0, 255, 255, 0.15) 0%, transparent 40%), radial-gradient(circle at 80% 80%, rgba(255, 0, 255, 0.15) 0%, transparent 40%)",
									"radial-gradient(circle at 80% 20%, rgba(255, 255, 0, 0.15) 0%, transparent 40%), radial-gradient(circle at 20% 80%, rgba(0, 255, 0, 0.15) 0%, transparent 40%)",
									"radial-gradient(circle at 50% 50%, rgba(255, 0, 0, 0.15) 0%, transparent 40%), radial-gradient(circle at 80% 20%, rgba(0, 0, 255, 0.15) 0%, transparent 40%)",
							  ]
							: [
									"radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.3) 0%, transparent 40%), radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.3) 0%, transparent 40%)",
									"radial-gradient(circle at 80% 20%, rgba(251, 191, 36, 0.3) 0%, transparent 40%), radial-gradient(circle at 20% 80%, rgba(16, 185, 129, 0.3) 0%, transparent 40%)",
									"radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.3) 0%, transparent 40%), radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.3) 0%, transparent 40%)",
							  ],
					}}
					transition={{
						repeat: Infinity,
						duration: 20,
						ease: "linear",
					}}
				/>
				<div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWx0ZXI9InVybCgjYSkiIG9wYWNpdHk9IjAuMDUiLz48L3N2Zz4=')] opacity-50"></div>

				{/* Main Content */}
				<div className="relative z-10 flex flex-col flex-grow">
					<Navbar
						isDarkMode={isDarkMode}
						toggleDarkMode={toggleDarkMode}
					/>
					<main className="container flex-grow px-4 py-32 mx-auto">
						<motion.h1
							initial={{ opacity: 0, y: -50 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
							className="mb-12 text-5xl font-bold text-center text-transparent md:text-7xl lg:text-8xl bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 font-dela-gothic-one"
						>
							AI VIDEO SUMMARIZER
						</motion.h1>
						<InputForm
							onSubmit={handleSubmit}
							isDarkMode={isDarkMode}
						/>
						{text && (
							<SummaryCard
								text={text}
								metadata={metadata}
								isDarkMode={isDarkMode}
							/>
						)}
					</main>

					<Footer />
				</div>
			</div>
		</>
	);
}

export default App;
