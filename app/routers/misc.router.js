const { Router } = require('express');

const miscRouter = (app, data) => {
  const router = new Router();

  router.get('/', (req, res) => {
    return res.status(200)
      .render('home', {
        context: {
          user: req.user || {},
        },
      });
  });

  router.get('/about', (req, res) => {
    return res.status(200)
      .render('about', {
        context: {
          user: req.user || {},
        },
      });
  });

  router.get('/login', (req, res) => {
    return res.status(200)
      .render('login', {
        context: {
          user: req.user || {},
        },
      });
  });

  router.get('/register', (req, res) => {
    return res.status(200)
      .render('register', {
        context: {
          user: req.user || {},
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
        },
      });
  });

  router.get('/collections', (req, res) => {
    return res.status(200)
      .render('collections', {
        context: {
          user: req.user || {},
        },
      });
  });

  app.use('/', router);
};

module.exports = miscRouter;
