import "./App.css";
import axios from "axios";
import { useState } from "react";
import { isValidURL } from "./helpers/validation";

function App() {
	const [url, setUrl] = useState("");
	const [text, setText] = useState("");
	const [error, setError] = useState("");
	const [metadata, setMetadata] = useState("");

	const handleSubmit = async (evt) => {
		evt.preventDefault();
		setError(""); // Reset error before validation

		if (!isValidURL(url)) {
			setError("Please enter a valid YouTube video URL!");
			return;
		}

		try {
			const response = await axios.post(
				"http://localhost:5000/api/summarize",
				{ url }
			);
			if (response.status === 200) {
				setText(response.data.text);
				setMetadata(response.data.metadata);
			} else {
				console.error("Error submitting data!");
			}
		} catch (err) {
			console.error("Error:", err);
		}
	};

	return (
		<>
			<div>Hello World</div>
			<form onSubmit={handleSubmit}>
				<label>URL: </label>
				<input
					type="text"
					name="url"
					value={url}
					onChange={(evt) => setUrl(evt.target.value)}
				/>
				<button type="submit">Submit</button>
			</form>

			{/* Show error if URL is invalid */}
			{error && <p style={{ color: "red" }}>{error}</p>}

			<div>Backend Response:</div>
			<p>{text}</p>
			<p>{metadata.title}</p>
			<img src={metadata.thumbnail} alt="Video Thumbnail" width={300} />
		</>
	);
}

export default App;
