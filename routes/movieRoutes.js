const express  = require('express');
const { getAllMovies, addMovie, getMovie, updateMovie, deleteMovie } = require('../controllers/movieController');

const router = express.Router();

router.param('id', (req, res, next, val) => {
    console.log({ val });
    next();
});

router
    .route('/')
    .get(getAllMovies)
    .post(addMovie);

router
    .route('/:id')
    .get(getMovie)
    .patch(updateMovie)
    .delete(deleteMovie);

module.exports = router;