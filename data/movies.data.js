const scrapeMovies = require('imdb-data-scraper');

const { DB_PATH, MOVIE_META } = require('../constants');

const {
  connectDb,
  closeDb,
  find,
  insertMany,
  remove,
} = require('./crud')('movies');

const movies = (() => {
  class MoviesController {
    viewOne(req, res) {
      const id = parseInt(req.params.id, 10);
      const filter = { id: id };

      connectDb(DB_PATH)
        .then((db) => {
          return find(db, filter);
        })
        .then((options) => {
          const { db, matches } = options;
          const match = matches[0];
          if (!match) {
            res.status(404)
              .json('no such movie');
            return closeDb(db);
          }
          res.status(200)
            .json(match);
          return closeDb(db);
        })
        .catch((db, err) => {
          res.status(404)
            .json(err);
          return closeDb(db);
        });
    }

    viewSome(req, res) {
      const page = parseInt(req.query.page, 10);
      const size = parseInt(req.query.size, 10);

      let genres = req.query.genres;
      const filter = {};
      if (genres) {
        genres = genres
          .split(',')
          .map((genre) => {
            return ' ' + genre[0].toUpperCase() + genre.slice(1);
          });
        filter.genres = { $all: genres };
      }

      connectDb(DB_PATH)
        .then((db) => {
          return find(db, filter);
        })
        .then((options) => {
          const { db, matches } = options;
          const startIndex = (page - 1) * size || 0;
          const endIndex = startIndex + size || matches.length;
          res.status(200)
            .json(matches.slice(startIndex, endIndex).length);
          return closeDb(db);
        })
        .catch((db, err) => {
          res.send(404)
            .json(err);
          return closeDb(db);
        });
    }

    update(req, res) {
      let data;
      const getId = (() => {
        let id = 0;
        return () => {
          id += 1;
          return id;
        };
      })();

      scrapeMovies(MOVIE_META.PAGES, ...MOVIE_META.GENRES)
        .then((movieList) => {
          movieList.forEach((movie) => {
            movie.comments = [];
            movie.id = getId();
          });
          data = movieList;
          return connectDb(DB_PATH);
        })
        .then((db) => {
          return remove(db, {});
        })
        .then((db) => {
          return insertMany(db, data);
        })
        .then((db) => {
          res.status(200)
            .json('inserted ' + data.length + ' movies');
          return closeDb(db);
        })
        .catch((db, err) => {
          res.status(404)
            .json(err);
          return closeDb(db);
        });
    }
  }

  return new MoviesController();
})();

module.exports = movies;
