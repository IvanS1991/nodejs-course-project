const { expect } = require('chai');

const { collectionModel } = require('../../../models');

describe('collectionModel tests', () => {
  it(`expect to return an object if valid options are passed`, () => {
    const validOptions = { collectionName: 'asdf', isPrivate: true };
    const result = collectionModel(validOptions);

    expect(result).to.be.an('object');
    expect(result).to.have.property('collectionName');
    expect(result).to.have.property('isPrivate');
    expect(result).to.have.property('id');
    expect(result).to.have.property('movies');
    expect(result).to.have.property('created');
    expect(Object.keys(result)).to.have.length(5);
  });

  it(`expect to throw if invalid options are passed`, () => {
    const invalidOptions = { random: 'asd', something: 123 };
    const test = () => {
      collectionModel(invalidOptions);
    };

    expect(test).to.throw();
  });
});
