const BaseData = require('./base/base.data');
const User = require('../models/user.model');
const helper = require('../helpers/helpers');

class UsersData extends BaseData {
    constructor(db) {
        super(db, User, User);
    }

    findByUserName(username) {
        return this
                .filterBy({ username: username })
                .then(([user]) => user);
    }

    async addComment(comment) {
        const newUser = await this.collection.findOne(
            {
                username: comment.author,
            });
        const newComment = {
            content: comment.content,
            topic: comment.topic,
            date: helper.getDate(),
        };

        newUser.comments.push(newComment);

        return this.collection.updateOne(
            {
                username: comment.author,
            },
                newUser
        )
        .then(() => {
            return newUser;
        });
    }

    checkPassword(username, password) {
        return this.findByUserName(username)
            .then((user) => {
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
