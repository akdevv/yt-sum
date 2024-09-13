import { motion } from "framer-motion";

const Loading = ({ isDarkMode }) => {
	const containerVariants = {
		animate: {
			transition: {
				staggerChildren: 0.2,
			},
		},
	};

	const dotVariants = {
		initial: { y: 0 },
		animate: {
			y: [0, -15, 0],
			transition: {
				duration: 0.6,
				repeat: Infinity,
				repeatDelay: 0.4,
				ease: "easeInOut",
			},
		},
	};

	return (
		<div className="flex flex-col items-center justify-center mt-8">
			<h2 className="mb-8 text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 font-dela-gothic-one">
				Summarizing
			</h2>
			<motion.div
				className="flex space-x-3"
				variants={containerVariants}
				animate="animate"
			>
				{[0, 1, 2].map((index) => (
					<motion.div
						key={index}
						variants={dotVariants}
						className={`w-4 h-4 rounded-full ${
							isDarkMode ? "bg-blue-400" : "bg-purple-600"
						}`}
					/>
				))}
			</motion.div>
			<p
				className={`mt-4 text-md ${
					isDarkMode ? "text-gray-300" : "text-gray-700"
				}`}
			>
				Please wait while we process your video
			</p>
		</div>
	);
};

export default Loading;
