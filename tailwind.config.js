/** @type {import("tailwindcss").Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				"primary": {
					"50": "#fbf7fd",
					"100": "#f5eef9",
					"200": "#eddff5",
					"300": "#dec6ec",
					"400": "#caa1df",
					"500": "#b57cd0",
					"600": "#a76ac2",
					"700": "#8a4ca4",
					"800": "#744287",
					"900": "#5e366d",
					"950": "#401e4d",
				},
				"secondary": {
					"50": "#fdf8f0",
					"100": "#faf1e1",
					"200": "#f6e3c4",
					"300": "#f1d6a6",
					"400": "#edc889",
					"500": "#e8ba6b",
					"600": "#ba9556",
					"700": "#8b7040",
					"800": "#5d4a2b",
					"900": "#2e2515"
				}
			}
		},
	},
	plugins: [],
};
