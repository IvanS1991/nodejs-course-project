const { expect } = require('chai');

const { userModel } = require('../../../models');

describe('userModel tests', () => {
  it(`expect to return an object if valid options are passed`, () => {
    const validOptions = { username: 'asdasd', passHash: 'agegqgqw' };
    const result = userModel(validOptions);

    expect(result).to.be.an('object');
    expect(result).to.have.property('username');
    expect(result).to.have.property('usernameLC');
    expect(result).to.have.property('passHash');
    expect(result).to.have.property('authKey');
    expect(result).to.have.property('comments');
    expect(result).to.have.property('collections');
    expect(result).to.have.property('joined');
    expect(Object.keys(result)).to.have.length(7);
  });

  it(`expect to throw if invalid options are passed`, () => {
    const invalidOptions = { random: 'asd', something: 123 };
    const test = () => {
      userModel(invalidOptions);
    };

    expect(test).to.throw();
  });
});
