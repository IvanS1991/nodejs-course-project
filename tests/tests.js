const { expect } = require('chai');

describe('Data tests', () => {
    const data = require('../app/data');

    it('Should export an object', () => {
        expect(data).to.be.an('object');
    });

    describe('Data.users', () => {
        it('Should exist', () => {
            const users = data.users;

            expect(users).to.exist;
        });
    });
});
