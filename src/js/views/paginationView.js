import icons from '../../img/icons.svg'

class PaginationView {
    #parentEl = document.querySelector('.pagination');
    #data;
    page;

    addEventHandler(handler) {
      this.#parentEl.addEventListener('click', e=> {
          if(!e.target.closest(".btn--inline")) return
          this.page = parseInt(e.target.closest(".btn--inline").getAttribute("next"))
          this.clear()
          handler()
        })
    }

    setData(data) {
      this.#data = data;
      this.page = this.#data.page
    }

    clear() {
      this.#parentEl.innerHTML = '';
    }

    render() {
        const markup = this.generateMarkup()
        this.#parentEl.insertAdjacentHTML('beforeend', markup);
        const prevButton = this.#parentEl.querySelector(".pagination__btn--prev");
        const nextButton = this.#parentEl.querySelector(".pagination__btn--next")

        if(this.page == 1) {
          prevButton.classList.add("btn--hidden")
        }

        if(this.page == this.#data.total_pages-1) {
          nextButton.classList.add("btn--hidden")
        }
    }

    generateMarkup() {
        return `
        <button class="btn--inline pagination__btn--prev" next='${this.#data.page-1}' >
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${this.#data.page -1}</span>
      </button>
      <button class="btn--inline pagination__btn--next" next='${this.#data.page+1}'>
        <span>Page ${this.#data.page +1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>`
    }
}

export default new PaginationView;