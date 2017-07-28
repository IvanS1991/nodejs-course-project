const { expect } = require('chai');

const { constants, getDriver, By, until } = require('../../setup-selenium');

const { id, title, url, timeout } = constants;

const { user } = require('../../helpers');

describe('Register tests:', () => {
  let driver;
  let username;
  let password;

  describe('if user does exist:', () => {
    beforeEach(() => {
      username = 'gosho' + Math.floor(Math.random() * 100000);
      password = 'asd123';

      driver = getDriver();
    });

    afterEach(() => {
      driver.quit();
    });

    it('expect to show error', (done) => {
      driver.get(url)
        .then(() => {
          return user.register(driver, username, password);
        })
        .then(() => {
          return driver.wait(until
            .titleContains(title.profileTitle), timeout);
        })
        .then(() => {
          return user.logout(driver);
        })
        .then(() => {
          return driver.wait(until
            .titleContains(title.homeTitle), timeout);
        })
        .then(() => {
          return user.register(driver, username, password);
        })
        .then(() => {
          return driver.wait(until
            .titleContains(title.errTitle), timeout);
        })
        .then(() => {
          return driver.findElement(By
            .tagName('h1'));
        })
        .then((el) =>{
          return el.getText();
        })
        .then((text) => {
          expect(text).to.contain(title.errTitle);
          done();
        });
    });
  });

  describe('if user does NOT exist', () => {
    beforeEach(() => {
      username = 'gosho' + Math.floor(Math.random() * 100000);
      password = 'asd123';

      driver = getDriver();
    });

    afterEach(() => {
      driver.quit();
    });

    describe('if incorrect data is sent:', () => {
      it('expect to show error', (done) => {
        driver.get(url)
          .then(() => {
            return user
              .register(driver, username, password, 'INCORRECTPASSWORD');
          })
          .then(() => {
            return driver.wait(until
              .titleContains(title.errTitle));
          })
          .then(() => {
            return driver.findElement(By
              .tagName('h1'));
          })
          .then((el) => {
            return el.getText();
          })
          .then((text) => {
            expect(title.errTitle).to.contain(text);
            done();
          });
      });
    });

    describe('if correct data is sent:', () => {
      it('expect to register user', () => {
        driver.get(url)
          .then(() => {
            return user.register(driver, username, password);
          })
          .then(() => {
            return driver.wait(until
              .titleContains(title.profileTitle), timeout);
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
          });
      });
    });
  });
});
