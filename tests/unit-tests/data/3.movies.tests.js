const { expect } = require('chai');
const sinon = require('sinon');

const init = require('../../../data');

describe(`data.movies tests`, () => {
  let movies;
  let db;
  let crud;

  beforeEach(() => {
    crud = {
      findOne: () => {
        return null;
      },
      findMany: () => {
        return null;
      },
    };

    db = () => {
      return crud;
    };

    movies = init(db).movies;
  });

  describe(`data.movies.viewOne tests`, () => {
    describe(`if a matching movie is found...`, () => {
      let match;
      let comments;

      beforeEach(() => {
        match = {
          movie: 'asd',
          id: 5,
        };

        comments = ['comments'];

        sinon.stub(crud, 'findOne')
          .callsFake(() => {
            return Promise.resolve(match);
          });

        sinon.stub(crud, 'findMany')
          .callsFake(() => {
            return Promise.resolve(comments);
          });
      });

      afterEach(() => {
        crud.findOne.restore();
      });

      it(`expect to resolve with the match`, (done) => {
        movies.viewOne({})
          .then((result) => {
            expect(result).to.be.an('object');
            expect(result).to.have.property('data');
            expect(result).to.have.property('comments');
            expect(result.data).to.deep.equal(match);
            expect(result.comments).to.deep.equal(comments);
          })
          .then(done, done);
      });
    });

    describe(`if no matching movie is found...`, () => {
      beforeEach(() => {
        sinon.stub(crud, 'findOne')
          .callsFake(() => {
            return Promise.resolve();
          });
      });

      afterEach(() => {
        crud.findOne.restore();
      });

      it(`expect to reject with an Error`, () => {
        movies.viewOne({})
          .catch((err) => {
            return expect(err).to.exist
              .and.to.be.a('string');
          });
      });
    });
  });

  describe(`data.movies.viewSome tests`, () => {
    describe(`if matching movies are found...`, () => {
      let options;
      let data;
      let startIndex;
      let endIndex;
      let indexOfMatch;
      let match;

      beforeEach(() => {
        options = {
          page: 5,
          size: 40,
        };

        data = new Array(1000)
          .fill(0)
          .map((el, i) => {
            return i;
          });

        startIndex = (options.page - 1) * options.size || 0;
        endIndex = startIndex + options.size || data.length;

        match = data.slice(startIndex, endIndex);

        indexOfMatch = data.indexOf(match[0]);

        sinon.stub(crud, 'findMany')
          .callsFake(() => {
            return Promise.resolve(match);
          });
      });

      afterEach(() => {
        crud.findMany.restore();
      });

      it(`expect to resolve with an array of proper length`, (done) => {
        movies.viewSome({})
          .then((result) => {
            expect(result.matches).to.have.length(options.size);
            expect(indexOfMatch).to.equal(startIndex);
          })
          .then(done, done);
      });
    });

    describe(`if no matching movies are found...`, () => {
      beforeEach(() => {
        sinon.stub(crud, 'findMany')
          .callsFake(() => {
            return Promise.resolve([]);
          });
      });

      afterEach(() => {
        crud.findMany.restore();
      });

      it(`expect to reject with an Error`, () => {
        movies.viewSome({})
          .catch((err) => {
            return expect(err).to.exist
              .and.to.be.a('string');
          });
      });
    });
  });
});
