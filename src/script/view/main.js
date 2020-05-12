import "../component/movieList.js";
import "../component/searchbar.js";
import Api from "../data/api.js";
import "jquery";

const moment = require("moment");
const main = () => {
  const searchValue = document.querySelector("#search");
  const movieList = document.querySelector("#movie-list");

  const modalContent = document.querySelector(".modal-body");

  const enterSearch = async () => {
    try {
      const result = await Api.getData(searchValue.value);

      result.forEach((movie) => {
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
                <!-- Button trigger modal -->
                <a href="#" id="moviedetail" data-id="${
                  movie.id
                }"  data-toggle="modal" data-target="#exampleModal">See detail</a>
              </div>
            </div>
            </div>
            `;
        document.querySelectorAll("#moviedetail").forEach((item) => {
          item.addEventListener("click", function () {
            var dataID = item.dataset.id;
            detailMovie(dataID);
          });
        });
      });
      async function detailMovie(id) {
        try {
          const resultDetail = await Api.getDataById(id);
          modalContent.innerHTML = `
            <div class="row">
            <div class="col-sm-12 col-lg-5">
            <img src="https://image.tmdb.org/t/p/original/${
              resultDetail.poster_path
            }" class="img-fluid">
            </div>
            <div class="col-lg-7">
              <ul class="list-group">
                <li class="list-group-item">${resultDetail.title}</li>
                <li class="list-group-item">Genre : ${
                  resultDetail.genres[0].name
                }</li>
                <li class="list-group-item">Tagline : ${
                  (resultDetail.tagline = "") ? resultDetail.tagline : "-"
                }</li>
                <li class="list-group-item">Sinopsis : ${
                  resultDetail.overview
                }</li>
              </ul>
            </div>
          </div>
        `;
        } catch (message) {
          console.log(message);
        }
      }
    } catch (message) {
      movieList.innerHTML = `
      <h2 class="mt-4 mx-auto">${message}</h2>
      `;
    }
  };

  searchValue.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      movieList.innerHTML = "";
      enterSearch();
      event.preventDefault();
    }
  });
};

export default main;
