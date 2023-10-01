import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    yield takeEvery('FETCH_GENRE', fetchMovieGenre);
    yield takeEvery('FETCH_SELECTED_MOVIE', selectedMovie);
}

function* fetchAllMovies() {
    // get all movies from the DB
    try {
        const movies = yield axios.get('/api/movie');
        console.log('get all:', movies.data);
        yield put({ type: 'SET_MOVIES', payload: movies.data });

    } catch {
        console.log('get all error');
    }
        
}

function* fetchMovieGenre(id){
    //get all genres from the DB
    try {
        const genres = yield axios.get(`/api/genre/${id}`);
        console.log(`this is the id: ${id}`);
        console.log('get all genres data', genres.data);
        yield put({ type: 'SET_GENRE', payload: genres.data });
    } catch {
        console.log('get genres error');
    }
}

// function* fetchSelectedMovie(action){
//     try {
//         const clickedMovie = yield axios.get(`/api/movie/${action.payload.id}`);
//         console.log(`fetchSelected- clicked on movie with clicked movie id: ${clickedMovie.data.id} 
//         movies title: ${clickedMovie.data.title}`);
//         console.log('this is the clickedMovie.data:', clickedMovie);

//         yield put({ type: 'SET_SELECTED_MOVIES', payload: clickedMovie});
//     } catch {
//         console.log('get selected movie error');
//     }
// }

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

const selectedMovie = (state = [], action) => {
    switch (action.type) {
        case 'SET_SELECTED_MOVIE':
            return action.payload;
            default:
                return state;
    }
}

// Used to store the movie genres
const genreStore = (state = {}, action) => {
    switch (action.type) {
        case 'SET_GENRE':
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genreStore,
        selectedMovie
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
            <App />
        </Provider>
    </React.StrictMode>
);
