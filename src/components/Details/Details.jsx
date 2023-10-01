//bring in MATERIAL UI FOR STUFF LIKE BUTTONS
// TODO: When a movie poster is clicked, a user should be brought to the /details view for that movie.


import {
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Card,
  Box,
  Button,
  List,
  ListSubheader,
  ListItem,
  ListItemText
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { takeEvery, put, takeLatest, call } from "redux-saga/effects";
import GenreData from "../GenreData";


export default function Details() {
    console.log('in the details function');
  const dispatch = useDispatch();
  const history = useHistory();
  const selectedMovie = useSelector((store) => store.selectedMovie);
  const genreStore = useSelector((store) => store.genreStore);


//  console.log("this is the genreStore", genreStore);  



 const genres = useSelector((store) => store.genres);
 console.log("this is the genreStore from Genre data", genres);

  
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
                <List>
            <ListSubheader>Genres:</ListSubheader>
            {genres.map((genre, i) => (
              <ListItem key={i}>
                <ListItemText primary={genre.name} />
              </ListItem>
            ))}
          </List>
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
