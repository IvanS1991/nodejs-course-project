const errorHandler = (err, req, res, next) => {
  return res.status(404)
    .render('error', {
      context: {
        user: res.user || {},
        err,
      },
    });
};

module.exports = errorHandler;
