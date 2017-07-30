const { constants, By } = require('../setup-selenium');

const { id } = constants;

const register = (driver, username, password, passwordRepeat) => {
  passwordRepeat = passwordRepeat || password;

  return driver.findElement(By
    .id(id.btnReg))
    .click()
    .then(() => {
      return driver.findElement(By
        .id(id.tbName))
        .sendKeys(username);
    })
    .then(() => {
      return driver.findElement(By
        .id(id.tbPass))
        .sendKeys(password);
    })
    .then(() => {
      return driver.findElement(By
        .id(id.tbPassRep))
        .sendKeys(passwordRepeat);
    })
    .then(() => {
      return driver.findElement(By
        .id(id.btnUserReg))
        .click();
    });
};

const login = (driver, username, password) => {
  return driver.findElement(By
    .id(id.btnLogin))
    .click()
    .then(() => {
      return driver.findElement(By
        .id(id.tbName))
        .sendKeys(username);
    })
    .then(() => {
      return driver.findElement(By
        .id(id.tbPass))
        .sendKeys(password);
    })
    .then(() => {
      return driver.findElement(By
        .id(id.btnUserLogin))
        .click();
    });
};

const logout = (driver) => {
  return driver.findElement(By
    .id(id.btnLogout))
    .click();
};

const profile = (driver) => {
  return driver.findElement(By
    .id(id.btnProfile))
    .click();
};

module.exports = {
  register,
  login,
  logout,
  profile,
};
