const constants = {
    BASE_URL: 'http://www.imdb.com',
    GENRES_URL: ['http://www.imdb.com/search/title?genres=', '&title_type=feature&sort=moviemeter,asc&page='],
    SELECTORS: {
        MOVIE_HREF: '.lister-item-header a',
        MOVIE_TITLE: '.title_wrapper h1',
        MOVIE_YEAR: '#titleYear a',
        MOVIE_DURATION: '.subtext time',
        MOVIE_IMG: '.poster img',
        MOVIE_DESCRIPTION: '#titleStoryLine div p',
        MOVIE_GENRES: '.see-more.canwrap',
        MOVIE_SCORE: '.metacriticScore span',
        MOVIE_DIRECTOR: '.plot_summary_wrapper .credit_summary_item',
        MOVIE_ACTORS: '#titleCast tbody span.itemprop',
        MOVIE_CHARACTERS: '#titleCast tbody .character div',
    },
};

module.exports = constants;
