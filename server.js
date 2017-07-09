/* globals __dirname */

const express = require('express');
const app = express();

const config = require('./app');
const data = require('./data');

config(app, data, __dirname);
