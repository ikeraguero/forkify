  import 'core-js/stable'
  import "regenerator-runtime"
  import searchView from './views/searchView'
  import resultsView from './views/resultsView.js'
  import recipeView from './views/recipeView.js'
  import paginationView from './views/paginationView.js'
  import bookmarksView from './views/bookmarksView.js'
  import * as model from './model.js'


  const controlSearchResults =  async function() {
    try {
      resultsView.renderSpinner()
      // Searching and loading results
      const query = searchView.getQuery()
      await model.loadSearchResults(query)
      model.loadPages(model.state.search)
      model.loadPagination(model.state.search);
      
      // Rendering results

      updateResults()
      console.log('Teste')
    } catch(err) {
      console.error(err)
      resultsView.renderError()
    }
  }

  const controlRecipe = async function(ev) {
    try {
      if(ev==='load') { 
        recipeView.renderMessage()
        return;
      }
      recipeView.renderSpinner()
      const id = window.location.hash.slice(1)
      await model.loadRecipe(id)
      
      // Checking if the current recipe object is not empty before rendering the recipe, if it is, function is returned
      if(!Object.keys(model.state.recipe).length > 0) return
      recipeView.setData(model.state.recipe)
      updateRecipe()
      updateResults()
      bookmarksView.render()
    } catch(err) {
      console.log(err)
    }
    }

  const controlPagination = function() {
    model.changePagination(paginationView.page);
    model.loadPagination(model.state.search);
    resultsView.setData(model.state.search.page_results)
    paginationView.setData(model.state.search);
    updateResults()
  }

  const controlServings = function() {
    console.log(model.state.recipe.servings)
    model.updateServings(recipeView.servings);
    recipeView.setData(model.state.recipe)
    ///
    updateRecipe()
  }

  const controlBookmarks = function() {
    if(model.state.recipe.isBookmarked){
      model.deleteBookmark()
    } else {
      model.addBookmark(model.state.recipe)
    };
    bookmarksView.setData(model.state.bookmarks);
    updateRecipe()
    
  }

  // Handling query when search form is submited
  const init = function() {
    recipeView.renderSpinner()
    bookmarksView.setData(model.state.bookmarks);
    searchView.addEventHandler(controlSearchResults)
    recipeView.addEventHandler(controlRecipe)
    paginationView.addEventHandler(controlPagination)
  }

  init()

 // Update functions
 
 
 const updateResults = function() {
  resultsView.setData(model.state.search.page_results)
  paginationView.clear()
  paginationView.setData(model.state.search)
  resultsView.render()
  paginationView.render()
}

const updateRecipe = function() {
  recipeView.render()
  recipeView.addServingsHandler(controlServings)
  recipeView.addBookmarkHandler(controlBookmarks)
}