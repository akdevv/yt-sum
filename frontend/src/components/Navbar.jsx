import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

function Navbar({ isDarkMode, toggleDarkMode }) {
	return (
		<nav className="fixed top-0 left-0 right-0 z-50">
			<div className="max-w-[80%] md:max-w-[50%] w-full mx-auto px-4 py-2 mt-4 bg-opacity-10 backdrop-blur-sm rounded-full shadow-sm">
				<div className="flex items-center justify-between">
					<span className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
						yt-sum
					</span>
					<motion.button
						onClick={toggleDarkMode}
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						className="p-1 rounded-full bg-opacity-20 backdrop-blur-md"
					>
						{isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
					</motion.button>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
