import CleanCSS from 'clean-css';

export function cssmin(value) {
	return new CleanCSS({}).minify(value).styles;
}

export function formatDate(value) {
	let dateObject = new Date(value);
	return dateObject.toLocaleString('en-us', {
		day: '2-digit',
		month: 'short',
		year: 'numeric'
	});
}