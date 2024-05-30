class SearchView {
    #parentEl = document.querySelector(".search")
    inputField = document.querySelector(".search__field")

    getQuery() {
        const query = this.inputField.value
        this.inputField.value = ''
        return query
    }

    addEventHandler(handler) {
        this.#parentEl.addEventListener('submit', function(e) {
            e.preventDefault();
            handler();
        })
    }
}

export default new SearchView