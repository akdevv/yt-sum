import fs from "fs/promises";
import generateSummary from "../services/summarizer.js";
import { downloadAudio, getMetadata } from "../services/video.js";

const processVideo = async (req, res) => {
	console.log("processing the video...");

	try {
		const { url } = req.body;
		const outputPath = `./temp/${Date.now()}.mp3`;

		// Get metadata
		const metadata = await getMetadata(url);
		console.log("Metadata fetched successfully!");

		// Download audio
		await downloadAudio(url, outputPath);
		console.log("Video downloaded successfully!");

		// Generate summary
		const text = await generateSummary(
			outputPath,
			"Generate a summary of this speech."
		);
		console.log("Summary generated successfully!");

		// Delete the file
		await fs.unlink(outputPath);
		console.log("Temporary audio file deleted successfully!");

		return res.status(200).json({
			status: 200,
			message: "Video processed successfully!",
			text,
			metadata,
		});
	} catch (err) {
		console.error("Error processing video: ", err.message);
		return res.status(500).json({
			status: 401,
			error: "Something went wrong!",
		});
	}
};

export default processVideo;
