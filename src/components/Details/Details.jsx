//bring in MATERIAL UI FOR STUFF LIKE BUTTONS
// TODO: When a movie poster is clicked, a user should be brought to the /details view for that movie.
// -we'd have to do the route to /details
// -the <p> that shows the details
// - writing code that goes to GET? the details from the database?
// - we'd be creating an onClick for the movie image
// - we'd be writing the onClick function
// - a space for the genres, title, and description
//----- bring in description
// - a back to list BUTTON
// - setting up the button to take us back to the /Home/List Page

import {
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Card,
  Box,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { takeEvery, put, takeLatest, call } from "redux-saga/effects";


export default function Details() {
  const dispatch = useDispatch();
  const history = useHistory();
  const selectedMovie = useSelector((store) => store.selectedMovie);
  const genreStore = useSelector((store) => store.genreStore);

  const fetchMovieGenre = (genre) => ({
    type: "FETCHING_GENRE",
    payload: genre,
  });

  //   function* fetchGenreSaga(action) {
  //     try {
  //       const movieId = action.payload;
  //       const genre = yield call(fetchMovieGenre, movieId);
  //       yield put(fetchMovieGenre(genre));
  //     } catch (error) {
  //       console.log("get genres error from details.jsx");
  //     }
  //   }
  //   const [genres, setGenres] = useState([]);
  
  console.log("this is the genreStore", genreStore);


  //   console.log("this is the movieId", movieId);
  
  console.log("the current movie is:", selectedMovie.id);


  
  //   const movieIdentification = movie.id;
  //   console.log('this is the movieIdentification movie Id', movieIdentification);
  
  //   const movieId = selectedMovie.id;
  //   console.log("this is the pickedMovieStore.id", movieId);
  
  //   dispatch({ type: "SET_GENRE", payload: genre });
  //   console.log("this is the genreStore after dispatch", genreStore);
  
  function backToHome() {
    console.log("going back to home page");
    history.push("/");
}

return (
    <Box>
      <section className="details">
        <Grid
          container
          spacing={7}
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ minHeight: "100vh", maxWidth: "100vh" }}
          >
          <Grid item xs={12} sm={6} md={4} lg={3} key={selectedMovie.id}>
            <Card key={selectedMovie}>
              <CardMedia
                component="img"
                src={selectedMovie.poster}
                alt={selectedMovie.title}
                />
              <CardContent>
                <Typography variant="h3">{selectedMovie.title}</Typography>
                <Typography>{selectedMovie.description}</Typography>
                <Typography>
                  Genres:{" "}
                  {genreStore.map((genre, index) => (
                    <span key={index}>{genre.name}</span>
                  ))}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </section>
      <Button variant="contained" onClick={backToHome}>
        Back to Home
      </Button>
    </Box>
  );
  
}
