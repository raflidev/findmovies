class searchbar extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  render() {
    this.innerHTML = `
        <div class="container">
      <h1 class="mt-4">Find your favorite movie.</h1>
      <input
        class="form-control mt-4" type="text" id="search" placeholder="Search Movie .."/>
    </div>
        `;
  }
}

customElements.define("search-bar", searchbar);
