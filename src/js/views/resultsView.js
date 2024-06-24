import icons from '../../img/icons.svg'

class ResultsView {
    #parentEl = document.querySelector('.search-results')
    #container = document.querySelector(".results")
    #data


    setData(data) {
      this.#data = data;
    }

    render() {
      if(this.#parentEl.querySelector(".error") || this.#parentEl.querySelector(".spinner")) {
        this.#parentEl.querySelector(".error")?.remove()
        this.#parentEl.querySelector(".spinner")?.remove()
      }
        this.#container.innerHTML = '';
        this.#container.insertAdjacentHTML("beforeend", this.generateMarkup())

        /* Trying to add the preview--active class to the current recipe.

        let current_recipe = this.#data.filter(rec =>
          rec.id === window.location.hash.slice(1)
        )

        document.querySelectorAll(".preview__link").forEach(link => {

          const href = new URL(link.href);
          const fragment = href.hash.substring(1);

          if(fragment==current_recipe[0]?.id) {
            console.log('yes')
            link.classList.add("teste")
            console.log(link)
          }
        })
        */ 
    }

    generateMarkup() {
        let markup = '';
        const curRecipe = window.location.hash.slice(1)
        this.#data.forEach(rec => {
        markup += ` <li class="preview">
        <a class="preview__link preview__link${curRecipe == rec.id ? '--active' : ''}" href="#${rec.id}">
          <figure class="preview__fig">
            <img src="${rec.image}" alt="Test" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${rec.title}</h4>
            <p class="preview__publisher">${rec.publisher}</p>
            <div class="preview__user-generated" ${rec.key ? '' : 'style="visibility: hidden;"' }>
        <svg>
          <use href="${icons}#icon-user"></use>
        </svg>
    </div> 
          </div>
        </a>
      </li>`
        });
      return markup
    }
    /*renderError() {
      console.log('A')
      const markup = `<div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>No recipes found for your query. Please try again!</p>
    </div> `
    this.#parentEl.innerHTML = '';
    this.#parentEl.insertAdjacentHTML("afterbegin", markup)
    }*/
    
    renderError() {
      console.log('A')
      const markup = `<div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>No recipes found for your query. Please try again!</p>
    </div> `
    this.#parentEl.insertAdjacentHTML("afterbegin", markup);
    this.#parentEl.querySelector(".spinner")?.remove();
    this.#parentEl.querySelector(".pagination").innerHTML = ''
    }

    renderSpinner() {
      const spinner = `<div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div> `
    this.#container.innerHTML = '';
    this.#parentEl.insertAdjacentHTML("afterbegin", spinner)
    this.#parentEl.querySelector(".error")?.remove()
  }
}

export default new ResultsView;