const { expect } = require('chai');

const data = require('../../../data');

const db = () => {};

describe(`General data tests`, () => {
  it(`expect data to be a function`, () => {
    expect(data).to.be.a('function');
  });

  it(`expect data(db) to return an object`, () => {
    const result = data(db);

    expect(result).to.be.an('object');
  });
});
