import 'core-js/stable'
import "regenerator-runtime"
import searchView from './views/searchView'
import resultsView from './views/resultsView.js'
import recipeView from './views/recipeView.js'
import * as model from './model.js'


const controlSearchResults =  async function() {
  // Searching and loading results
  const query = searchView.getQuery()
  await model.loadSearchResults(query)

  // Rendering results
  resultsView.setData(model.state.search.results)
  resultsView.render()
}

const controlRecipe = async function() {
  const id = window.location.hash.slice(1)
  await model.loadRecipe(id)

  // Checking if the current recipe object is not empty before rendering the recipe, if it is, function is returned
  if(!Object.keys(model.state.recipe).length > 0) return
  recipeView.setData(model.state.recipe)
  recipeView.render()
}

// Handling query when search form is submited
searchView.addEventHandler(controlSearchResults)
recipeView.addEventHandler(controlRecipe)

const init = function() {
}

init()