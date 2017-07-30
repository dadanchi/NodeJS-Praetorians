const BaseData = require('./base/base.data');
const User = require('../models/user.model');
const notifier = require('node-notifier');
const { encryptor } = require('../helpers/helpers');
const validator = require('../helpers/validator');

class UsersData extends BaseData {
    constructor(db) {
        super(db, User, User);
    }

    findByUserName(username) {
        return this
            .filterBy({ username: username })
            .then(([user]) => user);
    }

    addComment(comment) {
        return Promise.resolve(this.collection.findOne(
            {
                username: comment.author,
            }).then((newUser) => {
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
            })
        );
    }


    updateProfil(updatedData, oldData, req, res) {
        let newPassword = '';
        let newFirstName = '';
        let newLastName = '';
        let newTown = '';
        let newProfilImage = '';

        if (updatedData.password === '' || updatedData.password === null) {
            newPassword = oldData.password;
        } else {
            newPassword = encryptor.encrypt(updatedData.password);
        }

        if (updatedData.firstname) {
            newFirstName = updatedData.firstname;
        } else {
            newFirstName = oldData.firstname;
        }

        if (updatedData.lastname) {
            newLastName = updatedData.lastname;
        } else {
            newLastName = oldData.lastname;
        }

        if (updatedData.town) {
            newTown = updatedData.town;
        } else {
            newTown = oldData.town;
        }

        if (updatedData.profilImage) {
            newProfilImage = updatedData.profilImage;
        } else {
            newProfilImage = oldData.profilImage;
        }

        if (validator.validatePasswordUpdate(req, res, newPassword, oldData) === false ||
            validator.validateName(req, res, newFirstName) === false ||
            validator.validateName(req, res, newLastName) === false ||
            validator.validateTown(req, res, newTown) === false ||
            validator.validateProfilImageUrl(req, res, newProfilImage) === false) {
            res.redirect(`/users/:user=${oldData.username}/updateProfil`);
        }

        return this.collection.update(
            { _id: oldData._id },
            {
                $set: {
                    password: newPassword,
                    firstname: newFirstName,
                    lastname: newLastName,
                    town: newTown,
                    profilImage: newProfilImage,
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
