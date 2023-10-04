// react to be used below
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/";
import { useEffect, useState } from "react";

import {
    FormControl,
    Input,
    InputLabel,
    OutlinedInput,
    MenuItem,
    Select,
    Button,
    TextField,
  } from "@mui/material";

function MovieForm() {
  let dispatch = useDispatch();
  // grab the genre list from the store
  const genreList = useSelector((store) => store.genreList);
  // we will need to keep tabs on what's being entered into the table
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [newTitle, setNewTitle] = useState([]);
  const [newURL, setNewURL] = useState([]);
  const [newDescription, setNewDescription] = useState([]);
  // history is going to let us navigate away from the form but only if everything worked, link wouldn't do that as well
  const history = useHistory();
  // on page load, we need the genre list from the server/db
  useEffect(() => {
    dispatch({ type: "GET_GENRELIST" });
  }, []);

  // user tries to submit a new movie
  function handleClick() {
    // let's wrap up all of our data nice and tidy
    const newMovie = {
      title: newTitle,
      poster: newURL,
      description: newDescription,
    //   genre_id: selectedGenres[0],
    };
    // check if any of them are blank
    for (let trait in newMovie) {
      if (newMovie[trait]) {
        if (newMovie[trait].length === 0) {
          alert("Please complete all fields");
          return;
        }
        
      } else if (newMovie[trait] === undefined) {
        alert("Please complete all fields");
        return;
      }
    }
    
    dispatch({
      type: "ADD_MOVIE",
      payload: newMovie,
    });
    // BACK TO THE MOVIE LIST PAGE FOR YOU!
    history.push("/");
  }

  return (
    <div>
      <FormControl variant="standard">
        <InputLabel htmlFor="component-simple">Movie Name</InputLabel>
        <Input
          id="component-simple"
          onChange={(e) => setNewTitle(e.target.value)}
        />
      </FormControl>
      <br></br>
      <FormControl variant="standard">
        <InputLabel htmlFor="component-simple">Poster URL</InputLabel>
        <Input
          id="component-simple"
          onChange={(e) => setNewURL(e.target.value)}
        />
      </FormControl>
      <br></br>
      <FormControl variant="standard">
        <TextField
          id="outlined-multiline-static"
          label="Description"
          multiline
          rows={4}
          onChange={(e) => setNewDescription(e.target.value)}
        />
      </FormControl>
      <br></br>
      <FormControl sx={{ m: 1, width: 500 }}>
        <InputLabel>Multiple Select</InputLabel>
        <Select
          multiple
          value={selectedGenres}
          onChange={(e) => setSelectedGenres(e.target.value)}
          input={<OutlinedInput label="Multiple Select" />}
        >
          {/* user can set multiple genres, but it will only take the first one in the list */}
          {genreList.map((genre) => (
            <MenuItem key={genre.id} value={genre.id}>
              {genre.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <br></br>
      {/* Cancel button will send you back to the movie list */}
      <Link to="/">
        <Button variant="contained">Cancel</Button>
      </Link>
      <Button variant="contained" onClick={handleClick}>
        Add movie
      </Button>
    </div>
  );
}

export default MovieForm;
