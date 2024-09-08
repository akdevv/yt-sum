import { useState } from "react";

const InputForm = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch("http://localhost:8000/api/submit", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				console.log("Data successfully submitted!");
				console.log(response);
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
				<label>Name: </label>
				<input
					type="text"
					name="name"
					value={formData.name}
					onChange={handleChange}
				/>
			</div>
			<div>
				<label>Email: </label>
				<input
					type="email"
					name="email"
					value={formData.email}
					onChange={handleChange}
				/>
			</div>
			<button type="submit">Submit</button>
		</form>
	);
};

export default InputForm;
