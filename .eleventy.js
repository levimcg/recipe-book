const dateTime = require('./src/filters/dateTime')
const cssmin = require('./src/filters/cssmin')
const shortcodes = require('./src/utils/shortcodes')
const markdownIt = require('markdown-it')
const markdownItAnchor = require('markdown-it-anchor')

module.exports = function(eleventyConfig) {

  eleventyConfig.addPassthroughCopy('./src/fonts')
  eleventyConfig.addPassthroughCopy('./src/img')
  eleventyConfig.addPassthroughCopy('./src/favicon.png')

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
  }).use(markdownItAnchor)

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