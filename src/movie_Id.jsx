import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchMovieId } from "./action";
class MovieDetail extends Component {
  state = {};
  componentDidMount() {
    // console.log(this.props.match.params.id)
    this.props.dispatch(fetchMovieId(this.props.match.params.id));
  }
  getRunTime(time) {
    let hrMin = time / 60;
    hrMin = String(hrMin).split(".");

    return `${hrMin[0]} : ${hrMin[1].slice(0, 2)} `;
  }
  home() {
    this.props.history.push("/movies");
  }
  render() {
    const { movie } = this.props;
    console.log(movie);
    return (
      <div className="container-fluid mt-2">
        <div className="row">
          <div className="col-9">Movie Details</div>
          <div className="col-3 text-right text-muted">
            {" "}
            <i
              className="fas fa-home"
              onClick={() => {
                this.home();
              }}
              style={{ cursor: "pointer" }}
            >
              {" "}
            </i>{" "}
          </div>
        </div>
        <hr />
        {movie.id && (
          <div className="row">
            <div className="col-lg-2 col-6 text-center">
              <img
                src={this.props.url + movie.poster_path}
                alt="Image"
                style={{ height: 200, width: 150 }}
              />
            </div>
            <div className="col-lg-10 col-6 text-left">
              <div className="row">
                <div className="col-12">
                  {movie.title}
                  <small className="text-muted">
                    {" "}
                    ({movie.vote_average})
                  </small>{" "}
                </div>
                <div className="col-12">
                  <span>
                    {movie.release_date.split("-")[0]} |
                    {this.getRunTime(movie.runtime)} |{" "}
                    {
                      movie.credits.crew.find((item) => item.job === "Director")
                        .name
                    }
                  </span>
                </div>
                <div className="col-12">
                  Cast:{" "}
                  {movie.credits.cast.map((item, i) => item.name).join(", ")}
                </div>
                <div className="col-12 text-justify">
                  <p>Description:{movie.overview}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
const mapToProps = (state) => ({
  movie: state.movies.items,
  loading: state.movies.loading,
  error: state.movies.error,
  url: state.movies.ImageUrl,
});

export default connect(mapToProps)(MovieDetail);
