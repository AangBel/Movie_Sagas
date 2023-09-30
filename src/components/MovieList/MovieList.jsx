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

  function pushToDetails(){
    console.log('pushToDetails function has been triggered aka clicked a movie')
    history.push('/details');
}

  return (
    <main>
      <Box>
        <Typography variant="h4">Movie List</Typography>
        <section className="movies">
          <Grid container spacing={7}>
            {movies.map((movie) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
                <Card>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      src={movie.poster}
                      alt={movie.title}
                      onClick={pushToDetails}
                    />
                    <CardContent>
                      <Typography variant="h5">{movie.title}</Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </section>
      </Box>
    </main>
  );
}

export default MovieList;
