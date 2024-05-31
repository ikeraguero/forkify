class RecipeView {
    #parentEl = document.querySelector("recipe")

    addEventHandler(handler) {
        const options = ['load', 'hashchange']
        options.forEach(ev=> window.addEventListener(ev, handler))
    }
}

export default new RecipeView;