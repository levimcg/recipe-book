import MarkdownIt from 'markdown-it';
import markdownItFootnote from 'markdown-it-footnote';
import markdownItAnchor from 'markdown-it-anchor';

const markdownOptions = {
	html: true,
	breaks: true,
	linkify: true,
	typographer: true
};

// Configure markdown settings
export const markdownLibrary = MarkdownIt(markdownOptions)
	.use(markdownItAnchor)
	.use(markdownItFootnote);