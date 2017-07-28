const webdriver = require('selenium-webdriver');
const { By, until } = webdriver;
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');

chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());

const getDriver = () => {
    return new webdriver.Builder()
        .withCapabilities(webdriver.Capabilities.chrome())
        .build();
};

const constants = {
    id: {
        btnLogin: 'btn-login',
        btnReg: 'btn-register',
        btnLogout: 'btn-logout',
        btnUserLogin: 'btn-user-login',
        btnUserReg: 'btn-user-register',
        tbName: 'tb-username',
        tbPass: 'tb-password',
        tbPassRep: 'tb-password-repeat',
        profileUser: 'profile-username',
    },
    title: {
        profileTitle: 'User profile',
        homeTitle: 'Home',
        errTitle: 'Error',
    },
    url: 'http://localhost:8808',
    timeout: 5000,
};

module.exports = {
    constants,
    getDriver,
    By,
    until,
};
