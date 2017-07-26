const { expect } = require('chai');
const sinon = require('sinon');

const init = require('../../../data');

describe('data.collections tests', () => {
  let collections;
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

    collections = init(db).collections;
  });

  describe(`data.collections.create`, () => {
    let expected;

    beforeEach(() => {
      expected = { collectionName: 'asd' };

      sinon.stub(crud, 'insertOne')
        .callsFake((item) => {
          return Promise.resolve(item);
        });
    });

    afterEach(() => {
      crud.insertOne.restore();
    });

    it(`expect to resolve with an object`, (done) => {
      collections.create(expected)
        .then((result) => {
          expect(result).to.equal(expected);
        })
        .then(done, done);
    });
  });

  describe(`data.collections.all`, () => {
    let collectionsList;

    beforeEach(() => {
      collectionsList = [
        { isPrivate: true },
        { isPrivate: true },
        { isPrivate: false },
      ];

      sinon.stub(crud, 'findMany')
        .callsFake(() => {
          return Promise.resolve(collectionsList
            .filter((coll) => {
              return coll.isPrivate === false;
            }));
        });
    });

    afterEach(() => {
      crud.findMany.restore();
    });

    it(`expect to resolve with a properly filtered array`, (done) => {
      collections.all()
        .then((result) => {
          expect(result).to.have.length(1);
        })
        .then(done, done);
    });
  });

  describe(`data.collections.view`, () => {
    describe(`if a matching collection is found and is private...`, () => {
      describe(`if owner is current user...`, () => {
        let match;
        let user;

        beforeEach(() => {
          match = {
            author: 'gosho',
          };

          user = {
            username: 'gosho',
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
          collections.view({ user })
            .then((result) => {
              expect(result).to.deep.equal(match);
            })
            .then(done, done);
        });
      });

      describe(`if owner is NOT current user...`, () => {
        let match;
        let user;

        beforeEach(() => {
          match = {
            author: 'gosho',
          };

          user = {
            username: 'pesho',
          };

          sinon.stub(crud, 'findOne')
            .callsFake(() => {
              return Promise.resolve(match);
            });
        });

        afterEach(() => {
          crud.findOne.restore();
        });

        it(`expect to reject with an error`, () => {
          collections.view({ user })
            .catch((err) => {
              return expect(err).to.exist
                .and.to.be.a('string');
            });
        });
      });
    });

    describe(`if a matching collection is found and is NOT private...`, () => {
      let match;

      beforeEach(() => {
        match = { something: 'asdf' };

        sinon.stub(crud, 'findOne')
          .callsFake(() => {
            return Promise.resolve(match);
          });
      });

      afterEach(() => {
        crud.findOne.restore();
      });

      it(`should resolve with the match`, (done) => {
        collections.view({})
          .then((result) => {
            expect(result).to.deep.equal(match);
          })
          .then(done, done);
      });
    });

    describe(`if no matching collection is found...`, () => {
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
        collections.view({})
          .catch((err) => {
            return expect(err).to.exist
              .and.to.be.a('string');
          });
      });
    });
  });

  describe(`data.collections.updateDetails`, () => {
    describe(`if a matching collection is found...`, () => {
      it(``, () => {
        expect(true).to.equal(false);
      });
    });

    describe(`if a matching collection is NOT found...`, () => {
      it(``, () => {
        expect(true).to.equal(false);
      });
    });
  });
});
