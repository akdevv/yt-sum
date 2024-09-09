import fs from "fs";
import ytdl from "ytdl-core";
import path from "path";
// import ffmpeg from "fluent-ffmpeg";
import { fileURLToPath } from "url";

const TEST_VIDEO_URL = "https://www.youtube.com/watch?v=0TnO1GzKWPc";

const downloadVideo = async (videoUrl) => {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);

	const options = {
		quality: "highestvideo",
		filter: "videoandaudio",
	};

	const info = await ytdl.getInfo(videoUrl);
	const title = info.videoDetails.title;
	const videoPath = path.join(__dirname, `/temp/${title}.mp4`);
	const writeStream = fs.createWriteStream(videoPath);

	ytdl(videoUrl, options).pipe(writeStream);

	writeStream.on("finish", () => {
		console.log("Finished Downloading");
	});

	console.log(videoPath);
};

const generateTranscript = (req, res) => {
	// const { url } = req.body;
	downloadVideo(TEST_VIDEO_URL);

	res.status(200).send("Form data received and logged!");
};

export default generateTranscript;
