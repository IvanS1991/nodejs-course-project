/* globals __dirname */

const express = require('express');
const app = express();

const config = require('./app');

config(app, __dirname);
