class header extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  render() {
    this.innerHTML = `
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
          <a class="navbar-brand" href="#">FindMovie</a>
        </div>
      </nav>
        `;
  }
}

customElements.define("header-app", header);
