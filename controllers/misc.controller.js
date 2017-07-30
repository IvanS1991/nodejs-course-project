const { MOVIE_META, TWITTER_KEYWORDS } = require('../constants');

const miscController = (data) => {
  class MiscController {
    home(req, res) {
      return res.status(200)
        .render('home', {
          context: {
            user: req.user || {},
            twitterKeyword: TWITTER_KEYWORDS,
          },
        });
    }

    about(req, res) {
      return res.status(200)
        .render('about', {
          context: {
            user: req.user || {},
          },
        });
    }

    login(req, res) {
      return res.status(200)
        .render('login', {
          context: {
            user: req.user || {},
          },
        });
    }

    register(req, res) {
      return res.status(200)
        .render('register', {
          context: {
            user: req.user || {},
          },
        });
    }

    logout(req, res) {
      req.logout();
      return res.redirect('/');
    }

    movies(req, res) {
      return res.status(200)
        .render('movies', {
          context: {
            user: req.user || {},
            genres: MOVIE_META.GENRES,
          },
        });
    }

    newCollection(req, res, next) {
      return res.status(200)
        .render('collection-create', {
          context: {
            user: req.user || {},
          },
        });
    }
  }

  return new MiscController();
};

module.exports = miscController;
