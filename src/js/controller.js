  import 'core-js/stable'
  import "regenerator-runtime"
  import searchView from './views/searchView'
  import resultsView from './views/resultsView.js'
  import recipeView from './views/recipeView.js'
  import paginationView from './views/paginationView.js'
  import bookmarksView from './views/bookmarksView.js'
  import addRecipeView from './views/addRecipeView.js'
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
    } catch(err) {
      console.error(err)
      resultsView.renderError()
    }
  }

  const controlRecipe = async function(ev) {
    if(model.state.bookmarks.length === 0)  {
      bookmarksView.renderMessage()
    }
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
      if(model.state.bookmarks.length === 0)  {
        bookmarksView.renderMessage()
        return;
      }
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
    if(model.state.bookmarks.length === 0) {
      bookmarksView.renderMessage();
      updateRecipe();
      return;
    }
    bookmarksView.render()
    updateRecipe()
  }

  const controlAddNewRecipe = function(newRecipe) {
      model.uploadRecipe(newRecipe)
  }

  // Handling query when search form is submited
  const init = function() {
    recipeView.renderSpinner()
    bookmarksView.setData(model.state.bookmarks);
    searchView.addEventHandler(controlSearchResults)
    recipeView.addEventHandler(controlRecipe)
    paginationView.addEventHandler(controlPagination)
    addRecipeView.addSubmitHandler(controlAddNewRecipe)
    addRecipeView.addEventHandler()
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