const passport = require('passport');
const helper = require('../../../helpers/helpers');
const validator = require('../../../helpers/validator');

class UsersController {
    constructor(data) {
        this.data = data;
    }

    getSignUpForm(req, res) {
        return res.render('auth/sign-up');
    }
    getSignInForm(req, res) {
        return res.render('auth/sign-in');
    }
    signOut(req, res) {
        req.logout();
        return res.redirect('/');
    }

    signUp(req, res) {
        const bodyUser = req.body;
        bodyUser.comments = [];
        const firstname = bodyUser.firstname;
        const lastname = bodyUser.lastname;
        const town = bodyUser.town;
        const profilImage = bodyUser.profilImage;
        bodyUser.regDate = helper.getDate();       
        if (validator.validatePassword(req, res, bodyUser.password) === false ||
            validator.validateUsername(req, res, bodyUser.username) === false ||
            validator.validateName(req, res, firstname) === false ||
            validator.validateName(req, res, lastname) === false ||
            validator.validateTown(req, res, town) === false ||
            validator.validateProfilImageUrl(req, res, profilImage) === false) {
            res.redirect('/auth/sign-up');
        }

        bodyUser.password = helper.encryptor.encrypt(bodyUser.password);
        return this.data.users.findByUserName(bodyUser.username)
            .then((dbUser) => {
                if (dbUser) {
                    throw new Error('User already exists');
                }
                return this.data.users.create(bodyUser)
                    .then((x) => {
                        passport.authenticate('local')(req, res, () => {
                            res.redirect('/');
                        });
                    });
            });
    }

    signIn(req, res) {
        return new Promise(() => {
            const bodyUser = req.body;
            bodyUser.password = helper.encryptor.encrypt(bodyUser.password);
            passport.authenticate('local',
                { failureRedirect: '/auth/sign-in' })(req, res, () => {
                    if (res.status(200)) {
                        return res.redirect('/');
                    }

                    return res.redirect('/auth/sign-in');
                });
        });
    }
}

const init = (data) => {
    return new UsersController(data);
};

module.exports = { init };
