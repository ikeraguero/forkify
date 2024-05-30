import 'core-js/stable'
import "regenerator-runtime"
import searchView from './views/searchView'
import * as model from './model.js'

const controlSearch = function() {
  const query = searchView.getQuery()
  model.loadSearchResults(query)

}

// Handling query when search form is submited
searchView.addEventHandler(controlSearch)