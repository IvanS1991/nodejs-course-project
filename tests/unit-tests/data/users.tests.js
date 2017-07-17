const { expect } = require('chai');
const sinon = require('sinon');

const init = require('../../../data');

describe('data.usersDb tests', () => {
  let usersDb;
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

    usersDb = init(db).users;
  });

  describe(`data.usersDb.register tests`, () => {
    describe(`if there is no such user in db...`, () => {
      let expected;

      beforeEach(() => {
        expected = { username: 'asdsa', authKey: 'dsadas' };

        sinon.stub(crud, 'findOne')
          .callsFake(() => {
            return Promise.resolve();
          });

        sinon.stub(crud, 'insertOne')
          .callsFake((data) => {
            return Promise.resolve(data);
          });
      });

      afterEach(() => {
        crud.findOne.restore();
        crud.insertOne.restore();
      });

      it(`expect to resolve with an object with property authKey`, (done) => {
        usersDb.register(expected)
          .then((result) => {
            expect(result).to.deep.equal(expected);
          })
          .then(done, done);
      });
    });

    describe(`if there is such user in db...`, () => {
      beforeEach(() => {
        sinon.stub(crud, 'findOne')
          .callsFake(() => {
            return Promise.resolve({});
          });
      });

      afterEach(() => {
        crud.findOne.restore();
      });

      it(`expect to reject with an error string`, () => {
        usersDb.register({})
          .catch((err) => {
            return expect(err).to.exist
              .and.to.be.a('string');
          });
      });
    });
  });

  describe(`data.usersDb.profile tests`, () => {
    describe(`if a match is found...`, () => {
      let match;

      beforeEach(() => {
        match = {
          username: 'asdsa',
          passHash: 'geqwgqw',
          authKey: 'ggqwewq',
          collections: [],
          comments: [],
          somethingElse: false,
        };

        sinon.stub(crud, 'findOne')
          .callsFake(() => {
            return Promise.resolve(match);
          });
      });

      afterEach(() => {
        crud.findOne.restore();
      });

      it(`expect to resolve with an object with exactly 3 properties:
        username, comments, collections`, (done) => {
          usersDb.profile({})
            .then((result) => {
              expect(result).to.be.an('object');
              expect(result).to.have.property('username');
              expect(result).to.have.property('comments');
              expect(result).to.have.property('collections');
              expect(Object.keys(result)).to.have.length(3);
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
        usersDb.profile({})
          .catch((err) => {
            return expect(err).to.exist
              .and.to.be.a('string');
          });
      });
    });
  });

  describe('data.usersDb.update tests', () => {
    describe(`if there is such user in db...`, () => {
      let updateData;
      let expected;

      beforeEach(() => {
        updateData = { data: { username: 'asd' } };
        expected = updateData.data;

        sinon.stub(crud, 'findOne')
          .callsFake(() => {
            return Promise.resolve({});
          });

        sinon.stub(crud, 'update')
          .callsFake((_, data) => {
            return Promise.resolve(data);
          });
      });

      afterEach(() => {
        crud.findOne.restore();
        crud.update.restore();
      });

      it(`expect to resolve with the proper object`, (done) => {
        usersDb.update(updateData)
          .then((result) => {
            expect(result).to.deep.equal(expected);
          })
          .then(done, done);
      });
    });

    describe(`if there is no such user in db...`, () => {
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
        usersDb.update({})
          .catch((err) => {
            return expect(err).to.exist
              .and.to.be.a('string');
          });
      });
    });
  });
});
