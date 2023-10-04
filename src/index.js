import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App/App.js";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
// Provider allows us to use redux within our react app
import { Provider } from "react-redux";
import logger from "redux-logger";
// Import saga middleware
import createSagaMiddleware from "redux-saga";
import { takeEvery, put, takeLatest } from "redux-saga/effects";
import axios from "axios";

// Create the rootSaga generator function
function* rootSaga() {
  yield takeEvery("FETCH_MOVIES", fetchAllMovies);
  yield takeEvery("FETCHING_GENRE", fetchMovieGenre);
  yield takeEvery("FETCH_SELECTED_MOVIE", selectedMovie);
  yield takeEvery("ADD_MOVIE", addMovie);
  yield takeEvery("GET_GENRELIST", getGenreList);

}

function* fetchAllMovies() {
  // get all movies from the DB
  try {
    const movies = yield axios.get("/api/movie");
    console.log("get all:", movies.data);
    yield put({ type: "SET_MOVIES", payload: movies.data });
  } catch {
    console.log("get all error");
  }
}

function* fetchMovieGenre(action) {
  const path = action.payload.movie.id;
  const movie = action.payload.movie;
  const history = action.payload.history;

  try {
    console.log("this is the path:", path);
    
    const genres = yield axios.get(`/api/genre/${path}`);
    console.log("this is the genres.data", genres.data);
    yield put({ type: "SET_GENRE", payload: genres.data });
    yield put({type: "SET_SELECTED_MOVIE", payload: movie});

    history.push("/Details")
  } catch {
    console.log("get genres error");
  }
}

function* addMovie(newMovie) {
  // add a movie to the DB
  console.log(newMovie);
  try {
    // send the movie to the DB
    yield axios.post("/api/movie", newMovie);
    // update the store with the new movie
    fetchAllMovies;
  } catch {
    console.log("get genres error");
  }
}
function* getGenreList() {
  // get all genres from the DB
  try {
    // axios call for the list of genres in the DB
    const genreList = yield axios.get(`/api/genre`);
    // send the genre list to the store
    yield put({ type: "SET_GENRELIST", payload: genreList.data });
  } catch {
    console.log("get genres error");
  }
}
// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
  switch (action.type) {
    case "SET_MOVIES":
      return action.payload;
    default:
      return state;
  }
};

const selectedMovie = (state = [], action) => {
  switch (action.type) {
    case "SET_SELECTED_MOVIE":
      return action.payload;
    default:
      return state;
  }
};

// Used to store the movie genres
const genres = (state = [], action) => {
  switch (action.type) {
    case "SET_GENRE":
      return action.payload;
    default:
      return state;
  }
};

// Used to store all of the movie genres
const genreList = (state = [], action) => {
  console.log(action);
  switch (action.type) {
    case "SET_GENRELIST":
      console.log(action);
      return action.payload;
    default:
      return state;
  }
};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create one store that all components can use
const storeInstance = createStore(
  combineReducers({
    movies,
    genres,
    selectedMovie,
    genreList,
  }),
  composeEnhancers(applyMiddleware(sagaMiddleware, logger))
  // Add sagaMiddleware to our store
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={storeInstance}>
      <App />
    </Provider>
  </React.StrictMode>
);
