import icons from '../../img/icons.svg'

class ResultsView {
    #parentEl = document.querySelector('.search-results')
    #container = document.querySelector(".results")
    #data

    render(data) {
        this.#container.innerHTML = '';
        console.log(data)
        this.#container.insertAdjacentHTML("beforeend", this.generateMarkup(data))
    }

    generateMarkup(data) {
        let markup = '';
        data.forEach(rec => {
        markup += ` <li class="preview">
        <a class="preview__link preview__link" href="#23456">
          <figure class="preview__fig">
            <img src="${rec.image}" alt="Test" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${rec.title}</h4>
            <p class="preview__publisher">${rec.publisher}</p>
            <div class="preview__user-generated">
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
    
}

export default new ResultsView;