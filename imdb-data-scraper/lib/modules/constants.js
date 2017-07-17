const constants = {
    BASE_URL: 'http://www.imdb.com',
    GENRES_URL: ['http://www.imdb.com/search/title?genres=', '&title_type=feature&sort=moviemeter,asc&page='],
    SELECTORS: {
        MOVIE_HREF: '.lister-item-header a',
        MOVIE_TITLE: '.title_wrapper h1',
        MOVIE_YEAR: '#titleYear a',
        MOVIE_DURATION: '.subtext time',
        MOVIE_IMG: '.poster img',
        MOVIE_DESCRIPTION: '.summary_text',
        MOVIE_GENRES: '.see-more.canwrap',
    },
};

module.exports = constants;
