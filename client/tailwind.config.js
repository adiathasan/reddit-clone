module.exports = {
	purge: ['./pages/**/*.js', './components/**/*.js'],
	darkMode: 'class', // or 'media' or 'class'
	theme: {
		extend: {
			spacing: {
				1000: '1000px',
			},
		},
	},
	variants: {
		extend: {
			opacity: 'disabled',
		},
	},
	plugins: [],
};
