const { expect } = require('chai');
const sinon = require('sinon');

const init = require('../../../data');

describe('data.comments tests', () => {
  let comments;
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
      insertOne: () => {
        return null;
      },
      insertMany: () => {
        return null;
      },
      update: () => {
        return null;
      },
      updatePush: () => {
        return null;
      },
      remove: () => {
        return null;
      },
    };

    db = () => {
      return crud;
    };

    comments = init(db).comments;
  });

  describe(`data.comments.create`, () => {
    let expected;

    beforeEach(() => {
      expected = { content: 'asd', author: 'dsa' };

      sinon.stub(crud, 'insertOne')
        .callsFake((item) => {
          return Promise.resolve(item);
        });
    });

    afterEach(() => {
      crud.insertOne.restore();
    });

    it(`expect to resolve with an object`, (done) => {
      comments.create(expected)
        .then((result) => {
          expect(result).to.deep.equal(expected);
        })
        .then(done, done);
    });
  });

  describe(`data.comments.delete`, () => {
    describe(`if a matching comment is found and is owner...`, () => {
      let user;
      let comment;

      beforeEach(() => {
        user = {
          username: 'gosho',
        };

        comment = {
          author: user.username,
        };

        sinon.stub(crud, 'findOne')
          .callsFake(() => {
            return Promise.resolve(comment);
          });

        sinon.stub(crud, 'remove')
          .callsFake(() => {
            return Promise.resolve({});
          });
      });

      afterEach(() => {
        crud.findOne.restore();
        crud.remove.restore();
      });

      it(`expect to resolve with an empty object`, (done) => {
        comments.remove({ user })
          .then((result) => {
            expect(result).to.deep.equal({});
          })
          .then(done, done);
      });
    });

    describe(`if a matching comment is found and is NOT owner...`, () => {
      let user;
      let comment;

      beforeEach(() => {
        user = {
          username: 'gosho',
        };

        comment = {
          author: 'pesho',
        };

        sinon.stub(crud, 'findOne')
          .callsFake(() => {
            return Promise.resolve(comment);
          });
      });

      afterEach(() => {
        crud.findOne.restore();
      });

      it(`expect to reject with an error`, () => {
        comments.remove({ user })
          .catch((err) => {
            return expect(err).to.exist
              .and.to.be.a('string');
          });
      });
    });

    describe(`if no matching comment is found...`, () => {
      beforeEach(() => {
        sinon.stub(crud, 'findOne')
          .callsFake(() => {
            return Promise.resolve();
          });
      });

      afterEach(() => {
        crud.findOne.restore();
      });

      it(`expect to reject with an error`, () => {
        comments.remove({})
          .catch((err) => {
            return expect(err).to.exist
              .and.to.be.a('string');
          });
      });
    });
  });
});
