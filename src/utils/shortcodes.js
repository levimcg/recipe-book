module.exports = {
  ingredientList: function ingredients(data) {
    return `<ul class="ingredient-list">
        ${data.map(ingredient => `<li>${ingredient}</li>`).join('')}
      </ul>`
  }
}