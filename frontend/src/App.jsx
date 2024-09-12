import axios from "axios";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

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
				className={`min-h-screen overflow-hidden font-poppins relative transition-colors duration-300 ${
					isDarkMode
						? "bg-gray-900 text-white"
						: "bg-gray-100 text-gray-900"
				}`}
			>
				<div className="relative z-10">
					<Navbar
						isDarkMode={isDarkMode}
						toggleDarkMode={toggleDarkMode}
					/>
					<main className="container px-4 py-24 mx-auto">
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
						<SummaryCard text={text} metadata={metadata} />
					</main>
					<Footer />
				</div>
			</div>
		</>
	);
}

export default App;
