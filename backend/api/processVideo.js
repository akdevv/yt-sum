import generateSummary from "../services/summarizer.js";
import downloadAudio from "../services/videoDownloader.js";

const processVideo = async (req, res) => {
	console.log("processing the video...");

	try {
		const { url } = req.body;
		const outputPath = "./temp/output.mp3";

		await downloadAudio(url, outputPath);
		console.log("video downloaded successfully!");

		const text = await generateSummary(
			outputPath,
			"Generate the transcript of this speech."
		);
		console.log("Summary generated successfully!");
		console.log("summary: ", text);

		return res.status(200).json({
			status: 200,
			message: "Video processed successfully!",
			text,
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
