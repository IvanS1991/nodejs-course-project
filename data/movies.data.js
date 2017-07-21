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
          return {
            matches: matches.slice(startIndex, endIndex),
            maxPages: Math.ceil(matches.length / size),
          };
        });
    }
  }

  return new MoviesData(database);
};

module.exports = movies;
