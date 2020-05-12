import "../component/movieList.js";
import "../component/searchbar.js";
import Api from "../data/api.js";

const moment = require("moment");
const main = () => {
  const searchValue = document.querySelector("#search");
  const movieList = document.querySelector("#movie-list");

  const enterSearch = async () => {
    try {
      const result = await Api.getData(searchValue.value);

      result.forEach(movie => {
        movieList.innerHTML += `
        <div class="col-sm-12 col-lg-3 mt-3">
        <div class="card">
        <img src="https://image.tmdb.org/t/p/original/${
          movie.poster_path
        }" class="card-img-top" alt="Poster ${movie.title}" />
            <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
                <p class="card-text">
                  ${moment(movie.release_date).format("YYYY")}<br>
                  &#9734; ${movie.vote_average}
                </p>
                <a href="#">Detail</a>
              </div>
            </div>
            </div>
            `;
      });
    } catch (message) {
      movieList.innerHTML = `
      <h2 class="mt-4 mx-auto">${message}</h2>
      `;
    }
  };
  searchValue.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      movieList.innerHTML = "";
      enterSearch();
      event.preventDefault();
    }
  });
};

export default main;
