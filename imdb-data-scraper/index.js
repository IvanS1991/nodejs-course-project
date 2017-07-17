const _ = require('lodash');

const { loadLinks, loadMovies } = require('./lib');

const scrapeMovies = (pageCount, ...genresList) => {
    let movieList = [];

    const start = new Date();

    return loadLinks(pageCount, ...genresList)
        .then((queue) => {
            return loadMovies(queue, movieList);
        })
        .then(() => {
            movieList = _(movieList)
                .uniqBy('title')
                .value();
            const end = new Date();
            const totalTime = end - start;
            console.log('Scrapped ' + movieList.length
                + ' unique movies in ' + totalTime + ' ms');
            return movieList;
        })
        .catch((err) => {
            throw err;
        });
};

module.exports = scrapeMovies;
