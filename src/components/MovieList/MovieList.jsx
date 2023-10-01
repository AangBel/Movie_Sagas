import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./MovieList.css";
import { useHistory } from "react-router-dom";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import { Box, CardActionArea, CardMedia } from "@mui/material";
import Typography from "@mui/material/Typography";

function MovieList() {
  const dispatch = useDispatch();
  const history = useHistory();
  const movies = useSelector((store) => store.movies);

  useEffect(() => {
    dispatch({ type: "FETCH_MOVIES" });
  }, []);

  function pushToDetails(movie) {
    console.log(
      "pushToDetails function has been triggered aka clicked a movie, this is the movie", movie.id
    );
    dispatch({ type: "SET_SELECTED_MOVIE", payload: movie});
    history.push("/details");
}

  return (
    <Box>
      <section className="movies">
        <Grid container spacing={7}>
          {movies.map((movie) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
              <Card>
                <CardActionArea key={movie.id}>
                  <CardMedia
                    component="img"
                    src={movie.poster}
                    alt={movie.title}
                    onClick={() => pushToDetails(movie)}
                    value={movie.id}
                  />
                  <CardContent>
                    <Typography variant="h3">{movie.title}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </section>
    </Box>
  );
}

export default MovieList;
