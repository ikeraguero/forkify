  import 'core-js/stable'
  import "regenerator-runtime"
  import searchView from './views/searchView'
  import resultsView from './views/resultsView.js'
  import recipeView from './views/recipeView.js'
  import paginationView from './views/paginationView.js'
  import bookmarksView from './views/bookmarksView.js'
  import * as model from './model.js'


  const controlSearchResults =  async function() {
    // Searching and loading results
    const query = searchView.getQuery()
    await model.loadSearchResults(query)
    model.loadPages(model.state.search)
    model.loadPagination(model.state.search);

    // Rendering results
    resultsView.setData(model.state.search.page_results)
    paginationView.clear()
    paginationView.setData(model.state.search)
    resultsView.render()
    paginationView.render()
  }

  const controlRecipe = async function() {
    const id = window.location.hash.slice(1)
    await model.loadRecipe(id)

    // Checking if the current recipe object is not empty before rendering the recipe, if it is, function is returned
    if(!Object.keys(model.state.recipe).length > 0) return
    recipeView.setData(model.state.recipe)
    recipeView.update(controlServings, controlBookmarks)
    resultsView.render()
    
  }

  const controlPagination = function() {
    model.changePagination(paginationView.page);
    model.loadPagination(model.state.search);
    resultsView.setData(model.state.search.page_results)
    paginationView.setData(model.state.search);
    resultsView.render()
    paginationView.render();
  }

  const controlServings = function() {
    console.log(model.state.recipe.servings)
    model.updateServings(recipeView.servings);
    recipeView.setData(model.state.recipe)
    recipeView.update(controlServings, controlBookmarks)
  }

  const controlBookmarks = function() {
    if(model.state.recipe.isBookmarked){
      model.deleteBookmark()
    } else {
      model.addBookmark(model.state.recipe)
    };
    bookmarksView.setData(model.state.bookmarks);
    bookmarksView.render()
  }

  // Handling query when search form is submited
  const init = function() {
    searchView.addEventHandler(controlSearchResults)
    recipeView.addEventHandler(controlRecipe)
    paginationView.addEventHandler(controlPagination)
  }

  init()