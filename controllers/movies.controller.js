const moviesController = (data) => {
  const { movies } = data;

  class MoviesController {
    viewOne(req, res, next) {
      const id = parseInt(req.params.id, 10);
      const filter = { id: id };

      return movies.viewOne(filter)
        .then((movie) => {
          return res.status(200)
            .render('movie-detailed', {
              context: {
                user: req.user || {},
                movie,
              },
            });
        })
        .catch((err) => {
          next(err);
        });
    }

    viewSome(req, res, next) {
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

      return movies.viewSome({ page, size, filter })
        .then((result) => {
          const { matches, maxPages } = result;
          return res.status(200)
            .render('movies-filtered', {
              context: {
                user: req.user || {},
                movies: matches,
                genres,
                currentPage: page,
                maxPages,
              },
            });
        })
        .catch((err) => {
          next(err);
        });
    }
  }

  return new MoviesController();
};

module.exports = moviesController;
