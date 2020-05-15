class movie {
  static detailMovie(id) {
    try {
      const resultDetail = Api.getDataById(id);
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
                <li class="list-group-item">Producer : ${production}</li>
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
export default movie;
