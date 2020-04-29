import httpService from "./httpService";

export function fetchMovies(page) {
  return async (dispatch) => {
    dispatch(fetchMoviesBegin());
    return await httpService
      .get(
        "https://api.themoviedb.org/3/movie/upcoming?api_key=108702a6ee9e655d1d02fb66b713d91e&page=" +
          page
      )
      .then((json) => {
        console.log(json.data);
        dispatch(fetchMoviesSuccess(json.data));
        return json.data;
      })
      .catch((error) => dispatch(fetchMoviesFailure(error)));
  };
}

export function fetchSearchMovies(searchKey) {
  return async (dispatch) => {
    dispatch(fetchMoviesBegin());
    return await httpService
      .get(
        "https://api.themoviedb.org/3/search/movie?api_key=108702a6ee9e655d1d02fb66b713d91e&query=" +
          searchKey
      )
      .then((json) => {
        console.log(json.data);
        dispatch(fetchMoviesSuccess(json.data));
        return json.data;
      })
      .catch((error) => dispatch(fetchMoviesFailure(error)));
  };
}
export function fetchMovieId(id) {
  return async (dispatch) => {
    dispatch(fetchMoviesBegin());
    let movie = await httpService
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=108702a6ee9e655d1d02fb66b713d91e`
      )
      .then((json) => {
        console.log(json.data);
        //dispatch(fetchMoviesSuccess(json.data));
        return json.data;
      })
      .catch((error) => dispatch(fetchMoviesFailure(error)));
    movie["credits"] = await httpService
      .get(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=108702a6ee9e655d1d02fb66b713d91e`
      )
      .then((json) => {
        console.log(json.data);
        return json.data;
      })
      .catch((error) => dispatch(fetchMoviesFailure(error)));
    dispatch(fetchMoviesSuccess(movie));
  };
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export const FETCH_MOVIES_BEGIN = "FETCH_MOVIES_BEGIN";
export const FETCH_MOVIES_SUCCESS = "FETCH_MOVIES_SUCCESS";
export const FETCH_MOVIES_FAILURE = "FETCH_MOVIES_FAILURE";

export const fetchMoviesBegin = () => ({
  type: FETCH_MOVIES_BEGIN,
});

export const fetchMoviesSuccess = (movies) => ({
  type: FETCH_MOVIES_SUCCESS,
  payload: { movies },
});

export const fetchMoviesFailure = (error) => ({
  type: FETCH_MOVIES_FAILURE,
  payload: { error },
});
