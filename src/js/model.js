import {API_URL} from './config.js'

// Loading search results
export const loadSearchResults = async function(query) {
    console.log(`${API_URL}?search=${query}`)
}