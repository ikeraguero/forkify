import {API_URL} from './config.js'

// Defining the application state
export const state = {
    recipe: [],
    search: {
        query: '',
        results: [],
        page: 1
    }
}


// Loading search results
export const loadSearchResults = async function(query) {
    const results = await fetch(`${API_URL}?search=${query}`)
    const {data} = await results.json()
    console.log(data.recipes)
    state.results = data.recipes.map(rec=> {
        return {
            id: rec.id,
            title: rec.title,
            image: rec.image_url,
            publisher: rec.publisher
        }
    })
}