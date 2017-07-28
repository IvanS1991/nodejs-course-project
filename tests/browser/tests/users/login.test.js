const { expect } = require('chai');

const { constants, getDriver, By, until } = require('../../setup-selenium');

const { url, title, timeout, id } = constants;

const { user } = require('../../helpers');

describe('Login tests:', () => {
  let driver;
  let username;
  let password;

  describe('if user does NOT exist:', () => {
    beforeEach(() => {
      driver = getDriver();

      username = 'gosho' + Math.floor(Math.random() * 10000);
      password = 'asd123';
    });

    afterEach(() => {
      driver.quit();
    });
    it('expect to show error', (done) => {
      driver.get(url)
        .then(() => {
          return user.login(driver, username, password);
        })
        .then(() => {
          return driver.wait(until.titleContains(title.errTitle), timeout);
        })
        .then(() => {
          return driver.findElement(By
            .tagName('h1'));
        })
        .then((el) => {
          return el.getText();
        })
        .then((text) => {
          expect(text).to.contain(title.errTitle);
          done();
        });
    });
  });

  describe('if user does exist:', () => {
    beforeEach(() => {
      driver = getDriver();

      username = 'gosho' + Math.floor(Math.random() * 10000);
      password = 'asd123';
    });

    afterEach(() => {
      driver.quit();
    });

    it('expect to login user and redirect to profile', (done) => {
      driver.get(url)
        .then(() => {
          return user.register(driver, username, password);
        })
        .then(() => {
          return driver.wait(until.titleContains(title.profileTitle), timeout);
        })
        .then(() => {
          return user.logout(driver);
        })
        .then(() => {
          return driver.wait(until.titleContains(title.homeTitle), timeout);
        })
        .then(() => {
          return user.login(driver, username, password);
        })
        .then(() => {
          return driver.wait(until.titleContains(title.profileTitle), timeout);
        })
        .then(() => {
          return driver.findElement(By
            .id(id.profileUser));
        })
        .then((el) => {
          return el.getText();
        })
        .then((text) => {
          expect(text).to.contain(username);
          done();
        });
    });
  });
});
