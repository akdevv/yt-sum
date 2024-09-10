import youtubedl from "youtube-dl-exec";

async function downloadAudio(url, outputPath) {
	try {
		console.log("Starting audio download...");

		const download = youtubedl(url, {
			output: outputPath,
			extractAudio: true,
			audioFormat: "mp3",
			audioQuality: "worst",
			format: "worstaudio/worst",
			noCheckCertificates: true,
			noWarnings: true,
			preferFreeFormats: true,
			addHeader: ["referer:youtube.com", "user-agent:googlebot"],
		});

		await download.then(() => {
			console.log("Audio download completed successfully!");
			console.log(`Audio saved to: ${outputPath}`);
		});
	} catch (error) {
		console.error("An error occurred:", error.message);
	}
}

// Usage
const videoUrl = "https://www.youtube.com/watch?v=OBvZvENxIEg";
const outputPath = "./temp/output.mp3";

downloadAudio(videoUrl, outputPath);
