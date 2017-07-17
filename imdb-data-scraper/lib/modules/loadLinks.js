const _ = require('lodash');

const parseLinks = require('./parseLinks');
const getQueue = require('./getQueue');

const loadLinks = (pages, ...genres) => {
    const queue = getQueue();

    const promises = [];

    genres.forEach((genre) => {
        const promise = parseLinks(genre, pages)
            .then((urlList) => {
                return urlList;
            });
        promises.push(promise);
    });

    return Promise.all(promises)
        .then((result) => {
            result = _(result)
                .flatten()
                .value();
            queue.push(...result);
            return queue;
        })
        .catch((err) => {
            throw err;
        });
};

module.exports = loadLinks;
