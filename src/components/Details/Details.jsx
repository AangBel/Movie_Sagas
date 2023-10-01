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
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom";

// import Button from '@mui/material/Button';

export default function Details() {
  const dispatch = useDispatch();
  const history = useHistory();
  const movies = useSelector((store) => store.movies);
  const selectedMovie = useSelector((store) => store.selectedMovie);

  //   const genres = useSelector((store) => store.genres);

  console.log(`the movie clicked on was ${movies.id}`);
  console.log("the current movie is:", selectedMovie.id);

  const movieId = selectedMovie.id;
  console.log('this is the pickedMovieStore.id', movieId);


  function backToHome() {
    console.log("going back to home page");
    history.push("/");
  }

  return (
    <Box>
      <section className="details">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4} lg={3} key={selectedMovie.id}>
            <Card key={selectedMovie}>
              <CardMedia
                component="img"
                //   src={clickedMovie.id}
                src={selectedMovie.poster}
                alt={selectedMovie.title}
              />
              <CardContent>
                <Typography variant="h3">{selectedMovie.title}</Typography>
                <Typography>{selectedMovie.description}</Typography>
                {/* {genres.
                 filter((genre) =>
                 genre.title
                 )
                 .map((genre) => (
                        <Typography key={genre.id}>{genre.name}</Typography>
                    ))} */}
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
