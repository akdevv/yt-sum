import jsPDF from "jspdf";
import { useState } from "react";
import { motion } from "framer-motion";
import { FileDown } from "lucide-react";

function SaveBtn({ text, metadata, isDarkMode }) {
	const [isGenerating, setIsGenerating] = useState(false);

	const generatePDF = async () => {
		setIsGenerating(true);
		const pdf = new jsPDF();

		// Add title
		pdf.setFontSize(18);
		pdf.text(metadata.title, 20, 20);

		// Calculate the height of the title
		const titleLines = pdf.splitTextToSize(metadata.title, 170);
		const titleHeight = titleLines.length * 7; // Approximate height per line

		// Add summary text
		pdf.setFontSize(12);
		const splitText = pdf.splitTextToSize(text, 170);
		pdf.text(splitText, 20, 20 + titleHeight + 10);

		// Save the PDF
		pdf.save("summary.pdf");
		setIsGenerating(false);
	};

	return (
		<motion.button
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.95 }}
			onClick={generatePDF}
			disabled={isGenerating}
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
			<FileDown
				size={20}
				className={`relative z-10 ${isGenerating && "animate-pulse"}`}
			/>
			<span className="relative z-10">
				{isGenerating ? "Generating PDF..." : "Save PDF"}
			</span>
		</motion.button>
	);
}

export default SaveBtn;
