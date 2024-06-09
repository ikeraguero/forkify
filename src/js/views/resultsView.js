import icons from '../../img/icons.svg'

class ResultsView {
    #parentEl = document.querySelector('.search-results')
    #container = document.querySelector(".results")
    #data


    setData(data) {
      this.#data = data;
    }

    render() {
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
        this.#data.forEach(rec => {
        markup += ` <li class="preview">
        <a class="preview__link preview__link" href="#${rec.id}">
          <figure class="preview__fig">
            <img src="${rec.image}" alt="Test" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${rec.title}</h4>
            <p class="preview__publisher">${rec.publisher}</p>
          </div>
        </a>
      </li>`
        });
      return markup
    }
    /*
    <div class="preview__user-generated">
        <svg>
          <use href="${icons}#icon-user"></use>
        </svg>
    </div> */
}

export default new ResultsView;