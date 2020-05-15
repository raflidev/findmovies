class tv {
  static tvSearch() {
    try {
      resultTv.results.forEach(tv => {
        $("#movie-list").append(`
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
                `);
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

  static detailTv(id) {
    try {
      const resultDetail = Api.getDataTvById(id);
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
}

export default tv;
