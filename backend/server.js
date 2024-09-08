import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 8000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Allow Cross-Origin requests (for local development)
app.use(cors());

// POST route to handle form submission
app.post("/api/submit", (req, res) => {
	const { name, email } = req.body;
	console.log(`Received form data: Name - ${name}, Email - ${email}`);

	// You can do something with the data here, like saving it to a database

	res.status(200).send("Form data received and logged!");
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
