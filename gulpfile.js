/* globals process */

const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

gulp.task('compile:js', () => {
  return gulp.src('src/**/*.js')
    .pipe(babel({
      presets: 'es2015',
    }))
    .pipe(uglify())
    .pipe(concat('main.js'))
    .pipe(gulp.dest('public/js'));
});

gulp.task('watch:js', () => {
  return gulp.watch('src/**/*.js', ['compile:js']);
});

gulp.task('get-movies', (done) => {
  const scrapeMovies = require('./imdb-data-scraper');
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
          });
          return moviesDb.insertMany(moviesList);
        })
        .then(() => {
          return process.exit();
        });
    });
});
