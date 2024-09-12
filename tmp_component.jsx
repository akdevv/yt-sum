import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation, useMotionValue } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import InputForm from "./InputForm";
import SummaryCard from "./SummaryCard";

export default function App() {
	const [inputValue, setInputValue] = useState("");
	const [isDarkMode, setIsDarkMode] = useState(false);
	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);
	const blobRef = useRef(null);
	const blobAnimation = useAnimation();

	useEffect(() => {
		document.body.classList.toggle("dark", isDarkMode);
	}, [isDarkMode]);

	useEffect(() => {
		const handleMouseMove = (e) => {
			mouseX.set(e.clientX);
			mouseY.set(e.clientY);
		};

		window.addEventListener("mousemove", handleMouseMove);

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
		};
	}, [mouseX, mouseY]);

	useEffect(() => {
		let timeoutId;

		const animateBlob = () => {
			if (blobRef.current) {
				const x = mouseX.get();
				const y = mouseY.get();

				blobAnimation.start({
					x: x - blobRef.current.clientWidth / 2,
					y: y - blobRef.current.clientHeight / 2,
					transition: { type: "spring", damping: 15, stiffness: 100 },
				});
			}

			timeoutId = setTimeout(animateBlob, 50);
		};

		animateBlob();

		return () => {
			clearTimeout(timeoutId);
		};
	}, [mouseX, mouseY, blobAnimation]);

	const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

	return (
		<div
			className={`min-h-screen overflow-hidden relative font-sans transition-colors duration-300 ${
				isDarkMode
					? "bg-gray-900 text-white"
					: "bg-gray-100 text-gray-900"
			}`}
		>
			{/* Animated background with grain effect */}
			<div className="absolute inset-0 overflow-hidden">
				<motion.div
					ref={blobRef}
					className="absolute w-[500px] h-[500px] rounded-full filter blur-[80px] opacity-50"
					animate={blobAnimation}
					style={{
						background: isDarkMode
							? "radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, rgba(59, 130, 246, 0.3) 100%)"
							: "radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(139, 92, 246, 0.3) 100%)",
					}}
				/>
			</div>
			<div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWx0ZXI9InVybCgjYSkiIG9wYWNpdHk9IjAuMDUiLz48L3N2Zz4=')] opacity-50"></div>

			<div className="relative z-10">
				<Navbar
					isDarkMode={isDarkMode}
					toggleDarkMode={toggleDarkMode}
				/>

				<main className="container px-4 py-24 mx-auto">
					<motion.h1
						className="mb-12 text-5xl font-bold text-center text-transparent md:text-7xl lg:text-8xl bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
						style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
						initial={{ opacity: 0, y: -50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
					>
						AI Video Sum
					</motion.h1>

					<InputForm
						inputValue={inputValue}
						setInputValue={setInputValue}
						isDarkMode={isDarkMode}
					/>
					<SummaryCard isDarkMode={isDarkMode} />
				</main>

				<Footer />
			</div>
		</div>
	);
}

import React from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

const COLORS_for_input_form = {
	primary: "#3B82F6",
	secondary: "#8B5CF6",
};

const InputForm = ({ inputValue, setInputValue, isDarkMode }) => {
	return (
		<div className="max-w-[90%] md:max-w-[60%] mx-auto mb-12">
			<div className="flex items-center space-x-4">
				<motion.input
					type="text"
					placeholder="Enter YouTube video URL"
					className={`flex-grow p-4 rounded-full backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg ${
						isDarkMode
							? "bg-gray-800 bg-opacity-50"
							: "bg-white bg-opacity-50"
					}`}
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					whileFocus={{ scale: 1.02 }}
				/>
				<motion.button
					className="relative flex items-center justify-center p-4 overflow-hidden rounded-full"
					style={{
						background: `linear-gradient(145deg, ${COLORS.primary}, ${COLORS.secondary})`,
					}}
					whileHover={{
						scale: 1.05,
						boxShadow: `0 0 20px ${COLORS.primary}80`,
					}}
					whileTap={{ scale: 0.95 }}
				>
					<motion.div
						className="absolute inset-0 backdrop-blur-3xl"
						animate={{
							background: [
								`radial-gradient(circle, ${COLORS.primary}40 0%, transparent 70%)`,
								`radial-gradient(circle, ${COLORS.secondary}40 0%, transparent 70%)`,
								`radial-gradient(circle, ${COLORS.primary}40 0%, transparent 70%)`,
							],
						}}
						transition={{
							repeat: Infinity,
							duration: 3,
							ease: "linear",
						}}
					/>
					<Send size={24} className="relative z-10 text-white" />
				</motion.button>
			</div>
		</div>
	);
};

import React from "react";
import { motion } from "framer-motion";
import { RefreshCw, Clipboard, FileDown } from "lucide-react";

const COLORS = {
	primary: "#3B82F6",
};

const SummaryCard = ({ isDarkMode }) => {
	return (
		<motion.div
			className={`max-w-[90%] md:max-w-[60%] mx-auto backdrop-blur-md rounded-2xl overflow-hidden shadow-lg ${
				isDarkMode
					? "bg-gray-800 bg-opacity-50"
					: "bg-white bg-opacity-50"
			}`}
			initial={{ opacity: 0, y: 50 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.2 }}
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
					style={{ fontFamily: "Poppins, sans-serif" }}
				>
					This is an AI-generated summary of the YouTube video. It
					provides a concise overview of the main points discussed in
					the video, allowing viewers to quickly grasp the content
					without watching the entire video. The summary highlights
					key ideas, important facts, and any conclusions drawn in the
					video.
				</p>
				<div className="flex flex-wrap justify-center gap-4">
					{["Regenerate", "Copy", "Save PDF"].map((text, index) => (
						<motion.button
							key={text}
							className={`flex items-center space-x-2 px-4 py-2 rounded-full backdrop-blur-md ${
								isDarkMode
									? "bg-gray-700 bg-opacity-50"
									: "bg-gray-200 bg-opacity-50"
							}`}
							whileHover={{
								scale: 1.05,
								boxShadow: `0 0 10px ${COLORS.primary}80`,
							}}
							whileTap={{ scale: 0.95 }}
							style={{
								border: `2px solid ${
									isDarkMode
										? "rgba(255,255,255,0.1)"
										: "rgba(0,0,0,0.1)"
								}`,
							}}
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
};

// Completed

import React from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

const Navbar = ({ isDarkMode, toggleDarkMode }) => {
	return (
		<nav className="fixed top-0 left-0 right-0 z-50">
			<div className="max-w-[90%] md:max-w-[60%] w-full mx-auto px-4 py-2 mt-4 bg-opacity-10 backdrop-blur-sm rounded-full shadow-sm">
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-2">
						<motion.div
							className="w-6 h-6 bg-blue-500 rounded-full opacity-50"
							whileHover={{ scale: 1.1, opacity: 0.8 }}
							whileTap={{ scale: 0.9 }}
						></motion.div>
						<span className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
							yt-sum AI
						</span>
					</div>
					<motion.button
						className="p-1 rounded-full bg-opacity-20 backdrop-blur-md"
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						onClick={toggleDarkMode}
					>
						{isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
					</motion.button>
				</div>
			</div>
		</nav>
	);
};

import React from "react";

const Footer = () => {
	return (
		<footer className="py-4 text-center">
			<a
				href="https://github.com/akdevv"
				target="_blank"
				rel="noopener noreferrer"
				className="text-blue-400 transition-colors duration-300 hover:text-blue-300"
				style={{ fontFamily: "'Fira Mono', monospace" }}
			>
				@akdevv
			</a>
			<p
				className="mt-2 text-sm"
				style={{ fontFamily: "Poppins, sans-serif" }}
			>
				© 2023 AI Video Sum. All rights reserved.
			</p>
		</footer>
	);
};
