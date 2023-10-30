const CleanCSS = require('clean-css')

module.exports = function(value) {
  return new CleanCSS({}).minify(value).styles;
}