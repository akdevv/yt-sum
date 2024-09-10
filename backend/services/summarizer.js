import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";

const listAllFiles = async () => {
	const fileManager = new GoogleAIFileManager(process.env.GOOGLE_API_KEY);
	const listFilesResponse = await fileManager.listFiles();

	if (listFilesResponse.files) {
		for (const file of listFilesResponse.files) {
			console.log(`name: ${file.name}`);
		}
	}
};

const deleteFiles = async () => {
	const fileManager = new GoogleAIFileManager(process.env.GOOGLE_API_KEY);
	const listFilesResponse = await fileManager.listFiles();

	if (listFilesResponse.files) {
		for (const file of listFilesResponse.files) {
			await fileManager.deleteFile(file.name);
			console.log(`Successfully deleted: ${file.name}`);
		}
	}
};

const generateSummary = async (filePath, prompt) => {
	// Upload the file
	const fileManager = new GoogleAIFileManager(process.env.GOOGLE_API_KEY);
	const audioFile = await fileManager.uploadFile(filePath, {
		mimeType: "audio/mp3",
	});

	// Initialize GoogleGenerativeAI with your API_KEY.
	const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

	// Initialize a Gemini model appropriate for your use case.
	const model = genAI.getGenerativeModel({
		model: "gemini-1.5-flash",
	});

	// Generate content using a prompt and the metadata of the uploaded file.
	const result = await model.generateContent([
		{
			fileData: {
				mimeType: audioFile.file.mimeType,
				fileUri: audioFile.file.uri,
			},
		},
		{ text: prompt },
	]);

	// Delete the file.
	await deleteFiles();

	return result.response.text();
};

export default generateSummary;
