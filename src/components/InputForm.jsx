import { useState } from "react";

const InputForm = () => {
	const [url, setUrl] = useState("");

	const handleChange = (e) => {
		const url = e.target.value;
		setUrl(url);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch("http://localhost:8000/api/submit", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ url }),
			});

			if (response.ok) {
				console.log("Data successfully submitted!");
			} else {
				console.error("Error submitting data");
			}
		} catch (error) {
			console.error("Error:", error);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label>URL: </label>
				<input
					type="text"
					name="name"
					value={url}
					onChange={handleChange}
				/>
			</div>
			<button type="submit">Submit</button>
		</form>
	);
};

export default InputForm;
