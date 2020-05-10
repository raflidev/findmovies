class Api {
  static getData(keyword) {
    return fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=10a5666a977bc4dbc63b97688d306a00&query=${keyword}`
    )
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        if (responseJson.results.length > 0) {
          return Promise.resolve(responseJson.results);
        } else {
          return Promise.reject(`${keyword} is not found`);
        }
      });
  }
}

export default Api;