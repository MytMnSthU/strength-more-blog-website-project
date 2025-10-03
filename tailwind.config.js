/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		screens: {
			sm: "640px",
			md: "768px",
			lg: "1024px",
			xl: "1640px",
		},
		extend: {},
	},
	darkMode: "selector", // Enable dark mode via a CSS class
	plugins: [],
};
