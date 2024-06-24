import {API_URL, API_KEY, RESULTS_PER_PAGE} from './config.js'

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
        const results = await fetch(`${API_URL}?search=${query}&key=${API_KEY}`)
        if(!results.ok) throw new Error();

        const {data} = await results.json()
        if(data.recipes.length==0) throw new Error()

        state.search.results = data.recipes.map(rec=> {
            return {
                id: rec.id,
                title: rec.title,
                image: rec.image_url,
                publisher: rec.publisher,
                key: rec.key? true : false
            }
        })
        state.search.page = 1;
        console.log(data)
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
            source: data.recipe.source_url,
            key: data.recipe.key? true : false
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
        ing.quantity = (ing.quantity * newServings) / state.recipe.servings    }
    )
    state.recipe.servings = newServings;
}

export const persistBookmarks = function() {
    localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks))
}

export const addBookmark = function(recipe) {
    state.bookmarks.unshift(recipe)
    state.recipe.isBookmarked = true;

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
    persistBookmarks();
}

export const uploadRecipe = async function(newRecipe) {
    // Formatting ingredients in order to match the API format
    const ingredients = Object.entries(newRecipe).filter((entry) => entry[0].startsWith("ingredient") && entry[1].length!==0)
    .map(ing=>ing.slice(1)).map(ing=>ing[0].split(",")).map(ing=> {
        const ingredient = {
            quantity: ing[0].length === 0 ? null : ing[0],
            unit: ing[1].length === 0 ? null : ing[1],
            description: ing[2]
        }
        return ingredient;
    })
    const recipe = {
        title: newRecipe.title,
        source_url: newRecipe.sourceUrl,
        image_url: newRecipe.image,
        publisher: newRecipe.publisher,
        cooking_time: +newRecipe.cookingTime,
        servings: +newRecipe.servings,
        ingredients: ingredients,
        key: true,
    }
    console.log(JSON.stringify(recipe))
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(recipe)
    })
    console.log(await response.json())
}

const init = function() {
    const storage = localStorage.getItem("bookmarks")
    if(storage) state.bookmarks = JSON.parse(storage)
}

init()