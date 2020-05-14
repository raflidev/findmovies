import "../component/movieList.js";
import "../component/searchbar.js";
import Api from "../data/api.js";
import $ from "jquery";

const moment = require("moment");
const main = () => {
  const movieList = document.querySelector("#movie-list");

  const enterSearch = async () => {
    try {
      const result = await Api.getData($("#search").val());
      const resultTv = await Api.getTvShow($("#search").val());
      // console.log(resultTv.results);

      $("#search-list").html(`
      <button type="button" class="btn btn-primary" id="tvShow">
        TV Shows <span class="badge badge-light">${resultTv.total_results}</span>
      </button>
      <button type="button" class="mx-4 btn btn-primary" id="movieShow">
        Movies <span class="badge badge-light">${result.length}</span>
      </button>
      `);

      result.forEach(movie => {
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

        document.querySelectorAll("#moviedetail").forEach(item => {
          item.addEventListener("click", function() {
            var dataID = item.dataset.id;
            detailMovie(dataID);
          });
        });
      });

      async function detailMovie(id) {
        try {
          const resultDetail = await Api.getDataById(id);
          console.log(resultDetail);

          const production = [];

          resultDetail.production_companies.forEach(item => {
            production.push(item.name);
          });

          const genre = [];
          resultDetail.genres.forEach(item => {
            genre.push(item.name);
          });

          $(".modal-body").html(`
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
              <li class="list-group-item">Genre : ${genre}</li>
              <li class="list-group-item">Release Date : ${moment(
                resultDetail.release_date
              ).format("DD MMMM YYYY")}</li>
              <li class="list-group-item">Production : ${production}</li>
              <li class="list-group-item">Sinopsis : ${
                resultDetail.overview
              }</li>
            </ul>
          </div>
        </div>
      `);
        } catch (message) {
          console.log(message);
        }
      }

      $("#movieShow").click(() => {
        movieList.innerHTML = "";

        enterSearch();
      });

      async function tvSearch() {
        try {
          resultTv.results.forEach(tv => {
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
                  ${moment(tv.first_air_date).format("YYYY")}<br>
                  &#9734; ${tv.vote_average}
                </p>
                <!-- Button trigger modal -->
                <a href="#" id="tvdetail" data-id="${
                  tv.id
                }"  data-toggle="modal" data-target="#exampleModal">See detail</a>
              </div>
            </div>
            </div>
            `;
          });
          document.querySelectorAll("#tvdetail").forEach(item => {
            item.addEventListener("click", function() {
              var dataID = item.dataset.id;
              detailTv(dataID);
            });
          });
        } catch (message) {
          console.log(message);
        }
      }

      $("#tvShow").click(() => {
        movieList.innerHTML = "";
        tvSearch();
      });

      async function detailTv(id) {
        try {
          const resultDetail = await Api.getDataTvById(id);
          $(".modal-body").html(`
          <div class="row">
          <div class="col-sm-12 col-lg-5">
          <img src="
      ${
        resultDetail.poster_path == null
          ? "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
          : "https://image.tmdb.org/t/p/original/" + resultDetail.poster_path
      }
      "class="img-fluid" alt="Poster ${resultDetail.name} "/>           
          </div>          
          <div class="col-lg-7">
            <ul class="list-group">
              <li class="list-group-item">${resultDetail.name}</li>
              <li class="list-group-item">Episode : ${
                resultDetail.number_of_episodes
              }</li>
              <li class="list-group-item">Status : ${resultDetail.status}</li>
              <li class="list-group-item">Genre : ${
                resultDetail.genres[0].name
              }</li>
              <li class="list-group-item">Sinopsis : ${
                resultDetail.overview
              }</li>
            </ul>
          </div>
        </div>
      `);
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

  $("#search-button").click(() => {
    movieList.innerHTML = "";
    enterSearch();
  });

  $("#search").keyup(event => {
    if (event.keyCode === 13) {
      movieList.innerHTML = "";
      enterSearch();
      event.preventDefault();
    }
  });
};

export default main;
