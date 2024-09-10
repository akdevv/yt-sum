import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import processVideo from "./api/processVideo.js";

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

app.post("/api/summarize", processVideo);

app.listen(PORT, () => {
	console.log(`Server running on port: ${PORT}`);
});
