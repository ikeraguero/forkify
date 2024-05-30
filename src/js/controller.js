import 'core-js/stable'
import "regenerator-runtime"
import searchView from './views/searchView'
import resultsView from './views/resultsView.js'
import * as model from './model.js'


const controlSearchResults =  async function() {
  // Searching and loading results
  const query = searchView.getQuery()
  await model.loadSearchResults(query)

  // Rendering results
  resultsView.render(model.state.search.results)
}

// Handling query when search form is submited
searchView.addEventHandler(controlSearchResults)