import "../component/movieList.js";
import "../component/searchbar.js";
import Api from "../data/api.js";
import "jquery";

const moment = require("moment");
const main = () => {
  const searchValue = document.querySelector("#search");
  const searchButton = document.querySelector("#search-button");
  const movieList = document.querySelector("#movie-list");

  const modalContent = document.querySelector(".modal-body");

  const searchList = document.querySelector("#search-list");

  const enterSearch = async () => {
    try {
      const result = await Api.getData(searchValue.value);
      const resultTv = await Api.getTvShow(searchValue.value);
      // console.log(resultTv.results);

      searchList.innerHTML = `
      <button type="button" class="btn btn-primary" id="tvShow">
        TV Shows <span class="badge badge-light">${resultTv.total_results}</span>
      </button>
      <button type="button" class="mx-4 btn btn-primary" id="movieShow">
        Movies <span class="badge badge-light">${result.length}</span>
      </button>
      `;

      result.forEach((movie) => {
        movieList.innerHTML += `
        <div class="col-sm-12 col-lg-3 mt-3">
        <div class="card">
        <img src="
        ${
          movie.poster_path == null
            ? "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
            : "https://image.tmdb.org/t/p/original/" + movie.poster_path
        }
        "class="card-img-top" alt="Poster ${movie.title} "/>
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
            <img src="
        ${
          resultDetail.poster_path == null
            ? "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
            : "https://image.tmdb.org/t/p/original/" + resultDetail.poster_path
        }
        "class="img-fluid" alt="Poster ${resultDetail.title} "/>           
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
      const movieShow = document.querySelector("#movieShow");

      movieShow.addEventListener("click", function () {
        movieList.innerHTML = "";

        enterSearch();
      });

      const tvShow = document.querySelector("#tvShow");

      async function tvSearch() {
        try {
          resultTv.results.forEach((tv) => {
            movieList.innerHTML += `
        <div class="col-sm-12 col-lg-3 mt-3">
        <div class="card">
        <img src="
        ${
          tv.poster_path == null
            ? "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
            : "https://image.tmdb.org/t/p/original/" + tv.poster_path
        }
        "class="card-img-top" alt="Poster ${tv.name} "/>
            <div class="card-body">
            <h5 class="card-title">${tv.name}</h5>
                <p class="card-text">
                  ${moment(tv.release_date).format("YYYY")}<br>
                  &#9734; ${tv.vote_average}
                </p>
                <!-- Button trigger modal -->
                <a href="#" id="moviedetail" data-id="${
                  tv.id
                }"  data-toggle="modal" data-target="#exampleModal">See detail</a>
              </div>
            </div>
            </div>
            `;
          });
        } catch (message) {
          console.log(message);
        }
      }

      tvShow.addEventListener("click", function () {
        movieList.innerHTML = "";
        tvSearch();
      });
    } catch (message) {
      movieList.innerHTML = `
      <h2 class="mt-4 mx-auto">${message}</h2>
      `;
    }
  };

  searchButton.addEventListener("click", function () {
    movieList.innerHTML = "";
    enterSearch();
  });

  searchValue.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      movieList.innerHTML = "";
      enterSearch();
      event.preventDefault();
    }
  });
};

export default main;
