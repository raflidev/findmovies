import "../component/movieList.js";
import "../component/searchbar.js";
import "../model/";
import Api from "../data/api.js";
import $ from "jquery";

import "moment";
const main = () => {
  const movieSearch = async () => {
    try {
      const result = await Api.getData($("#search").val());
      const resultTv = await Api.getTvShow($("#search").val());

      $("#search-list").html(`
      <button type="button" class="btn btn-primary" id="tvShow">
        TV Shows <span class="badge badge-light">${resultTv.total_results}</span>
      </button>
      <button type="button" class="mx-4 btn btn-primary" id="movieShow">
        Movies <span class="badge badge-light">${result.length}</span>
      </button>
      `);

      result.forEach(movie => {
        $("#movie-list").append(`
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
            `);

        document.querySelectorAll("#moviedetail").forEach(item => {
          item.addEventListener("click", function() {
            var dataID = item.dataset.id;
            detailMovie(dataID);
          });
        });
      });

      $("#movieShow").click(() => {
        $("#movie-list").html("");

        movieSearch();
      });
    } catch (message) {
      $("#movie-list").html(`
      <h2 class="mt-4 mx-auto">${message}</h2>
      `);
    }
  };

  $("#tvShow").click(() => {
    $("#movie-list").html("");
    tvSearch();
  });

  $("#search-button").click(() => {
    $("#movie-list").html("");
    movieSearch();
  });

  $("#search").keyup(event => {
    if (event.keyCode === 13) {
      $("#movie-list").html("");
      movieSearch();
      event.preventDefault();
    }
  });
};

export default main;
