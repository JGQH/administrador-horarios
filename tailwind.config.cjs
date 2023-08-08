/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		colors: {
			'accent': {
				'light': '#ff760a',
				DEFAULT: '#ff5d01',
				'dark': '#cc4102'
			},
			'black': {
				'light': '#3d3d3d',
				DEFAULT: '#1c1c1c'
			},
			'white': {
				DEFAULT: '#f6f6f6',
				'dark': '#e7e7e7'
			}
		},
	},
	plugins: [],
}
