/* globals __dirname */

const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const attach = (app, data) => {
    _(fs.readdirSync(__dirname))
        .filter((file) => {
            return file.search('.router.js') >= 0;
        })
        .forEach((file) => {
            const filePath = path.join(__dirname, file);
            require(filePath)(app, data);
        });
};

module.exports = attach;
