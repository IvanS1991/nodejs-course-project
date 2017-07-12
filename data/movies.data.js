const scrapeMovies = require('imdb-data-scraper');

const { MOVIE_META } = require('../constants');

const movies = (database) => {
  const moviesData = database('movies');

  class MoviesData {
    viewOne(filter) {
      return moviesData.findOne(filter)
        .then((match) => {
          if (!match) {
            return Promise.reject('no such movie');
          }
          return match;
        });
    }

    viewSome(options) {
      const { page, size, filter } = options;
      return moviesData.findMany(filter)
        .then((matches) => {
          if (matches.length === 0) {
            return Promise.reject('no movies match this criteria');
          }
          const startIndex = (page - 1) * size || 0;
          const endIndex = startIndex + size || matches.length;
          return matches.slice(startIndex, endIndex);
        });
    }

    update(req, res) {
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
          return moviesData.insertMany(moviesList);
        })
        .then((result) => {
          return result.length;
        });
    }
  }

  return new MoviesData(database);
};

module.exports = movies;
