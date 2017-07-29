const { expect } = require('chai');

const { constants, getDriver, By, until } = require('../../setup-selenium');

const { url, title, timeout, id } = constants;

const { user, collection } = require('../../helpers');

describe('Collection create tests:', () => {
  let driver;
  let username;
  let password;
  let collectionName;

  beforeEach(() => {
    username = 'gosho' + Math.floor(Math.random() * 1000000);
    password = 'asd123';
    collectionName = 'coll' + Math.floor(Math.random() * 1000000);

    driver = getDriver();
  });

  afterEach(() => {
    driver.quit();
  });

  describe('if valid data is sent:', () => {
    it('expect to create collection', (done) => {
      driver.get(url)
        .then(() => {
          return user.register(driver, username, password);
        })
        .then(() => {
          return driver.wait(until
            .titleContains(title.profileTitle), timeout);
        })
        .then(() => {
          return collection.create(driver, collectionName);
        })
        .then(() => {
          return driver.wait(until
            .titleContains(title.profileTitle), timeout);
        })
        .then(() => {
          return driver.findElement(By
            .id(id.btnCollPreview), timeout);
        })
        .then((el) => {
          return el.getText();
        })
        .then((text) => {
          expect(text).to.equal(collectionName);
          done();
        });
    });
  });
});
