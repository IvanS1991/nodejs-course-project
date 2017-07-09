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
            db.close();
            return res.status(404)
              .json('no such movie');
          }
          res.status(200)
            .json(match);
          return closeDb(db);
        })
        .catch((db, err) => {
          db.close();
          res.status(404)
            .json(err);
        });
    }

    viewSome(req, res) {

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
          db.close();
          res.status(404)
            .json(err);
        });
    }
  }

  return new MoviesController();
})();

module.exports = movies;
