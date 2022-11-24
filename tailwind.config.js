/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,ts}'],
	theme: {
		extend: {
			colors: {
				'custom-primary': '#2A7FF6',
				'custom-primary-light': ['#D7E7FF', '#B1D1FE', '#71AAF9'],
				'custom-primary-dark': ['#0859C9'],

				'custom-secondary': '#222234',
				'custom-secondary-light': ['#ECECEC', '#D6D6D6', '#80868E', '#5D5D5E'],

				'custom-error': '#F34343',
				'custom-error-light': ['#FFD7D7'],

				'custom-success': '#1AC693',
				'custom-success-light': ['#C0EBDE'],
			},

			fontFamily: {
				'custom-primary': "'Lato', sans-serif",
				'custom-secondary': "'Open Sans', sans-serif",
			},
		},
	},
	plugins: [],
};
