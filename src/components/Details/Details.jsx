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
  ListItemText,
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

  const genres = useSelector((store) => store.genres);

  function backToHome() {
    history.push("/");
  }

  return (
    <section className="text">
      <Box sx={{ pt: 8, height: "100px", mr:"100px", ml:"100px" }}>
        <Grid
          container
          direction="column"
          sx={{
            minHeight: "50vh",
            maxWidth: "300vh",
            alignContent: "center",
            boxShadow: "5px 10px #f5f5f5",
            marginBottom:"30px"
          }}
        >
          <Grid item xs={12} sm={6} md={4} lg={3} key={selectedMovie.id} >
            <Card key={selectedMovie} sx={{ fontFamily: "Reem Kufi" }}>
              <CardMedia
                component="img"
                src={selectedMovie.poster}
                alt={selectedMovie.title}
              />
              <CardContent>
                <Typography
                  variant="h3"
                  sx={{ fontFamily: "Reem Kufi", color: "#235470", pb: 3 }}
                >
                  {selectedMovie.title}
                </Typography>

                <Typography
                  variant="h5"
                  sx={{ fontFamily: "Reem Kufi", color: "#235470", pb: 2 }}
                >
                  {selectedMovie.description}
                </Typography>
                <List sx={{ color: "#1a3f54" }}>
                  Genres:
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
        <Button variant="contained" onClick={backToHome}>
          Back to Home
        </Button>
      </Box>
    </section>
  );
}
