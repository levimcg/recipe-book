module.exports = {
  image: function image(params) {
    return `<figure>
      <picture>
        <source srcset="${params.webpSrc}" type="image/webp">
        <img
          src="${params.jpgSrc}"
          width="${params.width}"
          height="${params.height}
          alt="${params.alt}"
          loading="lazy">
      </picture>
      ${params.caption && `<figcaption>${params.caption}</figcaption>`}
    </figure>`
  },
  
  ingredientList: function ingredients(data) {
    return `<ul class="ingredient-list">
        ${data.map(ingredient => `<li>${ingredient}</li>`).join('')}
      </ul>`
  }
}