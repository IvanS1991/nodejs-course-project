const { constants, By, until } = require('../setup-selenium');

const { id, title, timeout } = constants;

const create = (driver, content, movieTitle) => {
  return driver.findElement(By
    .id(id.btnFirstMovie))
    .click()
      .then(() => {
        return driver.wait(until
          .elementIsVisible(driver
            .findElement(By.id(id.tbCommentContent))), 10000);
      })
      .then(() => {
        return driver.findElement(By
          .id(id.tbCommentContent))
          .sendKeys(content);
      })
      .then(() => {
        return driver.findElement(By
          .id(id.btnCommentCreate))
          .click();
      });
};

const remove = (driver) => {

};

module.exports = {
  create,
  remove,
};
