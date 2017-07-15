const { Router } = require('express');

const miscRouter = (app, data) => {
  const router = new Router();

  router.get('/', (req, res) => {
    return res.render('home');
  });

  app.use('/', router);
};

module.exports = miscRouter;
