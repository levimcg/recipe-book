const dateTime = require('./src/filters/dateTime')
const shortcodes = require('./src/utils/shortcodes')
const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor')
const Image = require('@11ty/eleventy-img')

module.exports = function(eleventyConfig) {
  eleventyConfig.setBrowserSyncConfig({
    open: 'local'
  })
  
  // Merge data E.g. tags on each .md file with directory data "tags" field
  eleventyConfig.setDataDeepMerge(true)
  
  // Filters
  eleventyConfig.addFilter('dateFormatted', dateTime)
  
  // Shortcodes
  Object.keys(shortcodes).forEach(shortcode => {
    eleventyConfig.addShortcode(shortcode, shortcodes[shortcode])
  })
  
  async function imageShortcode(src, alt, sizes) {
    let metadata = await Image(src, {
      widths: [300, 600, 900],
      formats: ['webp', 'jpeg'],
      outputDir: './site/img/'
    });
  
    let imageAttributes = {
      alt,
      sizes,
      loading: 'lazy',
      decoding: 'async',
    };
  
    // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
    return Image.generateHTML(metadata, imageAttributes, {
      whitespaceMode: "inline"
    });
  }
  
  eleventyConfig.addNunjucksAsyncShortcode('image', imageShortcode);

  // Watch targets
  eleventyConfig.addWatchTarget('./src/scss/')
  
  // Configure markdown settings
  const markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
    typographer: true
  }).use(markdownItAnchor, {
    permalink: true,
    permalinkClass: 'heading-anchor',
    permalinkSymbol: '#'
  })
  
  // Markdown settings for 11ty
  eleventyConfig.setLibrary('md', markdownLibrary)
  
  // Collections
  eleventyConfig.addCollection("recipes", function(collectionApi) {
    return collectionApi.getFilteredByGlob("./src/recipes/*.md")
  })

  return {
    dir: {
      input: 'src',
      output: 'site'
    },
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk'
  }
}