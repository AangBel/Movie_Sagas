const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

//get the data for the selected movie 
router.get("/:id", (req, res) => {
  const movieId = req.params.id;
  const query = `SELECT "genres"."name"
  FROM "movies"
  JOIN "movies_genres"
  ON "movies"."id" = "movies_genres"."movie_id"
  JOIN "genres"
  ON "genres"."id" = "movies_genres"."genre_id"
  WHERE "movies"."id" = $1`;
  console.log("this is the movieId", movieId);
  pool
    .query(query, [movieId])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("ERROR: Get the movies genre");
      res.sendStatus(500);
    });
  // Add query to get all genres
});
router.get("/", (req, res) => {
  console.log("all genres");
  const query = `SELECT * FROM genres`;
  pool
    .query(query)
    .then((result) => {
      console.log(result.rows);
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("ERROR: Get genre movies", err);
      res.sendStatus(500);
    });
});
router.get("/:id", (req, res) => {
  console.log(req.params.id);
  const query = `SELECT genres.name
  FROM genres
  JOIN movies_genres ON genres.id = movies_genres.genre_id
  WHERE movies_genres.movie_id = $1;
  `;
  pool
    .query(query, [req.params.id])
    .then((result) => {
      console.log(result.rows);
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("ERROR: Get genre movies", err);
      res.sendStatus(500);
    });
});
module.exports = router;
