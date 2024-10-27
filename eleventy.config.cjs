const dateTime = require('./src/filters/dateTime.cjs')
const cssmin = require('./src/filters/cssmin.cjs')
const shortcodes = require('./src/utils/shortcodes.cjs')
const markdownIt = require('markdown-it')
const markdownItFootnote = require('markdown-it-footnote')
const markdownItAnchor = require('markdown-it-anchor')

module.exports = function(eleventyConfig) {

  eleventyConfig.addWatchTarget("./src/js/");

  eleventyConfig.addPassthroughCopy('./src/fonts')
  eleventyConfig.addPassthroughCopy('./src/img')
  eleventyConfig.addPassthroughCopy('./src/favicon.png')
  eleventyConfig.addPassthroughCopy('./src/js')

  // Merge data E.g. tags on each .md file with directory data "tags" field
  // eleventyConfig.setDataDeepMerge(true)

  // Filters
  eleventyConfig.addFilter('dateFormatted', dateTime)
  eleventyConfig.addFilter('cssmin', cssmin)

  // Shortcodes
  Object.keys(shortcodes).forEach(shortcode => {
    eleventyConfig.addShortcode(shortcode, shortcodes[shortcode])
  })

  // Configure markdown settings
  const markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
    typographer: true
  })
    .use(markdownItAnchor)
    .use(markdownItFootnote)

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