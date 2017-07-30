const { expect } = require('chai');

const { constants, getDriver, By, until } = require('../../setup-selenium');

const { url, title, timeout, id, expected } = constants;

const { user, collection, movie } = require('../../helpers');

describe('Collection add tests:', () => {
  let driver;
  let username;
  let password;
  let collName;

  beforeEach(() => {
    username = 'gosho' + Math.floor(Math.random() * 1000000);
    password = 'asd123';
    collName = 'coll' + Math.floor(Math.random() * 10000000);

    driver = getDriver();
  });

  afterEach(() => {
    driver.quit();
  });

  it('expect to properly add movie to collection', (done) => {
    driver.get(url)
      .then(() => {
        return user.register(driver, username, password);
      })
      .then(() => {
        return driver.wait(until
          .titleContains(title.profileTitle), timeout);
      })
      .then(() => {
        return collection.create(driver, collName);
      })
      .then(() => {
        return driver.wait(until
          .titleContains(title.profileTitle), timeout);
      })
      .then(() => {
        return movie.getFiltered(driver);
      })
      .then(() => {
        return driver.wait(until
          .titleContains(title.moviesActionTitle), timeout);
      })
      .then(() => {
        return collection.add(driver);
      })
      .then(() => {
        return driver.wait(until
          .titleContains(title.moviesActionTitle), timeout);
      })
      .then(() => {
        return user.profile(driver);
      })
      .then(() => {
        return driver.wait(until
          .titleContains(title.profileTitle), timeout);
      })
      .then(() => {
        return driver.findElement(By
          .id(id.btnCollPreview))
          .click();
      })
      .then(() => {
        return driver.wait(until
          .elementIsVisible(driver
            .findElement(By.id(id.collMoviesCount))), timeout);
      })
      .then(() => {
        return driver.findElement(By
          .id(id.collMoviesCount));
      })
      .then((el) => {
        return el.getText();
      })
      .then((text) => {
        expect(text).to.equal(expected.movieCount);
        done();
      });
  });
});
