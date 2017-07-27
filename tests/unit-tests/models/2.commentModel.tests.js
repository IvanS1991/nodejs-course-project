const { expect } = require('chai');

const { commentModel } = require('../../../models');

describe('commentModel tests', () => {
  it(`expect to return an object if valid options are passed`, () => {
    const validOptions = { content: 'asdf', movieId: 2 };
    const result = commentModel(validOptions);

    expect(result).to.be.an('object');
    expect(result).to.have.property('content');
    expect(result).to.have.property('movieId');
    expect(result).to.have.property('id');
    expect(result).to.have.property('created');
    expect(Object.keys(result)).to.have.length(4);
  });

  it(`expect to throw if invalid options are passed`, () => {
    const invalidOptions = { random: 'asd', something: 123 };
    const test = () => {
      commentModel(invalidOptions);
    };

    expect(test).to.throw();
  });
});
