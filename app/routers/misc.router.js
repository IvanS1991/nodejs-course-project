const { Router } = require('express');
const { MOVIE_META } = require('../../constants');

const miscRouter = (app, data) => {
  const router = new Router();

  router.get('/', (req, res) => {
    return res.status(200)
      .render('home', {
        context: {
          user: req.user || {},
          jsFilePath: './scripts/main.js'
        },
      });
  });

  router.get('/about', (req, res) => {
    return res.status(200)
      .render('about', {
        context: {
          user: req.user || {},
          jsFilePath: './scripts/main.js'
        },
      });
  });

  router.get('/login', (req, res) => {
    return res.status(200)
      .render('login', {
        context: {
          user: req.user || {},
          jsFilePath: './scripts/main.js'
        },
      });
  });

  router.get('/register', (req, res) => {
    return res.status(200)
      .render('register', {
        context: {
          user: req.user || {},
          jsFilePath: './scripts/main.js'
        },
      });
  });

  router.get('/logout', (req, res) => {
    req.logout();
    return res.redirect('/');
  });

  router.get('/movies', (req, res) => {
    return res.status(200)
      .render('movies', {
        context: {
          user: req.user || {},
          jsFilePath: './scripts/main.js',
          geners: MOVIE_META.GENRES
        },
      });
  });

  app.use('/', router);
};

module.exports = miscRouter;
