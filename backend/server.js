import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import generateTranscript from "./video.controller.js";

const app = express();
const PORT = 8000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

app.post("/api/submit", generateTranscript);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
