/* globals process */

const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const mocha = require('gulp-mocha');
const istanbul = require('gulp-istanbul');

const config = {
  DB_PATH: 'mongodb://localhost/nodejs-project-test',
  PORT: 8808,
  MONGO_CLIENT: require('mongodb').MongoClient,
  MOCHA_REPORTER: 'spec',
};

// TESTS
gulp.task('test', ['tests:unit']);

gulp.task('tests:pre', () => {
  return gulp.src(['./data/**/*.js'])
    .pipe(istanbul({
      includeUntested: true,
    }))
    .pipe(istanbul.hookRequire());
});

gulp.task('tests:unit', ['tests:pre'], () => {
  return gulp.src('./tests/unit-tests/**/*.js')
    .pipe(mocha({
      reporter: config.MOCHA_REPORTER,
    }))
    .pipe(istanbul.writeReports())
    .on('end', () => {
      gulp.start('tests:browser');
    });
});

gulp.task('tests:browser', ['server-start'], () => {
  return gulp.src('tests/browser/tests/**/*.js')
    .pipe(mocha({
      reporter: config.MOCHA_REPORTER,
      timeout: 20000,
    }))
    .once('end', () => {
      gulp.start('server-stop');
    });
});

// SERVER AND DB
gulp.task('server-start', () => {
  const { DB_PATH, PORT } = config;
  return Promise.resolve()
    .then(() => {
      return require('./db')(DB_PATH);
    })
    .then((db) => {
      const data = require('./data')(db);
      const controllers = require('./controllers')(data);
      data.movies.populate(100);
      return require('./app')(data, controllers);
    })
    .then((server) => {
      return server.listen(PORT, null, null, () => {
        console.log(`Listening on ${PORT}`);
      });
    });
});

gulp.task('server-stop', () => {
  const { DB_PATH, MONGO_CLIENT } = config;
  return MONGO_CLIENT.connect(DB_PATH)
    .then((db) => {
      return db.dropDatabase();
    })
    .then(() => {
      return process.exit();
    });
});

// COMPILE
gulp.task('compile:js', () => {
  return gulp.src('src/**/*.js')
    .pipe(babel({
      presets: 'es2015',
    }))
    .pipe(uglify())
    .pipe(concat('main.js'))
    .pipe(gulp.dest('public/js'));
});

// WATCH COMPILE
gulp.task('watch:js', () => {
  return gulp.watch('src/**/*.js', ['compile:js']);
});

// FILL DB WITH MOVIES
gulp.task('get-movies', (done) => {
  const scrapeMovies = require('./imdb-data-scraper');
  const { MOVIE_META, DB_PATH } = require('./constants');
  const { getId } = require('./utils');

  return Promise.resolve()
    .then(() => {
      return require('./db')(DB_PATH);
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
