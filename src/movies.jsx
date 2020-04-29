import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchMovies, fetchSearchMovies, fetchMovieId } from "./action";
import Navbar from "./navbar";
import queryString from "query-string";
class Movies extends Component {
  state = {};
  componentDidMount() {
    this.props.dispatch(fetchMovies(1));
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location.search != this.props.location.search) {
      let { page } = queryString.parse(this.props.location.search);

      this.props.dispatch(fetchMovies(page));
    }
  }
  searchMovie = ({ currentTarget: input }) => {
    console.log("dbfuiwe", input.value);

    input.value
      ? this.props.dispatch(fetchSearchMovies(input.value))
      : this.props.dispatch(fetchMovies());
  };
  getDetails = (id) => {
    console.log("item", id);
    this.props.history.push(`/movies/${id}`);
  };
  pageNo = (x) => {
    let { page } = queryString.parse(this.props.location.search);
    page = page ? +page : 1;
    page = page + x;
    this.props.history.push("/movies?page=" + page);
  };
  render() {
    const { movies } = this.props;
    const results = movies.results;
    let { page } = queryString.parse(this.props.location.search);
    results &&
      results.sort(function (a, b) {
        var dateA = new Date(a.release_date),
          dateB = new Date(b.release_date);
        return dateA - dateB;
      });
    page = page ? +page : 1;
    return (
      <div className="container-fluid mt-2">
        <div className="row">
          <div className="col-12">
            <Navbar search={this.searchMovie} />
          </div>
        </div>
        <hr className="strong" />
        <div className="row">
          {results &&
            results.map((item, i) => (
              <div
                className="col-lg-2 col "
                onClick={() => this.getDetails(item.id)}
                key={i}
              >
                <div className="card my-1">
                  <img
                    className="card-img-top"
                    //style={{height:150,width:150}}
                    src={this.props.url + item.poster_path}
                    alt="Image Not Available"
                  />
                  <div className="card-body p-1 border">
                    <div className="card-text">
                      <div className="row">
                        <div className="col-8 text-left text-truncate">
                          <span className="card-text">{item.title}</span>
                        </div>
                        <div className="col-4 text-right">
                          <small className="card-text  text-muted">
                            ({item.vote_average})
                          </small>
                        </div>
                      </div>
                    </div>

                    <div className="card-text">
                      <p>{item.overview.slice(0, 45)}...</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="row">
          <div className="col-6 text-center">
            {page > 1 && (
              <button
                className="btn btn-success"
                onClick={() => this.pageNo(-1)}
              >
                Previous{" "}
              </button>
            )}
          </div>
          <div className="col-6 text-center">
            {page < movies.total_pages && (
              <button
                className="btn btn-success"
                onClick={() => this.pageNo(1)}
              >
                Next{" "}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapToProps = (state) => ({
  movies: state.movies.items,
  loading: state.movies.loading,
  error: state.movies.error,
  url: state.movies.ImageUrl,
});

export default connect(mapToProps)(Movies);
