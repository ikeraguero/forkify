import {API_URL} from './config.js'
import { RESULTS_PER_PAGE } from './config.js';

// Defining the application state
export const state = {
    recipe: [],
    search: {
        query: '',
        results: [],
        results_per_page: RESULTS_PER_PAGE,
        page: 1
    },

    bookmarks: []
}


// Loading search results
export const loadSearchResults = async function(query) {
    try {
        state.search.query = query;
        const results = await fetch(`${API_URL}?search=${query}`)
        if(!results.ok) throw new Error();

        const {data} = await results.json()
        if(data.recipes.length==0) throw new Error()

        state.search.results = data.recipes.map(rec=> {
            return {
                id: rec.id,
                title: rec.title,
                image: rec.image_url,
                publisher: rec.publisher
            }
        })
        state.search.page = 1;
    } catch(err) {
        throw new Error() // propagating the error to the controller
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

        const curRecipeId = window.location.hash.slice(1)
        const isBookmarked = state.bookmarks.some(book =>
            book.id == curRecipeId
        )
        
        state.recipe.isBookmarked = isBookmarked ? true : false
        console.log(state.recipe)
    } catch (err) {
        throw new Error()
        console.error(err)
    }
    
}

export const loadPages = function(searchData) {
    const pages = Math.trunc(searchData.results.length/searchData.results_per_page)
    searchData.total_pages = pages;
}

export const loadPagination = function(searchData) {
    const startIndex = (searchData.page - 1) * searchData.results_per_page;
    const endingIndex = (searchData.results_per_page * searchData.page)
    const pageResults = searchData.results.slice(startIndex, endingIndex)

    //Loading the filtered results to the results array:
    searchData.page_results = pageResults.map(rec=> {
        return rec;
    })


}

export const changePagination = function(page) {
    state.search.page = page;
}

export const updateServings = function(newServings =1) {
    state.recipe.ingredients.forEach(ing => {
        ing.quantity = (ing.quantity * newServings) / state.recipe.servings,
        console.log(ing.quantity)
    }
    )
    state.recipe.servings = newServings;
}

export const persistBookmarks = function() {
    localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks))
}

export const addBookmark = function(recipe) {
    state.bookmarks.unshift(recipe)
    state.recipe.isBookmarked = true;
    console.log(state.recipe)

    persistBookmarks()
}

export const deleteBookmark = function() {
    const curRecipeId = window.location.hash.slice(1)
    let index; 
    state.bookmarks.forEach((book, i)=> {
        if(book.id == curRecipeId) {
            index = i;
        }        
    })
    state.bookmarks.splice(index, 1);
    state.recipe.isBookmarked = false;
    console.log(state.recipe)
    persistBookmarks();
}

const init = function() {
    const storage = localStorage.getItem("bookmarks")
    if(storage) state.bookmarks = JSON.parse(storage)
    console.log(state.bookmarks)
}

init()