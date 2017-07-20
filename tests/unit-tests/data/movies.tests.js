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
    describe(`if a match is found...`, () => {
      let match;

      beforeEach(() => {
        match = {
          movie: 'asd',
          comments: [],
          id: 5,
        };

        sinon.stub(crud, 'findOne')
          .callsFake(() => {
            return Promise.resolve(match);
          });
      });

      afterEach(() => {
        crud.findOne.restore();
      });

      it(`expect to resolve with the match`, (done) => {
        movies.viewOne({})
          .then((result) => {
            expect(result).to.deep.equal(match);
          })
          .then(done, done);
      });
    });

    describe(`if no match is found...`, () => {
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
    describe(`if matches are found...`, () => {
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
            expect(result).to.have.length(options.size);
            expect(indexOfMatch).to.equal(startIndex);
          })
          .then(done, done);
      });
    });

    describe(`if no matches are found...`, () => {
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
