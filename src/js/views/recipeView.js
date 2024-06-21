import { mark } from 'regenerator-runtime';
import icons from '../../img/icons.svg'
import { Fraction } from 'fractional';

class RecipeView {
    #parentEl = document.querySelector(".recipe");
    #data;
    servings;
  
    addEventHandler(handler) {
        const options = ['load', 'hashchange']
        options.forEach(ev=> window.addEventListener(ev, handler))
    }

    addServingsHandler(handler) {
      const btns = document.querySelector(".recipe__info-buttons");
      btns.addEventListener('click', (e) => {
        const btn = e.target.closest(".btn--increase-servings")
        if(!btn) return;
        const nextServing = parseInt(e.target.closest(".btn--increase-servings").getAttribute("next"))
        this.servings = nextServing < 1 ? this.servings : nextServing;
        handler()
      })
    }

    addBookmarkHandler(handler) {
      const bookmarkBtn = document.querySelector(".bookmark-btn")
      bookmarkBtn.addEventListener("click", () => {
        handler()
      })
    }

    setData(data) {
        this.#data = '';
        this.#data = data;
        this.servings = '';
        this.servings = data.servings
    }

    render() {
            this.#parentEl.innerHTML = '';
            let markup = this.generateMarkup();
            this.#parentEl.insertAdjacentHTML('afterbegin', markup)
          }
          
    generateMarkup() {
        let markup = `<figure class="recipe__fig">
        <img src="${this.#data.image}" alt="Tomato" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${this.#data.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${this.#data.time}</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${this.#data.servings}</span>
          <span class="recipe__info-text">servings</span>

          <div class="recipe__info-buttons">
            <button class="btn--tiny btn--increase-servings" next="${this.#data.servings-1}">
              <svg>
                <use href="${icons}#icon-minus-circle"></use>
              </svg>
            </button>
            <button class="btn--tiny btn--increase-servings" next="${this.#data.servings+1}">
              <svg>
                <use href="${icons}#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>

        <div class="recipe__user-generated">
          <svg>
            <use href="${icons}#icon-user"></use>
          </svg>
        </div>
        <button class="btn--round bookmark-btn">
          <svg class="">
            <use href="${icons}#icon-bookmark${this.#data.isBookmarked ? '-fill' : ''}"></use>
          </svg>
        </button>
      </div>

      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
        `

      this.#data.ingredients.forEach(ing => {
        markup +=` <li class="recipe__ingredient">
        <svg class="recipe__icon">
          <use href="${icons}#icon-check"></use>
        </svg>
        <div class="recipe__quantity">${ing.quantity ? new Fraction(ing.quantity).toString() : ''}</div>
        <div class="recipe__description">
          <span class="recipe__unit">${ing.unit}</span>
          ${ing.description}
        </div>
      </li>`})
         
      markup += `
      </ul>
      </div>
      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${this.#data.publisher}</span>. Please check out
          directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href="${this.#data.source}"
          target="_blank"
        >
          <span>Directions</span>
          <svg class="search__icon">
            <use href="${icons}}#icon-arrow-right"></use>
          </svg>
        </a>
      </div>`

      return markup;
    }

    generateMessage() {
        return `<div class="message">
        <div>
          <svg>
            <use href="src/img/icons.svg#icon-smile"></use>
          </svg>
        </div>
        <p>Start by searching for a recipe or an ingredient. Have fun!</p>
      </div>
`
    }


}

export default new RecipeView;