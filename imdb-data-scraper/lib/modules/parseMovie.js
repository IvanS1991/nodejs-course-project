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

            const metaCriticScore = document
                .querySelector(SELECTORS.MOVIE_SCORE);

            const director = [].slice.call(document
                .querySelectorAll(SELECTORS.MOVIE_DIRECTOR))[0];

            const actors = document
                .querySelectorAll(SELECTORS.MOVIE_ACTORS);

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

            if (metaCriticScore) {
                output.rating = parseInt(metaCriticScore.innerHTML, 10);
            }

            if (director) {
                output.director = []
                    .slice.call(director.querySelectorAll('a span'))[0]
                    .innerHTML;
            }

            if (actors) {
                output.actors = [].slice.call(actors)
                    .map((span) => {
                        return span.innerHTML;
                    });
            }

            return output;
        })
        .catch((err) => {
            throw err;
        });
};

module.exports = parseMovie;
