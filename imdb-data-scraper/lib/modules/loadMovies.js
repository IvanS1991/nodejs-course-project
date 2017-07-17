const parseMovie = require('./parseMovie');

const loadMovie = (queue, container) => {
  if (queue.isEmpty()) {
    return Promise.resolve()
      .catch((err) => {
        throw err;
      });
  }

  const url = queue.pop();
  return parseMovie(url)
    .then((movie) => {
      container.push(movie);
      return loadMovie(queue, container);
    })
    .catch((err) => {
      throw err;
    });
};

const loadMovies = (queue, container) => {
  const queueLength = 20;

  return Promise.all(Array.from({ length: queueLength })
      .map((_) => {
        return loadMovie(queue, container);
      }))
      .catch((err) => {
        throw err;
      });
};

module.exports = loadMovies;
