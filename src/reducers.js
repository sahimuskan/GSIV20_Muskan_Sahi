import {
  FETCH_MOVIES_BEGIN,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAILURE,
} from "./action";
const initialState = {
  items: [],
  ImageUrl: "https://image.tmdb.org/t/p/w500/",
  loading: false,
  error: null,
  credits:{}
};
export default function MovieReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_MOVIES_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
        ImageUrl: "https://image.tmdb.org/t/p/w500/",
      };
    case FETCH_MOVIES_SUCCESS:
      return {
        ...state,
        loading: false,
        ImageUrl: "https://image.tmdb.org/t/p/w500/",
        items: action.payload.movies,
      };

    case FETCH_MOVIES_FAILURE:
      return {
        ...state,
        loading: false,
        ImageUrl: "https://image.tmdb.org/t/p/w500/",
        error: action.payload.error,
        items: [],
      };

    default:
      return state;
  }
}
