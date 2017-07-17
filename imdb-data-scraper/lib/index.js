/* globals __dirname */

const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const modulesList = {};

const modulesDir = path.join(__dirname, 'modules');

_(fs.readdirSync(modulesDir))
    .map((file) => {
        const index = file.search('.js');
        return file.slice(0, index);
    })
    .forEach((module) => {
        const modulePath = path.join(modulesDir, module);
        modulesList[module] = require(modulePath);
    });

module.exports = modulesList;
