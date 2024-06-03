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
    try {
        state.search.query = query;
        const results = await fetch(`${API_URL}?search=${query}`)
        const {data} = await results.json()
        state.search.results = data.recipes.map(rec=> {
            return {
                id: rec.id,
                title: rec.title,
                image: rec.image_url,
                publisher: rec.publisher
            }
        })
    } catch(err) {
        console.error(err)
    }
    }

// Loading recipe

export const loadRecipe = async function(id) {
    try {
        const {data} = await (await fetch(`${API_URL}${id}`)).json()
        if(!data) return
        state.recipe = {
            id: data.recipe.id,
            title: data.recipe.title,
            image: data.recipe.image_url,
            ingredients: data.recipe.ingredients,
            time: data.recipe.cooking_time,
            publisher: data.recipe.publisher,
            servings: data.recipe.servings,
            source: data.recipe.source_url
        }
        console.log(state.recipe)
    } catch (err) {
        console.error(err)
    }
}