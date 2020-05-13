class movieList extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <div class="container">
    <div id="search-list"></div>
    <div class="row" id="movie-list">
    </div>
  </div>
        `;
  }
}

customElements.define("movie-list", movieList);
