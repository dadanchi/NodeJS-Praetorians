const { expect } = require('chai');
const sinon = require('sinon');

const UsersData = require('../../../data/users.data');

describe('users.data', () => {
    const items = [];
    let user = null;
    let userData = null;

    user = {
        id: 1,
        username: 'testTest',
        password: 'verySecret',
        comments: [],
    };

    const db = {
        collection: () => { },
    };

    const toArray = () => {
        return Promise.resolve(items);
    };

    const element = {};

    const findOne = (username) => {
        return {
            element,
        };
    };

    const find = () => {
        return {
            toArray,
        };
    };



    sinon.stub(db, 'collection')
        .callsFake(() => {
            return { find, findOne };
        });

    beforeEach(() => {
        userData = new UsersData(db, user, user);
    });

    describe('findByUsername() should', () => {
        items.push(user);

        it('return correct user', () => {
            return userData.findByUserName(user.username)
                .then((usr) => {
                    expect(usr.username).to.be.eql(user.username);
                });
        });
    });

    describe('checkPassword() should ', () => {
        it('throw error, when invalid password passed', () => {
            const wrongPass = 'invalidPass';
            const func = () => {
                return userData.checkPassword(user.username, wrongPass)
                    .then((dd) => {
                        expect(dd).to.throw();
                    });
            };
        });
        it('throw error, when invalid user passed', () => {
            const invalidUN = 'wrongUsername';
            const func = () => {
                return userData.checkPassword(invalidUN, 'wewecv')
                    .then((dd) => {
                        expect(dd).to.throw();
                    });
            };
        });

        it('return true, if passed data is valid', () => {
            const func = () => {
                return userData.checkPassword(user.username, user.password)
                    .then((dd) => {
                        expect(dd).to.be.equal(true);
                    });
            };
        });
    });
});
