const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');

const attach = (app, root) => {
    const publicPath = path.join(root, 'public');
    const nodePath = path.join(root, 'node_modules');

    app.use('/', express.static(publicPath));
    app.use('/lib', express.static(nodePath));

    app.use(cors());
    app.use(bodyParser.json());
};

module.exports = attach;
