import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    // yield takeEvery('FETCH_GENRE', fetchMovieGenre);
    yield takeLatest('FETCH_GENRE', fetchMovieGenre);
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

function* fetchMovieGenre(movieId){
    const path = movieId.payload;
    //get all genres from the DB
    try {
        console.log('this is the path:', path);
        const genres = yield axios.get(`/api/genre/${path}`);
        console.log('this is the genres.data', genres.data);
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
        case 'SETTING_GENRE':
            return action.payload;
        default:
            return state;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genreStore,
        selectedMovie
    }),
    composeEnhancers(
        applyMiddleware(sagaMiddleware, logger),
        )
    // Add sagaMiddleware to our store
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
