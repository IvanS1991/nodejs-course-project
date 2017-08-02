/* globals process */
const fs = require('fs');
const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const mocha = require('gulp-mocha');
const istanbul = require('gulp-istanbul');
const eslint = require('gulp-eslint');
const { sync } = require('gulp-sync')(gulp);

const config = require('./constants').TEST;

const moviesFile = './movie-data/data.json';

// TESTS
gulp.task('test', sync([
  'tests:eslint',
  'tests:unit',
  'server:start',
  'tests:supertest',
  'tests:selenium',
  'server:stop',
]));

gulp.task('tests:eslint', () => {
  return gulp.src([
    '**/*.js',
    '!node_modules',
    '!coverage',
  ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('tests:pre', () => {
  return gulp.src([
      './data/**/*.js',
      './utils/**/*.js',
      './models/**/*.js',
    ])
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
    .pipe(istanbul.enforceThresholds({
      thresholds: { global: 50 },
    }));
});

gulp.task('tests:selenium', () => {
  return gulp.src('tests/browser/tests/**/*.js')
    .pipe(mocha({
      reporter: config.MOCHA_REPORTER,
      timeout: 20000,
    }));
});

gulp.task('tests:browser', sync([
  'server:start',
  'tests:selenium',
  'server:stop',
]));

gulp.task('tests:supertest', () => {
  return gulp.src('tests/integration-tests/tests/**/*.js')
    .pipe(mocha({
      reporter: config.MOCHA_REPORTER,
    }));
});

gulp.task('tests:integration', sync(['tests:supertest', 'server:stop']));

// SERVER AND DB
gulp.task('server:start', () => {
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
    .then((options) => {
      const { server } = options;
      return server.listen(PORT, null, null, () => {
        console.log(`Listening on ${PORT}`);
      });
    });
});

gulp.task('server:stop', () => {
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

  let movies;

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
          console.log('Inserting to DB...');
          moviesList.forEach((movie) => {
            movie.id = getId();
          });
          movies = moviesList;
          return moviesDb.insertMany(movies);
        })
        .then(() => {
          console.log('Writing data to file...');
          return new Promise((resolve, reject) => {
            fs.writeFile(moviesFile, JSON.stringify(movies), (err) => {
              if (err) {
                return reject(err);
              }
              return resolve();
            });
          });
        })
        .then(() => {
          return process.exit();
        });
    });
});

gulp.task('get-movies-quick', () => {
  const { DB_PATH } = require('./constants');
  const { getId } = require('./utils');

  let movies;

  return Promise.resolve()
    .then(() => {
      return require('./movie-data/');
    })
    .then((moviesList) => {
      movies = moviesList;
      return require('./db')(DB_PATH);
    })
    .then((db) => {
      const moviesDb = db('movies');
      movies.forEach((movie) => {
        movie.id = getId();
      });
      return moviesDb.insertMany(movies);
    })
    .then(() => {
      console.log('Filled DB with ' + movies.length + ' movies.');
      return process.exit();
    });
});
