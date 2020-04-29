import React, { Component } from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Route, Redirect, Switch } from "react-router-dom";
import rootreducer from "./rootreducer";
import Movies from "./movies";
import MovieDetail from "./movie_Id";
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Switch>
          <Route
            path="/movies/:id"
            exact
            render={(props) => <MovieDetail {...props} />}
          ></Route>
          <Route
            path="/movies"
            render={(props) => <Movies {...props} />}
          ></Route>
          <Redirect to="/movies" />
        </Switch>
      </Provider>
    );
  }
}
const store = createStore(rootreducer, applyMiddleware(thunk));
export default App;
