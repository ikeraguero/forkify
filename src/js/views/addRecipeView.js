import icons from '../../img/icons.svg'

class AddRecipeView {
    #parentEl = document.querySelector(".upload");
    overlay = document.querySelector(".overlay")
    window = document.querySelector(".add-recipe-window")
    btnOpen = document.querySelector(".nav__btn--add-recipe")
    btnClose = document.querySelector(".btn--close-modal")

    addEventHandler() {
        const btns = [this.btnOpen, this.btnClose]
        btns.forEach(btn => btn.addEventListener("click", () => {
            this.overlay.classList.toggle("hidden")
            this.window.classList.toggle("hidden")
        }))
    }

    addSubmitHandler(handler) {
        this.#parentEl.addEventListener("submit", (e) => {
            e.preventDefault()
            /*
            const ingredientsList = [...this.#parentEl.querySelectorAll(".ingredient")].filter(ing=> {
                return ing.getAttribute("value")
        }).map(ing=> (ing.getAttribute("value").split(",")))

            const ingredients = ingredientsList.map((ing, i) => {
                const ingredient = {
                    quantity: ing[0].length === 0 ? null : ing[0],
                    unit: ing[1].length === 0 ? null : ing[1],
                    description: ing[2],
                }
                return ingredient;
            })
            const recipe = {
                publisher: this.#parentEl.querySelector("form[name='upload'] input[name='publisher']").value,
                ingredients: ingredients,
                source_url: this.#parentEl.querySelector("form[name='upload'] input[name='sourceUrl']").value,
                image_url: this.#parentEl.querySelector("form[name='upload'] input[name='image']").value,
                title: this.#parentEl.querySelector("form[name='upload'] input[name='title']").value,
                servings: this.#parentEl.querySelector("form[name='upload'] input[name='servings']").value,
                cooking_time: this.#parentEl.querySelector("form[name='upload'] input[name='cookingTime']").value
            }
            console.log(recipe)
            */
           const dataArr = [...new FormData(this.#parentEl)];
           const data = Object.fromEntries(dataArr)
           handler(data)
        })
    }
}

export default new AddRecipeView;