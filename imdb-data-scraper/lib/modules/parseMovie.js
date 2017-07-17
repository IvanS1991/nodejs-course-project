const fetch = require('node-fetch');
const _ = require('lodash');
const { JSDOM } = require('jsdom');
const { SELECTORS } = require('./constants');

const parseMovie = (url) => {
    return fetch(url)
        .then((response) => {
            return response.text();
        })
        .then((body) => {
            const dom = new JSDOM(body, {});
            const window = dom.window;
            const document = window.document;

            const output = {};

            const title = document
                .querySelector(SELECTORS.MOVIE_TITLE);

            const year = document
                .querySelector(SELECTORS.MOVIE_YEAR);

            const duration = document
                .querySelector(SELECTORS.MOVIE_DURATION);

            const img = document
                .querySelector(SELECTORS.MOVIE_IMG);

            const genresList = document
                .querySelectorAll(SELECTORS.MOVIE_GENRES)[1];

            const description = document
                .querySelector(SELECTORS.MOVIE_DESCRIPTION);

            if (title) {
                output.title = title
                    .firstChild
                    .textContent.trim();
            }
            if (year) {
                output.year = year
                    .innerHTML;
            }

            if (duration) {
                output.duration = duration.innerHTML
                    .replace(/\n/g, '')
                    .trim();
            }

            if (img) {
                output.imgSrc = img
                    .getAttribute('src');
            }

            if (genresList) {
                const genres = genresList.querySelectorAll('a');
                output.genres = _([].slice.apply(genres))
                    .map((anchor) => anchor.innerHTML.trim())
                    .value();
            }

            if (description) {
                output.description = description.innerHTML
                    .replace(/\n/g, '')
                    .trim();
            }

            return output;
        })
        .catch((err) => {
            throw err;
        });
};

module.exports = parseMovie;
