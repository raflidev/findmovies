class searchbar extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  render() {
    this.innerHTML = `
    <div class="jumbotron jumbotron-fluid bg-dark text-white">
    <div class="container">
    <h1>Hello and welcome.</h1>
    <p class="lead">Find information your favorite movie and TV show based by themoviedb.</p>
    <div class="row mt-4">
      <div class="col-sm-12 col-lg-8 mt-3">
      <input class="form-control" type="text" id="search" placeholder="Search Movie or TV show.."/>
      </div>
      <div class="col-sm-12 col-lg-4">
      <button class="btn btn-primary px-4 form-control mt-3" id="search-button">Search</button>
      </div>
    </div>
    </div>
  </div>
        `;
  }
}

customElements.define("search-bar", searchbar);
