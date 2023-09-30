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

  useEffect(() => {
    dispatch({ type: "FETCH_MOVIES" });
  }, []);

  function backToHome() {
    console.log("going back to home page")
    history.push("/#");
  }

  return (
    <Box>
      <section className="details">
        <Grid container spacing={2}>
          {movies.map((movie) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
              <Card>
                <CardMedia
                  component="img"
                  src={movie.poster}
                  alt={movie.title}
                />
                <CardContent>
                  <Typography variant="h3">{movie.title}</Typography>
                  <Typography>{movie.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </section>
      <Button variant="contained" onClick={backToHome}>
        Back to Home
      </Button>
    </Box>
  );
}
