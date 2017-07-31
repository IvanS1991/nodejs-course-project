const { expect } = require('chai');

const { constants, getDriver, By, until } = require('../../setup-selenium');

const { url, title, timeout, id, expected } = constants;

const { user, movie, comment } = require('../../helpers');

describe('Comment create test:', () => {
  let driver;
  let username;
  let password;
  let content;
  let movieTitle;

  beforeEach(() => {
    username = 'gosho' + Math.floor(Math.random() * 100000);
    password = 'asd123';
    content = 'test-content-123';

    driver = getDriver();
  });

  afterEach(() => {
    driver.quit();
  });

  it('expect to properly create comment', (done) => {
    driver.get(url)
      .then(() => {
        return user.register(driver, username, password);
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
        return driver.findElement(By
          .id(id.btnFirstMovie));
      })
      .then((el) => {
        return el.getText();
      })
      .then((text) => {
        movieTitle = text;
        return comment.create(driver, content, movieTitle);
      })
      .then(() => {
        return driver.wait(until
          .elementIsVisible(driver
            .findElement(By.id(id.tbCommentContent))), timeout);
      })
      .then(() => {
        return driver.findElement(By
          .id(id.btnMovieComments));
      })
      .then((el) => {
        return el.getText();
      })
      .then((text) => {
        expect(text).to.equal(expected.commentCount);
        done();
      });
  });
});
