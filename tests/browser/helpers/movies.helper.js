const { constants, By, until } = require('../setup-selenium');

const { id, title, timeout } = constants;

const getFiltered = (driver) => {
  return driver.findElement(By
    .id(id.btnNavMovies))
    .click()
      .then(() => {
        return driver.wait(until
          .titleContains(title.moviesBrowseTitle), timeout);
      })
      .then(() => {
        return driver.findElement(By
          .id(id.btnMovieAction))
          .click();
      })
      .then(() => {
        return driver.findElement(By
          .id(id.btnMoviesFilter))
          .click();
      });
};

const getOne = (driver) => {

};

module.exports = {
  getFiltered,
  getOne,
};
