import "./App.css";
import axios from "axios";
import { useState } from "react";

function App() {
	const [url, setUrl] = useState("");
	const [text, setText] = useState("");

	const handleSubmit = async (evt) => {
		evt.preventDefault();
		try {
			// const response = await fetch(
			// 	"http://localhost:5000/api/summarize",
			// 	{
			// 		method: "POST",
			// 		headers: {
			// 			"Content-Type": "application/json",
			// 		},
			// 		body: JSON.stringify({ url }),
			// 	}
			// );

			const response = await axios.post(
				"http://localhost:5000/api/summarize",
				{ url }
			);

			if (response.status === 200) {
				console.log("Data successfully submitted!");
				console.log("response = ", response);
				setText(response.data.text);
			} else {
				console.error("Error submitting data");
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
			<div>Backend Response:</div>
			<p>{text}</p>
		</>
	);
}

export default App;
