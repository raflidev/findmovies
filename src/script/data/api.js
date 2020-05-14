class Api {
  static getData(keyword) {
    return fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=10a5666a977bc4dbc63b97688d306a00&query=${keyword}`
    )
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        if (responseJson.results.length > 0) {
          return Promise.resolve(responseJson.results);
        } else {
          return Promise.reject(`${keyword} is not found`);
        }
      });
  }

  static getDataById(keywordId) {
    return fetch(
      `https://api.themoviedb.org/3/movie/${keywordId}?api_key=10a5666a977bc4dbc63b97688d306a00`
    )
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        return Promise.resolve(responseJson);
      });
  }

  static getTvShow(keyword) {
    return fetch(
      `https://api.themoviedb.org/3/search/tv?api_key=10a5666a977bc4dbc63b97688d306a00&query=${keyword}`
    )
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        return Promise.resolve(responseJson);
      });
  }

  static getDataTvById(keywordId) {
    return fetch(
      `https://api.themoviedb.org/3/tv/${keywordId}?api_key=10a5666a977bc4dbc63b97688d306a00`
    )
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        return Promise.resolve(responseJson);
      });
  }
}

export default Api;
