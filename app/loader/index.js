const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const loader = (dir, filter) => {
    const output = {};

    _(fs.readdirSync(dir))
        .filter((file) => {
            return file.search(filter) >= 0;
        })
        .forEach((file) => {
            const filePath = path.join(dir, file);
            const dotIndex = file.indexOf('.');
            const label = file.slice(0, dotIndex);
            output[label] = require(filePath);
        });

    return output;
};

module.exports = loader;

