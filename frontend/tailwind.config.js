/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		fontFamily: {
			poppins: ["Poppins", "sans-serif"],
			"dela-gothic-one": ["Delta Gothic One", "sans-serif"],
			"fira-mono": ["Fira Mono", "sans-serif"],
		},
		extend: {},
	},
	plugins: [],
};
