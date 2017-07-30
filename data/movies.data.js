const { getKey, getId } = require('../utils');

const movies = (database) => {
  const moviesData = database('movies');
  const commentsData = database('comments');

  class MoviesData {
    viewOne(filter) {
      const output = {};
      return moviesData.findOne(filter)
        .then((match) => {
          if (!match) {
            return Promise.reject('No such movie!');
          }
          output.data = match;
          return commentsData.findMany({ movieId: match.id });
        })
        .then((comments) => {
          output.comments = comments.reverse();
          return output;
        });
    }

    viewSome(options) {
      const { page, size, filter } = options;
      return moviesData.findMany(filter)
        .then((matches) => {
          if (matches.length === 0) {
            return Promise.reject('No movies match this criteria!');
          }
          const startIndex = (page - 1) * size || 0;
          const endIndex = startIndex + size || matches.length;
          return {
            matches: matches.slice(startIndex, endIndex),
            maxPages: Math.ceil(matches.length / size),
          };
        });
    }

    populate(count) {
      const list = [];
      for (let i = 0; i < count; i += 1) {
        const movie = {};
        movie.title = getKey();
        movie.year = '2016';
        movie.duration = '2h';
        movie.imgsrc = 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTUwMzI5ODEwNF5BMl5BanBnXkFtZTgwNjAzNjI2MDI@._V1_UX182_CR0,0,182,268_AL_.jpg';
        movie.genres = [
          'Action',
          'Animation',
          'Adventure',
          'Comedy',
          'Drama',
          'Fantasy',
          'Sci-fi',
          'Thriller',
          'Romance',
        ];
        movie.description = getKey();
        movie.rating = 50;
        movie.director = getKey();
        movie.cast = [
          {
            actor: getKey(),
            character: getKey(),
          },
        ];
        movie.id = getId();
        list.push(movie);
      }
      moviesData.insertMany(list)
        .then(() => {
          console.log('populated db');
        });
    }
  }

  return new MoviesData(database);
};

module.exports = movies;
