const { expect } = require('chai');
const sinon = require('sinon');

const UsersData = require('../../../data/users.data');

describe('users.data', () => {
    let items = [];
    let userData = null;
    const user = {
        id: 1,
        username: 'testTest',
    };

    const db = {
            collection: () => { },
        };

        items = ['testTest'];

        const toArray = () => {
            return Promise.resolve(items);
        };

        const find = () => {
            return {
                toArray,
            };
        };

        sinon.stub(db, 'collection')
            .callsFake(() => {
                return { find };
            });

    beforeEach(() => {
        userData = new UsersData(db, user, user);
    });

    it('expect findByUsername to return correct user', () => {
        return userData.findByUserName(user.username)
            .then((usr) => {
                expect(usr).to.be.deep.equal(items[0]);
            });
    });
});
