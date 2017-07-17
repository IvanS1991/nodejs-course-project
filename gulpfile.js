/* globals process */

const gulp = require('gulp');

gulp.task('works', () => {
  console.log('Gulp works');
});

gulp.task('get-movies', (done) => {
  const scrapeMovies = require('../imdb-data-scraper');
  const { MOVIE_META } = require('./constants');
  const { getId } = require('./utils');

  return Promise.resolve()
    .then(() => {
      return require('./db');
    })
    .then((db) => {
      const moviesDb = db('movies');
      console.log(new Date().toISOString() +
        ' - started scraping..  .   .    .');
      return scrapeMovies(MOVIE_META.PAGES, ...MOVIE_META.GENRES)
        .then((moviesList) => {
          moviesList.forEach((movie) => {
            movie.id = getId();
            movie.comments = [];
          });
          return moviesDb.insertMany(moviesList);
        })
        .then(() => {
          return process.exit();
        });
    });
});

gulp.task('print', () => {
  console.log('something');
});
