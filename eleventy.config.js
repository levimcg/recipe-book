import { markdownLibrary } from './src/_config/markdown.js';
import { cssmin, formatDate } from './src/_config/filters.js';

export default async function (eleventyConfig) {
	// Filters
	eleventyConfig.addFilter('formatDate', formatDate);
	eleventyConfig.addFilter('cssmin', cssmin);
	
	// Markdown settings for 11ty
	eleventyConfig.setLibrary('md', markdownLibrary);

	// Collections
	eleventyConfig.addCollection("recipes", function (collectionApi) {
		return collectionApi.getFilteredByGlob("./src/recipes/*.md")
	});

	// Passthrough copy config
	const copyDirectories = [
		'./src/fonts',
		'./src/img',
		'./src/favicon.png',
		'./src/js'
	];

	copyDirectories.forEach(dir => {
		eleventyConfig.addPassthroughCopy(dir);
	});

	// Misc.
	eleventyConfig.addWatchTarget('./src/js/');
	eleventyConfig.setDataDeepMerge(true);

	return {
		dir: {
			input: 'src',
			output: 'site',
			layouts: '_layouts'
		},
		templateFormats: [
			'njk',
			'html',
			'liquid',
			'md'
		],
		markdownTemplateEngine: 'njk',
		htmlTemplateEngine: 'njk'
	}
}