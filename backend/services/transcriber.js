import fs from "fs";
import OpenAI from "openai";

const transcribeAudio = async (audioPath) => {
	const apiKey = process.env.OPENAI_API_KEY;
	const openai = new OpenAI({ apiKey });

	const transcription = await openai.audio.transcriptions.create({
		model: "whisper-1",
		file: fs.createReadStream(audioPath),
		response_format: "text",
		prompt: "Please transcribe this audio.",
	});

	console.log(transcription);
};

transcribeAudio("../temp/output.mp3");
