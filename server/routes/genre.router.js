const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {

  const query = `SELECT "genres"."name", "movies"."title"
  FROM "movies"
  JOIN "movies_genres"
  ON "movies"."id" = "movies_genres"."movie_id"
  JOIN "genres" 
  ON "movies_genres"."genre_id" = "genres"."id"
  ORDER BY "movies"."title"`;
  pool.query(query)
  .then( result => {
    res.send(result.rows);
  })
  .catch(err => {
    console.log('ERROR: Get movies and their respective genres');
    res.sendStatus(500)
  })
  // Add query to get all genres
});

module.exports = router;