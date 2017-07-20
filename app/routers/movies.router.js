const { Router } = require('express');
const { ROUTES } = require('../../constants');

const moviesRouter = (app, data) => {
  const { movies } = data;
  const router = new Router();

  // VIEW BY ID
  router.get(ROUTES.MOVIES.VIEW_ONE, (req, res, next) => {
    const id = parseInt(req.params.id, 10);
    const filter = { id: id };

    movies.viewOne(filter)
      .then((movie) => {
        return res.status(200)
          .json(movie);
      })
      .catch((err) => {
        next(err);
      });
  });

  // VIEW BY QUERY
  router.get(ROUTES.MOVIES.VIEW_SOME, (req, res, next) => {
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
      .then((matches) => {
        return res.status(200)
          .render('movies-filtered', {
            context: {
              user: req.user || {},
              movies: matches,
              genres,
              currentPage: page,
            },
          });
      })
      .catch((err) => {
        next(err);
      });
  });

  app.use(ROUTES.MOVIES.ROOT, router);
};

module.exports = moviesRouter;
