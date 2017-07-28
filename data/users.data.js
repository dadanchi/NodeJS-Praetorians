const BaseData = require('./base/base.data');
const User = require('../models/user.model');
const notifier = require('node-notifier');
const { ObjectID } = require('mongodb');

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
            topic: comment.topic,
            content: comment.content,
            author: comment.author,
            date: comment.date,
            _id: comment._id,
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

    async updateProfil(updatedData, oldData) {
        return this.collection.update(
            { _id: oldData._id },
            {
                $set: {
                    password: updatedData.password,
                    firstname: updatedData.firstname,
                    lastname: updatedData.lastname,
                    town: updatedData.town,
                },
            }
        );
    }

    checkPassword(username, password) {
        return this.findByUserName(username)
            .then((user) => {
                if (!user) {
                    notifier.notify('Invalid user');
                    throw new Error('Invalid user');
                }
                if (user.password !== password) {
                    notifier.notify('Invalid password');
                    throw new Error('Invalid password');
                }
                return true;
            });
    }
}

module.exports = UsersData;
