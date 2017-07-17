const fetch = require('node-fetch');
const { JSDOM } = require('jsdom');
const _ = require('lodash');

const { BASE_URL, GENRES_URL, SELECTORS } = require('./constants');

const parseLinks = (genre, pages) => {
    const promises = [];

    const genreUrl = GENRES_URL.join(genre);

    for (let i = 1; i <= pages; i += 1) {
        const finalUrl = genreUrl + i;
        const promise = fetch(finalUrl)
            .then((response) => {
                return response.text();
            })
            .then((body) => {
                const dom = new JSDOM(body, {});
                const window = dom.window;
                const document = window.document;

                const urlList = _
                    .chain(document.querySelectorAll(SELECTORS.MOVIE_HREF))
                    .map((anchor) => {
                        const anchorHref = anchor.getAttribute('href');
                        return `${BASE_URL}${anchorHref}`;
                    })
                    .value();

                return {
                    genre,
                    urlList,
                };
            });
        promises.push(promise);
    }

    return Promise.all(promises)
        .then((output) => {
            return _(output)
                .map((each) => {
                    return each.urlList;
                })
                .flatten()
                .value();
        })
        .catch((err) => {
            throw err;
        });
};

module.exports = parseLinks;
