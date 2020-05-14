class footer extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    
    <footer class="footer">
    <div class="container">
      <span class="text-muted">Made by 
      <a href="https://instagram.com/raflidev">raflidev</a> with ❤️️ in Bekasi</span>
    </div>
  </footer>
        `;
  }
}

customElements.define("footer-app", footer);
