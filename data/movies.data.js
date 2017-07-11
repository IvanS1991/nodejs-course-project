const scrapeMovies = require('imdb-data-scraper');

const { MOVIE_META } = require('../constants');

const movies = (database) => {
  const moviesDb = database('movies');

  class MoviesData {
    viewOne(filter) {
      return moviesDb.findOne(filter)
        .then((match) => {
          if (!match) {
            return Promise.reject(new Error('no such movie'));
          }
          return match;
        });
    }

    viewSome(options) {
      const { page, size, filter } = options;
      return moviesDb.findMany(filter)
        .then((matches) => {
          if (matches.length === 0) {
            return Promise.reject(new Error('no movies match this query'));
          }
          const startIndex = (page - 1) * size || 0;
          const endIndex = startIndex + size || matches.length;
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
          return moviesDb.remove({});
        })
        .then(() => {
          return moviesDb.insertMany(data);
        });
    }
  }

  return new MoviesData(database);
};

module.exports = movies;
