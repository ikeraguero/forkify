class BookmarksView {
    #parentEl = document.querySelector(".bookmarks");
    #data

    setData(data) {
        this.#data = data
    }

    render() {
        const markup = this.generateMarkup()
        this.clear();
        this.#parentEl.insertAdjacentHTML("afterbegin", markup)
    }

    clear() {
        this.#parentEl.innerHTML = '';
    }

    generateMarkup() {
        let markup = '';
        this.#data.forEach(book => {
            markup += ` <li class="preview">
        <a class="preview__link preview__link" href="#${book.id}">
          <figure class="preview__fig">
            <img src="${book.image}" alt="Test" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${book.title}</h4>
            <p class="preview__publisher">${book.publisher}</p>
          </div>
        </a>
      </li>`
        })

        return markup;
    }
}

export default new BookmarksView;