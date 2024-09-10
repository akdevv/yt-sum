import youtubedl from "youtube-dl-exec";

const downloadAudio = async (url, outputPath) => {
	try {
		await youtubedl(url, {
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
	} catch (err) {
		console.error("Unable to download audio:", err.message);
	}
};

// Usage
// const videoUrl = "https://www.youtube.com/watch?v=OBvZvENxIEg";
// const outputPath = "./temp/output.mp3";

// const path = await downloadAudio(videoUrl, outputPath);
// console.log("path: ", path);

export default downloadAudio;
