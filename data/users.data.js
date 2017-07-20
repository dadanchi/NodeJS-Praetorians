const BaseData = require('./base/base.data');
const User = require('../models/user.model');

class UsersData extends BaseData {
    constructor(db) {
        super(db, User, User);
    }

    findByUserName(username) {
        return this
                .filterBy({ username: new RegExp(username, 'i') })
                .then(([user]) => user);
    }

    checkPassword(username, password) {
        return this.findByUserName(username)
            .then((user) => {
                console.log(user);
                if (!user) {
                    throw new Error('Invalid user');
                }

                if (user.password !== password) {
                    throw new Error('Invalid password');
                }

                return true;
            });
    }
}

module.exports = UsersData;
