const fetch = require('node-fetch');
const _ = require('lodash');
const { JSDOM } = require('jsdom');
const { SELECTORS } = require('./constants');

const grabText = (node) => {
    if (node.children.length > 0) {
        return grabText(node.firstElementChild);
    }
    return node.innerHTML
        .replace(/\n/g, '')
        .trim();
};

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

            let actors = document
                .querySelectorAll(SELECTORS.MOVIE_ACTORS);

            let characters = document
                .querySelectorAll(SELECTORS.MOVIE_CHARACTERS);

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
                output.description = description
                    .firstChild.textContent
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

            if (actors && characters) {
                output.cast = [];
                actors = [].slice.call(actors)
                    .map((el) => {
                        return el.innerHTML;
                    });
                characters = [].slice.call(characters)
                    .map((el) => {
                        return grabText(el);
                    });
                actors.forEach((actor, index) => {
                    output.cast.push({
                        actor,
                        character: characters[index],
                    });
                });
            }

            return output;
        })
        .catch((err) => {
            throw err;
        });
};

module.exports = parseMovie;
