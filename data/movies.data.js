const scrapeMovies = require('imdb-data-scraper');

const { MOVIE_META } = require('../constants');

const movies = (database) => {
  const { find, insertMany, remove } = database('movies');

  class MoviesController {
    viewOne(req, res) {
      const id = parseInt(req.params.id, 10);
      const filter = { id: id };

      return find(filter)
        .then((matches) => {
          return matches[0];
        })
        .then((match) => {
          if (!match) {
            return res.status(404)
              .json('no such movie');
          }
          return match;
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
            return genre.split('-')
              .map((piece) => {
                return piece[0].toUpperCase() + piece.slice(1);
              })
              .join('-');
          });
        filter.genres = { $all: genres };
      }

      return find(filter)
        .then((matches) => {
          const startIndex = (page - 1) * size || 0;
          const endIndex = startIndex + size || matches.length;
          if (matches.length === 0) {
            return res.status(404)
              .json('no movies match this query');
          }
          return matches.slice(startIndex, endIndex);
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

      return scrapeMovies(MOVIE_META.PAGES, ...MOVIE_META.GENRES)
        .then((moviesList) => {
          moviesList.forEach((movie) => {
            movie.id = getId();
            movie.comments =[];
          });
          data = moviesList;
          return remove({});
        })
        .then(() => {
          return insertMany(data);
        });
    }
  }

  return new MoviesController(database);
};

module.exports = movies;
